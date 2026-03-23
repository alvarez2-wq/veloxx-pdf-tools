import { Download } from 'lucide-react';

interface DownloadButtonProps {
  blob: Blob;
  filename: string;
  label?: string;
}

export function DownloadButton({ blob, filename, label = 'Download' }: DownloadButtonProps) {
  const handleDownload = () => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-medium hover:bg-[var(--accent-primary-hover)] transition-colors text-sm"
    >
      <Download size={18} />
      {label}
    </button>
  );
}
