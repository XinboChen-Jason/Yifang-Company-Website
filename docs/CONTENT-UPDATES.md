# 文案与内容维护

由内容负责人给出具体修改，维护者使用 Codex 辅助低频编辑。所有公开文案集中在 `src/data/site.ts`；不需要 CMS、数据库或 API。首页布局在 `src/pages/index.astro`，样式在 `src/styles/global.css`。

1. 在干净工作区记录当前 `git rev-parse HEAD`，创建本地维护分支；先确认此次修改的公开使用权与范围。
2. 修改 `src/data/site.ts` 对应字段。六组业务及 24 项服务属于确认基线，语义变更应先由负责人确认；保护验收文件不得顺带修改。
3. 核对 `git diff`：个人信息须有负责人明确授权。2026-11-25 已确认的两位团队成员姓名、职务与履历集中在 `site.team.members`；联系方式继续占位。其他姓名、真实电话、邮箱、二维码、客户案例或未证实业绩不得顺带加入。不要将私有原始材料交给外部服务。
4. 新增文字后，在本机运行 `node docs/subset-fonts.mjs`。脚本仅下载固定公开字体 URL，在内存中裁剪，不发送页面内容；核对 `docs/font-assets.json` 和对应 WOFF2。源字体经固定 Git blob 校验，保留 OFL。字体请求不可替换为带网站文字的在线裁剪 URL。
5. 运行 README 的五项检查。检查 390px 与 1440px 截图，关注标题换行、雕塑裁切、服务项完整性、移动菜单、连续深色页尾；320px 也须无横向溢出。
6. 由另一位复核者检查差异、资源授权和验证证据。只提交已批准文件，保持工作区干净；提交不是内容验收或上线批准。
7. 按 `PREVIEW.md` 本地预览。未来公开前由负责人确认文字与曝光范围，并完成真实手机测试。

服务图标为项目内直接编写的 SVG 几何线条。品牌形状仅取自已确认文件，不能以重新绘制的近似标志替换。雕塑原 PNG 留在 `src/assets/`，构建自动转换，不把动画 GIF 或整套品牌包放入 `public/`。

字体与文案应一起提交。未来新增字符即使遗漏子集，也会回退系统字体，但视觉一致性需要重新裁剪和复核。不要随内容维护升级依赖、改发布触发器或添加第三方追踪；这些事项分别评审。

## 合作方式与团队介绍

`site.approach` 保留三步合作流程，每一步的 `principles` 承载对应方法论；更新时同时检查流程概述和原则，避免重新拆成重复的两套流程。`site.team` 包含团队引言和两位成员的姓名、职务、分工及分段履历，导航锚点为 `#team`。经历中的公司是成员曾任职单位，不代表客户或合作伙伴。

方法论和团队履历默认收起，通过“了解我们的方法论”和“了解我们的团队”展开。使用原生 `details/summary` 保留无脚本与键盘操作，JavaScript 按实际内容高度增强过渡；不能用固定最大高度裁掉手机内容。减少动态效果时直接切换。顶部导航采用 sticky 跟随，更新导航高度时同步检查桌面、移动菜单及无脚本模式的锚点避让距离。

本次内容范围修订已同步到验收契约：新增团队锚点，允许获批姓名仅出现在 TEAM；原有联系方式及其私有哈希检查继续保留。未来变更隐私范围时，先取得明确内容决定，再精确修订受影响的验收要求，不能为通过检查而删除隐私保护。

回退使用已记录的已验证提交：对后续错误修改创建可审查的 `git revert <commit>` 候选，再运行全部检查。勿强推或重写共享历史。公开环境回退仍需负责人按预览文档授权操作。

## 字体下载受限时

`docs/subset-fonts.mjs` 的默认下载有超时，不会把文字发送给字体源。如果 Node 无法访问固定源，可用本机 PowerShell 下载**相同的公开固定文件**，再运行本地模式：

若当前 Node 使用环境代理，可先运行 `node --use-env-proxy docs/subset-fonts.mjs`，仍须通过脚本内固定源校验。

```powershell
New-Item -ItemType Directory -Force docs/font-source
Invoke-WebRequest 'https://raw.githubusercontent.com/google/fonts/2894aab31764f10f29c421bdfd2340d3b382d384/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf' -OutFile docs/font-source/noto.ttf
Invoke-WebRequest 'https://raw.githubusercontent.com/google/fonts/e1d6480102fed30739fead0faee463101f892c8f/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf' -OutFile docs/font-source/inter.ttf
node docs/subset-fonts.mjs --local-source
```

本地模式同样校验固定源的 Git blob，复用 `public/fonts/` 已有的完整 OFL。临时 `docs/font-source/` 只供裁剪；成功后删除本次下载的两个文件及空目录，不提交完整字体。已有授权文件若丢失或有变更，先从 `docs/font-assets.json` 的固定授权 URL 恢复并核对 `license.sourceSha256`，再裁剪。

## 首屏尺寸调整

首屏使用双列 / 手机纵向布局。`src/styles/global.css` 中 `.hero-art` 的宽度同时受布局列宽和视口高度限制，四周保留旋转、位移空间；不能恢复负右偏移或单纯随宽度无限放大。若调整布局间距、最大宽度或分栏比例，必须同步更新 `src/pages/index.astro` 的 `Picture sizes`，并检查完整动效周期。使用 `svh` 避免手机浏览器地址栏伸缩改变首屏尺寸。

至少复核 320×740、390×844、768×1024、1366×768、1440×800、1920×900、1920×1080、2087×1235 和 2560×1440。验收时既看截图，也测量图片矩形全程是否处于 hero 和视口内；不要只用 `overflow: hidden` 隐藏超出部分。
