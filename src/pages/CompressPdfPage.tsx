import { SEOHead, SITE_URL } from '@/components/layout/SEOHead';
import { CompressPdfTool } from '@/components/tools/CompressPdf';
import { CTABanner } from '@/components/shared/CTABanner';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('compress-pdf')!;
const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Compress PDF — Free Online', url: `${SITE_URL}/compress-pdf`, description: tool.metaDescription, applicationCategory: 'UtilityApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, creator: { '@type': 'Organization', name: 'Veloxx.ai', url: 'https://veloxx.ai' } };

export function CompressPdfPage() {
  return (
    <>
      <SEOHead title="Compress PDF Online — Free, Reduce File Size | Veloxx Tools" description="Compress PDF files online for free. Reduce PDF file size by up to 80% without losing quality. 100% browser-based, no upload required." canonical={`${SITE_URL}/compress-pdf`} keywords="compress pdf, reduce pdf size, pdf compressor, shrink pdf, compress pdf online free, make pdf smaller, reduce pdf file size" jsonLd={jsonLd} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">{tool.title}</h1>
          <p className="text-[var(--text-secondary)]">{tool.description}</p>
        </div>
        <CompressPdfTool />
        <CTABanner message={tool.ctaMessage} />
        <div className="mt-10 text-sm text-[var(--text-tertiary)] leading-relaxed space-y-2">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">How to compress a PDF</h2>
          <p>Drop your PDF file above and click "Compress." The tool removes duplicate objects and optimizes the internal structure to reduce file size while preserving visual quality. Everything runs in your browser — your file is never uploaded.</p>
        </div>
      </div>
    </>
  );
}
