import { Shield } from 'lucide-react';

export function PrivacyBadge() {
  return (
    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
      <Shield size={14} className="text-[var(--success)]" />
      <span>Your files never leave your browser. 100% private.</span>
    </div>
  );
}
