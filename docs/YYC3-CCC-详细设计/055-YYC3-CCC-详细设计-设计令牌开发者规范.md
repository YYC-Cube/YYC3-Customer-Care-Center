# 055-YYC3-CCC-详细设计 设计令牌开发者规范

---

@file: 055-YYC3-CCC-详细设计-设计令牌开发者规范.md
@description: YYC³ CCC 设计令牌唯一基准与开发者使用规范（与全域 UI 一致性审核对齐）
@author: YYC³ Team
@version: v1.0.0
@created: 2026-11-18
@updated: 2026-11-18
@status: published
@tags: [设计令牌, 设计系统, UI规范, 开发者文档]

---

> **_YYC³_**（YanYuCloudCube™ · 注册商标）
> _言启象限 | 语枢未来_
> **_Words Initiate Quadrants, Language Serves as Core for the Future_**
> _万象归元于云枢 | 深栈智启新纪元_
> **_All things converge in cloud pivot; Deep stacks ignite a new era of intelligence_**

---

## 概述

本文档是 YYC³ Customer Care Center 的**设计令牌唯一基准说明**，与
`docs/YYC3-CCC-审核报告/YYC3-全域UI深度一致性审核报告.md` 的整改结论保持同步。

任何 UI 实现的色值、字号、圆角、阴影、间距、描边、动效，**必须**来源于：

```
lib/design-tokens.ts      ← 唯一权威源（Single Source of Truth）
```

派生关系（单向，禁止反向）：

```
lib/design-tokens.ts
   ├── tailwind.config.ts      （颜色/圆角/阴影/字体 → Tailwind theme）
   ├── app/globals.css         （HSL 通道变量 → CSS 运行时）
   └── 业务组件               （通过语义类名或 colorRamp / color.media 引用）
```

> 修改令牌的顺序固定为：**先改 `design-tokens.ts` → 再同步 `globals.css` 通道值 → 最后验证 Tailwind 产物**。
> 禁止在组件内就地硬编码 HEX、rgb()、调色板类名（`bg-orange-500`）或魔法尺寸。

---

## 一、颜色令牌

### 1.1 品牌与语义色

| 令牌 | 默认 | hover | soft | 用途 |
| ---- | ---- | ---- | ---- | ---- |
| `color.brand.primary` | `#0EA5E9` | `#0284C7` | `#E0F2FE` | 品牌主色、主按钮、链接、焦点环 |
| `color.brand.secondary` | `#3B82F6` | `#2563EB` | `#DBEAFE` | 次强调（图表第 2 序列） |
| `color.semantic.success` | `#10B981` | `#059669` | `#D1FAE5` | 成功、在线、已完成 |
| `color.semantic.warning` | `#F59E0B` | `#D97706` | `#FEF3C7` | 警告、待处理、临期 |
| `color.semantic.danger` | `#EF4444` | `#DC2626` | `#FEE2E2` | 危险操作、错误、失败 |
| `color.semantic.info` | `#0EA5E9` | `#0284C7` | `#E0F2FE` | 提示信息 |

### 1.2 功能色阶（`colorRamp`）

全站 22 个 Tailwind 调色板族已收敛为 **6 条语义色阶**，每条约 11 档（50–950）：

| 色阶 | 500 基准 | 收编的旧族名 |
| ---- | ---- | ---- |
| `colorRamp.neutral` | `#64748B` | gray / slate / zinc / neutral / stone |
| `colorRamp.primary` | `#0EA5E9` | blue / sky / indigo / cyan |
| `colorRamp.success` | `#10B981` | green / emerald / teal / lime |
| `colorRamp.warning` | `#F59E0B` | amber / yellow / orange |
| `colorRamp.danger` | `#EF4444` | red / rose |
| `colorRamp.accent` | `#8B5CF6` | purple / violet / fuchsia / pink |

使用方式：

```tsx
// ✅ 正确：数据可视化等需要真实色值的场景
import { colorRamp } from '@/lib/design-tokens';

const series = [
  { name: '流入', color: colorRamp.success[500] },
  { name: '流出', color: colorRamp.danger[500] },
  { name: '净流量', color: colorRamp.primary[600] },
];

// ✅ 正确：样式场景使用语义类名
<div className="bg-primary-500 text-neutral-700 border-border" />

// ❌ 禁止：调色板类名（旧族名仅为兼容别名保留，存量已全部迁移）
<div className="bg-orange-500 text-gray-600" />

// ❌ 禁止：内联 HEX
<div style={{ color: '#F59E0B' }} />
```

### 1.3 图表与媒体色

| 令牌 | 值 | 说明 |
| ---- | ---- | ---- |
| `color.chart.1`–`color.chart.5` | `#0EA5E9` / `#3B82F6` / `#10B981` / `#F59E0B` / `#EF4444` | Tailwind `bg-chart-1..5` / CSS `--chart-1..5` |
| `color.media.ink` | `#000000` | 签名板墨迹等固定绘制色 |
| `color.media.paper` | `#FFFFFF` | 签名板纸张等固定绘制色 |

