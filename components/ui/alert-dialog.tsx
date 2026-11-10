'use client';

/**
 * @file alert-dialog.tsx
 * @description 确认对话框（shadcn 受控 API 兼容：open/onOpenChange + Cancel/Action）——原模块缺失，自包含实现。
 */

import { createContext, useContext, type ReactNode } from 'react';

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue>({ open: false });

export function AlertDialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => onOpenChange?.(false)}
        >
          {children}
        </div>
      ) : null}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogContent({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div
      role="alertdialog"
      className={`z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-lg ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}

export function AlertDialogHeader({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`flex flex-col space-y-2 ${className}`}>{children}</div>;
}

export function AlertDialogFooter({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`flex flex-col-reverse gap-2 sm:flex-row sm:justify-end ${className}`}>{children}</div>;
}

export function AlertDialogTitle({ className = '', children }: { className?: string; children: ReactNode }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function AlertDialogDescription({ className = '', children }: { className?: string; children: ReactNode }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}

export function AlertDialogCancel({ className = '', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useContext(AlertDialogContext);
  return (
    <button
      type="button"
      className={`mt-3 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50 sm:mt-0 ${className}`}
      onClick={() => {
        props.onClick?.();
        onOpenChange?.(false);
      }}
    >
      {children}
    </button>
  );
}

export function AlertDialogAction({ className = '', children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = useContext(AlertDialogContext);
  return (
    <button
      type="button"
      className={`rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 ${className}`}
      onClick={() => {
        props.onClick?.();
        onOpenChange?.(false);
      }}
    >
      {children}
    </button>
  );
}
