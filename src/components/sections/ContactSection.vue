<template>
  <section id="contact" class="contact">
    <div class="contact-inner">
      <header class="sec-header">
        <h2>{{ t('contact.title') }}</h2>
        <p>{{ t('contact.subtitle') }}</p>
      </header>

      <!-- Project-specific emails -->
      <div class="proj-emails">
        <h3 class="emails-title">
          <Briefcase :size="18" />
          {{ t('contact.projEmails') }}
        </h3>
        <div class="emails-grid">
          <a v-for="e in projectEmails" :key="e.email" :href="`mailto:${e.email}`" class="email-card">
            <div class="email-icon" :style="{ color: e.color }">
              <component :is="e.icon" :size="18" />
            </div>
            <div class="email-info">
              <span class="email-label">{{ e.label }}</span>
              <span class="email-addr">{{ e.email }}</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Social grid -->
      <div class="social-section">
        <h3 class="social-title">
          <Globe :size="18" />
          {{ t('contact.socials') }}
        </h3>
        <div class="social-grid">
          <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" rel="noopener" :class="['social-card', s.class]">
            <div class="social-icon">
              <svg v-if="s.brand" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path :d="s.brand?.path" fill="currentColor" />
              </svg>
              <component v-else :is="s.icon" :size="20" />
            </div>
            <div class="social-info">
              <span class="social-name">{{ s.name }}</span>
              <span class="social-handle">{{ s.handle }}</span>
            </div>
          </a>

          <!-- Email copy -->
          <button class="social-card email" @click="copyEmail('pollysmarty11@gmail.com')">
            <div class="social-icon">
              <Mail :size="20" />
            </div>
            <div class="social-info">
              <span class="social-name">Email (Primary)</span>
              <span class="social-handle">{{ copiedEmail === 'pollysmarty11@gmail.com' ? t('contact.copied') : 'pollysmarty11@gmail.com' }}</span>
            </div>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Github, Mail, Coffee, Heart, Wallet, Zap,
  MessageCircle, Twitch, Twitter, Youtube, Globe, Radio,
  BookOpen, MapPin, Smartphone, Briefcase, Bitcoin,
  Shield, Code2, Hammer, Megaphone, User
} from 'lucide-vue-next';
import {
  siGithub, siTelegram, siTwitch, siX, siYoutube, siCodeberg, siDiscord, siMatrix, siTiktok,
} from 'simple-icons';
import { useI18n } from '@/composables/useI18n';

const { t } = useI18n();

const copiedEmail = ref<string | null>(null);

const projectEmails = [
  { email: 'pollysmarty11@gmail.com', label: 'General', color: '#10B981', icon: Mail },
];

const socials = [
  { name: 'GitHub', handle: '@VIP-saksham', url: 'https://github.com/VIP-saksham', icon: Github, brand: siGithub, class: 'gh' },
];

function copyEmail(email: string) {
  navigator.clipboard.writeText(email);
  copiedEmail.value = email;
  setTimeout(() => copiedEmail.value = null, 2000);
}

</script>

<style scoped>
.contact {
  padding: var(--space-24) 1.5rem;
}

.contact-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.sec-header {
  margin-bottom: var(--space-8);
}

.sec-header h2 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 700;
}

.sec-header p {
  color: var(--text-muted);
  font-size: var(--font-size-lg);
}

/* Project Emails */
.proj-emails {
  margin-bottom: var(--space-12);
}

.emails-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: 700;
  margin-bottom: var(--space-4);
  color: var(--text);
}

.emails-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-3);
}

.email-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition: all var(--transition-base);
  cursor: pointer;
}

.email-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
}

.email-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.05);
  flex-shrink: 0;
}

.email-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.email-label {
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.email-addr {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--text-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Social Section */
.social-section {
  margin-bottom: var(--space-12);
}

.social-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: var(--font-size-lg);
  font-weight: 700;
  margin-bottom: var(--space-4);
  color: var(--text);
}

/* Social grid */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-3);
}

.social-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: var(--font-body);
  animation: fadeInUp 0.4s ease-out forwards;
  opacity: 0;
}

