import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import JSZip from 'jszip';
import { SharePanel } from '@/components/shared/SharePanel';
import { ToolProps } from '@/types/tool';
import { useFileDrop } from '@/hooks/useFileDrop';
import { useSplitPdf, SplitMode } from './useSplitPdf';
import { FileDropZone } from '@/components/shared/FileDropZone';
import { FileList } from '@/components/shared/FileList';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';

export function SplitPdfTool({ className }: ToolProps) {
  const [mode, setMode] = useState<SplitMode>('every-page');
  const [ranges, setRanges] = useState('');
  const [everyN, setEveryN] = useState(2);

  const { files, isDragging, error: fileError, addFiles, clearFiles, onDragOver, onDragLeave, onDrop, removeFile, moveFile } = useFileDrop({
    accept: 'application/pdf',
    multiple: false,
  });
  const { processing, progress, status, result, pageCount, error: processError, loadPageCount, split, reset } = useSplitPdf();

  useEffect(() => {
    if (files.length > 0) loadPageCount(files[0]);
  }, [files, loadPageCount]);

  const handleSplit = () => {
    if (files.length === 0) return;
    split(files[0], mode, ranges, everyN);
  };

  const handleDownloadAll = async () => {
    if (!result) return;
    if (result.files.length === 1) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(result.files[0].blob);
      a.download = result.files[0].name;
      a.click();
      return;
    }
    const zip = new JSZip();
    result.files.forEach((f) => zip.file(f.name, f.blob));
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(zipBlob);
    a.download = 'split-pdfs.zip';
    a.click();
  };

  const handleReset = () => {
    clearFiles();
    reset();
  };

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {!result ? (
        <>
          <FileDropZone
            accept="application/pdf"
            acceptLabel="PDF"
            multiple={false}
            isDragging={isDragging}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onFilesSelected={addFiles}
            hasFiles={files.length > 0}
          />

          <FileList files={files} onRemove={removeFile} onMove={moveFile} showReorder={false} />

          {files.length > 0 && pageCount > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-[var(--text-secondary)]">
                PDF has <span className="font-semibold text-[var(--text-primary)]">{pageCount}</span> page{pageCount !== 1 ? 's' : ''}
              </p>

              <div className="p-4 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-primary)] space-y-3">
                <label className="block text-xs font-medium text-[var(--text-secondary)]">Split Mode</label>
                <div className="flex flex-wrap gap-2">
                  {(['every-page', 'every-n', 'ranges'] as SplitMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                        mode === m
                          ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]'
                          : 'border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]'
                      }`}
                    >
                      {m === 'every-page' ? 'Every Page' : m === 'every-n' ? `Every N Pages` : 'Custom Ranges'}
                    </button>
                  ))}
                </div>

                {mode === 'every-n' && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-[var(--text-secondary)]">Split every</label>
                    <input
                      type="number"
                      min={1}
                      max={pageCount}
                      value={everyN}
                      onChange={(e) => setEveryN(Math.max(1, Number(e.target.value)))}
                      className="w-16 px-2 py-1 text-sm rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-secondary)] text-[var(--text-primary)] outline-none text-center"
                    />
                    <label className="text-sm text-[var(--text-secondary)]">pages</label>
                  </div>
                )}

                {mode === 'ranges' && (
                  <div>
                    <input
                      type="text"
                      placeholder="e.g. 1-3, 4-6, 7"
                      value={ranges}
                      onChange={(e) => setRanges(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-secondary)] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                    />
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                      Comma-separated page numbers or ranges (e.g., 1-3, 5, 7-10)
                    </p>
                  </div>
                )}
              </div>

              {processing ? (
                <ProgressBar progress={progress} status={status} />
              ) : (
                <button
                  onClick={handleSplit}
                  className="w-full py-3 rounded-xl bg-[var(--accent-primary)] text-white font-medium hover:bg-[var(--accent-primary-hover)] transition-colors text-sm"
                >
                  Split PDF
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="text-center py-4">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-lg font-semibold text-[var(--text-primary)]">PDF split into {result.files.length} files!</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleDownloadAll}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-medium hover:bg-[var(--accent-primary-hover)] transition-colors text-sm"
            >
              <Download size={18} />
              Download {result.files.length > 1 ? 'All (ZIP)' : 'PDF'}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] transition-colors text-sm"
            >
              Split Another
            </button>
          </div>
          <div className="space-y-1.5">
            {result.files.map((f, i) => (
              <a
                key={i}
                href={URL.createObjectURL(f.blob)}
                download={f.name}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--surface-primary)] border border-[var(--border-primary)] hover:border-[var(--accent-primary)] transition-colors"
              >
                <span className="text-sm text-[var(--text-primary)]">{f.name}</span>
                <Download size={14} className="text-[var(--text-muted)]" />
              </a>
            ))}
          </div>
          <SharePanel
            toolName="Split PDF"
            toolSlug="split"
            successMsg={`split into ${result.files.length} files`}
          />
        </div>
      )}

      {(fileError || processError) && (
        <p className="text-sm text-[var(--error)]">{fileError || processError}</p>
      )}

      <PrivacyBadge />
    </div>
  );
}
