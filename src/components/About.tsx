import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Terminal, Sparkles, Code, Search, MapPin, GraduationCap } from 'lucide-react';
import { profile } from '../data/content';

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="about"
      aria-label="About Habib-ur-Rehman"
      className="scroll-mt-24 py-16 md:py-24 border-t border-hairline relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Monospace Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={revealVariants}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-xs text-accent-lime font-bold tracking-wider">
            // 01
          </span>
          <span className="text-content-muted">/</span>
          <span className="font-mono text-xs uppercase tracking-wider text-content-secondary font-medium">
            ABOUT
          </span>
          <div className="h-px bg-hairline flex-1 ml-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Photo / Initials Frame with Thin Lime Outline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={revealVariants}
            className="lg:col-span-4 w-full flex flex-col items-center sm:items-start"
          >
            <div className="relative group w-48 h-48 sm:w-56 sm:h-56 rounded-2xl p-1 border border-accent-lime/60 bg-surface shadow-lime-glow-sm transition-all duration-300 hover:border-accent-lime hover:shadow-lime-glow">
              {profile.photoPath ? (
                <img
                  src={profile.photoPath}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                /* Clean "HR" initials fallback (replace photoPath in content.ts to use an image) */
                <div className="w-full h-full rounded-xl bg-surface-elevated border border-hairline flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
                  <span className="font-heading text-4xl sm:text-5xl font-bold tracking-widest text-accent-lime relative z-10">
                    {profile.initials}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-content-muted mt-2 relative z-10">
                    {profile.role.split('&')[0].trim()}
                  </span>
                </div>
              )}

              {/* Status pill on bottom corner */}
              <div className="absolute -bottom-3 -right-2 px-2.5 py-1 rounded-full border border-hairline bg-base/95 backdrop-blur-sm flex items-center gap-1.5 font-mono text-[10px] text-content-primary shadow-sm">
                <span className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Quick Metadata Snippet */}
            <div className="mt-8 space-y-2.5 font-mono text-xs w-full">
              <div className="flex items-center justify-between py-1.5 border-b border-hairline/60">
                <span className="text-content-muted flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent-cyan" /> LOCATION
                </span>
                <span className="text-content-primary font-medium">{profile.location}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-hairline/60">
                <span className="text-content-muted flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-accent-lime" /> EDUCATION
                </span>
                <span className="text-content-primary font-medium">BS CS · 6th Sem</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & "Currently" Mini-List */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={revealVariants}
            className="lg:col-span-8 space-y-8"
          >
            {/* Human, confident paragraph based on profile.summary */}
            <div className="space-y-4">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-content-primary leading-snug">
                Engineering intelligent systems with deep software fundamentals.
              </h2>
              <p className="text-base sm:text-lg text-content-secondary leading-relaxed font-normal">
                {profile.summary}
              </p>
            </div>

            {/* "Currently" Mini-List in Monospace Styling */}
            <div className="console-card rounded-xl p-5 sm:p-6 border border-hairline bg-surface/80">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-hairline font-mono text-xs text-content-muted uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-accent-lime" />
                <span>CURRENT_TELEMETRY // SIGNALS</span>
              </div>

              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-2.5 rounded-lg border border-hairline/60 bg-base/60">
                  <span className="text-accent-cyan font-semibold shrink-0 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    LEARNING:
                  </span>
                  <span className="text-content-primary">
                    {profile.currently.learning}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-2.5 rounded-lg border border-hairline/60 bg-base/60">
                  <span className="text-accent-lime font-semibold shrink-0 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" />
                    BUILDING:
                  </span>
                  <span className="text-content-primary">
                    {profile.currently.building}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-2.5 rounded-lg border border-hairline/60 bg-base/60">
                  <span className="text-accent-lime font-semibold shrink-0 flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5" />
                    LOOKING FOR:
                  </span>
                  <span className="text-content-primary font-medium">
                    {profile.currently.lookingFor}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