.social-card:nth-child(1) { animation-delay: 0.05s; }
.social-card:nth-child(2) { animation-delay: 0.1s; }
.social-card:nth-child(3) { animation-delay: 0.15s; }
.social-card:nth-child(4) { animation-delay: 0.2s; }
.social-card:nth-child(5) { animation-delay: 0.25s; }
.social-card:nth-child(6) { animation-delay: 0.3s; }
.social-card:nth-child(7) { animation-delay: 0.35s; }
.social-card:nth-child(8) { animation-delay: 0.4s; }
.social-card:nth-child(9) { animation-delay: 0.45s; }
.social-card:nth-child(10) { animation-delay: 0.5s; }
.social-card:nth-child(11) { animation-delay: 0.55s; }
.social-card:nth-child(12) { animation-delay: 0.6s; }
.social-card:nth-child(13) { animation-delay: 0.65s; }
.social-card:nth-child(14) { animation-delay: 0.7s; }
.social-card:nth-child(15) { animation-delay: 0.75s; }
.social-card:nth-child(16) { animation-delay: 0.8s; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.social-card:hover {
  transform: translateY(-3px) scale(1.02);
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.05);
  flex-shrink: 0;
  transition: all var(--transition-base);
}

.social-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.social-name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text);
}

.social-handle {
  font-size: var(--font-size-xs);
  color: var(--text-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Platform accents */
.gh:hover .social-icon { background: rgba(255,255,255,0.1); }
.gh:hover { border-color: rgba(255,255,255,0.3); }

.tg:hover { border-color: rgba(38,165,228,0.4); }
.tg:hover .social-icon { background: rgba(38,165,228,0.15); color: #26A5E4; }

.tw:hover { border-color: rgba(145,70,255,0.4); }
.tw:hover .social-icon { background: rgba(145,70,255,0.15); color: #9146FF; }

.x:hover { border-color: rgba(255,255,255,0.3); }
.x:hover .social-icon { background: rgba(255,255,255,0.1); }

.yt:hover { border-color: rgba(255,0,0,0.4); }
.yt:hover .social-icon { background: rgba(255,0,0,0.15); color: #FF0000; }

.cb:hover { border-color: rgba(33,133,208,0.4); }
.cb:hover .social-icon { background: rgba(33,133,208,0.15); color: #2185D0; }

.dc:hover { border-color: rgba(88,101,242,0.4); }
.dc:hover .social-icon { background: rgba(88,101,242,0.15); color: #5865F2; }

.mx:hover { border-color: rgba(10,194,201,0.4); }
.mx:hover .social-icon { background: rgba(10,194,201,0.15); color: #0AC2C9; }

.mh:hover { border-color: rgba(255,107,53,0.4); }
.mh:hover .social-icon { background: rgba(255,107,53,0.15); color: #FF6B35; }

.tt:hover { border-color: rgba(255,0,80,0.4); }
.tt:hover .social-icon { background: rgba(255,0,80,0.15); color: #FF0050; }

.rd:hover { border-color: rgba(255,69,0,0.4); }
.rd:hover .social-icon { background: rgba(255,69,0,0.15); color: #FF4500; }

.md:hover { border-color: rgba(255,103,0,0.4); }
.md:hover .social-icon { background: rgba(255,103,0,0.15); color: #FF6700; }

.ml:hover { border-color: rgba(255,139,61,0.4); }
.ml:hover .social-icon { background: rgba(255,139,61,0.15); color: #FF8B3D; }

.email:hover { border-color: rgba(234,179,8,0.4); }
.email:hover .social-icon { background: rgba(234,179,8,0.15); color: #EAB308; }

/* Donations */
.donate-block {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  transition: all var(--transition-base);
}

.donate-block:hover {
  border-color: var(--border-hover);
}

.donate-header {
  text-align: center;
  margin-bottom: var(--space-6);
}

.donate-illustration {
  position: relative;
  width: 72px;
  height: 72px;
  margin: 0 auto var(--space-4);
}

.donate-orbit {
  position: absolute;
  inset: 0;
  animation: orbit 8s linear infinite;
}

.orbit-icon {
  position: absolute;
  color: var(--primary);
}

.orbit-icon.coffee { top: 0; left: 50%; transform: translateX(-50%); }
.orbit-icon.heart { bottom: 10%; right: 0; }
.orbit-icon.zap { bottom: 10%; left: 0; }

.donate-emoji {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  animation: floatEmoji 3s ease-in-out infinite;
}

@keyframes orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes floatEmoji {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.donate-header h3 {
  font-family: var(--font-display);
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.donate-header p {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
  max-width: 480px;
  margin: 0 auto;
}

.donate-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.donate-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-6);
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--text);
  font-weight: 600;
  transition: all var(--transition-base);
  text-align: center;
}

.donate-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
}

.donate-card-title {
  font-size: var(--font-size-sm);
}

.donate-card-hint {
  font-size: var(--font-size-xs);
  color: var(--text-dim);
  font-weight: 500;
}

.donate-card.coffee:hover { border-color: rgba(234,179,8,0.4); }
.donate-card.patreon:hover { border-color: rgba(255,66,77,0.4); }
.donate-card.yoomoney:hover { border-color: rgba(139,92,246,0.4); }

/* Crypto */
.crypto-block h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-base);
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.crypto-block > p {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  margin-bottom: var(--space-4);
}

.crypto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-3);
}

.crypto-item {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: var(--space-4);
  background: rgba(255,255,255,0.02);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: var(--font-body);
  text-align: left;
}

.crypto-item:hover {
  border-color: var(--primary);
}

.crypto-item.copied {
  border-color: var(--success);
  background: rgba(34,197,94,0.05);
}

.crypto-name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text);
}

.crypto-addr {
  font-family: var(--font-mono);
  font-size: var(--font-size-xs);
  color: var(--text-dim);
  word-break: break-all;
}

@media (max-width: 640px) {
  .donate-grid { grid-template-columns: 1fr; }
  .contact { padding: var(--space-16) 1rem; }
  .emails-grid { grid-template-columns: 1fr; }
  .social-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
}

/* ============================================================
   THEME OVERRIDES
   ============================================================ */

/* Win95 */
[data-theme="win95"] .social-card,
[data-theme="win95"] .donate-block,
[data-theme="win95"] .donate-card,
[data-theme="win95"] .crypto-item,
[data-theme="win95"] .email-card {
  border-radius: 0;
  border: 2px solid;
  border-color: #DFDFDF #000 #000 #DFDFDF;
  background: #C0C0C0;
  color: #000;
}

[data-theme="win95"] .donate-card:hover,
[data-theme="win95"] .social-card:hover,
[data-theme="win95"] .email-card:hover,
[data-theme="win95"] .crypto-item:hover {
  border-color: #DFDFDF #000 #000 #DFDFDF;
  transform: none;
  box-shadow: none;
}

[data-theme="win95"] .crypto-item.copied {
  background: #000080;
  color: #FFF;
}

[data-theme="win95"] .donate-emoji,
[data-theme="win95"] .donate-orbit { display: none; }

/* Mac Classic */
[data-theme="macclassic"] .social-card,
[data-theme="macclassic"] .donate-block,
[data-theme="macclassic"] .donate-card,
[data-theme="macclassic"] .crypto-item,
[data-theme="macclassic"] .email-card {
  border-radius: 0;
  border: 1px solid #000;
  background: #FFF;
  color: #000;
  box-shadow: 2px 2px 0 #000;
}

[data-theme="macclassic"] .donate-emoji,
[data-theme="macclassic"] .donate-orbit { display: none; }

/* Classic 2016-18 */
[data-theme="classic"] .social-card,
[data-theme="classic"] .donate-block,
[data-theme="classic"] .donate-card,
[data-theme="classic"] .crypto-item,
[data-theme="classic"] .email-card {
  border-radius: var(--radius-md);
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

[data-theme="classic"] .social-card:hover,
[data-theme="classic"] .donate-card:hover,
[data-theme="classic"] .email-card:hover,
[data-theme="classic"] .crypto-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border-color: rgba(79,70,229,0.2);
}

[data-theme="classic"] .donate-illustration {
  filter: grayscale(0.2);
}

/* Terminal */
[data-theme="terminal"] .social-card,
[data-theme="terminal"] .donate-block,
[data-theme="terminal"] .donate-card,
[data-theme="terminal"] .crypto-item,
[data-theme="terminal"] .email-card {
  border-radius: 0;
  border: 1px solid rgba(57,197,187,0.2);
  background: #24283B;
  font-family: var(--font-mono);
}

[data-theme="terminal"] .donate-card:hover,
[data-theme="terminal"] .social-card:hover,
[data-theme="terminal"] .email-card:hover,
[data-theme="terminal"] .crypto-item:hover {
  border-color: #39C5BB;
  box-shadow: 0 0 12px rgba(57,197,187,0.15);
  transform: none;
}

[data-theme="terminal"] .crypto-addr { color: #787C99; }
[data-theme="terminal"] .crypto-item.copied {
  background: rgba(57,197,187,0.1);
  border-color: #39C5BB;
}

[data-theme="terminal"] .donate-emoji { display: none; }
[data-theme="terminal"] .donate-orbit {
  animation: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
[data-theme="terminal"] .donate-orbit .orbit-icon {
  position: static;
  transform: none;
  color: #39C5BB;
}
[data-theme="terminal"] .donate-orbit .orbit-icon::after {
  content: '>';
  margin: 0 0.25rem;
  color: #787C99;
}

[data-theme="terminal"] .donate-header h3::before {
  content: '$ support --me';
  display: block;
  color: #39C5BB;
  font-size: var(--font-size-sm);
  margin-bottom: 0.25rem;
}
</style>
