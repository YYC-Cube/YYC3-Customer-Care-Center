# YYC3-CCC 文档映射目录

---

@file: YYC3-CCC-文档映射目录.md
@description: YYC³ CCC 全域文档架构与文件索引（唯一权威导航）
@author: YYC³ Team
@version: v3.0.0
@created: 2026-01-22
@updated: 2026-11-18
@status: published
@tags: [文档管理, 映射目录, 架构规范]

---

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_
> **_Words Initiate Quadrants, Language Serves as Core for the Future_**
> _万象归元于云枢 | 深栈智启新纪元_
> **_All things converge in cloud pivot; Deep stacks ignite a new era of intelligence_**

---

## 一、架构总览

```
YYC3-Customer-Care-Center/
├── README.md                       # 仓库入口（GitHub 必需，保留根目录）
├── LICENSE                         # 授权协议（保留根目录）
├── .github/
│   ├── CODE_OF_CONDUCT.md          # 社区准则（GitHub 标准探测位）
│   ├── CONTRIBUTING.md             # 贡献指南
│   ├── SECURITY.md                 # 安全策略
│   └── workflows/                  # CI/CD 流水线
└── docs/
    ├── YYC3-CCC-项目总览/           # 010
    ├── YYC3-CCC-需求规划/           # 001–007
    ├── YYC3-CCC-项目规划/           # 011–016
    ├── YYC3-CCC-架构设计/           # 021–031
    ├── YYC3-CCC-详细设计/           # 036–055
    ├── YYC3-CCC-API文档/            # 056–073
    ├── YYC3-CCC-类型定义/           # 074–080
    ├── YYC3-CCC-测试文档/           # 081–089
    ├── YYC3-CCC-部署运维/           # 090–099 + 107–110
    ├── YYC3-CCC-用户手册/           # 100–105
    ├── YYC3-CCC-审核报告/           # 专项报告（无编号）
    ├── YYC3-CCC-文档治理/           # 本目录
    └── YYC3-CCC-脚本工具/           # 文档生成脚本
```

**根目录洁净规则**：除 `README.md` 与 `LICENSE` 外，任何文档不得存放于仓库根目录。
GitHub 社区健康文件（行为准则 / 贡献指南 / 安全策略）统一置于 `.github/`，仍可被平台自动识别。

---

## 二、命名与编号规范

### 2.1 文件命名

```
{3位序号}-YYC3-CCC-{分类}-{描述}.md
```

| 要素 | 规则 | 示例 |
| ---- | ---- | ---- |
| 序号 | 3 位数字，**全局唯一**，001–999 | `055` |
| 项目标识 | 固定 `YYC3-CCC` | `YYC3-CCC` |
| 分类 | 与所属目录名一致 | `详细设计` |
| 描述 | 中文，可含二级子类 | `UI-UX设计规范` |

**专项报告例外**：审核报告目录下的无编号文件采用 `YYC3-{主题}-{描述}.md`，如 `YYC3-全域UI深度一致性审核报告.md`。

### 2.2 目录命名

```
YYC3-CCC-{分类}
```

分类取值：项目总览 / 需求规划 / 项目规划 / 架构设计 / 详细设计 / API文档 / 类型定义 / 测试文档 / 部署运维 / 用户手册 / 审核报告 / 文档治理 / 脚本工具。

### 2.3 编号分配现状

| 区间 | 归属 | 已用 |
| ---- | ---- | ---- |
| 001–007 | 需求规划 | 7 |
| 008–010 | 项目总览 | 1（`010`） |
| 011–016 | 项目规划 | 6 |
| 017–020 | 空闲 | 0 |
| 021–031 | 架构设计 | 11 |
| 032–035 | 空闲 | 0 |
| 036–055 | 详细设计 | 20 |
| 056–073 | API 文档 | 18 |
| 074–080 | 类型定义 | 7 |
| 081–089 | 测试文档 | 9 |
| 090–099 | 部署运维 | 10 |
| 100–105 | 用户手册 | 6 |
| 106 | 空闲 | 0 |
| 107–110 | 部署运维（本轮迁入） | 4 |
| 111+ | 空闲 | 0 |

> 下一份新文档应使用 **`111`** 起顺延；`008`、`009`、`017`、`032`、`106` 为预留空位。

