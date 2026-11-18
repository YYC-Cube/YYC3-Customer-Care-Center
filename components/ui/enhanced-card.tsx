'use client';

/**
 * @file enhanced-card.tsx
 * @description 增强卡片（title/description/footer）——组件令牌 component.enhancedCard
 * @module components.ui.enhanced-card
 * @author YYC³ Team
 * @version 2.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 *
 * 令牌来源：lib/design-tokens.ts → component.enhancedCard（default / glass / gradient）
 * 禁止就地硬编码色值 / 圆角 / 阴影。
 */

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface EnhancedCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  bordered?: boolean;
  variant?: 'default' | 'glass' | 'gradient';
}

/** 变体 → 令牌映射（对应 component.enhancedCard.variant） */
const variantCls: Record<string, string> = {
  default: 'bg-card text-card-foreground shadow-sm',
  glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-md',
  gradient: 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white border border-neutral-700 shadow-lg',
};

export const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, title, description, footer, bordered = true, variant = 'default', children, ...props }, ref) => {
    const isDefault = variant === 'default';
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl',
          variantCls[variant] || variantCls.default,
          bordered && isDefault && 'border border-border',
          className,
        )}
        {...props}
      >
        {(title || description) && (
          <div className="flex flex-col gap-2 p-6">
            {title ? <h3 className="text-base font-semibold leading-6 tracking-tight">{title}</h3> : null}
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
        )}
        {children ? <div className="p-6 pt-0">{children}</div> : null}
        {footer ? <div className="flex items-center p-6 pt-0">{footer}</div> : null}
      </div>
    );
  },
);
EnhancedCard.displayName = 'EnhancedCard';
