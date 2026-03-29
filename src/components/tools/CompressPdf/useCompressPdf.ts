import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { addVeloxxWatermark } from '@/utils/watermark';

export interface CompressionResult {
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  savings: number;
}

export function useCompressPdf() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const compress = useCallback(async (file: File) => {
    setProcessing(true);
    setProgress(0);
    setResult(null);
    setError(null);

    try {
      const originalSize = file.size;
      setStatus('Loading PDF...');
      setProgress(20);

      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });

      setStatus('Stripping metadata...');
      setProgress(40);

      // Strip metadata to reduce size
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');

      setStatus('Optimizing...');
      setProgress(60);

      setStatus('Adding watermark...');
      setProgress(75);
      await addVeloxxWatermark(pdfDoc);

      // Save with object stream optimization
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      setStatus('Finalizing...');
      setProgress(92);

      const compressedSize = compressedBytes.length;
      const savings = Math.round(((originalSize - compressedSize) / originalSize) * 100);

      const blob = new Blob([compressedBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      setResult({ blob, originalSize, compressedSize, savings });
      setProgress(100);
      setStatus('Done!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compress PDF');
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

  return { processing, progress, status, result, error, compress, reset };
}
