# 易方 / MODUS 企业官网

当前交付为视觉 v3 的静态首版：中文导航、原创空间雕塑、六组业务能力与 24 项服务、合作方式，以及连续深色的关于、联系与法律页尾。联系方式保留“联系方式即将更新”，无表单、统计或外部访客服务。

## 本地运行

使用 Node.js 24.19.0 和随附 npm。在仓库根目录执行：

```powershell
npm ci --ignore-scripts --no-audit --no-fund
npm run dev -- --host 127.0.0.1
```

打开终端显示的地址并加 `/Yifang-Company-Website/`。框架固定为 Astro 7.4.7，类型检查使用 @astrojs/check 0.9.10、TypeScript 5.9.3；浏览器检查使用 playwright-core 1.64.1 和现有 Chrome，不下载浏览器。lockfile 固定传递依赖。安装不执行依赖生命周期脚本。

## 文件位置

| 文件 | 用途 |
| --- | --- |
| `src/data/site.ts` | 全部公开业务文案、导航、六组服务 |
| `src/pages/index.astro` | 语义化静态页面及菜单增强 |
| `src/styles/global.css` | 手机 / 平板 / 桌面布局、动效与回退 |
| `src/assets/spatial-sculpture.png` | 经确认的原始透明雕塑；Astro 构建响应式 AVIF/WebP |
| `public/brand/` | 经确认的原样 SVG 标志与横向锁合 |
| `public/fonts/` | 本地文字子集及完整 OFL 授权 |
| `docs/font-assets.json` | 固定字体来源、原始及子集 SHA-256 |
| `.github/workflows/preview.yml` | 仅手动触发的构建与可选 Pages 发布 |

## 验证与交付

按顺序执行受保护检查，不得修改验收标准来解决实现失败：

```powershell
npm run verify:build
npm run verify:contract
npm run verify:browser
npm run verify:fallbacks
npm run verify:bundle
```

浏览器默认使用 `C:/Program Files/Google/Chrome/Application/chrome.exe`；其他环境通过 `PLAYWRIGHT_CHROMIUM_EXECUTABLE` 指定现有 Chrome。截图与报告写入仓库外的 `../runs/validation/`。浏览器覆盖 320/360/375/390/430/768/1366/1440 宽度及无脚本、减少动态效果、字体失败。预算为压缩 JS ≤40 KiB、首次编码资源 ≤700 KiB。

正文在构建时生成 HTML，菜单脚本失效时显示直接链接；减少动态效果时雕塑静止。字体失败使用系统字体。访客资源全部自托管。每次修改后检查真实截图，结构检查不替代视觉复核。

维护步骤见 [文案更新](docs/CONTENT-UPDATES.md)，本地及未来授权预览见 [预览与回退](docs/PREVIEW.md)，资源授权见 [第三方说明](THIRD_PARTY_NOTICES.md)。原始需求、审批、私有素材包、联系方式及执行记录不得加入此仓库。

本地检查和代码提交仅是技术候选证据。发布、源码可见性变更、费用及最终验收均须各自授权；尚需真实预览后的 iOS / Android 微信真机测试。LCP ≤2.5s、INP ≤200ms、CLS ≤0.1 为目标，本地测试不能证明线上实测结果。
