import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  Sparkles,
  Code2,
  Globe,
  Database,
  ShieldCheck,
  Wrench,
  Terminal,
  Cpu,
} from 'lucide-react';
import { skills } from '../data/content';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'AI / NLP': Sparkles,
  Languages: Code2,
  'Web & Frameworks': Globe,
  Databases: Database,
  'DevOps & Security': ShieldCheck,
  Tools: Wrench,
};

export const Skills: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const primaryGroup = skills.find((s) => s.isPrimary) || skills[0];
  const secondaryGroups = skills.filter((s) => s.id !== primaryGroup.id);

  const totalCount = skills.reduce((acc, cat) => acc + cat.skills.length, 0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="skills"
      aria-label="Technical Capabilities and Skills"
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
            // 03
          </span>
          <span className="text-content-muted">/</span>
          <span className="font-mono text-xs uppercase tracking-wider text-content-secondary font-medium">
            SKILLS
          </span>
          <div className="h-px bg-hairline flex-1 ml-2" />
        </motion.div>

        {/* Section Intro */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-content-primary">
              Technical Arsenal & Capabilities
            </h2>
            <p className="font-mono text-xs text-content-secondary mt-1">
              SYSTEM_CAPABILITY // {totalCount} PRODUCTION-TESTED TOOLS ACROSS 6 DISCIPLINES
            </p>
          </div>
          <div className="font-mono text-xs text-accent-cyan bg-base px-3 py-1.5 rounded-lg border border-hairline flex items-center gap-2 self-start sm:self-auto">
            <Cpu className="w-3.5 h-3.5" />
            <span>NO ARBITRARY PERCENTAGES · PURE TECH STACK</span>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-6"
        >
          {/* PRIMARY PANEL: AI / NLP (Larger, prominent lime border and glow) */}
          {primaryGroup && (
            <motion.div
              variants={itemVariants}
              className="console-card rounded-2xl p-6 sm:p-8 border-2 border-accent-lime/60 bg-surface/95 shadow-lime-glow relative overflow-hidden"
            >
              {/* Subtle background blueprint accent */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-lime/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-hairline mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl border border-accent-lime/40 bg-base text-accent-lime shadow-lime-glow-sm">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-accent-lime font-bold uppercase tracking-wider">
                          // PRIMARY COMPETENCY
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                      </div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-content-primary">
                        {primaryGroup.category}
                      </h3>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-content-muted bg-base px-3 py-1 rounded-full border border-hairline self-start sm:self-auto">
                    {primaryGroup.skills.length} Core Systems
                  </span>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {primaryGroup.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-mono border border-hairline bg-base/80 text-content-primary hover:border-accent-lime hover:text-accent-lime hover:shadow-[0_0_15px_var(--accent-lime-glow)] transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* SECONDARY PANELS: Responsive Grid for Languages, Web, DBs, DevOps, Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryGroups.map((group) => {
              const Icon = CATEGORY_ICONS[group.category] || Terminal;

              return (
                <motion.div
                  key={group.id}
                  variants={itemVariants}
                  className="console-card rounded-xl p-5 sm:p-6 border border-hairline bg-surface/80 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-hairline/80 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg border border-hairline bg-base text-accent-cyan">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4 className="font-heading text-base font-bold text-content-primary">
                          {group.category}
                        </h4>
                      </div>

                      <span className="font-mono text-[11px] text-content-muted bg-base px-2 py-0.5 rounded border border-hairline">
                        {group.skills.length}
                      </span>
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md text-xs font-mono border border-hairline bg-base/60 text-content-primary hover:border-accent-lime/70 hover:text-accent-lime hover:shadow-[0_0_12px_var(--accent-lime-glow)] transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-hairline/40 font-mono text-[10px] text-content-muted flex items-center justify-between">
                    <span>CAPABILITY_NODE</span>
                    <span className="text-accent-cyan">ACTIVE</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
