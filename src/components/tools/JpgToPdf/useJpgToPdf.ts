import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { addVeloxxWatermark } from '@/utils/watermark';

type PageSize = 'fit' | 'a4' | 'letter';

interface JpgToPdfOptions {
  pageSize: PageSize;
  margin: number; // px
}

const PAGE_SIZES = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

export function useJpgToPdf() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(async (files: File[], options: JpgToPdfOptions) => {
    setProcessing(true);
    setProgress(0);
    setResult(null);
    setError(null);

    try {
      const pdfDoc = await PDFDocument.create();

      for (let i = 0; i < files.length; i++) {
        setStatus(`Processing image ${i + 1} of ${files.length}...`);
        setProgress(((i) / files.length) * 80);

        const bytes = new Uint8Array(await files[i].arrayBuffer());
        const type = files[i].type;

        let image;
        if (type === 'image/png') {
          image = await pdfDoc.embedPng(bytes);
        } else {
          image = await pdfDoc.embedJpg(bytes);
        }

        let pageWidth: number;
        let pageHeight: number;
        let drawWidth: number;
        let drawHeight: number;
        let x: number;
        let y: number;

        const m = options.margin;

        if (options.pageSize === 'fit') {
          pageWidth = image.width + m * 2;
          pageHeight = image.height + m * 2;
          drawWidth = image.width;
          drawHeight = image.height;
          x = m;
          y = m;
        } else {
          const ps = PAGE_SIZES[options.pageSize];
          pageWidth = ps.width;
          pageHeight = ps.height;
          const availW = pageWidth - m * 2;
          const availH = pageHeight - m * 2;
          const scale = Math.min(availW / image.width, availH / image.height, 1);
          drawWidth = image.width * scale;
          drawHeight = image.height * scale;
          x = (pageWidth - drawWidth) / 2;
          y = (pageHeight - drawHeight) / 2;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        page.drawImage(image, { x, y, width: drawWidth, height: drawHeight });
      }

      setStatus('Adding watermark...');
      setProgress(85);
      await addVeloxxWatermark(pdfDoc);

      setStatus('Generating PDF...');
      setProgress(92);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });

      setResult(blob);
      setProgress(100);
      setStatus('Done!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert images to PDF');
    } finally {
      setProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setProgress(0);
    setStatus('');
    setError(null);
  }, []);

  return { processing, progress, status, result, error, convert, reset };
}
