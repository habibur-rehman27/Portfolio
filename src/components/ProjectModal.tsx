import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Cpu, Layers } from 'lucide-react';
import type { ProjectItem } from '../data/content';
import { GithubIcon } from './Icons';
import { ProjectArchitectureDiagram } from './ProjectArchitectureDiagram';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Keyboard navigation: Escape key to close + Focus Trap
  useEffect(() => {
    if (!project) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isAiProject =
    project.id === 'fullstack-rag-platform' ||
    project.id === 'resume-enhancement-system' ||
    project.id === 'rag-web-search-assistant';

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        aria-describedby="modal-project-description"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-base/80 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl rounded-2xl border border-hairline bg-surface/98 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-base/60">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-accent-lime font-bold">
                PROJECT_SPEC
              </span>
              <span className="text-content-muted">/</span>
              <span className="font-mono text-[11px] text-content-secondary uppercase">
                {project.category}
              </span>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details modal"
              className="p-1.5 rounded-lg border border-hairline bg-surface text-content-secondary hover:text-accent-lime hover:border-accent-lime/60 transition-colors focus-visible:ring-2 focus-visible:ring-accent-lime"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Title & Category */}
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-accent-cyan">
                <Cpu className="w-3.5 h-3.5" />
                <span>SYSTEM ID: {project.id}</span>
              </div>
              <h2
                id="modal-project-title"
                className="font-heading text-2xl sm:text-3xl font-bold text-content-primary"
              >
                {project.title}
              </h2>
            </div>

            {/* Optional Architecture Mini-Diagram for AI Projects */}
            {isAiProject && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-content-muted uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-accent-lime" />
                  <span>SYSTEM_ARCHITECTURE_TOPOLOGY</span>
                </div>
                <ProjectArchitectureDiagram projectId={project.id} />
              </div>
            )}

            {/* Full Description */}
            <div>
              <div className="font-mono text-xs text-content-muted uppercase tracking-wider mb-2">
                // SYSTEM OVERVIEW
              </div>
              <p
                id="modal-project-description"
                className="text-base text-content-secondary leading-relaxed"
              >
                {project.description}
              </p>
            </div>

            {/* Architectural Highlights */}
            <div>
              <div className="font-mono text-xs text-content-muted uppercase tracking-wider mb-3">
                // KEY ARCHITECTURAL SPECIFICATIONS
              </div>
              <ul className="space-y-2.5 text-sm text-content-secondary">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent-lime shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <div className="font-mono text-xs text-content-muted uppercase tracking-wider mb-3">
                // PRODUCTION TECH STACK
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md text-xs font-mono border border-hairline bg-base text-content-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer with Links */}
          <div className="px-6 py-4 border-t border-hairline bg-base/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-hairline bg-surface hover:border-accent-lime/60 hover:text-accent-lime text-xs font-mono text-content-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent-lime"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              ) : null}

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-lime text-white dark:text-[#0B0D12] font-semibold text-xs font-mono hover:bg-accent-lime-hover shadow-lime-glow transition-colors focus-visible:ring-2 focus-visible:ring-accent-lime min-h-[44px]"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : null}

              {!project.githubUrl && !project.liveUrl && (
                <span className="font-mono text-xs text-content-muted">
                  // Proprietary / Academic source code
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-hairline bg-surface hover:bg-base text-xs font-mono text-content-secondary transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
