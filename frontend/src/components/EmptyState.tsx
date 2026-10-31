import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  message?: string;
  children?: React.ReactNode;
}

export function EmptyState({ icon, title, message, children }: EmptyStateProps) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand" aria-hidden="true">
        {icon}
      </span>
      <h2 className="mt-4 text-lg font-semibold text-ink">{title}</h2>
      {message && <p className="mt-1 max-w-md text-sm text-subtle">{message}</p>}
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>);

}