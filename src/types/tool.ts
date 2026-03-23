export interface ToolProps {
  onComplete?: (result: ToolResult) => void;
  showBranding?: boolean;
  showCTA?: boolean;
  className?: string;
}

export interface ToolResult {
  files: OutputFile[];
  metadata?: Record<string, unknown>;
}

export interface OutputFile {
  name: string;
  blob: Blob;
  mimeType: string;
}

export interface ToolConfig {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  icon: string;
  color: string;
  acceptedTypes: string;
  acceptLabel: string;
  multiple: boolean;
  ctaMessage: string;
}
