# 已发布预览的维护方式

网站源码位于 `website-source` 分支；GitHub Pages 使用 `main` 分支根目录的预先构建产物。`main` 同时保留对应源码快照，发布不会上传项目私有资料。

更新时从本地项目的 `product/src/data/site.ts` 修改文案，完成构建、内容、浏览器、资源预算和独立复核后，通过 Codex 发布与该版本逐项匹配的静态产物。不要只在 `main` 编辑生成的 `index.html` 或 `_astro/`；应修改源码再构建。

`preview-manifest.json` 记录已审查本地源码提交、相同的 Git tree 及公开资源 SHA-256。由于使用 GitHub 连接器导入，远端导入提交的元数据可能不同；发布前会逐个核对 blob 与完整 tree。

`.nojekyll` 保证根目录静态文件直接交付，保留 `_astro` 资源。后续若改用仓库中准备好的手动 Actions 工作流，应同时把 Pages Source 改为 GitHub Actions，并再次确认所选分支与已复核版本。

这是预览交付；后续 iOS / Android 微信真机验证和负责人最终验收分别进行。回退使用既有已验证版本生成新的发布提交，保留历史。
