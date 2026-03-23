import { SEOHead, SITE_URL } from '@/components/layout/SEOHead';
import { JpgToPdfTool } from '@/components/tools/JpgToPdf';
import { CTABanner } from '@/components/shared/CTABanner';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('jpg-to-pdf')!;
const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'JPG to PDF — Free Online Converter', url: `${SITE_URL}/jpg-to-pdf`, description: tool.metaDescription, applicationCategory: 'UtilityApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, creator: { '@type': 'Organization', name: 'Veloxx.ai', url: 'https://veloxx.ai' } };

export function JpgToPdfPage() {
  return (
    <>
      <SEOHead title="JPG to PDF Converter — Free Online, No Upload | Veloxx Tools" description="Convert JPG, JPEG, and PNG images to PDF for free. Drag and drop or paste images to create PDFs instantly. 100% browser-based, no upload required." canonical={`${SITE_URL}/jpg-to-pdf`} keywords="jpg to pdf, convert jpg to pdf, image to pdf, png to pdf, jpeg to pdf, photo to pdf, jpg to pdf converter free" jsonLd={jsonLd} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">{tool.title}</h1>
          <p className="text-[var(--text-secondary)]">{tool.description}</p>
        </div>
        <JpgToPdfTool />
        <CTABanner message={tool.ctaMessage} />
        <div className="mt-10 text-sm text-[var(--text-tertiary)] leading-relaxed space-y-2">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">How to convert JPG to PDF</h2>
          <p>Drag and drop your JPG, PNG, or WebP images into the tool above. Choose your page size (A4, Letter, or fit to image), then click "Convert to PDF." Multiple images are combined into a single PDF. Your files never leave your device.</p>
        </div>
      </div>
    </>
  );
}
