# 本地候选验证记录

日期：2026-11-08。以下是本次开发执行的技术检查结果，不构成独立审查结论、公开发布或 owner 最终验收。独立任务复核、最终提交上的系统回归与独立系统复核由原生控制器继续执行。

## 受保护检查

| 检查 | 实际执行 | 结果 |
| --- | --- | --- |
| BUILD | `node tests/acceptance/build.mjs` | 通过；Astro 类型检查 0 error / warning / hint，静态构建成功 |
| CONTRACT | `node --test --test-reporter=tap tests/acceptance/site.test.mjs` | 7/7 通过，无 skip |
| BROWSER | `node tests/acceptance/browser.mjs --evidence-root ../runs/validation` | 8/8 视口通过 |
| FALLBACK | `node tests/acceptance/browser.mjs --fallbacks --evidence-root ../runs/validation/fallbacks` | 无脚本、减少动态效果、字体失败 3/3 通过 |
| BUNDLE | `node tests/acceptance/assets.mjs --evidence-root ../runs/validation` | 通过；首次编码资源最大约 160 KiB（准确字节数见 browser.json）；独立 JS 文件 gzip 合计 0 bytes，菜单增强脚本内联于 HTML |

验收测试文件与控制器修正后的保护快照逐项 SHA-256 相符，开发没有修改保护文件。保护构建入口修正属于控制器的独立前序提交。

实际浏览器报告位于仓库外 `../runs/validation/browser.json`、`fallbacks/fallbacks.json`。各视口的 `*-hero.png` 与 `*-full.png` 为真实本地 Chrome 截图。外部请求、资源 404、页面运行错误与横向溢出均由原保护检查验证。

## 雕塑完整显示与视觉复核

运行 owner 指定、未修改的 `../runs/design/check-hero-containment-v1.mjs`，使用现有 `127.0.0.1:4321` 预览。11 个窗口各检查 0/1440/2880/4320/5759ms 五个动效相位：320×740、390×844、430×932、768×1024、1024×768、1366×768、1440×800、1920×900、1920×1080、2087×1235、2560×1440，全部通过。结果与静态 HTML hash 位于 `../runs/validation/hero-containment-v1/results.json`。

另以只读 Playwright 几何检查复核上述 11 个窗口及 360×640、390×667、768×600、1024×600、1366×600、1920×600，共 17 个窗口、各五相位：图片矩形完整位于视口及 hero 内；与主标题、说明、入口均不重叠；`sizes` 数学表达式与实际 CSS 显示宽度误差小于 1px。该补充命令未替代或修改任何保护检查。

已实际查看最终手机 / 桌面全页截图，以及 320、390、768、1440、1920×900、2087×1235、2560×1440 首屏截图，与确认的 v3 桌面及手机画板比较。保留无衬线超大标题、原品牌形状与雕塑色彩、象牙白业务 / 合作段落、六组 24 项服务和连续深色关于 / 联系 / 页尾。根据 owner 后续恢复要求，原先有裁切的雕塑改为完整包含于布局，宽屏不再随视口宽度无限放大，矮窗口按可用高度缩小，文本保持稳定。

## 交付边界

本地源码候选与维护文档已准备。远程 Actions 工作流未执行，未 push、部署、修改源码可见性或购买服务。真实 iOS / Android 微信设备、外网访问和线上性能尚未验证；LCP / INP / CLS 仍为目标。提交及本记录只提供技术证据，独立复核与最终人工验收分别进行。
