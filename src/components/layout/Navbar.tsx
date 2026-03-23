import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { tools } from '@/config/tools';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--background)]/90 backdrop-blur-xl border-b border-[var(--border-primary)]'
          : 'bg-[var(--background)]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={theme === 'dark' ? '/logos/veloxx-logo-black.svg' : '/logos/veloxx-logo-primary-transparent.svg'}
              alt="Veloxx.ai"
              className="h-8 w-auto"
            />
            <span className="text-sm font-medium text-[var(--text-tertiary)] hidden sm:block">Tools</span>
          </Link>

          {/* Desktop tool links */}
          <div className="hidden md:flex items-center gap-1">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                to={`/${tool.slug}`}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  location.pathname === `/${tool.slug}`
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]'
                }`}
              >
                {tool.shortTitle}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="https://veloxx.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-4 py-1.5 text-sm font-medium rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary-hover)] transition-colors"
            >
              Try Data Room
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-[var(--border-primary)] mt-2 pt-3">
            <div className="flex flex-col gap-1">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  to={`/${tool.slug}`}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    location.pathname === `/${tool.slug}`
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--hover-bg)]'
                  }`}
                >
                  {tool.shortTitle}
                </Link>
              ))}
              <a
                href="https://veloxx.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-3 py-2 text-sm font-medium rounded-lg bg-[var(--accent-primary)] text-white text-center"
              >
                Try Data Room
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
