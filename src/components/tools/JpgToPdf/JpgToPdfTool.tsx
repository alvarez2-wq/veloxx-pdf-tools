import { useState } from 'react';
import { ToolProps } from '@/types/tool';
import { SharePanel } from '@/components/shared/SharePanel';
import { useFileDrop } from '@/hooks/useFileDrop';
import { useJpgToPdf } from './useJpgToPdf';
import { FileDropZone } from '@/components/shared/FileDropZone';
import { FileList } from '@/components/shared/FileList';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';

type PageSize = 'fit' | 'a4' | 'letter';

export function JpgToPdfTool({ onComplete, className }: ToolProps) {
  const [pageSize, setPageSize] = useState<PageSize>('fit');
  const [margin, setMargin] = useState(0);
  const { files, isDragging, error: fileError, addFiles, removeFile, moveFile, clearFiles, onDragOver, onDragLeave, onDrop } = useFileDrop({
    accept: 'image/jpeg,image/png,image/webp',
    multiple: true,
  });
  const { processing, progress, status, result, error: processError, convert, reset } = useJpgToPdf();

  const handleConvert = async () => {
    if (files.length === 0) return;
    const blob = await convert(files, { pageSize, margin });
    if (onComplete && result) {
      onComplete({ files: [{ name: 'converted.pdf', blob: result, mimeType: 'application/pdf' }] });
    }
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
            accept="image/jpeg,image/png,image/webp"
            acceptLabel="JPG, PNG, WebP"
            multiple={true}
            isDragging={isDragging}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onFilesSelected={addFiles}
            hasFiles={files.length > 0}
          />

          <FileList files={files} onRemove={removeFile} onMove={moveFile} showThumbnails={true} />

          {files.length > 0 && (
            <div className="space-y-4">
              {/* Options */}
              <div className="flex flex-wrap gap-4 p-4 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-primary)]">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Page Size</label>
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value as PageSize)}
                    className="px-3 py-1.5 text-sm rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-secondary)] text-[var(--text-primary)] outline-none"
                  >
                    <option value="fit">Fit to Image</option>
                    <option value="a4">A4</option>
                    <option value="letter">Letter</option>
                  </select>
                </div>
                {pageSize !== 'fit' && (
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Margin</label>
                    <select
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className="px-3 py-1.5 text-sm rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-secondary)] text-[var(--text-primary)] outline-none"
                    >
                      <option value={0}>None</option>
                      <option value={20}>Small</option>
                      <option value={40}>Medium</option>
                      <option value={60}>Large</option>
                    </select>
                  </div>
                )}
              </div>

              {processing ? (
                <ProgressBar progress={progress} status={status} />
              ) : (
                <button
                  onClick={handleConvert}
                  className="w-full py-3 rounded-xl bg-[var(--accent-primary)] text-white font-medium hover:bg-[var(--accent-primary-hover)] transition-colors text-sm"
                >
                  Convert to PDF
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center space-y-4 py-8">
          <div className="text-4xl mb-2">✅</div>
          <p className="text-lg font-semibold text-[var(--text-primary)]">PDF created successfully!</p>
          <p className="text-sm text-[var(--text-secondary)]">
            {files.length} image{files.length !== 1 ? 's' : ''} converted
          </p>
          <div className="flex items-center justify-center gap-3">
            <DownloadButton blob={result} filename="converted.pdf" label="Download PDF" />
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] transition-colors text-sm"
            >
              Convert More
            </button>
          </div>
          <SharePanel
            toolName="JPG to PDF"
            toolSlug="jpg-to-pdf"
            successMsg={`converted ${files.length} image${files.length !== 1 ? 's' : ''} to PDF`}
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
