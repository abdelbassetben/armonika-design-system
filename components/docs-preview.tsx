import { cn } from '@/lib/cn';
import type { HTMLAttributes } from 'react';

export function DocsPreview({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex min-h-32 items-center justify-center rounded-lg border border-dashed border-fd-border/60 bg-card p-6 not-prose',
        className,
      )}
      {...props}
    />
  );
}
