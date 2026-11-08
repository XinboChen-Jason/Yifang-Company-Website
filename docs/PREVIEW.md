# 预览、发布准备与回退

## 本地预览

```powershell
npm ci --ignore-scripts --no-audit --no-fund
npm run verify:build
npm run preview -- --host 127.0.0.1 --port 4321
```

浏览器打开 `http://127.0.0.1:4321/Yifang-Company-Website/`。站点路径由 `astro.config.mjs` 固定；不要使用域名根路径代替真实子路径验证。停止本地服务用 Ctrl+C。此服务仅绑定回环地址，不构成公开托管。资源构建在 `dist/`，不提交生成目录。

保护验收脚本自行启动并关闭随机端口的本地 HTTP 服务；不会部署。所有截图和浏览器报告位于 `../runs/validation/`，手机截图代表视口模拟。请逐项核对与确认的 v3 桌面、手机画板的布局与色彩节奏。

## 手动 Pages 工作流

`.github/workflows/preview.yml` 仅有 `workflow_dispatch`，无 push 或 PR 自动发布。四个顶层 action 均固定到官方仓库的完整提交，版本及链接见第三方说明。`candidate_sha` 必须等于选定分支的完整已审查提交；输入以环境变量传递，不能作为任意 shell 命令执行。

默认 `publish_pages=false` 只构建和检查，上传保留一天的 Pages artifact，不部署。设为 true 后仍要求 `main` 分支，部署 job 使用 `github-pages` environment。仓库负责人应在未来首次运行前配置该 environment 的人工 reviewer 与分支限制；工作流文件无法自行建立人工审核规则。

本次交付不触发 Actions、不推送、不修改仓库或 Pages 设置。未来运行前由负责人确认：

- 当前私有仓库的 Pages 权益、访问范围、Actions 用量与费用，是否允许实际目标站点公开。不得为上线自动改仓库可见性或购买套餐。
- 公开文案与资源授权、全套受保护检查和独立复核均对应准确提交。
- 选定 `main` 的已复核 SHA，并明确本次为允许曝光的预览还是正式发布。Pages 是真实托管地址，不应被当成隔离草稿。

owner 或受授权维护者之后才可推送已复核候选、在 Actions 选择该 workflow 和分支、输入完整 SHA，并按单独批准决定 publish 开关。环境审批通过后才能部署。预期地址为 `https://xinbochen-jason.github.io/Yifang-Company-Website/`，当前尚未发布或验证该地址。配置内的 URL 不是部署证据。

## 发布后待办与回退

真实预览出现后，在 iOS 和 Android 微信分别检查打开、首屏、纵向滚动、菜单跳转、返回及字体加载；记录设备、系统、微信版本与实际问题。再由负责人确认上线或反馈。线上性能需实测，不能从本地资源预算推定。

保留每次允许发布的 SHA 和上一个已验证 SHA。回退由负责人选择已验证提交；可从该提交创建恢复候选，经相同检查和人工复核后走手动发布。不要强推历史，不更改验收标准，不自动触发付费操作。若尚未获准托管，回退只产生本地技术候选。
