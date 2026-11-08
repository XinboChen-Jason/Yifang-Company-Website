// Public, owner-confirmed website copy. Keep private source records outside this repo.
export const site = {
  brand: '易方 / MODUS',
  legalEntity: '深圳市易方化科技有限公司',
  title: '易方 / MODUS — 把复杂，做对。',
  slogan: '把复杂，做对。',
  englishSlogan: 'COMPLEXITY, DONE RIGHT.',
  description: '我们为每一家企业重新梳理业务，再把它建成可运行的系统。',
  positioning: '定制化软件 · AI 智能体 · 数字化与智能化解决方案',
  navigation: [
    { label: '业务能力', id: 'capabilities' },
    { label: '合作方式', id: 'approach' },
    { label: '关于易方', id: 'about' },
    { label: '联系信息', id: 'contact' },
  ],
  hero: { lines: ['把复杂，', '做对。'], intro: ['我们为每一家企业重新梳理业务，', '再把它建成可运行的系统。'], cta: '了解业务能力' },
  capabilitiesHeading: ['从业务问题，', '到系统能力。'],
  capabilitiesIntro: ['围绕企业的实际工作方式，', '连接规划、体验、软件与 AI，', '让每一项能力服务于可运行的系统。'],
  approachHeading: '从问题，到可运行的系统',
  approach: [
    { title: '拆问题', lines: ['进入真实业务场景，', '理解流程、输入与输出。'] },
    { title: '建结构', lines: ['明确数据模型、系统边界，', '以及软件与人的分工。'] },
    { title: '交付并运行', lines: ['把系统接入实际工作，', '让它可使用、可维护、可交接。'] },
  ],
  aboutHeading: '交付即结果',
  about: ['易方专注于定制化软件、AI 智能体，', '以及数字化与智能化解决方案。', '我们交付的是一套跑得起来的系统。'],
  contactPlaceholder: '联系方式即将更新',
} as const;
export const capabilities = [
  {
    "title": "业务梳理与规划",
    "english": "BUSINESS STRATEGY",
    "points": [
      "业务访谈与流程梳理",
      "需求拆解与优先级",
      "原型范围与实施路线",
      "验收口径与交付边界"
    ]
  },
  {
    "title": "产品与体验设计",
    "english": "PRODUCT & EXPERIENCE",
    "points": [
      "信息架构与任务流程",
      "界面与交互体验设计",
      "原型验证与可用性优化",
      "组件规范与设计系统"
    ]
  },
  {
    "title": "定制软件与平台",
    "english": "CUSTOM SOFTWARE",
    "points": [
      "企业网站与 Web 应用",
      "业务管理与协作系统",
      "权限与审批流程",
      "现有系统升级与改造"
    ]
  },
  {
    "title": "AI 与业务自动化",
    "english": "AI & AUTOMATION",
    "points": [
      "企业知识库与智能检索",
      "AI 助手与业务智能体",
      "文档处理与流程编排",
      "人工复核与权限边界"
    ]
  },
  {
    "title": "数据与系统连接",
    "english": "DATA & INTEGRATION",
    "points": [
      "数据结构与质量规则",
      "接口整合与系统连接",
      "数据清洗与迁移",
      "业务指标与可视化"
    ]
  },
  {
    "title": "工程交付与演进",
    "english": "DELIVERY & EVOLUTION",
    "points": [
      "技术架构与实现规划",
      "测试验证与验收支持",
      "部署、文档与操作交接",
      "持续迭代与性能优化"
    ]
  }
] as const;
