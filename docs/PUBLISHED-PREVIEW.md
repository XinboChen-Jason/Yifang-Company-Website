# 官网预览的维护与发布

当前 GitHub Pages Source 为 **GitHub Actions**，由 `Manual reviewed Pages preview` 工作流构建并发布 `dist/`。工作流仅手动触发，普通源码提交不会自动发布。

`website-source` 分支保留通过复核的源码；`main` 也包含对应源码及首次静态发布准备文件。线上实际版本以最近一次成功的 Pages 工作流部署为准。根目录的生成文件不应直接作为内容编辑入口。

更新时由 Codex 协助修改本地项目 `product/src/data/site.ts`，按 `docs/CONTENT-UPDATES.md` 完成字体子集检查、构建、内容检查、双端与宽屏检查和独立复核，再将已复核源码同步到候选分支。发布时在 Actions 选择工作流、分支 `main`，将完整候选 SHA 填入 `candidate_sha`，确认 `publish_pages=true`。SHA 必须等于所选分支的当前 HEAD；工作流会重新运行保护检查。

本次预览：
- 地址：https://xinbochen-jason.github.io/Yifang-Company-Website/
- 成功部署：https://github.com/XinboChen-Jason/Yifang-Company-Website/actions/runs/42499735328
- 部署提交：`a4eaa4e72f41aca74cf6641dc96051856a346645`
- 通过复核的本地源码：`245f69b0e4ce128291402b1ce4e7e19d092795f6`
- 与远端源码完全一致的 Git tree：`ab38e527955f4c9f391d8e5be6fa14154577f098`

本次使用 GitHub 连接器导入，所以远端源码提交元数据可能与本地不同；文件 blob 与完整 Git tree 均已逐项核对。`preview-manifest.json` 留在仓库中作初次静态发布准备的溯源记录；当前 Actions 只发布 `dist/`，该记录不属于访客页面。

原始公司资料、内部审批、执行记录及密钥不得进入产品仓库。真实 iOS / Android 微信设备验证和负责人最终验收仍分别进行。回退使用已验证版本生成新的候选及发布提交，保留历史。
