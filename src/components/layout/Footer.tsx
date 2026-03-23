import { Link } from 'react-router-dom';
import { tools } from '@/config/tools';

export function Footer({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <footer className="border-t border-[var(--border-primary)] bg-[var(--surface-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src={theme === 'dark' ? '/logos/veloxx-logo-black.svg' : '/logos/veloxx-logo-primary-transparent.svg'}
              alt="Veloxx.ai"
              className="h-7 w-auto mb-3"
            />
            <p className="text-sm text-[var(--text-tertiary)] max-w-xs mb-4">
              Free PDF tools by Veloxx.ai. 100% browser-based — your files never leave your device.
            </p>
            <a
              href="https://veloxx.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition-colors"
            >
              Veloxx.ai — The AI-Powered Data Room &rarr;
            </a>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Tools</h4>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    to={`/${tool.slug}`}
                    className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                  >
                    {tool.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Veloxx */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Veloxx.ai</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://veloxx.ai/#features" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="https://veloxx.ai/#security" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="https://veloxx.ai/pricing" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="https://veloxx.ai/blog" target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border-primary)] mt-8 pt-6 text-center">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Veloxx.ai — All rights reserved. Your files are processed locally and never uploaded to any server.
          </p>
        </div>
      </div>
    </footer>
  );
}
