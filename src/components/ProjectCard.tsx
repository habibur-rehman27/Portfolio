import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import type { ProjectItem } from '../data/content';
import { GithubIcon } from './Icons';

interface ProjectCardProps {
  project: ProjectItem;
  isFeatured?: boolean;
  onOpenModal: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isFeatured = false,
  onOpenModal,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Subtle 3D tilt calculation (max 4 deg, disabled on touch or reduced motion)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -3.5; // Max -3.5 to 3.5 deg
    const rotY = ((x - centerX) / centerX) * 3.5;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isAiCategory = project.category === 'AI & RAG';

  // Take 2-3 impact bullets
  const impactBullets = project.highlights.slice(0, 3);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          !isTouchDevice && !shouldReduceMotion
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
            : 'none',
        transition: 'transform 0.15s ease-out',
      }}
      className={`console-card rounded-2xl border bg-surface/90 flex flex-col justify-between relative overflow-hidden group cursor-pointer ${
        isFeatured
          ? 'md:col-span-2 border-accent-lime/40 shadow-lime-glow-sm hover:border-accent-lime'
          : 'border-hairline hover:border-accent-lime/60'
      }`}
      onClick={() => onOpenModal(project)}
      tabIndex={0}
      role="button"
      aria-label={`View detailed specs for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenModal(project);
        }
      }}
    >
      <div>
        {/* Top Header: Image or Generated Blueprint Pattern */}
        {project.image ? (
          <div className="w-full h-44 sm:h-52 overflow-hidden border-b border-hairline relative">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
          </div>
        ) : (
          /* Tasteful Generated Blueprint Header */
          <div className="w-full h-24 sm:h-28 border-b border-hairline bg-base/80 relative overflow-hidden flex items-center justify-between px-5">
            <div className="absolute inset-0 blueprint-grid opacity-50" />
            <div className="relative z-10 flex items-center gap-2 font-mono text-[11px] text-content-muted">
              <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
              <span>SYS_CODE // {project.id}</span>
            </div>
            <div className="relative z-10 font-mono text-[10px] text-accent-cyan bg-base/80 px-2 py-0.5 rounded border border-hairline">
              {project.category}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-3 mb-4 font-mono text-xs border-b border-hairline/60">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${
                isAiCategory
                  ? 'border-accent-lime/40 bg-accent-lime/10 text-accent-lime'
                  : 'border-hairline bg-base text-accent-cyan'
              }`}
            >
              {project.category}
            </span>

            <span className="text-[10px] font-mono text-content-muted group-hover:text-accent-lime transition-colors">
              CLICK TO INSPECT &rarr;
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-content-primary mb-2 group-hover:text-accent-lime transition-colors">
            {project.title}
          </h3>

          {/* One-line Pitch from Real Description */}
          <p className="text-sm sm:text-base text-content-secondary leading-relaxed mb-5 font-normal line-clamp-2">
            {project.description}
          </p>

          {/* 2-3 Impact Bullets taken only from real descriptions */}
          <div className="mb-5 space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-wider text-content-muted">
              // ARCHITECTURAL IMPACT
            </div>
            <ul className="space-y-1.5 text-xs text-content-secondary">
              {impactBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime shrink-0 mt-0.5" />
                  <span className="leading-relaxed line-clamp-2">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono border border-hairline bg-base/80 text-content-primary group-hover:border-accent-lime/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div
        className="px-6 py-4 border-t border-hairline/60 bg-base/50 flex items-center justify-between font-mono text-xs"
        onClick={(e) => e.stopPropagation()} // Prevent card modal trigger when clicking direct action buttons
      >
        <div className="flex items-center gap-2">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code on GitHub`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-surface hover:border-accent-lime/60 hover:text-accent-lime text-content-primary transition-colors focus-visible:ring-1 focus-visible:ring-accent-lime"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          ) : null}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Launch live demo for ${project.title}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-lime text-white dark:text-[#0B0D12] font-semibold hover:bg-accent-lime-hover shadow-lime-glow-sm transition-colors focus-visible:ring-1 focus-visible:ring-accent-lime"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : null}

          {!project.githubUrl && !project.liveUrl && (
            <span className="text-[10px] text-content-muted font-mono">
              [SPECS AVAILABLE IN MODAL]
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpenModal(project)}
          className="text-xs font-mono text-accent-lime hover:underline focus-visible:ring-1 focus-visible:ring-accent-lime rounded p-1"
        >
          Details &rarr;
        </button>
      </div>
    </motion.div>
  );
};
