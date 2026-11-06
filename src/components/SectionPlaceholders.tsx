import React from 'react';
import { Terminal, ArrowDownRight } from 'lucide-react';
import { NAVIGATION_LINKS } from '../data/content';

const SECTION_DESCRIPTIONS: Record<string, { title: string; stage: string; note: string }> = {
  about: {
    title: 'ABOUT HABIB',
    stage: 'STAGE 2',
    note: 'Background narrative, academic credentials (Superior University), core strengths.',
  },
  experience: {
    title: 'ENGINEERING EXPERIENCE',
    stage: 'STAGE 3',
    note: 'Acclivousbyte AI Engineer Internship: Backend, Applied GenAI (CrewAI/RAG), DevOps phases.',
  },
  projects: {
    title: 'FEATURED PROJECTS & SYSTEMS',
    stage: 'STAGE 3',
    note: 'Full-Stack RAG Platform, Smart Resume Screener, 6-Agent CrewAI Prep, LMS, Arduino Smart House.',
  },
  skills: {
    title: 'TECHNICAL ARSENAL & TOOLKIT',
    stage: 'STAGE 2',
    note: 'Languages, Web Frameworks, AI/NLP ecosystem, Databases, DevOps & Security.',
  },
  education: {
    title: 'EDUCATION & CERTIFICATIONS',
    stage: 'STAGE 2',
    note: 'BS CS (CGPA 3.64), Semester 6 coursework, professional technical certifications.',
  },
  contact: {
    title: 'TRANSMISSION // CONTACT',
    stage: 'STAGE 4',
    note: 'Direct email channel, professional social links, availability dispatch.',
  },
};

export const SectionPlaceholders: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {NAVIGATION_LINKS.map((link) => {
        const id = link.href.substring(1);
        const details = SECTION_DESCRIPTIONS[id] || {
          title: link.label.toUpperCase(),
          stage: 'UPCOMING',
          note: 'Section content in pipeline.',
        };

        return (
          <section
            key={id}
            id={id}
            tabIndex={-1}
            className="scroll-mt-24 pt-6"
            aria-labelledby={`heading-${id}`}
          >
            <div className="console-card rounded-xl p-6 sm:p-8 border border-hairline bg-surface/60 backdrop-blur-sm transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline/60 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-accent-lime font-bold">
                    {link.sectionNumber}
                  </span>
                  <span className="text-content-muted">/</span>
                  <h2
                    id={`heading-${id}`}
                    className="font-heading text-lg sm:text-xl font-bold tracking-tight text-content-primary"
                  >
                    {details.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="px-2 py-0.5 rounded border border-hairline bg-base text-content-muted">
                    SCHEDULED: {details.stage}
                  </span>
                  <span className="text-accent-cyan flex items-center gap-1">
                    <Terminal className="w-3 h-3" />
                    <span>READY_FOR_BUILD</span>
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-mono text-content-secondary leading-relaxed max-w-2xl">
                  {details.note}
                </p>
                <div className="hidden sm:block text-content-muted/40">
                  <ArrowDownRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

