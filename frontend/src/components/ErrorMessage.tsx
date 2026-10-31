import React from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = 'Could not load countries',
  message = 'Something went wrong while contacting the country API. Please check your connection and try again.',
  onRetry
}: ErrorMessageProps) {
  return (
    <div role="alert" className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertTriangle className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-subtle">{message}</p>
      {onRetry &&
      <button type="button" onClick={onRetry} className="btn btn-primary mt-6">
          <RotateCw className="h-4 w-4" aria-hidden="true" />
          Retry
        </button>
      }
    </div>);

}