import { ToolProps } from '@/types/tool';
import { useFileDrop } from '@/hooks/useFileDrop';
import { useMergePdf } from './useMergePdf';
import { FileDropZone } from '@/components/shared/FileDropZone';
import { FileList } from '@/components/shared/FileList';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { PrivacyBadge } from '@/components/shared/PrivacyBadge';

export function MergePdfTool({ className }: ToolProps) {
  const { files, isDragging, error: fileError, addFiles, removeFile, moveFile, clearFiles, onDragOver, onDragLeave, onDrop } = useFileDrop({
    accept: 'application/pdf',
    multiple: true,
  });
  const { processing, progress, status, result, error: processError, merge, reset } = useMergePdf();

  const handleMerge = () => {
    if (files.length < 2) return;
    merge(files);
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
            multiple={true}
            isDragging={isDragging}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onFilesSelected={addFiles}
            hasFiles={files.length > 0}
          />

          <FileList files={files} onRemove={removeFile} onMove={moveFile} />

          {files.length > 0 && (
            <>
              {files.length < 2 && (
                <p className="text-sm text-[var(--warning)]">Add at least 2 PDF files to merge.</p>
              )}
              {processing ? (
                <ProgressBar progress={progress} status={status} />
              ) : (
                <button
                  onClick={handleMerge}
                  disabled={files.length < 2}
                  className="w-full py-3 rounded-xl bg-[var(--accent-primary)] text-white font-medium hover:bg-[var(--accent-primary-hover)] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Merge {files.length} PDFs
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <div className="text-center space-y-4 py-8">
          <div className="text-4xl mb-2">✅</div>
          <p className="text-lg font-semibold text-[var(--text-primary)]">PDFs merged successfully!</p>
          <p className="text-sm text-[var(--text-secondary)]">{files.length} files combined into one</p>
          <div className="flex items-center justify-center gap-3">
            <DownloadButton blob={result} filename="merged.pdf" label="Download Merged PDF" />
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] transition-colors text-sm"
            >
              Merge More
            </button>
          </div>
        </div>
      )}

      {(fileError || processError) && (
        <p className="text-sm text-[var(--error)]">{fileError || processError}</p>
      )}

      <PrivacyBadge />
    </div>
  );
}
