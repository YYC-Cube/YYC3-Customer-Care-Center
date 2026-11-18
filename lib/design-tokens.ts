/**
 * @file design-tokens.ts
 * @description YYC³ Customer Care Center 全域设计令牌（唯一基准 / Single Source of Truth）
 * @module lib.design-tokens
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-11-18
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 *
 * 命名规范：{分类}.{用途}.{变体}
 * 色值统一以 HEX 输出；hsl 通道值供 globals.css / Tailwind 运行时使用。
 * 所有 UI 实现必须以本文件为唯一基准，禁止就地硬编码色值与尺寸。
 */

/** 品牌与语义色板（HEX 为权威值） */
export const color = {
  brand: {
    primary: { DEFAULT: '#0EA5E9', hover: '#0284C7', active: '#0369A1', soft: '#E0F2FE' },
    secondary: { DEFAULT: '#3B82F6', hover: '#2563EB', active: '#1D4ED8', soft: '#DBEAFE' },
  },
  semantic: {
    success: { DEFAULT: '#10B981', hover: '#059669', soft: '#D1FAE5' },
    warning: { DEFAULT: '#F59E0B', hover: '#D97706', soft: '#FEF3C7' },
    danger: { DEFAULT: '#EF4444', hover: '#DC2626', soft: '#FEE2E2' },
    info: { DEFAULT: '#0EA5E9', hover: '#0284C7', soft: '#E0F2FE' },
  },
  surface: {
    background: '#FFFFFF',
    foreground: '#0F172A',
    card: '#FFFFFF',
    cardForeground: '#0F172A',
    muted: '#F1F5F9',
    mutedForeground: '#64748B',
    border: '#E2E8F0',
    input: '#E2E8F0',
    ring: '#0EA5E9',
    overlay: 'rgba(15, 23, 42, 0.50)',
  },
  neutral: {
    50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8',
    500: '#64748B', 600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0F172A',
  },
  chart: {
    1: '#0EA5E9', 2: '#3B82F6', 3: '#10B981', 4: '#F59E0B', 5: '#EF4444',
  },
  /** 媒体/绘制类固定色：签名板墨迹与纸张，不参与主题换肤 */
  media: {
    ink: '#000000',
    paper: '#FFFFFF',
  },
} as const;

/**
 * 功能色阶（50–950）
 * 全站 17 个调色板族（gray/slate/blue/sky/green/emerald/red/rose/amber/yellow/orange/
 * purple/violet/pink/fuchsia/teal/indigo/cyan）统一收敛为 5 条语义色阶。
 * Tailwind 中旧族名作为兼容别名指向同一色阶，禁止新增直接色值。
 */
export const colorRamp = {
  neutral: {
    50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8',
    500: '#64748B', 600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0F172A', 950: '#020617',
  },
  primary: {
    50: '#F0F9FF', 100: '#E0F2FE', 200: '#BAE6FD', 300: '#7DD3FC', 400: '#38BDF8',
    500: '#0EA5E9', 600: '#0284C7', 700: '#0369A1', 800: '#075985', 900: '#0C4A6E', 950: '#082F49',
  },
  accent: {
    50: '#F5F3FF', 100: '#EDE9FE', 200: '#DDD6FE', 300: '#C4B5FD', 400: '#A78BFA',
    500: '#8B5CF6', 600: '#7C3AED', 700: '#6D28D9', 800: '#5B21B6', 900: '#4C1D95', 950: '#2E1065',
  },
  success: {
    50: '#ECFDF5', 100: '#D1FAE5', 200: '#A7F3D0', 300: '#6EE7B7', 400: '#34D399',
    500: '#10B981', 600: '#059669', 700: '#047857', 800: '#065F46', 900: '#064E3B', 950: '#022C22',
  },
  warning: {
    50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A', 300: '#FCD34D', 400: '#FBBF24',
    500: '#F59E0B', 600: '#D97706', 700: '#B45309', 800: '#92400E', 900: '#78350F', 950: '#451A03',
  },
  danger: {
    50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 300: '#FCA5A5', 400: '#F87171',
    500: '#EF4444', 600: '#DC2626', 700: '#B91C1C', 800: '#991B1B', 900: '#7F1D1D', 950: '#450A0A',
  },
} as const;

