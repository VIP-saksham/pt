/**
 * Page-level image "super cache" — no service worker, no request interception.
 *
 * Three layers, fastest first:
 *   1. session memo (url → blob URL): synchronous, instant, zero network.
 *   2. persisted index (localStorage): a synchronous "is this URL in Cache
 *      Storage?" hint, so on a reload a cached image waits ~ms for its blob
 *      instead of hitting the network (real zero-network on flaky connections).
 *   3. unknown URLs: shown from the network immediately (correct), then quietly
 *      copied into the cache for next time.
 *
 * `prefetch()` warms the whole set — but only after `load`, on an idle tick — so
 * filtering to any card is eventually instant without ever competing with first
 * paint for bandwidth. Nothing is intercepted, so it can never deadlock; a
 * stale hint self-heals.
 */
// Entries are keyed by URL alone, so replacing an image file (same path, new
// bytes — a new avatar, refreshed cover) would keep serving the old copy from
// Cache Storage forever. Bump this whenever image bytes change at a live URL.
const CACHE_VERSION = 'v2';
const CACHE = `vai-img-cache-${CACHE_VERSION}`;
const INDEX_KEY = `vai-img-index-${CACHE_VERSION}`;
const CACHE_PREFIX = 'vai-img-cache'; // matches legacy (unversioned) caches too

const isClient = typeof window !== 'undefined';
const hasCaches = isClient && 'caches' in window;

// url → blob URL, built once per URL per page load
const memo = new Map<string, string>();
// URLs we believe are already in Cache Storage (synchronous hint, persisted)
const known = new Set<string>();

if (isClient) {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    if (raw) (JSON.parse(raw) as string[]).forEach((u) => known.add(u));
  } catch (e) {
    /* ignore */
  }
}

function persistIndex() {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify([...known]));
  } catch (e) {
    /* ignore */
  }
}
function remember(url: string) {
  if (!known.has(url)) {
    known.add(url);
    persistIndex();
  }
}
function forget(url: string) {
  if (known.has(url)) {
    known.delete(url);
    persistIndex();
  }
}
function sameOrigin(u: string): boolean {
  try {
    return new URL(u, window.location.href).origin === window.location.origin;
  } catch (e) {
    return false;
  }
}
function cacheable(url?: string): url is string {
  return isClient && hasCaches && !!url && sameOrigin(url);
}

/** Sync IDLE after load: keeps multi-MB cache warm-up off the critical path. */
function onIdle(fn: () => void, timeout = 6000): void {
  // No DOM (unit tests, SSR): nothing to wait for, just run.
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    fn();
    return;
  }
  const start = () => {
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
      .requestIdleCallback;
    if (ric) ric(fn, { timeout });
    else setTimeout(fn, 1500);
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

/** Drop caches left behind by older versions (they hold outdated image bytes). */
function dropSupersededCaches(): void {
  if (!hasCaches) return;
  onIdle(() => {
    try {
      // Not every environment exposes the full CacheStorage surface (test doubles).
      if (typeof caches.keys !== 'function') return;
      caches
        .keys()
        .then((keys) =>
          Promise.all(
            keys.filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE).map((k) => caches.delete(k))
          )
        )
        .catch(() => {
          /* reclaiming disk is best-effort */
        });
    } catch (e) {
      /* ignore */
    }
  });
}

dropSupersededCaches();

/** Synchronous: a ready blob URL from this session's memo, if any. */
export function memoedBlob(url?: string): string | undefined {
  return url ? memo.get(url) : undefined;
}

/** Synchronous best-guess: is this URL already in Cache Storage? */
export function isCached(url?: string): boolean {
  return !!url && known.has(url);
}

/** Async: a blob URL if the image is cached, else undefined (+ populate in bg). */
export async function resolveCachedImg(url?: string): Promise<string | undefined> {
  if (!cacheable(url)) return undefined;

  const m = memo.get(url);
  if (m) return m;

  let cache: Cache;
  try {
    cache = await caches.open(CACHE);
  } catch (e) {
    return undefined;
  }

  try {
    const hit = await cache.match(url);
    if (hit) {
      const blobUrl = URL.createObjectURL(await hit.blob());
      memo.set(url, blobUrl);
      remember(url);
      return blobUrl;
    }
  } catch (e) {
    /* fall through */
  }

  // Not actually cached — heal a stale hint, then populate for next time.
  // Deferred until after load + idle: the <img> already shows the real URL (and
  // is loading="lazy"), so warming the cache must never compete with first
  // paint. Same bytes, just not on the critical path.
  forget(url);
  onIdle(() => {
    (async () => {
      try {
        const res = await fetch(url, { cache: 'force-cache' });
        if (res && res.ok) {
          await cache.put(url, res.clone());
          remember(url);
        }
      } catch (e) {
        /* the real URL is already showing */
      }
    })();
  });

  return undefined;
}

/** Warm a batch of images into the cache (skips already-cached ones). */
export function prefetch(urls: Array<string | undefined>) {
  if (!isClient || !hasCaches) return;
  const list = [...new Set(urls.filter((u): u is string => cacheable(u) && !isCached(u) && !memo.has(u)))];
  if (!list.length) return;

  const run = async () => {
    let cache: Cache;
    try {
      cache = await caches.open(CACHE);
    } catch (e) {
      return;
    }
    for (const url of list) {
      try {
        if (await cache.match(url)) {
          remember(url);
          continue;
        }
        const res = await fetch(url, { cache: 'force-cache' });
        if (res && res.ok) {
          await cache.put(url, res.clone());
          remember(url);
        }
      } catch (e) {
        /* ignore individual failures */
      }
    }
  };

  // Only after `load`: the avatar set is ~9 MB and must not race first paint.
  onIdle(run, 8000);
}