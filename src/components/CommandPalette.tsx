import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  X,
  FileDown,
  Sun,
  Moon,
  Mail,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { profile, NAVIGATION_LINKS } from '../data/content';

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Listen for global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing inside an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Toggle command palette with ? or Ctrl+K / Cmd+K
      if (e.key === '?' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      // Direct section jumps: 1 through 6
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= NAVIGATION_LINKS.length) {
        e.preventDefault();
        const targetLink = NAVIGATION_LINKS[num - 1];
        if (targetLink) {
          const el = document.querySelector(targetLink.href);
          el?.scrollIntoView({ behavior: 'smooth' });
          if (isOpen) setIsOpen(false);
        }
        return;
      }

      // Theme toggle: 't'
      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTheme();
        return;
      }

      // Download CV: 'c'
      if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = profile.cvPath;
        link.download = 'Habib-ur-Rehman_CV.pdf';
        link.click();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleTheme]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const jumpTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Subtle Floating Console Shortcut Pill on Desktop */}
      <div className="fixed bottom-5 right-5 z-30 hidden md:block">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-surface/90 backdrop-blur-md text-[11px] font-mono text-content-secondary hover:text-accent-lime hover:border-accent-lime/60 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-accent-lime"
          aria-label="Open Command Console shortcuts (Press ? or Ctrl+K)"
        >
          <Terminal className="w-3.5 h-3.5 text-accent-lime" />
          <span>CMD // PRESS</span>
          <kbd className="px-1.5 py-0.5 rounded border border-hairline bg-base text-[10px] text-content-primary">
            ?
          </kbd>
        </button>
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Command Console Shortcuts"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-base/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-2xl border border-hairline bg-surface/98 shadow-2xl overflow-hidden z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline bg-base/60">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-content-primary">
                  <Terminal className="w-3.5 h-3.5 text-accent-lime" />
                  <span>SYSTEM_COMMAND_PALETTE</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-content-muted hover:text-content-primary transition-colors"
                  aria-label="Close command palette"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Shortcuts List */}
              <div className="p-5 space-y-4 font-mono text-xs">
                {/* Section Navigation */}
                <div>
                  <div className="text-[10px] text-content-muted uppercase tracking-wider mb-2">
                    // QUICK JUMP NAVIGATION
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {NAVIGATION_LINKS.map((link, idx) => (
                      <button
                        key={link.label}
                        type="button"
                        onClick={() => jumpTo(link.href)}
                        className="flex items-center justify-between p-2 rounded-lg border border-hairline/70 bg-base/60 hover:border-accent-lime/60 hover:text-accent-lime transition-all text-left"
                      >
                        <span className="text-content-primary">{link.label}</span>
                        <kbd className="px-1.5 py-0.5 rounded border border-hairline bg-surface text-[10px] text-accent-lime">
                          {idx + 1}
                        </kbd>
                      </button>
                    ))}
                  </div>
                </div>

                {/* System Actions */}
                <div className="pt-2 border-t border-hairline/60">
                  <div className="text-[10px] text-content-muted uppercase tracking-wider mb-2">
                    // QUICK ACTIONS
                  </div>
                  <div className="space-y-2">
                    {/* Toggle theme */}
                    <button
                      type="button"
                      onClick={() => {
                        toggleTheme();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-lg border border-hairline/70 bg-base/60 hover:border-accent-lime/60 hover:text-accent-lime transition-all"
                    >
                      <div className="flex items-center gap-2">
                        {theme === 'dark' ? (
                          <Sun className="w-3.5 h-3.5 text-accent-lime" />
                        ) : (
                          <Moon className="w-3.5 h-3.5 text-accent-lime" />
                        )}
                        <span>Toggle Theme (Dark / Light)</span>
                      </div>
                      <kbd className="px-1.5 py-0.5 rounded border border-hairline bg-surface text-[10px] text-accent-lime">
                        T
                      </kbd>
                    </button>

                    {/* Download CV */}
                    <a
                      href={profile.cvPath}
                      download="Habib-ur-Rehman_CV.pdf"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-between p-2 rounded-lg border border-hairline/70 bg-base/60 hover:border-accent-lime/60 hover:text-accent-lime transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <FileDown className="w-3.5 h-3.5 text-accent-lime" />
                        <span>Download CV (PDF)</span>
                      </div>
                      <kbd className="px-1.5 py-0.5 rounded border border-hairline bg-surface text-[10px] text-accent-lime">
                        C
                      </kbd>
                    </a>

                    {/* Copy Email */}
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="w-full flex items-center justify-between p-2 rounded-lg border border-hairline/70 bg-base/60 hover:border-accent-lime/60 hover:text-accent-lime transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-accent-cyan" />
                        <span>Copy Email ({profile.email})</span>
                      </div>
                      <span className="text-accent-lime text-[10px]">
                        {copiedEmail ? 'COPIED!' : 'CLICK'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-2.5 border-t border-hairline bg-base/80 flex items-center justify-between font-mono text-[10px] text-content-muted">
                <span>HABIB-UR-REHMAN // PORTFOLIO</span>
                <span>ESC TO CLOSE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
