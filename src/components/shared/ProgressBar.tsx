import { Loader2 } from 'lucide-react';

interface ProgressBarProps {
  progress: number; // 0–100
  status: string;
}

export function ProgressBar({ progress, status }: ProgressBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Loader2 size={18} className="animate-spin text-[var(--accent-primary)]" />
        <span className="text-sm text-[var(--text-secondary)]">{status}</span>
      </div>
      <div className="w-full h-2 bg-[var(--surface-secondary)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--accent-primary)] rounded-full transition-all duration-300"
          style={{ width: `${Math.max(progress, 2)}%` }}
        />
      </div>
    </div>
  );
}