---

## 三、分类映射表

> 文件数口径：**不含各目录 README.md，含 .tsx 页面级文档组件**。

| # | 目录 | 文件数 | 职责 | 入口文档 |
| ---- | ---- | ---- | ---- | ---- |
| 1 | `YYC3-CCC-项目总览` | 1 | 项目定位、愿景、能力边界 | `010-系统简介` |
| 2 | `YYC3-CCC-需求规划` | 7 | 章程、可行性、需求与变更 | `003-项目需求说明书` |
| 3 | `YYC3-CCC-项目规划` | 6 | 进度、资源、风险、沟通 | `011-项目管理计划` |
| 4 | `YYC3-CCC-架构设计` | 12 | 系统/数据/安全/部署架构 | `021-系统架构设计文档` |
| 5 | `YYC3-CCC-详细设计` | 24 | UI-UX、组件、令牌、接口实现 | `037-UI-UX设计规范`、`055-设计令牌开发者规范` |
| 6 | `YYC3-CCC-API文档` | 19 | 接口规范、业务域、第三方 | `056-RESTful接口设计标准` |
| 7 | `YYC3-CCC-类型定义` | 7 | 全局类型、Props、业务字典 | `074-TypeScript全局类型声明` |
| 8 | `YYC3-CCC-测试文档` | 10 | 单测/集成/E2E/性能/安全 | `081-单元测试规范` |
| 9 | `YYC3-CCC-部署运维` | 14 | 部署、环境、监控、安全加固 | `090-部署方案文档`、`108-CICD完整指南` |
| 10 | `YYC3-CCC-用户手册` | 6 | 快速开始、功能、FAQ | `100-快速开始指南` |
| 11 | `YYC3-CCC-审核报告` | 7 | 标准化/UI/文档/系统分析报告 | `YYC3-全域UI深度一致性审核报告` |
| 12 | `YYC3-CCC-文档治理` | 3 | 映射目录、同步机制、文档审查 | 本文件 |
| 13 | `YYC3-CCC-脚本工具` | 2 | 文档闭环生成器 | `YYC3-CCC-文档闭环生成器.py` |

---

## 四、全量文件索引

### 4.1 `YYC3-CCC-项目总览`（1）

```
010-YYC3-CCC-项目总览-系统简介.md
```

### 4.2 `YYC3-CCC-需求规划`（7）

```
001-YYC3-CCC-需求规划-项目章程.md
002-YYC3-CCC-需求规划-可行性分析报告.md
003-YYC3-CCC-需求规划-项目需求说明书.md
004-YYC3-CCC-需求规划-利益相关者分析.md
005-YYC3-CCC-需求规划-AI功能需求设计.md
006-YYC3-CCC-需求规划-需求变更管理计划.md
007-YYC3-CCC-需求规划-预留文档位01.md
```

### 4.3 `YYC3-CCC-项目规划`（6）

```
011-YYC3-CCC-项目规划-项目管理计划.md
012-YYC3-CCC-项目规划-项目进度计划.md
013-YYC3-CCC-项目规划-资源分配计划.md
014-YYC3-CCC-项目规划-风险管理计划.md
015-YYC3-CCC-项目规划-沟通管理计划.md
016-YYC3-CCC-项目规划-预留文档位01.md
```

### 4.4 `YYC3-CCC-架构设计`（12）

```
021-YYC3-CCC-架构设计-系统架构设计文档.md
022-YYC3-CCC-架构设计-数据架构设计文档.md
023-YYC3-CCC-架构设计-技术选型报告.md
024-YYC3-CCC-架构设计-组件架构设计文档.md
025-YYC3-CCC-架构设计-安全架构设计文档.md
026-YYC3-CCC-架构设计-国际化架构设计文档.md
027-YYC3-CCC-架构设计-动画交互架构设计文档.md
028-YYC3-CCC-架构设计-性能优化架构文档.md
029-YYC3-CCC-架构设计-响应式架构设计文档.md
030-YYC3-CCC-架构设计-部署架构设计文档.md
031-YYC3-CCC-架构设计-预留文档位01.md
data-stack-documentation.tsx
```

### 4.5 `YYC3-CCC-详细设计`（24）

