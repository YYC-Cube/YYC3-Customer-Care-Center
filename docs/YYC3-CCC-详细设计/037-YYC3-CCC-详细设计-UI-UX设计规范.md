---
@file: 037-YYC3-CCC-详细设计-UI-UX设计规范.md
@description: YYC3-CCC 前端界面设计、交互逻辑、视觉规范的统一标准，保障用户体验一致
@author: YYC³ Team
@version: v1.0.0
@created: 2026-01-23
@updated: 2026-01-23
@status: published
@tags: [详细设计],[UI设计],[UX规范]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 037-YYC3-CCC-详细设计 UI-UX设计规范

## 概述

本文档详细描述YYC3-CCC-详细设计-UI-UX设计规范相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC³ Customer Care Center（YYC3-CCC）项目是一个基于「五高五标五化」理念的现代化AI代理服务落地页，采用Next.js 14+构建，集成了国际化系统、3D场景交互、动画效果和响应式设计。

#### 1.2 文档目标
- 规范UI-UX设计规范相关的业务标准与技术落地要求
- 为项目相关人员提供清晰的参考依据
- 保障相关模块开发、实施、运维的一致性与规范性

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保系统7x24小时稳定运行
- **高性能**：优化加载速度和交互响应
- **高安全性**：保护用户数据和隐私安全
- **高扩展性**：支持业务快速扩展
- **高可维护性**：便于后续维护和升级

#### 2.2 五标体系
- **标准化**：统一的技术和流程标准
- **规范化**：严格的开发和管理规范
- **自动化**：提高开发效率和质量
- **智能化**：利用AI技术提升能力
- **可视化**：直观的监控和管理界面

#### 2.3 五化架构
- **流程化**：标准化的开发流程
- **文档化**：完善的文档体系
- **工具化**：高效的开发工具链
- **数字化**：数据驱动的决策
- **生态化**：开放的生态系统

### 3. 技术栈

> 版本以 `package.json` 为准（2026-11-18 对齐）。

- Next.js 16.4.6（Turbopack 默认构建，Proxy 取代 Middleware）
- React 19.3.1 / React DOM 19.3.1
- TypeScript 5.9.3
- Tailwind CSS 3.4.19 + tailwindcss-animate 1.0.7
- shadcn/ui + Radix UI（React 19 兼容版本）
- Framer Motion 12.43.0
- Recharts 2.15.4 / lucide-react 0.577.0
- Sentry 11.14.0
- ESLint 9.39.5（flat config）+ Vitest 4.0.18

### 4. UI-UX设计规范

#### 4.1 权威基准（强制）

本项目的色值、字体、圆角、阴影、间距、描边、动效与组件参数，**唯一基准**为
[`lib/design-tokens.ts`](../../lib/design-tokens.ts)，使用方式见
[055-设计令牌开发者规范](./055-YYC3-CCC-详细设计-设计令牌开发者规范.md)。

任何与本文件描述冲突的实现，以 `lib/design-tokens.ts` 为准。

#### 4.2 颜色

| 分类 | 令牌 | HEX |
| ---- | ---- | ---- |
| 品牌主色 | `color.brand.primary` | `#0EA5E9`（hover `#0284C7` / active `#0369A1`） |
| 品牌次色 | `color.brand.secondary` | `#3B82F6` |
| 成功 | `color.semantic.success` | `#10B981` |
| 警告 | `color.semantic.warning` | `#F59E0B` |
| 危险 | `color.semantic.danger` | `#EF4444` |
| 表面 | `color.surface` | `#FFFFFF` / 前景 `#0F172A` / 描边 `#E2E8F0` |

功能色阶共 6 条（neutral / primary / success / warning / danger / accent），每档 50–950。
调色板旧族名（`gray`/`blue`/`green`/`red` 等）仅作为兼容别名存在，**禁止新增使用**。

#### 4.3 排版

`Inter` 字族；层级为 display `700/36/44`、h1 `700/30/36`、h2 `600/24/32`、
h3 `600/20/28`、h4 `600/16/24`、body `400/14/22`、caption `400/12/16`。

#### 4.4 形状与层次

圆角 `6/8/12/16/24px`；阴影四级（`shadow.sm/md/lg/xl`，基色 `rgba(15,23,42)`）；
描边 `1px #E2E8F0`，焦点环 `3px #0EA5E9`；间距按 4px 栅格。

#### 4.5 交互状态

所有可交互元素必须覆盖 `hover / active / focus-visible / disabled / loading`，
数据区域必须覆盖 `empty / error`。危险色与成功色禁止互相替代。

#### 4.6 审核结论

见 [YYC³ 全域UI深度一致性审核报告](../YYC3-CCC-审核报告/YYC3-全域UI深度一致性审核报告.md)：
96 项审核全部合规（100%）。

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
