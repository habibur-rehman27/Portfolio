import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronUp, Cpu, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { experience } from '../data/content';

export const Experience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  // State for expanded details in each phase; default first phase open
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
  });

  const togglePhase = (phaseNumber: number) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseNumber]: !prev[phaseNumber],
    }));
  };

  const item = experience[0]; // Acclivousbyte internship

  return (
    <section
      id="experience"
      aria-label="Engineering Experience & Internships"
      className="scroll-mt-24 py-16 md:py-24 border-t border-hairline relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Monospace Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-xs text-accent-lime font-bold tracking-wider">
            // 02
          </span>
          <span className="text-content-muted">/</span>
          <span className="font-mono text-xs uppercase tracking-wider text-content-secondary font-medium">
            EXPERIENCE
          </span>
          <div className="h-px bg-hairline flex-1 ml-2" />
        </motion.div>

        {/* Company & Role Header Card */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="console-card rounded-xl p-6 mb-12 border border-hairline bg-surface/90"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-accent-lime font-semibold mb-1">
                <Building2 className="w-4 h-4" />
                <span>{item.company}</span>
                <span className="text-content-muted">·</span>
                <span className="px-2 py-0.5 rounded text-[10px] border border-hairline bg-base text-accent-cyan">
                  {item.status.toUpperCase()}
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-content-primary">
                {item.role}
              </h2>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-content-muted bg-base px-3 py-1.5 rounded-lg border border-hairline self-start md:self-auto">
              <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
              <span>{item.period}</span>
            </div>
          </div>
        </motion.div>

        {/* Vertical Timeline of 3 Phases */}
        <div className="relative pl-6 sm:pl-8 ml-2 sm:ml-4 border-l border-hairline space-y-10 sm:space-y-12">
          {item.phases.map((phase) => {
            const isExpanded = Boolean(expandedPhases[phase.phaseNumber]);
            const detailsId = `phase-details-${phase.phaseNumber}`;
            const headerId = `phase-header-${phase.phaseNumber}`;

            return (
              <motion.div
                key={phase.phaseNumber}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: phase.phaseNumber * 0.1 }}
                className="relative"
              >
                {/* Node dot on the vertical hairline with lime accent */}
                <div
                  className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-base border-2 border-accent-lime shadow-[0_0_8px_var(--accent-lime)] flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="w-1 h-1 rounded-full bg-accent-lime" />
                </div>

                {/* Phase Content Container */}
                <div className="console-card rounded-xl p-5 sm:p-6 border border-hairline bg-surface/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-accent-lime font-bold">
                        PHASE 0{phase.phaseNumber}
                      </span>
                      <span className="text-content-muted">/</span>
                      <h3 id={headerId} className="font-heading text-lg sm:text-xl font-bold text-content-primary">
                        {phase.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-content-muted">
                      <Cpu className="w-3 h-3 text-accent-cyan" />
                      <span>STAGE_EXECUTION</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-content-secondary leading-relaxed mb-4">
                    {phase.summary}
                  </p>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {phase.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-xs font-mono border border-hairline bg-base/70 text-content-primary hover:border-accent-lime/60 hover:text-accent-lime transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Keyboard Accessible Expandable Details Button */}
                  <div className="pt-3 border-t border-hairline/60">
                    <button
                      type="button"
                      id={`btn-${phase.phaseNumber}`}
                      aria-expanded={isExpanded}
                      aria-controls={detailsId}
                      onClick={() => togglePhase(phase.phaseNumber)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-content-muted hover:text-accent-lime transition-colors focus-visible:ring-1 focus-visible:ring-accent-lime rounded py-1"
                    >
                      <span>{isExpanded ? 'COLLAPSE TECHNICAL BREAKDOWN' : 'VIEW TECHNICAL BREAKDOWN'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-accent-lime" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-accent-lime" />
                      )}
                    </button>

                    {/* Expandable Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={detailsId}
                          role="region"
                          aria-labelledby={headerId}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-3 pt-3 border-t border-hairline/40 space-y-2.5 text-xs sm:text-sm font-sans text-content-secondary">
                            {phase.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-accent-lime shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

