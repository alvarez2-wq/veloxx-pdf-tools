import { ArrowRight } from 'lucide-react';

interface CTABannerProps {
  message: string;
}

export function CTABanner({ message }: CTABannerProps) {
  return (
    <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-[var(--text-secondary)]">{message}</p>
        <a
          href="https://veloxx.ai/register"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] transition-colors whitespace-nowrap shrink-0"
        >
          Get Started Free
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
