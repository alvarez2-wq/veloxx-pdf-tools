import { useRef, DragEvent } from 'react';
import { Upload, Clipboard } from 'lucide-react';

interface FileDropZoneProps {
  accept: string;
  acceptLabel: string;
  multiple: boolean;
  isDragging: boolean;
  onDragOver: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
  onFilesSelected: (files: File[]) => void;
  hasFiles: boolean;
}

export function FileDropZone({
  accept,
  acceptLabel,
  multiple,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFilesSelected,
  hasFiles,
}: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) onFilesSelected(files);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200 ${
        isDragging
          ? 'border-[var(--accent-primary)] bg-[var(--selected-bg)] scale-[1.01]'
          : hasFiles
          ? 'border-[var(--border-secondary)] bg-[var(--surface-primary)] hover:border-[var(--accent-primary)]/50'
          : 'border-[var(--border-secondary)] bg-[var(--surface-primary)] hover:border-[var(--accent-primary)]/50 hover:bg-[var(--hover-bg)]'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center">
          <Upload size={28} className="text-[var(--accent-primary)]" />
        </div>
        <div>
          <p className="text-lg font-semibold text-[var(--text-primary)] mb-1">
            {hasFiles ? 'Add more files' : 'Drop files here'}
          </p>
          <p className="text-sm text-[var(--text-tertiary)]">
            or click to browse &middot; {acceptLabel}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <Clipboard size={12} />
          <span>You can also paste from clipboard (Ctrl+V / Cmd+V)</span>
        </div>
      </div>
    </div>
  );
}
