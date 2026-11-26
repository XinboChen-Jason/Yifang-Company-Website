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
    { label: '团队介绍', id: 'team' },
    { label: '关于易方', id: 'about' },
    { label: '联系信息', id: 'contact' },
  ],
  hero: { lines: ['把复杂，', '做对。'], intro: ['我们为每一家企业重新梳理业务，', '再把它建成可运行的系统。'], cta: '了解业务能力' },
  capabilitiesHeading: ['从业务问题，', '到系统能力。'],
  capabilitiesIntro: ['围绕企业的实际工作方式，', '连接规划、体验、软件与 AI，', '让每一项能力服务于可运行的系统。'],
  approachHeading: '从问题，到可运行的系统',
  approachIntro: '不先给方案，先给判断。先看清系统能否在你的企业跑起来，再一起决定从哪里开始、如何推进。',
  approach: [
    {
      title: '拆问题', lines: ['进入真实业务场景，', '理解流程、输入与输出。'],
      principles: [
        { title: '轻量切入，不绑架客户', description: '先打通一个真实痛点，见效后再扩展。你始终掌握推进节奏，控制投入与风险。' },
        { title: '先数据化，后智能化', description: '先跑通流程、沉淀数据，再引入智能化能力，让每一步建设都有扎实的业务基础。' },
      ],
    },
    {
      title: '建结构', lines: ['明确数据模型、系统边界，', '以及软件与人的分工。'],
      principles: [
        { title: '自研 AI 工厂，重构交付成本', description: '通过自研 AI 交付中台，降低定制投入，让数字化与智能化的回报更清晰。' },
        { title: '合规自律，长期可信', description: '坚持全流程可追溯、不夸大、不编造，严守平台与行业规范，让长期合作经得起检验。' },
      ],
    },
    {
      title: '交付并运行', lines: ['把系统接入实际工作，', '让它可使用、可维护、可交接。'],
      principles: [
        { title: '交付闭环，而非软件堆砌', description: '以真正跑起来的业务结果为目标，衔接系统实施、使用与交接，减少学习工具和组建 IT 团队的负担。' },
        { title: '极简运维，资产持续在线', description: '把内容更新与系统维护纳入交付，让资料持续流转、数字资产长期在线。复杂的维护工作，由我们承接。' },
      ],
    },
  ],
  team: {
    heading: ['以工程深度，', '支撑业务落地。'],
    intro: '从大型软件系统、工业级 AI 研发，到智能设备的现场交付，团队积累了跨越软件、算法与硬件工程的实践经验。我们将复杂系统中的架构能力、工程判断与交付经验，带入企业的真实业务，让技术方案具备可靠运行、持续演进的基础。',
    members: [
      {
        name: '陈欣博', position: '创始人', role: '软件与 AI 研发负责人', english: 'SOFTWARE & AI',
        biography: [
          '曾于爱立信（Ericsson）担任云无线接入网（Cloud RAN）5G 基带调度算法研发项目负责人，参与下一代云原生基带调度及 AI 原生基带调度解决方案的架构设计。',
          '在大规模、高可靠工业级 AI 系统研发方面具备深厚积累。大学期间有连续创业经历，在商业化落地方面积累了实践经验。',
          '主张将工程上的取舍判断置于真实商业场景中考量，推动具备商业可行性的先进技术真正落地。',
        ],
      },
      {
        name: '王晨晖', position: '联合创始人', role: '硬件与交付负责人', english: 'HARDWARE & DELIVERY',
        biography: [
          '曾任职于神州高铁，负责智能监测设备的工程交付，主导相关系统从方案设计到现场运行的实施。具备硬件与电气设备研发背景，熟悉从原理设计到产线落地的完整技术链路。',
          '职业经历横跨教育、互联网平台运营与智能制造等领域，兼具技术实现能力与对业务及用户需求的理解。',
          '能够将客户的实际问题转化为可实施的交付方案，连接技术设计与产业现场。',
        ],
      },
    ],
  },
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
