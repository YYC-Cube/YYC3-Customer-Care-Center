/**
 * @file design-system.ts
 * @description 设计系统兼容层：所有值派生自 lib/design-tokens.ts（唯一权威源）
 * @module lib.design-system
 * @author YYC³ Team
 * @version 2.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

import {
  color, radius, shadow, space, typography,
  componentButton, componentCommon,
} from '@/lib/design-tokens';

/** 设计系统（兼容旧调用方；数值不再就地定义） */
export const designSystem = {
  colors: {
    primary: color.brand.primary,
    secondary: color.brand.secondary,
    success: color.semantic.success,
    warning: color.semantic.warning,
    error: color.semantic.danger,
    neutral: color.neutral,
    chart: color.chart,
  },
  spacing: {
    xs: space[2], sm: space[3], md: space[4], lg: space[6], xl: space[8], '2xl': space[12],
  },
  borderRadius: radius,
  shadows: shadow,
  typography,
} as const;

/**
 * 统一 CSS 类名（语义令牌驱动）
 * 注意：优先级等于组件自身 class；仅在未使用 components/ui/* 的遗留模块中使用。
 */
export const commonStyles = {
  card: `bg-card text-card-foreground border border-border rounded-lg shadow-sm transition-all`,
  cardHeader: `border-b border-border`,
  button: {
    primary: `bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm`,
    secondary: `bg-secondary/15 text-secondary hover:bg-secondary/25`,
    ghost: `hover:bg-muted text-foreground`,
    destructive: `bg-destructive text-destructive-foreground hover:bg-destructive/90`,
  },
  input: `border border-input bg-background focus-visible:ring-2 focus-visible:ring-ring`,
  badge: {
    primary: `bg-primary text-primary-foreground`,
    secondary: `bg-secondary/15 text-secondary`,
    success: `bg-success/15 text-success`,
    warning: `bg-warning/15 text-warning`,
    error: `bg-destructive/15 text-destructive`,
  },
  layout: {
    container: `p-6 space-y-6 min-h-full`,
    grid: `grid gap-6`,
    section: `space-y-4`,
  },
} as const;

export { color, radius, shadow, space, typography, componentButton, componentCommon };
export { designTokens } from '@/lib/design-tokens';
