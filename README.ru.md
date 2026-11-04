<div align="center">

# vip-saksham.github.io

**Личный сайт Saksham Swaroop — он же VIP-saksham.**
Разработчик · бот-мейкер · опенсорс-активист. Системный код, Rust и интерфейсы, которые не похожи на остальные.

[English](README.md) · **Русский** · [中文](README.zh.md)

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fvip-saksham.github.io&label=vip-saksham.github.io)](https://vip-saksham.github.io)
[![Stars](https://img.shields.io/github/stars/VIP-saksham/VIP-saksham.github.io?style=flat&logo=github)](https://github.com/VIP-saksham/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/VIP-saksham/VIP-saksham.github.io)](https://github.com/VIP-saksham/commits)
[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Vue](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Rust](https://img.shields.io/badge/Rust-WASM-dea584?logo=rust&logoColor=white)](https://www.rust-lang.org)

</div>

---

## Что это

Трёхъязычное (🇬🇧 / 🇷🇺 / 🇨🇳) одностраничное портфолио с **8 полностью разными темами** — каждая это настоящий *опыт*, а не перекраска — плюс набор самостоятельных мини-приложений, написанных с нуля на **Rust → WebAssembly**.

## ✨ Ключевое

- **8 тем**, у каждой свои шрифты, движение и пасхалки: Modern (швейцарская редактура), Snackers, Windows 11, macOS 26, **Windows 95**, **Mac Classic**, Classic (2016–18), Terminal — со светлым/тёмным режимом там, где уместно.
- **Три языка** (ru / en / zh) через тонкий i18n-слой, разбитый на файлы по секциям — удобно редактировать.
- **Тема-осознанный блог** с поиском, тегами, прогрессом чтения и локализацией постов.
- Data-driven секции **Projects / Labs / Friends / Inspirations / Communities / Achievements** — добавить запись = скопировать объект.
- **Живая статистика GitHub**, обновляемая кроном (ниже) — звёзды, форки и разбивка по языкам всегда актуальны.
- Машиночитаемый профиль для ИИ-агентов: [`/llms.txt`](https://vip-saksham.github.io/llms.txt) и [`/for-ai/`](https://vip-saksham.github.io/for-ai/AGENTS.md).

## 🧪 Лаба — мини-приложения (Rust + Leptos → WASM)

| Приложение | Что это | Открыть |
|-----------|---------|---------|
| **Horizon 2027** | Интерактивный разветвлённый новогодний опыт с живым отсчётом (григорианский **и** китайский НГ). | [/files/horizon](https://vip-saksham.github.io/files/horizon/) |
| **JustCode** | Превращает код в красивые картинки — темы, оконный хром, PNG/JPEG/WebP/SVG, сохранение пресетов. | [/files/justcode](https://vip-saksham.github.io/files/justcode/) |
| **SAKSHAM Terminal** | Портфолио-командная строка с записываемой виртуальной ФС; понимает bash **и** PowerShell. | [/files/terminal](https://vip-saksham.github.io/files/terminal/) |

Каждая лаба живёт в `projects/<name>/` и собирается через `trunk build --release` прямо в `public/files/<name>/`.

## 🛠 Технологии

**Сайт:** Astro 7 · Vue 3.5 + Pinia 3 · TypeScript 7 · Vite 8 · модульные CSS-темы на токенах (без Tailwind — только переменные и дисциплина).
**Лаба:** Rust · Leptos 0.6 (CSR) · Trunk · WebAssembly.
**Инфра:** GitHub Actions (деплой · синк лейблов · крон статистики) · Dependabot · GitHub Pages + Cloudflare DNS.

## 📊 Живая статистика

`.github/workflows/stats.yml` запускает `scripts/update-stats.mjs` каждые 6 часов (и по кнопке). Скрипт тянет GitHub API, собирает **суммарные звёзды / форки**, **разбивку по языкам (по байтам)** и **статистику по репозиториям**, затем коммитит `public/data/stats.json`. Сайт читает этот JSON в рантайме — цифры свежие, без запросов на каждого посетителя и без лимитов. Данные публичны: [`/data/stats.json`](https://vip-saksham.github.io/data/stats.json).

## 🗂 Структура

```
src/
  components/sections/   # по одному Vue-компоненту на секцию страницы
  data/                  # редактируемые данные (projects, labs, friends, achievements, …)
  i18n/translations/     # ru/ en/ zh — по файлу на секцию, собираются в index.ts
  styles/themes/         # по одному CSS-файлу на тему
projects/{horizon,justcode,terminal}/   # мини-приложения на Rust/WASM
scripts/update-stats.mjs # генератор статистики GitHub (крон)
public/                  # статика, CNAME, фавиконы, /data/stats.json
```

## 🚀 Разработка

```bash
bun install
bun run dev        # локальный dev
bun run build      # → dist/
bun run verify     # проверка внутренних ссылок
```

Собрать лабу:

```bash
rustup target add wasm32-unknown-unknown   # один раз
cargo install trunk --locked               # один раз
cd projects/horizon && trunk build --release
```

## 🌍 Деплой

Пуш в `main` (или коммит крона статистики) запускает **GitHub Actions → GitHub Pages**. Кастомный домен `vip-saksham.github.io` через `public/CNAME` + Cloudflare DNS (только DNS). Источник Pages — *GitHub Actions*.

## 📜 Лицензия

**SSPPL v1.1** — *Saksham Swaroop Personal Project License*. См. [LICENSE](LICENSE).

- ✅ **Некоммерческое использование** — разрешено всем.
- ❌ **Коммерческое использование** — только по согласованию.
- ❌ **Обучение AI / ML** на этом коде или контенте — запрещено.

## 📇 Контакты

**pollysmarty11@gmail.com** · [vip-saksham.github.io](https://vip-saksham.github.io) · [github.com/VIP-saksham](https://github.com/VIP-saksham)
