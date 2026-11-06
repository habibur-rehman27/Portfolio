import React from 'react';
import { Layers } from 'lucide-react';

export const ProjectsPlaceholder: React.FC = () => {
  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-label="Projects Section (Stage 3)"
      className="scroll-mt-24 py-16 md:py-24 border-t border-hairline relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Monospace Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs text-accent-lime font-bold tracking-wider">
            // 05
          </span>
          <span className="text-content-muted">/</span>
          <span className="font-mono text-xs uppercase tracking-wider text-content-secondary font-medium">
            PROJECTS
          </span>
          <div className="h-px bg-hairline flex-1 ml-2" />
        </div>

        {/* Clean Stage 3 Standby Box */}
        <div className="console-card rounded-2xl p-8 border border-dashed border-accent-lime/40 bg-accent-lime/[0.02] flex flex-col items-center justify-center text-center gap-3">
          <div className="flex items-center gap-2 text-accent-lime font-mono text-sm font-semibold">
            <Layers className="w-4 h-4 animate-pulse" />
            <span>STAGE 3 REPOSITORY INGESTION IN PROGRESS</span>
          </div>
          <p className="font-mono text-xs text-content-muted max-w-xl leading-relaxed">
            // End-to-end RAG Platform, Smart Resume Screener, 6-Agent CrewAI System, RAG Web Search Assistant, Library Management System, and Automated Smart House queued for Stage 3 deployment.
          </p>
          <span className="text-[11px] font-mono text-accent-cyan bg-base px-3 py-1 rounded-full border border-hairline">
            RESERVED_ANCHOR // ID=&quot;projects&quot;
          </span>
        </div>
      </div>
    </section>
  );
};

