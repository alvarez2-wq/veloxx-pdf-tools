import { useState, useCallback } from 'react';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export interface ConvertedPage {
  pageNum: number;
  blob: Blob;
  url: string;
}

export function usePdfToJpg() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [pages, setPages] = useState<ConvertedPage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(async (file: File, quality: number = 0.92, scale: number = 2) => {
    setProcessing(true);
    setProgress(0);
    setPages([]);
    setError(null);

    try {
      setStatus('Loading PDF...');
      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjs.getDocument({ data: bytes }).promise;
      const totalPages = pdf.numPages;
      const results: ConvertedPage[] = [];

      for (let i = 1; i <= totalPages; i++) {
        setStatus(`Converting page ${i} of ${totalPages}...`);
        setProgress((i / totalPages) * 100);

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d')!;

        await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => (b ? resolve(b) : reject(new Error('Canvas to blob failed'))),
            'image/jpeg',
            quality
          );
        });

        const url = URL.createObjectURL(blob);
        results.push({ pageNum: i, blob, url });
      }

      setPages(results);
      setProgress(100);
      setStatus('Done!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert PDF to images');
    } finally {
      setProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    pages.forEach((p) => URL.revokeObjectURL(p.url));
    setPages([]);
    setProgress(0);
    setStatus('');
    setError(null);
  }, [pages]);

  return { processing, progress, status, pages, error, convert, reset };
}
