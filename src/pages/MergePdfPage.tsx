import { SEOHead, SITE_URL } from '@/components/layout/SEOHead';
import { MergePdfTool } from '@/components/tools/MergePdf';
import { CTABanner } from '@/components/shared/CTABanner';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('merge-pdf')!;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Merge PDF — Free Online PDF Merger',
  url: `${SITE_URL}/merge-pdf`,
  description: tool.metaDescription,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  creator: { '@type': 'Organization', name: 'Veloxx.ai', url: 'https://veloxx.ai' },
};

export function MergePdfPage() {
  return (
    <>
      <SEOHead
        title="Merge PDF Files Online — Free, No Upload | Veloxx Tools"
        description="Combine multiple PDF files into one document for free. Drag and drop to merge PDFs instantly in your browser. No upload, no sign-up, 100% private."
        canonical={`${SITE_URL}/merge-pdf`}
        keywords="merge pdf, combine pdf, join pdf files, merge pdf online free, pdf merger, combine pdf files into one, merge pdf no upload"
        jsonLd={jsonLd}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">{tool.title}</h1>
          <p className="text-[var(--text-secondary)]">{tool.description}</p>
        </div>
        <MergePdfTool />
        <CTABanner message={tool.ctaMessage} />
        <div className="mt-10 text-sm text-[var(--text-tertiary)] leading-relaxed space-y-2">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">How to merge PDF files</h2>
          <p>Select or drag multiple PDF files into the merge tool above. Reorder them by dragging, then click "Merge" to combine them into a single PDF. Your files are processed entirely in your browser — nothing is uploaded to any server.</p>
        </div>
      </div>
    </>
  );
}
