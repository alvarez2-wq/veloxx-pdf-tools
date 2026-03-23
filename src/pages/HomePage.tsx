import { Link } from 'react-router-dom';
import { SEOHead, SITE_URL } from '@/components/layout/SEOHead';
import { tools } from '@/config/tools';
import {
  Image,
  Merge,
  FileImage,
  Minimize2,
  Scissors,
  ArrowRight,
  Shield,
  Zap,
  Lock,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  image: <Image size={24} />,
  merge: <Merge size={24} />,
  'file-image': <FileImage size={24} />,
  'minimize-2': <Minimize2 size={24} />,
  scissors: <Scissors size={24} />,
};

const colorMap: Record<string, { icon: string; bg: string; border: string }> = {
  blue: { icon: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'group-hover:border-blue-200 dark:group-hover:border-blue-500/30' },
  green: { icon: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'group-hover:border-emerald-200 dark:group-hover:border-emerald-500/30' },
  purple: { icon: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10', border: 'group-hover:border-violet-200 dark:group-hover:border-violet-500/30' },
  orange: { icon: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/10', border: 'group-hover:border-orange-200 dark:group-hover:border-orange-500/30' },
  cyan: { icon: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-500/10', border: 'group-hover:border-cyan-200 dark:group-hover:border-cyan-500/30' },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Veloxx PDF Tools',
  url: SITE_URL,
  description: 'Free online PDF tools — merge, split, compress, convert PDF files. 100% browser-based, no file uploads required. Privacy-first.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'Veloxx.ai',
    url: 'https://veloxx.ai',
  },
  featureList: [
    'Merge PDF files',
    'Split PDF by pages',
    'Compress PDF file size',
    'Convert JPG to PDF',
    'Convert PDF to JPG',
    'No file upload required',
    'Works offline after first load',
    '100% browser-based processing',
  ],
};

export function HomePage() {
  return (
    <>
      <SEOHead
        title="Free PDF Tools Online — Merge, Split, Compress, Convert | No Upload Required"
        description="Free online PDF tools — merge, split, compress, and convert PDFs instantly in your browser. No uploads, no sign-ups, no limits. 100% private and secure."
        canonical={SITE_URL}
        keywords="free pdf tools, merge pdf, split pdf, compress pdf, jpg to pdf, pdf to jpg, online pdf tools, no upload, browser-based, free pdf converter, combine pdf, reduce pdf size"
        jsonLd={homeJsonLd}
      />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 pt-8 sm:pt-14 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-primary)] border border-[var(--border-primary)] text-xs font-medium text-[var(--text-secondary)] mb-6">
          <Shield size={13} className="text-emerald-500" />
          100% browser-based — files never leave your device
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-5">
          PDF tools that
          <br />
          <span className="text-[var(--accent-primary)]">just work</span>
        </h1>
        <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Merge, split, compress, and convert — instantly in your browser. No uploads. No sign-ups. No limits.
        </p>
      </section>

      {/* Tool Grid */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {tools.map((tool) => {
            const colors = colorMap[tool.color];
            return (
              <Link
                key={tool.slug}
                to={`/${tool.slug}`}
                className={`group p-5 rounded-xl bg-[var(--background)] border border-[var(--border-primary)] ${colors.border} hover:shadow-[var(--card-shadow-hover)] transition-all duration-200`}
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`shrink-0 w-10 h-10 rounded-lg ${colors.bg} ${colors.icon} flex items-center justify-center`}>
                    {iconMap[tool.icon]}
                  </div>
                  <h2 className="text-[15px] font-semibold text-[var(--text-primary)] flex-1">
                    {tool.shortTitle}
                  </h2>
                  <ArrowRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <p className="text-sm text-[var(--text-tertiary)] leading-snug pl-[52px]">{tool.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SEO content — visible, useful, keyword-rich */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 pb-16">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Why use Veloxx PDF Tools?</h2>
        <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
          <p>
            Veloxx PDF Tools lets you <strong>merge PDF files</strong>, <strong>split PDFs</strong>, <strong>compress PDFs</strong>, and <strong>convert between JPG and PDF</strong> — all for free, directly in your browser. Unlike other online PDF tools, your files are never uploaded to a server. Everything runs locally using WebAssembly, so your documents stay completely private.
          </p>
          <p>
            Whether you need to <strong>combine multiple PDFs into one</strong>, <strong>extract pages from a PDF</strong>, <strong>reduce PDF file size</strong> for email, or <strong>convert images to PDF</strong>, our tools handle it instantly with no sign-up required. Works on any device — desktop, tablet, or mobile.
          </p>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-y border-[var(--border-primary)] bg-[var(--surface-primary)]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                <Lock size={18} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Private</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5 hidden sm:block">Files stay on your device</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                <Zap size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Instant</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5 hidden sm:block">No server processing</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center">
                <Shield size={18} className="text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Unlimited</p>
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5 hidden sm:block">No sign-up required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Room CTA */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-20 text-center">
        <p className="text-sm font-medium text-[var(--accent-primary)] mb-3">Veloxx.ai</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
          Need to share documents securely?
        </h2>
        <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-6">
          Veloxx is an AI-powered data room built for M&A, fundraising, and due diligence.
        </p>
        <a
          href="https://veloxx.ai/register"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] transition-colors"
        >
          Try Veloxx.ai free <ArrowRight size={15} />
        </a>
      </section>
    </>
  );
}
