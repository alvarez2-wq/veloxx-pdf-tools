import { ToolProps } from '@/types/tool';
import { useFileDrop } from '@/hooks/useFileDrop';
import { useCompressPdf } from './useCompressPdf';
import { FileDropZone } from '@/components/shared/FileDropZone';
import { FileList } from '@/components/shared/FileList';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';
import { SharePanel } from '@/components/shared/SharePanel';

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function CompressPdfTool({ className }: ToolProps) {
  const { files, isDragging, error: fileError, addFiles, clearFiles, onDragOver, onDragLeave, onDrop, removeFile, moveFile } = useFileDrop({
    accept: 'application/pdf',
    multiple: false,
  });
  const { processing, progress, status, result, error: processError, compress, reset } = useCompressPdf();

  const handleCompress = () => {
    if (files.length === 0) return;
    compress(files[0]);
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

          {files.length > 0 && (
            <>
              {processing ? (
                <ProgressBar progress={progress} status={status} />
              ) : (
                <button
                  onClick={handleCompress}
                  className="w-full py-3 rounded-xl bg-[var(--accent-primary)] text-white font-medium hover:bg-[var(--accent-primary-hover)] transition-colors text-sm"
                >
                  Compress PDF
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="text-center space-y-4 py-8">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-lg font-semibold text-[var(--text-primary)]">PDF compressed!</p>
            <div className="inline-flex items-center gap-6 px-6 py-3 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-primary)]">
              <div className="text-center">
                <p className="text-xs text-[var(--text-muted)] uppercase">Original</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{formatSize(result.originalSize)}</p>
              </div>
              <div className="text-2xl text-[var(--accent-primary)]">&rarr;</div>
              <div className="text-center">
                <p className="text-xs text-[var(--text-muted)] uppercase">Compressed</p>
                <p className="text-sm font-semibold text-[var(--success)]">{formatSize(result.compressedSize)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[var(--text-muted)] uppercase">Saved</p>
                <p className="text-sm font-semibold text-[var(--accent-primary)]">
                  {result.savings > 0 ? `${result.savings}%` : 'Already optimal'}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <DownloadButton blob={result.blob} filename="compressed.pdf" label="Download Compressed PDF" />
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl border border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] transition-colors text-sm"
              >
                Compress Another
              </button>
            </div>
          </div>
          <SharePanel
            toolName="Compress PDF"
            toolSlug="compress"
            successMsg={result.savings > 0 ? `reduced file size by ${result.savings}%` : undefined}
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
