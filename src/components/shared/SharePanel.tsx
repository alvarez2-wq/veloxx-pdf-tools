import { useState } from 'react';
import { Link2, Twitter, Linkedin, Mail, Code, ChevronDown, ArrowRight, Check } from 'lucide-react';

interface SharePanelProps {
  toolName: string;      // e.g. "Merge PDF"
  toolSlug: string;      // e.g. "merge"
  successMsg?: string;   // e.g. "merged 3 files" — used in tweet copy
}

export function SharePanel({ toolName, toolSlug, successMsg }: SharePanelProps) {
  const [copied, setCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);

  const pageUrl = `https://tools.veloxx.ai/${toolSlug}`;
  const tweetText = encodeURIComponent(
    `Just used @VeloxxAI's free ${toolName} tool${successMsg ? ` — ${successMsg}` : ''}. 100% browser-based, nothing uploaded. Try it:`
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(pageUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
  const mailtoUrl = `mailto:?subject=Free ${toolName} tool&body=Check this out — free ${toolName.toLowerCase()}, no uploads, totally browser-based: ${pageUrl}`;
  const embedSnippet = `<a href="${pageUrl}" target="_blank" rel="noopener">Processed with <strong>Veloxx Tools</strong> — free ${toolName.toLowerCase()} online</a>`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select
    }
  };

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedSnippet);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="mt-6 space-y-4">

      {/* ── Share row ── */}
      <div className="p-4 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-primary)]">
        <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
          Found this useful? Share it
        </p>
        <div className="flex flex-wrap gap-2">

          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-black text-white hover:bg-zinc-800 transition-colors"
          >
            <Twitter size={13} />
            Post on X
          </a>

          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#0A66C2] text-white hover:bg-[#0959a8] transition-colors"
          >
            <Linkedin size={13} />
            Share on LinkedIn
          </a>

          <a
            href={mailtoUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] transition-colors"
          >
            <Mail size={13} />
            Send to a colleague
          </a>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border-secondary)] text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] transition-colors"
          >
            {copied ? <Check size={13} className="text-green-500" /> : <Link2 size={13} />}
            {copied ? 'Copied!' : 'Copy link'}
          </button>

        </div>
      </div>

      {/* ── Embed badge ── */}
      <div className="rounded-xl border border-[var(--border-primary)] overflow-hidden">
        <button
          onClick={() => setEmbedOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] transition-colors"
        >
          <span className="flex items-center gap-2">
            <Code size={13} />
            Add an embed badge to your site or newsletter
          </span>
          <ChevronDown size={13} className={`transition-transform ${embedOpen ? 'rotate-180' : ''}`} />
        </button>
        {embedOpen && (
          <div className="px-4 pb-4 space-y-2">
            <pre className="text-xs bg-[var(--surface-secondary)] text-[var(--text-secondary)] p-3 rounded-lg overflow-x-auto whitespace-pre-wrap break-all select-all">
              {embedSnippet}
            </pre>
            <button
              onClick={handleCopyEmbed}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] transition-colors"
            >
              {embedCopied ? <Check size={13} /> : <Code size={13} />}
              {embedCopied ? 'Copied!' : 'Copy snippet'}
            </button>
          </div>
        )}
      </div>

      {/* ── Data room CTA ── */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-[var(--accent-primary)]/10 to-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/25">
        <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
          Need to share this document securely?
        </p>
        <p className="text-xs text-[var(--text-secondary)] mb-3">
          Upload to a Veloxx Data Room — AI-powered Q&amp;A, granular access controls, investor-grade audit trails. Free to try.
        </p>
        <a
          href="https://veloxx.ai/register"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] transition-colors"
        >
          Try Veloxx Data Room free
          <ArrowRight size={14} />
        </a>
      </div>

    </div>
  );
}
