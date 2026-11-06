import React from 'react';
import { ArrowUp, Terminal, Mail } from 'lucide-react';
import { footerContent, profile } from '../data/content';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative mt-24 border-t border-hairline bg-surface/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Monospace Brand & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2 font-mono text-sm font-semibold text-content-primary">
              <Terminal className="w-3.5 h-3.5 text-accent-lime" />
              <span>{footerContent.copyright}</span>
            </div>
            <p className="font-mono text-xs text-content-muted">
              {profile.role} · {profile.location}
            </p>
          </div>

          {/* Center: Monospace Tagline */}
          <div className="font-mono text-xs text-content-secondary px-3 py-1 rounded-full border border-hairline/80 bg-base/50">
            // {footerContent.tagline}
          </div>

          {/* Right: Quick Links & Back To Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Habib-ur-Rehman on GitHub"
                className="p-2 rounded-lg border border-hairline bg-surface hover:text-accent-lime hover:border-accent-lime/60 text-content-secondary transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Habib-ur-Rehman on LinkedIn"
                className="p-2 rounded-lg border border-hairline bg-surface hover:text-accent-lime hover:border-accent-lime/60 text-content-secondary transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Habib-ur-Rehman on WhatsApp"
                className="p-2 rounded-lg border border-hairline bg-surface hover:text-accent-lime hover:border-accent-lime/60 text-content-secondary transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email Habib-ur-Rehman"
                className="p-2 rounded-lg border border-hairline bg-surface hover:text-accent-lime hover:border-accent-lime/60 text-content-secondary transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-hairline bg-surface hover:border-accent-lime/60 text-content-primary hover:text-accent-lime text-xs font-mono transition-colors focus-visible:ring-2 focus-visible:ring-accent-lime"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-accent-lime" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
