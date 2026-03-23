import { SEOHead, SITE_URL } from '@/components/layout/SEOHead';
import { PdfToJpgTool } from '@/components/tools/PdfToJpg';
import { CTABanner } from '@/components/shared/CTABanner';
import { getToolBySlug } from '@/config/tools';

const tool = getToolBySlug('pdf-to-jpg')!;
const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'PDF to JPG — Free Online Converter', url: `${SITE_URL}/pdf-to-jpg`, description: tool.metaDescription, applicationCategory: 'UtilityApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, creator: { '@type': 'Organization', name: 'Veloxx.ai', url: 'https://veloxx.ai' } };

export function PdfToJpgPage() {
  return (
    <>
      <SEOHead title="PDF to JPG Converter — Free Online, High Quality | Veloxx Tools" description="Convert PDF pages to high-quality JPG images for free. Extract all pages as images with adjustable quality. 100% browser-based, no upload required." canonical={`${SITE_URL}/pdf-to-jpg`} keywords="pdf to jpg, convert pdf to image, pdf to jpeg, pdf to png, extract images from pdf, pdf to jpg converter free" jsonLd={jsonLd} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">{tool.title}</h1>
          <p className="text-[var(--text-secondary)]">{tool.description}</p>
        </div>
        <PdfToJpgTool />
        <CTABanner message={tool.ctaMessage} />
        <div className="mt-10 text-sm text-[var(--text-tertiary)] leading-relaxed space-y-2">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">How to convert PDF to JPG</h2>
          <p>Upload your PDF and adjust the quality slider if needed. Click "Convert to JPG" to render each page as a high-quality JPEG image. Download individual pages or all at once. Processing is done locally in your browser.</p>
        </div>
      </div>
    </>
  );
}
