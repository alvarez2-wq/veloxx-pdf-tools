import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { addVeloxxWatermark } from '@/utils/watermark';

export function useMergePdf() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const merge = useCallback(async (files: File[]) => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge.');
      return;
    }

    setProcessing(true);
    setProgress(0);
    setResult(null);
    setError(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < files.length; i++) {
        setStatus(`Processing file ${i + 1} of ${files.length}: ${files[i].name}`);
        setProgress(((i) / files.length) * 85);

        const bytes = new Uint8Array(await files[i].arrayBuffer());
        const sourcePdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const pages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      setStatus('Adding watermark...');
      setProgress(88);
      await addVeloxxWatermark(mergedPdf);

      setStatus('Generating merged PDF...');
      setProgress(92);

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });

      setResult(blob);
      setProgress(100);
      setStatus('Done!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to merge PDF files');
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

  return { processing, progress, status, result, error, merge, reset };
}
