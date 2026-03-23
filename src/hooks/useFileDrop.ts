import { useState, useCallback, useEffect, DragEvent } from 'react';

interface UseFileDropOptions {
  accept: string;
  multiple: boolean;
  maxSizeMB?: number;
}

export function useFileDrop({ accept, multiple, maxSizeMB = 100 }: UseFileDropOptions) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const acceptedTypes = accept.split(',').map((t) => t.trim());

  const validateFiles = useCallback(
    (incoming: File[]): File[] => {
      const valid: File[] = [];
      for (const f of incoming) {
        if (!acceptedTypes.some((t) => f.type === t || f.name.toLowerCase().endsWith(t.replace('image/', '.').replace('application/', '.')))) {
          setError(`"${f.name}" is not a supported file type.`);
          continue;
        }
        if (f.size > maxSizeMB * 1024 * 1024) {
          setError(`"${f.name}" exceeds ${maxSizeMB}MB limit.`);
          continue;
        }
        valid.push(f);
      }
      return valid;
    },
    [acceptedTypes, maxSizeMB]
  );

  const addFiles = useCallback(
    (incoming: File[]) => {
      setError(null);
      const valid = validateFiles(incoming);
      if (valid.length === 0) return;
      if (multiple) {
        setFiles((prev) => [...prev, ...valid]);
      } else {
        setFiles([valid[0]]);
      }
    },
    [multiple, validateFiles]
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const moveFile = useCallback((fromIndex: number, toIndex: number) => {
    setFiles((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setError(null);
  }, []);

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      addFiles(droppedFiles);
    },
    [addFiles]
  );

  // Clipboard paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const pastedFiles: File[] = [];
      for (const item of Array.from(items)) {
        if (item.kind === 'file') {
          const f = item.getAsFile();
          if (f) pastedFiles.push(f);
        }
      }
      if (pastedFiles.length > 0) {
        e.preventDefault();
        addFiles(pastedFiles);
      }
    };
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [addFiles]);

  return {
    files,
    isDragging,
    error,
    addFiles,
    removeFile,
    moveFile,
    clearFiles,
    onDragOver,
    onDragLeave,
    onDrop,
  };
}