```
036-YYC3-CCC-详细设计-模块详细设计文档.md
037-YYC3-CCC-详细设计-UI-UX设计规范.md
038-YYC3-CCC-详细设计-交互流程图.md
039-YYC3-CCC-详细设计-界面原型文档.md
040-YYC3-CCC-详细设计-技术实现方案.md
041-YYC3-CCC-详细设计-组件设计文档.md
042-YYC3-CCC-详细设计-动画效果设计文档.md
043-YYC3-CCC-详细设计-国际化实现文档.md
044-YYC3-CCC-详细设计-响应式适配文档.md
045-YYC3-CCC-详细设计-性能优化方案.md
046-YYC3-CCC-详细设计-通用组件封装文档.md
047-YYC3-CCC-详细设计-业务逻辑实现.md
048-YYC3-CCC-详细设计-数据校验规则.md
049-YYC3-CCC-详细设计-异常处理规范.md
050-YYC3-CCC-详细设计-权限控制实现.md
051-YYC3-CCC-详细设计-第三方集成文档.md
052-YYC3-CCC-详细设计-SEO优化方案.md
053-YYC3-CCC-详细设计-PWA实现方案.md
054-YYC3-CCC-详细设计-预留文档位01.md
055-YYC3-CCC-详细设计-设计令牌开发者规范.md
navigation-analysis-report.tsx
optimization-report.tsx
system-analysis-report.tsx
user-experience-enhancement-report.tsx
```

### 4.6 `YYC3-CCC-API文档`（19）

```
056-YYC3-CCC-API文档-通用规范-RESTful接口设计标准.md
057-YYC3-CCC-API文档-通用规范-接口错误码体系.md
058-YYC3-CCC-API文档-通用规范-接口签名鉴权手册.md
059-YYC3-CCC-API文档-业务域-首页接口手册.md
060-YYC3-CCC-API文档-业务域-服务接口手册.md
061-YYC3-CCC-API文档-业务域-定价接口手册.md
062-YYC3-CCC-API文档-业务域-联系接口手册.md
063-YYC3-CCC-API文档-业务域-测试接口手册.md
064-YYC3-CCC-API文档-业务域-流程接口手册.md
065-YYC3-CCC-API文档-技术类型-国际化接口.md
066-YYC3-CCC-API文档-技术类型-动画接口.md
067-YYC3-CCC-API文档-技术类型-3D场景接口.md
068-YYC3-CCC-API文档-技术类型-文件服务接口.md
069-YYC3-CCC-API文档-第三方-Spline集成接口.md
070-YYC3-CCC-API文档-第三方-分析服务接口.md
071-YYC3-CCC-API文档-版本管理-接口迭代变更记录.md
072-YYC3-CCC-API文档-测试用例-接口自动化测试脚本.md
073-YYC3-CCC-API文档-预留文档位01.md
api-documentation.tsx
```

### 4.7 `YYC3-CCC-类型定义`（7）

```
074-YYC3-CCC-类型定义-前端-TypeScript全局类型声明.md
075-YYC3-CCC-类型定义-前端-组件Props类型约束.md
076-YYC3-CCC-类型定义-前端-请求响应数据类型.md
077-YYC3-CCC-类型定义-业务模块-用户类型字典.md
078-YYC3-CCC-类型定义-业务模块-服务类型约束.md
079-YYC3-CCC-类型定义-业务模块-定价类型字典.md
080-YYC3-CCC-类型定义-预留文档位01.md
```

### 4.8 `YYC3-CCC-测试文档`（10）

```
081-YYC3-CCC-测试文档-单元测试规范.md
082-YYC3-CCC-测试文档-集成测试规范.md
083-YYC3-CCC-测试文档-E2E测试规范.md
084-YYC3-CCC-测试文档-性能测试方案.md
085-YYC3-CCC-测试文档-安全测试方案.md
086-YYC3-CCC-测试文档-兼容性测试方案.md
087-YYC3-CCC-测试文档-测试用例管理.md
088-YYC3-CCC-测试文档-测试数据管理.md
089-YYC3-CCC-测试文档-预留文档位01.md
system-completeness-analysis.tsx
```

### 4.9 `YYC3-CCC-部署运维`（14）

