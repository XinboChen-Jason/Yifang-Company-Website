# Third-party notices and asset provenance

本仓库发布给访客的字体、SVG 与图像均由本站提供。无运行时 CDN、在线字体、分析或嵌入服务。下列开发依赖不等于访客脚本依赖，完整传递依赖和 npm integrity 固定在 `package-lock.json`，安装包自身保留各自授权。

| 直接依赖 | 固定版本 | 授权与用途 |
| --- | --- | --- |
| [Astro](https://github.com/withastro/astro) | 7.4.7 | MIT；静态 HTML 与响应式图片构建 |
| [@astrojs/check](https://github.com/withastro/language-tools) | 0.9.10 | MIT；类型与模板检查 |
| [TypeScript](https://github.com/microsoft/TypeScript) | 5.9.3 | Apache-2.0；开发期类型检查 |
| [playwright-core](https://github.com/microsoft/playwright) | 1.64.1 | Apache-2.0；本地现有 Chrome 验证，无浏览器下载 |
| [subset-font](https://github.com/papandreou/subset-font) | 2.4.0 | BSD-3-Clause；本机字体裁剪，HarfBuzz WASM / WOFF2 工具链见 lockfile |

## 本地字体

- **Noto Sans SC**：Copyright 2014–2021 Adobe，SIL Open Font License 1.1，保留名称 Source。来源为 [google/fonts 固定提交](https://github.com/google/fonts/tree/2894aab31764f10f29c421bdfd2340d3b382d384/ofl/notosanssc)。完整授权在 `public/fonts/noto-sans-sc-subset-OFL.txt`。
- **Inter**：Copyright 2020 The Inter Project Authors，SIL Open Font License 1.1。来源为 [google/fonts 固定提交](https://github.com/google/fonts/tree/e1d6480102fed30739fead0faee463101f892c8f/ofl/inter)。完整授权在 `public/fonts/inter-subset-OFL.txt`。

二者使用 `docs/subset-fonts.mjs` 在本机生成 WOFF2 文本子集，保留授权与名称记录，字重裁剪为 400–700；Inter 光学尺寸固定为 14。原始 Git blob、下载 URL、原始 SHA-256、子集 SHA-256、字符集及授权文件 hash 位于 `docs/font-assets.json`。未向字体提供商发送本地文字。子集在 OFL 下分发；新增文字需重新裁剪。授权文本仅移除行尾空格并归一化 LF，完整版权与条款保留，来源与交付 hash 分别记录。系统字体仅作为设备已有回退，不随站点复制。

## 品牌、雕塑与图标

`public/brand/` 的五个 SVG 来自 owner 确认且单独列明的品牌输入，保留原始 SVG 路径、viewBox、文字与颜色，仅按仓库既有规则将行尾归一化为 LF；来源与交付 hash 对照在 `docs/brand-assets.json`。品牌使用范围为本官网，未引入整套私有素材包，也未声称其为第三方开源标志。SVG 内的文字有系统字体回退。

`src/assets/spatial-sculpture.png` 是确认的原创 AI 生成抽象空间雕塑，SHA-256：`29f1712874cda3bb2d8e821a2ad2be27d408f373975e98501a9512ccdd2a9de5`。它是视觉插画，不代表真实产品、客户案例或公司标志。构建仅生成响应式 AVIF/WebP，不改色或重画。未为本次实现再次调用生成服务。六个线条服务图标由本项目直接编写 SVG 几何路径，没有引入外部图标库。

## 手动工作流 action 来源

下列提交已通过各官方仓库的版本引用核对，工作流仅引用完整 40 字符提交。Action 的嵌套依赖由上游维护；本次未运行远程工作流。

| 官方 action | 版本 / 不可变提交 |
| --- | --- |
| [actions/checkout](https://github.com/actions/checkout/tree/11bd71901bbe5b1630ceea73d27597364c9af683) | v4.2.2 / `11bd71901bbe5b1630ceea73d27597364c9af683` |
| [actions/setup-node](https://github.com/actions/setup-node/tree/49933ea5288caeca8642d1e84afbd3f7d6820020) | v4.4.0 / `49933ea5288caeca8642d1e84afbd3f7d6820020` |
| [actions/upload-pages-artifact](https://github.com/actions/upload-pages-artifact/tree/56afc609e74202658d3ffba0e8f6dda462b719fa) | v3.0.1 / `56afc609e74202658d3ffba0e8f6dda462b719fa` |
| [actions/deploy-pages](https://github.com/actions/deploy-pages/tree/d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e) | v4.0.5 / `d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e` |

以上 actions 各自使用 MIT 授权，源码与授权随链接固定提交可查。Node 与操作系统 runner 由未来授权的运行环境提供。更换依赖、字体、action 或图片时需复核版本、授权和公开边界，更新此说明与对应 hash，并重新验证。
