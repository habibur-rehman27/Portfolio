import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, FileDown, Terminal } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { NAVIGATION_LINKS, profile } from '../data/content';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = NAVIGATION_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-base/85 backdrop-blur-md border-b border-hairline py-3 shadow-sm'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-2 font-mono text-base font-bold tracking-tight text-content-primary hover:text-accent-lime transition-colors focus-visible:rounded"
            aria-label="Habib-ur-Rehman — Home"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded border border-hairline bg-surface group-hover:border-accent-lime/50 transition-colors">
              <Terminal className="w-3.5 h-3.5 text-accent-lime" />
            </span>
            <span className="tracking-wider">HR<span className="text-accent-lime">.</span></span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full border border-hairline/80 bg-surface/70 backdrop-blur-sm"
            aria-label="Primary Navigation"
          >
            {NAVIGATION_LINKS.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3 py-1 text-xs font-mono uppercase tracking-wider transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-accent-lime ${
                    isActive
                      ? 'text-accent-lime font-medium bg-base/60'
                      : 'text-content-secondary hover:text-content-primary hover:bg-base/40'
                  }`}
                >
                  <span className="text-content-muted mr-1 text-[10px] opacity-60">
                    {link.sectionNumber.split(' ')[1]}
                  </span>
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle + CV Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2.5 rounded-lg border border-hairline bg-surface hover:border-accent-lime/50 text-content-secondary hover:text-accent-lime transition-colors focus-visible:ring-2 focus-visible:ring-accent-lime min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Download CV Button */}
            <a
              href={profile.cvPath}
              download="Habib-ur-Rehman_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-lg border border-hairline bg-surface hover:border-accent-lime/70 text-content-primary hover:text-accent-lime hover:bg-base transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-lime min-h-[44px]"
            >
              <FileDown className="w-3.5 h-3.5 text-accent-lime" />
              <span>CV</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-lg border border-hairline bg-surface text-content-secondary"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className="p-2 rounded-lg border border-hairline bg-surface text-content-primary hover:text-accent-lime"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[57px] z-30 bg-base/95 backdrop-blur-xl border-t border-hairline flex flex-col p-6 sm:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="text-[11px] font-mono text-content-muted uppercase tracking-wider mb-4">
            // CONSOLE NAVIGATION
          </div>
          <nav className="flex flex-col gap-2">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-lg border border-hairline/60 bg-surface text-sm font-mono text-content-primary hover:border-accent-lime/60 hover:text-accent-lime transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs text-content-muted">{link.sectionNumber}</span>
              </a>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-hairline flex flex-col gap-3">
            <a
              href={profile.cvPath}
              download="Habib-ur-Rehman_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-mono font-medium rounded-lg bg-accent-lime text-white dark:text-[#0B0D12] hover:bg-accent-lime-hover transition-colors font-semibold shadow-lime-glow-sm min-h-[44px]"
            >
              <FileDown className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>

          <div className="mt-auto text-center font-mono text-[11px] text-content-muted">
            {profile.location} · {profile.statusText}
          </div>
        </div>
      )}
    </header>
  );
};