```
090-YYC3-CCC-部署运维-部署方案文档.md
091-YYC3-CCC-部署运维-CICD配置文档.md
092-YYC3-CCC-部署运维-环境配置文档.md
093-YYC3-CCC-部署运维-监控告警文档.md
094-YYC3-CCC-部署运维-日志管理文档.md
095-YYC3-CCC-部署运维-备份恢复文档.md
096-YYC3-CCC-部署运维-性能优化文档.md
097-YYC3-CCC-部署运维-安全加固文档.md
098-YYC3-CCC-部署运维-故障处理文档.md
099-YYC3-CCC-部署运维-预留文档位01.md
107-YYC3-CCC-部署运维-IP访问控制指南.md
108-YYC3-CCC-部署运维-CICD完整指南.md
109-YYC3-CCC-部署运维-安装部署指南.md
110-YYC3-CCC-部署运维-Sentry监控集成指南.md
```

### 4.10 `YYC3-CCC-用户手册`（6）

```
100-YYC3-CCC-用户手册-快速开始指南.md
101-YYC3-CCC-用户手册-功能使用手册.md
102-YYC3-CCC-用户手册-配置说明文档.md
103-YYC3-CCC-用户手册-常见问题解答.md
104-YYC3-CCC-用户手册-故障排除指南.md
105-YYC3-CCC-用户手册-预留文档位01.md
```

### 4.11 `YYC3-CCC-审核报告`（7）

```
YYC3-CCC-项目标准化审核报告.md
YYC3-CCC-标准化审核清单.md
YYC3-CCC-审核报告-UI布局修复记录.md
YYC3-全域UI深度一致性审核报告.md
system-analysis-report.tsx
system-completeness-analysis.tsx
data-stack-documentation.tsx
```

### 4.12 `YYC3-CCC-文档治理`（3）

```
YYC3-CCC-文档映射目录.md      ← 本文件
YYC3-CCC-文档同步机制.md
YYC3-CCC-文档审查报告.md
```

### 4.13 `YYC3-CCC-脚本工具`（2）

```
YYC3-CCC-文档闭环生成器.py
YYC3-CCC.py
```

---

## 五、角色导航

| 角色 | 推荐阅读顺序 |
| ---- | ---- |
| 新成员入职 | `010-系统简介` → `001-项目章程` → `100-快速开始指南` → `021-系统架构设计` |
| 前端开发 | `037-UI-UX设计规范` → `055-设计令牌开发者规范` → `041-组件设计文档` → `046-通用组件封装` |
| 后端开发 | `021-系统架构设计` → `056-RESTful接口设计标准` → `057-错误码体系` → `074-全局类型声明` |
| 测试 | `081-单元测试规范` → `082-集成测试规范` → `087-测试用例管理` |
| 运维 | `090-部署方案` → `108-CICD完整指南` → `093-监控告警` → `097-安全加固` → `107-IP访问控制` |
| 质量/审核 | `YYC3-CCC-项目标准化审核报告` → `YYC3-全域UI深度一致性审核报告` → 本文件 |

---

## 六、本轮架构调整记录（2026-11-18）

### 6.1 根目录清理

| 原路径 | 新路径 | 说明 |
| ---- | ---- | ---- |
| `UI-LAYOUT-FIX-SUMMARY.md` | `docs/YYC3-CCC-审核报告/YYC3-CCC-审核报告-UI布局修复记录.md` | 修复记录归档，原文含失效绝对路径已随重构失效 |
| `CODE_OF_CONDUCT.md` | `.github/CODE_OF_CONDUCT.md` | GitHub 社区文件标准位 |
| `CONTRIBUTING.md` | `.github/CONTRIBUTING.md` | 同上 |
| `SECURITY.md` | `.github/SECURITY.md` | 同上 |

### 6.2 docs/ 根目录清理

