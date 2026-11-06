import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar, MapPin } from 'lucide-react';
import { education, coursework, certifications } from '../data/content';

export const Education: React.FC = () => {
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
      id="education"
      aria-label="Education, Coursework and Certifications"
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
            // 04
          </span>
          <span className="text-content-muted">/</span>
          <span className="font-mono text-xs uppercase tracking-wider text-content-secondary font-medium">
            EDUCATION & CREDENTIALS
          </span>
          <div className="h-px bg-hairline flex-1 ml-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Education Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={revealVariants}
            className="lg:col-span-5"
          >
            <div className="console-card rounded-2xl p-6 sm:p-7 border border-hairline bg-surface/90 shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="p-3 rounded-xl border border-hairline bg-base text-accent-lime">
                  <GraduationCap className="w-6 h-6" />
                </div>
                {/* Highlighted CGPA Badge */}
                <div className="px-3 py-1.5 rounded-lg border border-accent-lime/50 bg-accent-lime/10 text-accent-lime font-mono text-xs font-bold shadow-lime-glow-sm">
                  CGPA {education.cgpa}
                </div>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-bold text-content-primary mb-1">
                {education.degree}
              </h2>
              <div className="text-base text-accent-cyan font-medium mb-3">
                {education.institution}
              </div>

              <div className="space-y-2.5 font-mono text-xs text-content-secondary pt-4 border-t border-hairline/60">
                <div className="flex items-center justify-between">
                  <span className="text-content-muted flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> DURATION
                  </span>
                  <span className="text-content-primary font-medium">
                    {education.startYear} – {education.endYear}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-content-muted flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> LOCATION
                  </span>
                  <span className="text-content-primary font-medium">
                    {education.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-content-muted">CURRENT STATUS</span>
                  <span className="text-accent-lime font-semibold">
                    {education.semester} (Enrolled)
                  </span>
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-6 pt-4 border-t border-hairline/40 flex items-center justify-between font-mono text-[10px] text-content-muted">
                <span>ACADEMIC_RECORD // VERIFIED</span>
                <span className="text-accent-lime">SUPERIOR_UNIV</span>
              </div>
            </div>
          </motion.div>

          {/* Coursework & Certifications Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Relevant Coursework */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={revealVariants}
              className="console-card rounded-2xl p-6 sm:p-7 border border-hairline bg-surface/80"
            >
              <div className="flex items-center justify-between pb-4 border-b border-hairline mb-5">
                <div className="flex items-center gap-2 font-mono text-xs text-content-primary font-semibold">
                  <BookOpen className="w-4 h-4 text-accent-lime" />
                  <span>KEY COURSEWORK & ACADEMIC RIGOR</span>
                </div>
                <span className="font-mono text-[11px] text-content-muted">
                  {coursework.length} Subjects
                </span>
              </div>

              {/* Coursework small mono chips */}
              <div className="flex flex-wrap gap-2">
                {coursework.map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-1 rounded-md text-xs font-mono border border-hairline bg-base/70 text-content-secondary hover:border-accent-lime/60 hover:text-accent-lime hover:bg-base transition-colors"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Certifications Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={revealVariants}
            >
              <div className="flex items-center gap-2 font-mono text-xs text-content-muted uppercase tracking-wider mb-4">
                <Award className="w-4 h-4 text-accent-lime" />
                <span>PROFESSIONAL CERTIFICATIONS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="console-card rounded-xl p-4 border border-hairline bg-surface/80 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-heading text-sm font-bold text-content-primary mb-1">
                        {cert.title}
                      </h4>
                      <p className="font-mono text-xs text-accent-cyan">
                        {cert.issuer}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-hairline/60 flex items-center justify-between font-mono text-[10px] text-content-muted">
                      <span>ISSUED</span>
                      <span className="text-content-primary">{cert.issueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