/** 旧调色板族 → 语义色阶 的迁移映射（尾随 shade 保持不变，保证视觉零漂移） */
export const paletteAliasMap = {
  neutral: ['gray', 'slate', 'zinc', 'neutral', 'stone'],
  primary: ['blue', 'sky', 'indigo', 'cyan'],
  accent: ['purple', 'violet', 'fuchsia', 'pink'],
  success: ['green', 'emerald', 'teal', 'lime'],
  warning: ['amber', 'yellow', 'orange'],
  danger: ['red', 'rose'],
} as const;

/** HSL 通道值（不含 hsl() 包裹），与 HEX 一一对应，供 Tailwind / CSS 使用 */
export const colorHslChannel = {
  primary: '198.6 88.7% 48.4%',
  'primary-hover': '200.4 98% 39.4%',
  'primary-foreground': '0 0% 100%',
  secondary: '217.2 91.2% 59.8%',
  success: '160.1 84.1% 39.4%',
  warning: '38 92.1% 50.2%',
  danger: '0 84.2% 60.2%',
  background: '0 0% 100%',
  foreground: '222.2 84% 4.9%',
  border: '214.3 31.8% 91.4%',
  ring: '198.6 88.7% 48.4%',
  'chart-1': '198.6 88.7% 48.4%',
  'chart-2': '217.2 91.2% 59.8%',
  'chart-3': '160.1 84.1% 39.4%',
  'chart-4': '38 92.1% 50.2%',
  'chart-5': '0 84.2% 60.2%',
} as const;

/** 字体令牌：字族 / 字号 / 行高 / 字重 */
export const typography = {
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
    mono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
  display: { fontSize: '2.25rem', lineHeight: '2.75rem', fontWeight: '700', fontFamily: 'sans' },
  h1: { fontSize: '1.875rem', lineHeight: '2.25rem', fontWeight: '700', fontFamily: 'sans' },
  h2: { fontSize: '1.5rem', lineHeight: '2rem', fontWeight: '600', fontFamily: 'sans' },
  h3: { fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: '600', fontFamily: 'sans' },
  h4: { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: '600', fontFamily: 'sans' },
  body: { fontSize: '0.875rem', lineHeight: '1.375rem', fontWeight: '400', fontFamily: 'sans' },
  bodySm: { fontSize: '0.8125rem', lineHeight: '1.25rem', fontWeight: '400', fontFamily: 'sans' },
  caption: { fontSize: '0.75rem', lineHeight: '1rem', fontWeight: '400', fontFamily: 'sans' },
  code: { fontSize: '0.8125rem', lineHeight: '1.25rem', fontWeight: '400', fontFamily: 'mono' },
} as const;

/** 圆角令牌 */
export const radius = {
  sm: '6px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px', full: '9999px',
} as const;

/** 阴影令牌 */
export const shadow = {
  sm: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
  md: '0 4px 6px -1px rgba(15, 23, 42, 0.10), 0 2px 4px -2px rgba(15, 23, 42, 0.10)',
  lg: '0 10px 15px -3px rgba(15, 23, 42, 0.10), 0 4px 6px -4px rgba(15, 23, 42, 0.10)',
  xl: '0 20px 25px -5px rgba(15, 23, 42, 0.10), 0 8px 10px -6px rgba(15, 23, 42, 0.10)',
} as const;

/** 间距令牌（4px 基准栅格） */
export const space = {
  0: '0px', 1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px',
  6: '24px', 8: '32px', 10: '40px', 12: '48px', 16: '64px',
} as const;

/** 描边令牌 */
export const border = {
  width: { DEFAULT: '1px', thick: '2px', focus: '3px' },
  style: 'solid',
  color: { DEFAULT: color.surface.border, strong: color.neutral[300], focus: color.surface.ring },
} as const;

/** 动效令牌 */
export const motion = {
  duration: { instant: '0ms', fast: '150ms', normal: '200ms', slow: '300ms' },
  easing: { standard: 'cubic-bezier(0.4, 0, 0.2, 1)', enter: 'cubic-bezier(0, 0, 0.2, 1)', exit: 'cubic-bezier(0.4, 0, 1, 1)' },
} as const;

