<div align="center">

# vip-saksham.github.io

**Saksham Swaroop（即 VIP-saksham）的个人网站。**
开发者 · 机器人作者 · 开源活跃者。系统代码、Rust，以及与众不同的界面。

[English](README.md) · [Русский](README.ru.md) · **中文**

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fvip-saksham.github.io&label=vip-saksham.github.io)](https://vip-saksham.github.io)
[![Stars](https://img.shields.io/github/stars/VIP-saksham/VIP-saksham.github.io?style=flat&logo=github)](https://github.com/VIP-saksham/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/VIP-saksham/VIP-saksham.github.io)](https://github.com/VIP-saksham/commits)
[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Vue](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Rust](https://img.shields.io/badge/Rust-WASM-dea584?logo=rust&logoColor=white)](https://www.rust-lang.org)

</div>

---

## 这是什么

一个三语（🇬🇧 / 🇷🇺 / 🇨🇳）单页作品集，拥有 **8 个截然不同的主题** —— 每个都是真正的*体验*，而非换色 —— 外加一组用 **Rust → WebAssembly** 从零构建的独立小应用。

## ✨ 亮点

- **8 个主题**，各有字体、动效与彩蛋：Modern（瑞士编辑风）、Snackers、Windows 11、macOS 26、**Windows 95**、**Mac Classic**、Classic（2016–18）、Terminal —— 在合适处提供明暗切换。
- **三语**内容（ru / en / zh），通过轻量 i18n 层实现，按板块拆分为文件，便于编辑。
- **主题感知的博客**，带搜索、标签、阅读进度与逐篇本地化。
- 数据驱动的 **Projects / Labs / Friends / Inspirations / Communities / Achievements** 板块 —— 新增一条 = 复制一个对象。
- **实时 GitHub 统计**，由 cron 刷新（见下）—— 星标、fork 与语言占比始终最新。
- 面向 AI 代理的机器可读档案：[`/llms.txt`](https://vip-saksham.github.io/llms.txt) 与 [`/for-ai/`](https://vip-saksham.github.io/for-ai/AGENTS.md)。

## 🧪 Labs —— 小应用（Rust + Leptos → WASM）

| 应用 | 简介 | 打开 |
|------|------|------|
| **Horizon 2027** | 交互式分支新年体验，实时倒数（公历**与**农历新年）。 | [/files/horizon](https://vip-saksham.github.io/files/horizon/) |
| **JustCode** | 把源代码变成精美图片 —— 主题、窗口样式、PNG/JPEG/WebP/SVG、预设保存。 | [/files/justcode](https://vip-saksham.github.io/files/justcode/) |
| **SAKSHAM Terminal** | 可探索的命令行作品集，带可写虚拟文件系统；同时支持 bash **与** PowerShell。 | [/files/terminal](https://vip-saksham.github.io/files/terminal/) |

每个 lab 位于 `projects/<name>/`，用 `trunk build --release` 直接构建到 `public/files/<name>/`。

## 🛠 技术

**站点：** Astro 7 · Vue 3.5 + Pinia 3 · TypeScript 7 · Vite 8 · 基于 token 的模块化 CSS 主题（无 Tailwind — 只有变量与自律）。
**Labs：** Rust · Leptos 0.6（CSR）· Trunk · WebAssembly。
**基础设施：** GitHub Actions（部署 · 标签同步 · 统计 cron）· Dependabot · GitHub Pages + Cloudflare DNS。

## 📊 实时统计

`.github/workflows/stats.yml` 每 6 小时（以及手动）运行 `scripts/update-stats.mjs`。它拉取 GitHub API，汇总**总星标 / fork**、**按字节的语言占比**和**各仓库统计**，然后提交 `public/data/stats.json`。站点在运行时读取该 JSON —— 数据保持新鲜，无需对每位访客调用 API，也没有速率限制。数据公开：[`/data/stats.json`](https://vip-saksham.github.io/data/stats.json)。

## 🗂 结构

```
src/
  components/sections/   # 每个页面板块一个 Vue 组件
  data/                  # 可编辑数据（projects、labs、friends、achievements…）
  i18n/translations/     # ru/ en/ zh —— 每板块一个文件，在 index.ts 合并
  styles/themes/         # 每个主题一个 CSS 文件
projects/{horizon,justcode,terminal}/   # Rust/WASM 小应用
scripts/update-stats.mjs # GitHub 统计生成器（cron）
public/                  # 静态资源、CNAME、favicon、/data/stats.json
```

## 🚀 开发

```bash
bun install
bun run dev        # 本地开发
bun run build      # → dist/
bun run verify     # 内部链接检查
```

构建一个 lab：

```bash
rustup target add wasm32-unknown-unknown   # 一次
cargo install trunk --locked               # 一次
cd projects/horizon && trunk build --release
```

## 🌍 部署

推送到 `main`（或统计 cron 的提交）会触发 **GitHub Actions → GitHub Pages**。自定义域名 `vip-saksham.github.io` 通过 `public/CNAME` + Cloudflare DNS（仅 DNS）。Pages 源需设为 *GitHub Actions*。

## 📜 许可证

**SSPPL v1.1** —— *Saksham Swaroop Personal Project License*。见 [LICENSE](LICENSE)。

- ✅ **非商业使用** —— 对所有人开放。
- ❌ **商业使用** —— 未经许可不可。
- ❌ 在此代码或内容上进行 **AI / ML 训练** —— 不允许。

## 📇 联系

**pollysmarty11@gmail.com** · [vip-saksham.github.io](https://vip-saksham.github.io) · [github.com/VIP-saksham](https://github.com/VIP-saksham)
