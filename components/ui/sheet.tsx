'use client';

/**
 * @file sheet.tsx
 * @description 侧滑面板（shadcn 受控 API 兼容：open/onOpenChange + side）——原模块缺失，自包含实现。
 */

import { createContext, useContext, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface SheetContextValue {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SheetContext = createContext<SheetContextValue>({ open: false });

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {open ? (
        <div className="fixed inset-0 z-50" onClick={() => onOpenChange?.(false)}>
          <div className="absolute inset-0 bg-black/60" />
          {children}
        </div>
      ) : null}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

const sideCls: Record<string, string> = {
  left: 'left-0 top-0 h-full w-80 border-r',
  right: 'right-0 top-0 h-full w-80 border-l',
  top: 'left-0 top-0 h-80 w-full border-b',
  bottom: 'left-0 bottom-0 w-full border-t',
};

export function SheetContent({
  side = 'right',
  className = '',
  children,
}: {
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  children: ReactNode;
}) {
  const { onOpenChange } = useContext(SheetContext);
  return (
    <div
      role="dialog"
      className={`fixed z-50 bg-white p-6 shadow-lg ${sideCls[side] || sideCls.right} ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
        onClick={() => onOpenChange?.(false)}
      >
        <X className="h-4 w-4" />
      </button>
      {children}
    </div>
  );
}

export function SheetHeader({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`flex flex-col space-y-2 ${className}`}>{children}</div>;
}

export function SheetTitle({ className = '', children }: { className?: string; children: ReactNode }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function SheetDescription({ className = '', children }: { className?: string; children: ReactNode }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}

export function SheetClose({ className = '', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useContext(SheetContext);
  return (
    <button
      type="button"
      className={`rounded-md border px-3 py-1.5 text-sm ${className}`}
      onClick={() => {
        props.onClick?.();
        onOpenChange?.(false);
      }}
    >
      {children}
    </button>
  );
}
