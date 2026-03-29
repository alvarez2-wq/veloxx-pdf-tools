import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const WATERMARK_TEXT = 'Processed with Veloxx Tools · tools.veloxx.ai';

/**
 * Adds a subtle footer watermark to every page of a PDFDocument.
 * Call this on the final doc before .save().
 */
export async function addVeloxxWatermark(pdfDoc: PDFDocument): Promise<void> {
  try {
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 7;
    const textWidth = font.widthOfTextAtSize(WATERMARK_TEXT, fontSize);

    for (const page of pdfDoc.getPages()) {
      const { width } = page.getSize();
      page.drawText(WATERMARK_TEXT, {
        x: Math.max(0, (width - textWidth) / 2),
        y: 6,
        size: fontSize,
        font,
        color: rgb(0.55, 0.55, 0.55),
        opacity: 0.35,
      });
    }
  } catch {
    // Never block the main operation if watermark fails
  }
}
