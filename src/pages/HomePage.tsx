import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/layout/SEOHead';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { tools } from '@/config/tools';
import {
  Image,
  Merge,
  FileImage,
  Minimize2,
  Scissors,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  image: <Image size={28} />,
  merge: <Merge size={28} />,
  'file-image': <FileImage size={28} />,
  'minimize-2': <Minimize2 size={28} />,
  scissors: <Scissors size={28} />,
};

const colorMap: Record<string, string> = {
  blue: 'from-blue-500/15 to-blue-600/5 text-blue-400',
  green: 'from-green-500/15 to-green-600/5 text-green-400',
  purple: 'from-purple-500/15 to-purple-600/5 text-purple-400',
  orange: 'from-orange-500/15 to-orange-600/5 text-orange-400',
  cyan: 'from-cyan-500/15 to-cyan-600/5 text-cyan-400',
};

export function HomePage() {
  return (
    <>
      <SEOHead
        title="Free PDF Tools Online — No Upload Required | Veloxx Tools"
        description="Free online PDF tools — merge, split, compress, convert. 100% browser-based, no file uploads. Privacy-first by Veloxx.ai."
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
            Free PDF Tools
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-6">
            Merge, split, compress, and convert PDFs — instantly, right in your browser.
            No uploads, no sign-ups, no limits.
          </p>
          <div className="flex justify-center">
            <PrivacyBadge />
          </div>
        </div>

        {/* Tool Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              to={`/${tool.slug}`}
              className="group p-6 rounded-2xl bg-[var(--surface-primary)] border border-[var(--border-primary)] hover:border-[var(--border-secondary)] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorMap[tool.color]} flex items-center justify-center mb-4`}
              >
                {iconMap[tool.icon]}
              </div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-primary)] transition-colors">
                {tool.shortTitle}
              </h2>
              <p className="text-sm text-[var(--text-tertiary)] mb-3">{tool.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-primary)]">
                Use tool <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}

          {/* Data Room CTA Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/20">
            <div className="w-14 h-14 rounded-xl bg-[var(--accent-primary)]/20 flex items-center justify-center mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Need a Data Room?</h2>
            <p className="text-sm text-[var(--text-tertiary)] mb-3">
              Share documents securely with AI-powered Q&A. Built for M&A, fundraising, and due diligence.
            </p>
            <a
              href="https://veloxx.ai/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-primary)]"
            >
              Try Veloxx.ai free <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
