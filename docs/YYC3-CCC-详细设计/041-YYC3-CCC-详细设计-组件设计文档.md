---
@file: 041-YYC3-CCC-详细设计-组件设计文档.md
@description: YYC3-CCC 前端组件的详细设计，包含组件Props、状态管理、事件处理的规范
@author: YYC³ Team
@version: v1.0.0
@created: 2026-01-23
@updated: 2026-01-23
@status: published
@tags: [详细设计],[组件设计],[前端组件]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 041-YYC3-CCC-详细设计 组件设计文档

## 概述

本文档详细描述YYC3-CCC-详细设计-组件设计文档相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC³ Customer Care Center（YYC3-CCC）项目是一个基于「五高五标五化」理念的现代化AI代理服务落地页，采用Next.js 14+构建，集成了国际化系统、3D场景交互、动画效果和响应式设计。

#### 1.2 文档目标
- 规范组件设计文档相关的业务标准与技术落地要求
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

- Next.js 16.4.6（Turbopack）
- React 19.3.1
- TypeScript 5.9.3
- Tailwind CSS 3.4.19
- shadcn/ui + Radix UI
- Framer Motion 12.43.0
- Recharts 2.15.4
- Vitest 4.0.18

### 4. 组件设计文档

#### 4.1 令牌引用（强制）

组件的一切视觉参数必须来自
[`lib/design-tokens.ts`](../../lib/design-tokens.ts)，使用方式见
[055-设计令牌开发者规范](./055-YYC3-CCC-详细设计-设计令牌开发者规范.md)。

组件令牌清单：`component.button`、`component.enhancedButton`、`component.enhancedCard`、
`component.adaptiveSidebar`、`component.common`（card / input / dialog / badge / sidebar / header）。

#### 4.2 组件编写约束

1. 颜色：仅使用语义类名（`bg-primary`、`text-muted-foreground`、`border-border`）或在需要真实色值时引用 `colorRamp`；禁止调色板类名与内联 HEX。
2. 尺寸：高度、内边距、圆角、阴影取自令牌，禁止魔法数字。
3. 状态：`hover / active / focus-visible / disabled / loading` 五态齐备；数据组件补齐 `empty / error`。
4. 变体：主/次/文本/危险按钮必须分别实现，危险色与成功色不得混用。
5. 自定义组件：若无法映射到既有令牌，须先在 `design-tokens.ts` 中补充 `component.*`，再实现组件。

#### 4.3 已令牌化组件

| 组件 | 令牌 | 说明 |
| ---- | ---- | ---- |
| `components/ui/button.tsx` | `component.button` | 6 变体 × 4 尺寸，含 disabled |
| `components/ui/enhanced-button.tsx` | `component.enhancedButton` | 增加 icon 槽与 loading 态 |
| `components/ui/enhanced-card.tsx` | `component.enhancedCard` | default / glass / gradient |
| `components/ui/card.tsx` | `component.common.card` | 圆角 12px、`shadow.sm` |
| `components/layout/adaptive-sidebar.tsx` | `component.adaptiveSidebar` | 宽度 224/56px、遮罩令牌 |
| `components/ui/sheet.tsx` | `component.common.badge` + `color.surface.overlay` | 触发器常驻、内容受控 |

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