/** 按钮组件派生令牌：变体 × 状态 */
export const componentButton = {
  base: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: space[2], borderRadius: radius.md, borderWidth: border.width.DEFAULT,
    fontWeight: typography.body.fontWeight, fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight, transitionDuration: motion.duration.normal,
  },
  variant: {
    primary: {
      default: { background: color.brand.primary.DEFAULT, foreground: '#FFFFFF', border: color.brand.primary.DEFAULT },
      hover: { background: color.brand.primary.hover },
      active: { background: color.brand.primary.active },
      disabled: { background: color.neutral[200], foreground: color.neutral[400], border: color.neutral[200] },
      loading: { background: color.brand.primary.DEFAULT, opacity: '0.7' },
    },
    secondary: {
      default: { background: color.brand.secondary.soft, foreground: color.brand.secondary.active, border: color.brand.secondary.soft },
      hover: { background: color.neutral[200] },
      active: { background: color.neutral[300] },
      disabled: { background: color.neutral[100], foreground: color.neutral[400], border: color.neutral[100] },
    },
    outline: {
      default: { background: color.surface.background, foreground: color.neutral[700], border: color.surface.border },
      hover: { background: color.surface.muted },
      active: { background: color.neutral[200] },
      disabled: { background: color.surface.background, foreground: color.neutral[400], border: color.neutral[200] },
    },
    ghost: {
      default: { background: 'transparent', foreground: color.neutral[700], border: 'transparent' },
      hover: { background: color.surface.muted },
      active: { background: color.neutral[200] },
      disabled: { background: 'transparent', foreground: color.neutral[400] },
    },
    destructive: {
      default: { background: color.semantic.danger.DEFAULT, foreground: '#FFFFFF', border: color.semantic.danger.DEFAULT },
      hover: { background: color.semantic.danger.hover },
      active: { background: '#B91C1C' },
      disabled: { background: color.neutral[200], foreground: color.neutral[400], border: color.neutral[200] },
    },
    link: {
      default: { background: 'transparent', foreground: color.brand.primary.DEFAULT, border: 'transparent' },
      hover: { foreground: color.brand.primary.hover, textDecoration: 'underline' },
      active: { foreground: color.brand.primary.active },
    },
  },
  size: {
    sm: { height: '32px', paddingX: space[3], icon: '16px' },
    default: { height: '36px', paddingX: space[4], icon: '16px' },
    lg: { height: '40px', paddingX: space[6], icon: '18px' },
    icon: { width: '36px', height: '36px' },
  },
  focus: { boxShadow: `0 0 0 ${border.width.focus} ${color.surface.ring}` },
} as const;

/** 通用组件基准令牌 */
export const componentCommon = {
  card: { background: color.surface.card, radius: radius.lg, border: border.width.DEFAULT, borderColor: color.surface.border, padding: space[6], shadow: shadow.sm },
  input: { height: '36px', radius: radius.md, paddingX: space[3], border: border.width.DEFAULT, borderColor: color.surface.input, fontSize: typography.body.fontSize },
  dialog: { radius: radius.xl, padding: space[6], maxWidth: '480px', overlay: color.surface.overlay, shadow: shadow.xl },
  badge: { radius: radius.sm, paddingX: space[2], paddingY: space[1], fontSize: typography.caption.fontSize },
  sidebar: { widthExpanded: '224px', widthCollapsed: '56px', zIndex: '50' },
  header: { height: '64px', zIndex: '40' },
} as const;

/** 布局令牌：断点与宽度（唯一数据源） */
export const layoutToken = {
  breakpoints: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 } as const,
  sidebar: { widthExpanded: 224, widthCollapsed: 56, mobileBreakpoint: 1024 },
  header: { height: 64 },
  content: { paddingMobile: 16, paddingTablet: 24, paddingDesktop: 32, maxWidth: 1920 },
} as const;

/**
 * 增强按钮组件令牌（原【缺少规范定义】）
 * 与 componentButton 同源，额外定义 icon 插槽与 loading 态的尺寸/间距约束。
 */
