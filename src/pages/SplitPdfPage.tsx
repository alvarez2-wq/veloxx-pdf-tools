import { SEOHead, SITE_URL } from '@/components/layout/SEOHead';
import { SplitPdfTool } from '@/components/tools/SplitPdf';
import { CTABanner } from '@/components/shared/CTABanner';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('split-pdf')!;
const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Split PDF — Free Online', url: `${SITE_URL}/split-pdf`, description: tool.metaDescription, applicationCategory: 'UtilityApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, creator: { '@type': 'Organization', name: 'Veloxx.ai', url: 'https://veloxx.ai' } };

export function SplitPdfPage() {
  return (
    <>
      <SEOHead title="Split PDF Online — Free, Extract Pages | Veloxx Tools" description="Split PDF files into separate pages or custom ranges for free. Extract specific pages from any PDF. 100% browser-based, no upload required." canonical={`${SITE_URL}/split-pdf`} keywords="split pdf, extract pdf pages, split pdf online free, pdf splitter, separate pdf pages, divide pdf" jsonLd={jsonLd} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">{tool.title}</h1>
          <p className="text-[var(--text-secondary)]">{tool.description}</p>
        </div>
        <SplitPdfTool />
        <CTABanner message={tool.ctaMessage} />
        <div className="mt-10 text-sm text-[var(--text-tertiary)] leading-relaxed space-y-2">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">How to split a PDF</h2>
          <p>Upload your PDF file, then choose how to split it: every page, every N pages, or custom page ranges. Click "Split" and download individual files or a ZIP archive. All processing happens locally in your browser.</p>
        </div>
      </div>
    </>
  );
}