| 原路径 | 新路径 |
| ---- | ---- |
| `docs/YYC3-CCC-系统简介.md` | `docs/YYC3-CCC-项目总览/010-YYC3-CCC-项目总览-系统简介.md` |
| `docs/YYC3-CCC-CICD-GUIDE.md` | `docs/YYC3-CCC-部署运维/108-YYC3-CCC-部署运维-CICD完整指南.md` |
| `docs/YYC3-CCC-安装指南.md` | `docs/YYC3-CCC-部署运维/109-YYC3-CCC-部署运维-安装部署指南.md` |
| `docs/YYC3-CCC-IP访问控制指南.md` | `docs/YYC3-CCC-部署运维/107-YYC3-CCC-部署运维-IP访问控制指南.md` |
| `docs/YYC3-CCC-Sentry-集成指南.md` | `docs/YYC3-CCC-部署运维/110-YYC3-CCC-部署运维-Sentry监控集成指南.md` |
| `docs/YYC3-CCC-文档映射目录.md` | `docs/YYC3-CCC-文档治理/`（同层） |
| `docs/YYC3-CCC-文档同步机制.md` | `docs/YYC3-CCC-文档治理/`（同层） |
| `docs/YYC3-CCC-文档审查报告.md` | `docs/YYC3-CCC-文档治理/`（同层） |
| `docs/YYC3-CCC-标准化审核清单.md` | `docs/YYC3-CCC-审核报告/`（同层） |
| `docs/system-analysis-report.tsx` | `docs/YYC3-CCC-审核报告/`（同层） |
| `docs/system-completeness-analysis.tsx` | `docs/YYC3-CCC-审核报告/`（同层） |
| `docs/data-stack-documentation.tsx` | `docs/YYC3-CCC-审核报告/`（同层） |

### 6.3 编号冲突修正

| 文件 | 原编号 | 新编号 | 冲突对象 |
| ---- | ---- | ---- | ---- |
| IP访问控制指南 | 089 | **107** | `089-测试文档-预留文档位01` |
| CICD完整指南 | 100 | **108** | `100-用户手册-快速开始指南` |
| 安装部署指南 | 101 | **109** | `101-用户手册-功能使用手册` |
| Sentry监控集成指南 | 106 | **110** | 保持唯一（106 空置） |

### 6.4 冗余判定

| 疑似重复 | 判定 | 依据 |
| ---- | ---- | ---- |
| `091-CICD配置文档` vs `108-CICD完整指南` | **非冗余** | 前者为配置项索引（80 行），后者为完整流程指南（524 行），互补 |
| `093-监控告警文档` vs `110-Sentry监控集成指南` | **非冗余** | 前者为监控体系设计，后者为 Sentry 落地配置 |
| `097-安全加固文档` vs `107-IP访问控制指南` | **非冗余** | 前者为安全基线，后者为 CIDR 访问控制实现 |
| 全库 md5 比对 | **无完全重复文件** | `find docs -name '*.md' -exec md5 -q {} \; \| sort \| uniq -d` 为空 |

---

## 七、维护规程

### 7.1 新增文档流程

1. 在「二、编号分配现状」中领取下一个空号；
2. 放入对应分类目录，文件名遵循 `{序号}-YYC3-CCC-{分类}-{描述}.md`；
3. 在「四、全量文件索引」对应小节追加文件名；
4. 更新 `@updated` 与本文档版本号；
5. 执行 7.2 校验。

### 7.2 校验命令

```bash
# 编号全局唯一
ls docs/*/ | grep -oE '^[0-9]{3}' | sort | uniq -d

# 根目录无散落文档（仅允许 README.md / LICENSE）
ls -1 *.md *.txt 2>/dev/null | grep -v '^README.md$'

# 文档无完全重复
find docs -name '*.md' -exec md5 -q {} \; | sort | uniq -d

# 失效相对链接（需 markdown-link-check）
npx markdown-link-check docs/**/*.md --quiet
```

### 7.3 约束

- 禁止在 `docs/` 根目录新增文件，必须归入分类目录；
- 禁止复用已占用的 3 位编号；
- 禁止将含密钥的 `.env*` 文件纳入版本控制（见 `.gitignore`）；
- 审核报告类专项文档可不带编号，但须以 `YYC3-` 前缀开头。

---

**最后更新**：2026-11-18
**维护者**：YYC³ Team

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <i>Words Initiate Quadrants, Language Serves as Core for the Future</i><br>
  万象归元于云枢 | 深栈智启新纪元<br>
  <i>All things converge in cloud pivot; Deep stacks ignite a new era of intelligence</i><br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
