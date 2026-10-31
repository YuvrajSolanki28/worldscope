import React from 'react';
import { Loader2 } from 'lucide-react';
export function LoadingSpinner({ message = 'Loading countries…' }: { message?: string }) { return <div role="status" aria-live="polite" className="card flex flex-col items-center justify-center px-6 py-16 text-center"><Loader2 className="h-8 w-8 animate-spin text-brand" /><p className="mt-3 text-sm font-medium text-subtle">{message}</p></div>; }
