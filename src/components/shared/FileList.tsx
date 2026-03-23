import { X, ChevronUp, ChevronDown, FileText, Image as ImageIcon } from 'lucide-react';

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
  onMove: (from: number, to: number) => void;
  showReorder?: boolean;
  showThumbnails?: boolean;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileList({ files, onRemove, onMove, showReorder = true, showThumbnails = false }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--text-secondary)]">
          {files.length} file{files.length !== 1 ? 's' : ''} selected
        </p>
      </div>
      <div className="space-y-1.5">
        {files.map((file, i) => (
          <div
            key={`${file.name}-${i}`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--surface-primary)] border border-[var(--border-primary)] group"
          >
            {showThumbnails && file.type.startsWith('image/') ? (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-10 h-10 rounded object-cover shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded bg-[var(--surface-secondary)] flex items-center justify-center shrink-0">
                {file.type.startsWith('image/') ? (
                  <ImageIcon size={18} className="text-[var(--text-muted)]" />
                ) : (
                  <FileText size={18} className="text-[var(--text-muted)]" />
                )}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm text-[var(--text-primary)] truncate">{file.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{formatSize(file.size)}</p>
            </div>

            {showReorder && files.length > 1 && (
              <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); if (i > 0) onMove(i, i - 1); }}
                  disabled={i === 0}
                  className="p-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); if (i < files.length - 1) onMove(i, i + 1); }}
                  disabled={i === files.length - 1}
                  className="p-0.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            )}

            <button
              onClick={(e) => { e.stopPropagation(); onRemove(i); }}
              className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--error)] hover:bg-[var(--surface-secondary)] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
