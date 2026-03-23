import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';

export type SplitMode = 'every-page' | 'ranges' | 'every-n';

export interface SplitResult {
  files: { name: string; blob: Blob }[];
}

function parseRanges(input: string, maxPage: number): number[][] {
  const ranges: number[][] = [];
  const parts = input.split(',').map((s) => s.trim()).filter(Boolean);
  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      if (start >= 1 && end <= maxPage && start <= end) {
        const pages: number[] = [];
        for (let i = start; i <= end; i++) pages.push(i - 1); // 0-indexed
        ranges.push(pages);
      }
    } else {
      const p = Number(part);
      if (p >= 1 && p <= maxPage) {
        ranges.push([p - 1]);
      }
    }
  }
  return ranges;
}

export function useSplitPdf() {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState<SplitResult | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadPageCount = useCallback(async (file: File) => {
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      setPageCount(pdf.getPageCount());
    } catch {
      setError('Could not read PDF.');
    }
  }, []);

  const split = useCallback(async (file: File, mode: SplitMode, rangesInput: string, everyN: number) => {
    setProcessing(true);
    setProgress(0);
    setResult(null);
    setError(null);

    try {
      setStatus('Loading PDF...');
      const bytes = new Uint8Array(await file.arrayBuffer());
      const sourcePdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const total = sourcePdf.getPageCount();

      let groups: number[][];

      if (mode === 'every-page') {
        groups = Array.from({ length: total }, (_, i) => [i]);
      } else if (mode === 'every-n') {
        groups = [];
        for (let i = 0; i < total; i += everyN) {
          const group: number[] = [];
          for (let j = i; j < Math.min(i + everyN, total); j++) group.push(j);
          groups.push(group);
        }
      } else {
        groups = parseRanges(rangesInput, total);
        if (groups.length === 0) {
          setError('Invalid page ranges. Use format like: 1-3, 5, 7-10');
          setProcessing(false);
          return;
        }
      }

      const results: { name: string; blob: Blob }[] = [];

      for (let i = 0; i < groups.length; i++) {
        setStatus(`Creating part ${i + 1} of ${groups.length}...`);
        setProgress(((i + 1) / groups.length) * 100);

        const newDoc = await PDFDocument.create();
        const copiedPages = await newDoc.copyPages(sourcePdf, groups[i]);
        copiedPages.forEach((p) => newDoc.addPage(p));

        const pdfBytes = await newDoc.save();
        const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        const label = groups[i].length === 1
          ? `page-${groups[i][0] + 1}.pdf`
          : `pages-${groups[i][0] + 1}-${groups[i][groups[i].length - 1] + 1}.pdf`;
        results.push({ name: label, blob });
      }

      setResult({ files: results });
      setProgress(100);
      setStatus('Done!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to split PDF');
    } finally {
      setProcessing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setPageCount(0);
    setProgress(0);
    setStatus('');
    setError(null);
  }, []);

  return { processing, progress, status, result, pageCount, error, loadPageCount, split, reset };
}