export const componentEnhancedButton = {
  extends: 'component.button',
  base: {
    ...componentButton.base,
    gap: space[2],
    iconSize: '16px',
    iconSizeLg: '18px',
    focusRing: componentButton.focus.boxShadow,
  },
  variant: componentButton.variant,
  size: {
    sm: { height: '32px', paddingX: space[3], fontSize: typography.bodySm.fontSize },
    default: { height: '36px', paddingX: space[4], fontSize: typography.body.fontSize },
    lg: { height: '40px', paddingX: space[6], fontSize: typography.body.fontSize },
    icon: { width: '36px', height: '36px', paddingX: '0px' },
  },
  state: {
    disabled: { opacity: '0.5', pointerEvents: 'none' },
    loading: { opacity: '0.7', cursor: 'progress' },
  },
} as const;

/**
 * 增强卡片组件令牌（原【缺少规范定义】）
 * 覆盖 default / glass / gradient 三变体，消除 slate-900 等硬编码色阶。
 */
export const componentEnhancedCard = {
  base: {
    radius: radius.xl,
    borderWidth: border.width.DEFAULT,
    padding: space[6],
    headerGapY: space[2],
    title: { fontSize: typography.h4.fontSize, lineHeight: typography.h4.lineHeight, fontWeight: typography.h4.fontWeight },
    description: { fontSize: typography.body.fontSize, color: color.surface.mutedForeground },
  },
  variant: {
    default: {
      background: color.surface.card,
      foreground: color.surface.cardForeground,
      borderColor: color.surface.border,
      shadow: shadow.sm,
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.10)',
      foreground: '#FFFFFF',
      borderColor: 'rgba(255, 255, 255, 0.20)',
      backdropBlur: '12px',
      shadow: shadow.md,
    },
    gradient: {
      background: `linear-gradient(135deg, ${color.neutral[900]} 0%, ${color.neutral[800]} 50%, ${color.neutral[900]} 100%)`,
      foreground: '#FFFFFF',
      borderColor: color.neutral[700],
      shadow: shadow.lg,
    },
  },
  state: {
    hover: { shadow: shadow.md },
    disabled: { opacity: '0.6', pointerEvents: 'none' },
  },
} as const;

/**
 * 自适应侧边栏组件令牌（原【缺少规范定义】）
 * 宽度与 componentCommon.sidebar 对齐，消除 280/80px 与 224/56px 双源冲突。
 */
export const componentAdaptiveSidebar = {
  width: {
    expanded: componentCommon.sidebar.widthExpanded,
    collapsed: componentCommon.sidebar.widthCollapsed,
    mobile: componentCommon.sidebar.widthExpanded,
  },
  surface: {
    background: color.surface.card,
    foreground: color.surface.foreground,
    borderColor: color.surface.border,
    shadowDesktop: shadow.sm,
    shadowMobile: shadow.xl,
  },
  overlay: { background: color.surface.overlay, backdropBlur: '4px', zIndex: '40' },
  zIndex: { sidebar: componentCommon.sidebar.zIndex, overlay: '40' },
  region: {
    header: { paddingX: space[4], paddingY: space[6], borderColor: color.surface.border },
    content: { padding: space[4], gap: space[2] },
    footer: { paddingX: space[4], paddingY: space[4], borderColor: color.surface.border, marginTop: 'auto' },
    closeButton: { radius: radius.full, size: '36px' },
  },
  state: {
    item: {
      default: { foreground: color.neutral[600], background: 'transparent' },
      hover: { foreground: color.neutral[900], background: color.surface.muted },
      active: { foreground: color.brand.primary.DEFAULT, background: color.brand.primary.soft, borderLeft: `3px solid ${color.brand.primary.DEFAULT}` },
      disabled: { foreground: color.neutral[400] },
    },
  },
  motion: { duration: motion.duration.slow, easing: motion.easing.standard },
} as const;

export const designTokens = {
  color, colorRamp, paletteAliasMap, colorHslChannel, typography, radius, shadow, space, border, motion,
  component: {
    button: componentButton,
    common: componentCommon,
    enhancedButton: componentEnhancedButton,
    enhancedCard: componentEnhancedCard,
    adaptiveSidebar: componentAdaptiveSidebar,
  },
  layout: layoutToken,
} as const;

export type DesignTokens = typeof designTokens;
export default designTokens;
