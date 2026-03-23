import { SEOHead } from '@/components/layout/SEOHead';
import { SplitPdfTool } from '@/components/tools/SplitPdf';
import { CTABanner } from '@/components/shared/CTABanner';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('split-pdf')!;

export function SplitPdfPage() {
  return (
    <>
      <SEOHead title={`${tool.title} — Free Online | Veloxx Tools`} description={tool.metaDescription} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">{tool.title}</h1>
          <p className="text-[var(--text-secondary)]">{tool.description}</p>
        </div>
        <SplitPdfTool />
        <CTABanner message={tool.ctaMessage} />
      </div>
    </>
  );
}