图表坐标轴与网格统一使用 `colorRamp.neutral[500]`（axis）与 `colorRamp.neutral[200]`（grid）。

### 1.4 唯一允许的硬编码例外

`components/ui/chart.tsx` 中 recharts 默认描边的**属性选择器** `[stroke="#ccc"]` 属于 CSS 选择器字面量，
不是颜色值，不可令牌化。新增此类选择器需在代码注释中标注原因。

---

## 二、字体令牌（`typography`）

格式：`字重 / 字号 / 行高 / 字族`

| 令牌 | 规格 |
| ---- | ---- |
| `typography.display` | `700 / 36px / 44px / Inter` |
| `typography.h1` | `700 / 30px / 36px / Inter` |
| `typography.h2` | `600 / 24px / 32px / Inter` |
| `typography.h3` | `600 / 20px / 28px / Inter` |
| `typography.h4` | `600 / 16px / 24px / Inter` |
| `typography.body` | `400 / 14px / 22px / Inter` |
| `typography.bodySm` | `400 / 13px / 20px / Inter` |
| `typography.caption` | `400 / 12px / 16px / Inter` |
| `typography.code` | `400 / 13px / 20px / SFMono-Regular` |

字族回退链：`Inter → -apple-system → BlinkMacSystemFont → PingFang SC → Microsoft YaHei → sans-serif`。

---

## 三、圆角 / 阴影 / 间距 / 描边 / 动效

| 分类 | 令牌 | 取值 |
| ---- | ---- | ---- |
| 圆角 | `radius.sm / md / lg / xl / 2xl / full` | `6 / 8 / 12 / 16 / 24 / 9999px` |
| 阴影 | `shadow.sm / md / lg / xl` | `0 1px 2px` → `0 20px 25px -5px`（rgba(15,23,42)） |
| 间距 | `space.0–16` | `0 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64px`（4px 栅格） |
| 描边 | `border.width` | `1px / 2px / 3px(focus)` |
| 动效 | `motion.duration` | `0 / 150 / 200 / 300ms` |
| 动效 | `motion.easing` | `standard / enter / exit`（cubic-bezier） |

---

## 四、组件令牌

### 4.1 按钮（`component.button`）

| 变体 | 默认 | hover | active | disabled |
| ---- | ---- | ---- | ---- | ---- |
| primary | `#0EA5E9` / `#FFFFFF` | `#0284C7` | `#0369A1` | `#E2E8F0` / `#94A3B8` |
| secondary | `#DBEAFE` / `#1D4ED8` | `#E2E8F0` | `#CBD5E1` | `#F1F5F9` / `#94A3B8` |
| outline | `#FFFFFF` / `#334155` / `#E2E8F0` | `#F1F5F9` | `#E2E8F0` | `#FFFFFF` / `#94A3B8` |
| ghost | 透明 / `#334155` | `#F1F5F9` | `#E2E8F0` | 透明 / `#94A3B8` |
| destructive | `#EF4444` / `#FFFFFF` | `#DC2626` | `#B91C1C` | `#E2E8F0` / `#94A3B8` |
| link | `#0EA5E9` | `#0284C7` + 下划线 | `#0369A1` | `#94A3B8` |

尺寸：`sm 32px` / `default 36px` / `lg 40px` / `icon 36×36px`；焦点环 `0 0 0 3px #0EA5E9`。

### 4.2 增强按钮（`component.enhancedButton`）

与 `component.button` 同源，额外约束：

- `loading`：`opacity 0.7` + `cursor: progress` + `Loader2` 旋转，同时禁用交互（`disabled` + `aria-busy`）。
- 图标槽：`16px`（sm/default）、`18px`（lg），与文字间距 `8px`。

### 4.3 增强卡片（`component.enhancedCard`）

| 变体 | 背景 | 前景 | 描边 | 阴影 |
| ---- | ---- | ---- | ---- | ---- |
| default | `#FFFFFF` | `#0F172A` | `#E2E8F0` | `shadow.sm` |
| glass | `rgba(255,255,255,0.10)` + `blur 12px` | `#FFFFFF` | `rgba(255,255,255,0.20)` | `shadow.md` |
| gradient | `linear-gradient(135deg,#0F172A,#1E293B,#0F172A)` | `#FFFFFF` | `#334155` | `shadow.lg` |

圆角统一 `16px`（`radius.xl`），内边距 `24px`。

### 4.4 通用组件（`component.common`）

