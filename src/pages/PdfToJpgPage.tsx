import { SEOHead } from '@/components/layout/SEOHead';
import { PdfToJpgTool } from '@/components/tools/PdfToJpg';
import { CTABanner } from '@/components/shared/CTABanner';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('pdf-to-jpg')!;

export function PdfToJpgPage() {
  return (
    <>
      <SEOHead title={`${tool.title} — Free Online | Veloxx Tools`} description={tool.metaDescription} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">{tool.title}</h1>
          <p className="text-[var(--text-secondary)]">{tool.description}</p>
        </div>
        <PdfToJpgTool />
        <CTABanner message={tool.ctaMessage} />
      </div>
    </>
  );
}
