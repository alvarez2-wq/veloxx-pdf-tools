import { useState } from 'react';
import { Download } from 'lucide-react';
import JSZip from 'jszip';
import { SharePanel } from '@/components/shared/SharePanel';
import { ToolProps } from '@/types/tool';
import { useFileDrop } from '@/hooks/useFileDrop';
import { usePdfToJpg } from './usePdfToJpg';
import { FileDropZone } from '@/components/shared/FileDropZone';
import { FileList } from '@/components/shared/FileList';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';

export function PdfToJpgTool({ className }: ToolProps) {
  const [quality, setQuality] = useState(92);
  const { files, isDragging, error: fileError, addFiles, clearFiles, onDragOver, onDragLeave, onDrop, removeFile, moveFile } = useFileDrop({
    accept: 'application/pdf',
    multiple: false,
  });
  const { processing, progress, status, pages, error: processError, convert, reset } = usePdfToJpg();

  const handleConvert = () => {
    if (files.length === 0) return;
    convert(files[0], quality / 100);
  };

  const handleDownloadAll = async () => {
    if (pages.length === 1) {
      const a = document.createElement('a');
      a.href = pages[0].url;
      a.download = `page-1.jpg`;
      a.click();
      return;
    }
    const zip = new JSZip();
    for (const p of pages) {
      zip.file(`page-${p.pageNum}.jpg`, p.blob);
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pdf-pages.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    clearFiles();
    reset();
  };

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {pages.length === 0 ? (
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

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-primary)]">
                <label className="text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap">
                  Quality: {quality}%
                </label>
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="flex-1 accent-[var(--accent-primary)]"
                />
              </div>
              {processing ? (
                <ProgressBar progress={progress} status={status} />
              ) : (
                <button
                  onClick={handleConvert}
                  className="w-full py-3 rounded-xl bg-[var(--accent-primary)] text-white font-medium hover:bg-[var(--accent-primary-hover)] transition-colors text-sm"
                >
                  Convert to JPG
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[var(--text-secondary)]">
              {pages.length} page{pages.length !== 1 ? 's' : ''} converted
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadAll}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-white text-sm font-medium hover:bg-[var(--accent-primary-hover)] transition-colors"
              >
                <Download size={16} />
                Download {pages.length > 1 ? 'All (ZIP)' : 'JPG'}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg border border-[var(--border-secondary)] text-[var(--text-secondary)] text-sm hover:bg-[var(--hover-bg)] transition-colors"
              >
                Convert Another
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pages.map((p) => (
              <a
                key={p.pageNum}
                href={p.url}
                download={`page-${p.pageNum}.jpg`}
                className="group relative rounded-lg overflow-hidden border border-[var(--border-primary)] hover:border-[var(--accent-primary)] transition-colors"
              >
                <img src={p.url} alt={`Page ${p.pageNum}`} className="w-full h-auto" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Download size={20} className="text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                  <p className="text-xs text-white text-center">Page {p.pageNum}</p>
                </div>
              </a>
            ))}
          </div>
          <SharePanel
            toolName="PDF to JPG"
            toolSlug="pdf-to-jpg"
            successMsg={`converted ${pages.length} page${pages.length !== 1 ? 's' : ''} to JPG`}
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
