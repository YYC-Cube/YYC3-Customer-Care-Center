---
@file: 046-YYC3-CCC-详细设计-通用组件封装文档.md
@description: YYC3-CCC 前端通用组件的封装原则与复用规范，提升开发效率
@author: YYC³ Team
@version: v1.0.0
@created: 2026-01-23
@updated: 2026-01-23
@status: published
@tags: [详细设计],[组件封装],[复用设计]
---

> ***YanYuCloudCube***
> 言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> 万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 046-YYC3-CCC-详细设计 通用组件封装文档

## 概述

本文档详细描述YYC3-CCC-详细设计-通用组件封装文档相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
YYC³ Customer Care Center（YYC3-CCC）项目是一个基于「五高五标五化」理念的现代化AI代理服务落地页，采用Next.js 14+构建，集成了国际化系统、3D场景交互、动画效果和响应式设计。

#### 1.2 文档目标
- 规范通用组件封装文档相关的业务标准与技术落地要求
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

### 4. 通用组件封装文档

#### 4.1 封装规则

1. **单一令牌源**：封装层不得内置色值/尺寸常量，一律引用
   [`lib/design-tokens.ts`](../../lib/design-tokens.ts)（详见
   [055-设计令牌开发者规范](./055-YYC3-CCC-详细设计-设计令牌开发者规范.md)）。
2. **API 最小化**：只暴露业务需要的 `variant` / `size` / `state`，其余透传原生属性。
3. **可访问性**：图标按钮必须带 `aria-label`；受控面板需 `role="dialog"` + `aria-modal`。
4. **组合优先**：先组合既有 `components/ui/*`，不允许重复实现按钮、卡片、弹窗原语。
5. **客户端边界**：`'use client'` 必须是模块首条语句，任何 import 不得前置。

#### 4.2 已封装的通用组件

| 组件 | 导出 | 关键约定 |
| ---- | ---- | ---- |
| `ui/button.tsx` | `Button` | 6 变体 × 4 尺寸；`hover/active/disabled` 取令牌 |
| `ui/enhanced-button.tsx` | `EnhancedButton` | `icon` + `loading`；loading 时自动禁用 |
| `ui/card.tsx` | `Card` 系列 | 圆角 12px、`shadow.sm`、内边距 24px |
| `ui/enhanced-card.tsx` | `EnhancedCard` | `default/glass/gradient` 三变体 |
| `ui/sheet.tsx` | `Sheet` 系列 | 触发器常驻渲染，可见性由 `SheetContent` 按 `open` 控制 |
| `layout/adaptive-sidebar.tsx` | `AdaptiveSidebar` 系列 | 宽度 224/56px（与主侧栏同源） |
| `layout/responsive-layout.tsx` | `ResponsiveLayout` / `useLayoutContext` / `useOptionalLayoutContext` | 布局状态唯一来源 |

#### 4.3 布局状态机约定

侧边栏/抽屉的开关状态统一由 `ResponsiveLayoutProvider` 托管：

```tsx
const layout = useOptionalLayoutContext(); // 无 Provider 时返回 undefined
const isOpen = layout ? layout.sidebarOpen : localOpen;
```

禁止在业务组件内另建 `isMenuOpen` 独立状态机（如需脱离 Provider 使用，必须提供本地退化分支）。

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