| 组件 | 关键参数 |
| ---- | ---- |
| card | 圆角 12px、描边 1px `#E2E8F0`、内边距 24px、`shadow.sm` |
| input | 高 36px、圆角 8px、左右内边距 12px、描边 `#E2E8F0` |
| dialog | 圆角 16px、内边距 24px、最大宽 480px、遮罩 `rgba(15,23,42,0.50)`、`shadow.xl` |
| badge | 圆角 6px、内边距 `8/4px`、字号 12px |
| sidebar | 展开 224px / 收起 56px / z-index 50 |
| header | 高 64px / z-index 40 |

### 4.5 自适应侧边栏（`component.adaptiveSidebar`）

| 项 | 取值 |
| ---- | ---- |
| 宽度 | 展开 224px / 收起 56px / 移动 224px（与 `component.common.sidebar` 同源） |
| 表面 | `bg-card` + `border-border` |
| 遮罩 | `rgba(15,23,42,0.50)` + `backdrop-blur 4px`，z-index 40 |
| 区域 | header `16/24px`、content `16px` / gap `8px`、footer `16/16px` |
| 项状态 | 默认 `#475569` / hover `#0F172A + #F1F5F9` / active `#0EA5E9 + #E0F2FE + 3px 左侧描边` / disabled `#94A3B8` |
| 断点 | `1023px`（由 `layout.breakpoints.lg = 1024` 派生） |

---

## 五、布局令牌（`layout`）

| 项 | 取值 |
| ---- | ---- |
| 断点 | `xs 0 / sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536` |
| 侧栏 | 展开 224px、收起 56px、移动断点 1024 |
| 头部 | 64px |
| 内容区 | 内边距 `16 / 24 / 32px`（移动/平板/桌面）、最大宽 1920px |

主区域宽度统一由 `getSidebarOffset()` / `100% - sidebarWidth` 计算，**禁止**使用 `width:100%` + `marginLeft` 组合（会产生横向溢出）。

---

## 六、多状态校验清单

新组件或改造组件提交前必须自检：

| 状态 | 要求 |
| ---- | ---- |
| hover | 背景或前景有可感知变化，且取值为令牌 |
| active | 不得与 hover 相同（按下需更深） |
| focus-visible | `3px` 焦点环，颜色 `color.surface.ring` |
| disabled | 前景 `#94A3B8`、`pointer-events: none`、`opacity 0.5` |
| loading | `opacity 0.7` + 进度指示 + 阻止二次提交 |
| empty | 提供空状态文案与主操作入口 |
| error | 使用 `danger` 令牌，并提供重试路径 |

---

## 七、迁移工具

| 脚本 | 作用 | 用法 |
| ---- | ---- | ---- |
| `scripts/migrate-palette-to-tokens.mjs` | 调色板类名 → 语义类名 | `node scripts/migrate-palette-to-tokens.mjs [--apply]` |
| `scripts/migrate-hex-to-tokens.mjs` | 内联 HEX → `colorRamp` / `color.media` | `node scripts/migrate-hex-to-tokens.mjs [--apply]` |

两个脚本均为幂等操作，默认预演（只统计不写入），加 `--apply` 才落盘。

---

## 八、当前合规状态

| 指标 | 数值 |
| ---- | ---- |
| 调色板类名残留（静态） | 0 |
| 内联 HEX 残留 | 1（仅 `chart.tsx` 选择器字面量，允许例外） |
| 缺令牌自定义组件 | 0 |
| UI 一致性审核合规率 | 100%（96 / 96 项） |
| 构建 | Next.js 16.4.6 / Turbopack 通过，49 静态页 + 11 动态 API |
| 类型检查 | `tsc --noEmit` 0 错误（构建期已强制校验） |
| 测试 | Vitest 4.0.18，5 文件 / 76 用例通过 |

---

## 相关文档

- [YYC³ 全域UI深度一致性审核报告](../YYC3-CCC-审核报告/YYC3-全域UI深度一致性审核报告.md)
- [037-UI-UX设计规范](./037-YYC3-CCC-详细设计-UI-UX设计规范.md)
- [041-组件设计文档](./041-YYC3-CCC-详细设计-组件设计文档.md)
- [046-通用组件封装文档](./046-YYC3-CCC-详细设计-通用组件封装文档.md)
- [044-响应式适配文档](./044-YYC3-CCC-详细设计-响应式适配文档.md)

---

## 变更历史

| 版本 | 日期 | 变更内容 | 作者 |
| ---- | ---- | -------- | ---- |
| v1.0.0 | 2026-11-18 | 建立设计令牌唯一基准，收敛 22 个调色板族为 6 条语义色阶，补齐 3 个组件令牌 | YYC³ Team |

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <i>Words Initiate Quadrants, Language Serves as Core for the Future</i><br>
  万象归元于云枢 | 深栈智启新纪元<br>
  <i>All things converge in cloud pivot; Deep stacks ignite a new era of intelligence</i><br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
