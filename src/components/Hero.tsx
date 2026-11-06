import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  ArrowUpRight,
  Download,
  MapPin,
  Cpu,
  Terminal,
} from 'lucide-react';
import { heroContent, profile } from '../data/content';
import { GithubIcon, LinkedinIcon } from './Icons';
import { RagPipelineDiagram } from './RagPipelineDiagram';

// Animated Counter component
const StatCounter: React.FC<{
  target: number;
  suffix?: string;
  isDecimal?: boolean;
}> = ({ target, suffix = '', isDecimal = false }) => {
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    let start = 0;
    const duration = 1200; // ms
    const steps = 40;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, shouldReduceMotion]);

  const displayValue = isDecimal ? count.toFixed(2) : Math.floor(count).toString();

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { subtitles } = heroContent;
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect for the hero subtitle
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(subtitles[0]);
      return;
    }

    const currentWord = subtitles[subtitleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const nextText = currentWord.substring(0, displayText.length + 1);
          setDisplayText(nextText);
          if (nextText === currentWord) {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else {
          const nextText = currentWord.substring(0, displayText.length - 1);
          setDisplayText(nextText);
          if (nextText === '') {
            setIsDeleting(false);
            setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
          }
        }
      },
      typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, subtitleIndex, subtitles, shouldReduceMotion]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Hero Overview"
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start"
        >
          {/* Left Column: Editorial Headline & Sub-copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status Monospace Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-surface/90 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-lime" />
                </span>
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-content-secondary font-medium">
                  {heroContent.monoLabel}
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-content-primary leading-[1.08] mb-4"
            >
              {heroContent.headlinePrefix}{' '}
              <span className="relative inline-block text-accent-lime underline decoration-accent-lime/40 decoration-wavy underline-offset-8">
                {heroContent.headlineHighlight}
              </span>
            </motion.h1>

            {/* Cycling Terminal Subtitle */}
            <motion.div
              variants={itemVariants}
              className="flex items-center h-8 sm:h-9 mb-6 font-mono text-base sm:text-lg md:text-xl text-accent-cyan"
              aria-live="polite"
              aria-label={`Role: ${displayText}`}
            >
              <Terminal className="w-4 h-4 mr-2 text-content-muted shrink-0" />
              <span className="text-content-muted mr-1.5">&gt;</span>
              <span className="font-semibold text-content-primary tracking-wide">
                {displayText}
              </span>
              <span className="terminal-cursor" aria-hidden="true" />
            </motion.div>

            {/* Editorial Sub-copy */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-content-secondary max-w-2xl leading-relaxed mb-8 font-normal"
            >
              {heroContent.subCopy}
            </motion.p>

            {/* Call To Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              {/* Primary Lime Button */}
              <a
                href={heroContent.primaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent-lime text-white dark:text-[#0B0D12] font-semibold text-sm hover:bg-accent-lime-hover shadow-lime-glow transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-lime min-h-[44px]"
              >
                <span>{heroContent.primaryCta.label}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* Secondary CV Button */}
              <a
                href={heroContent.secondaryCta.href}
                download="Habib-ur-Rehman_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-hairline bg-surface hover:bg-surface-elevated hover:border-accent-lime/60 text-content-primary text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-lime min-h-[44px]"
              >
                <Download className="w-4 h-4 text-accent-lime" />
                <span>{heroContent.secondaryCta.label}</span>
              </a>

              {/* External Social Icon Buttons */}
              <div className="flex items-center gap-2 ml-1">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Habib-ur-Rehman GitHub profile"
                  className="p-3 rounded-lg border border-hairline bg-surface hover:bg-surface-elevated hover:border-accent-lime/60 hover:text-accent-lime text-content-secondary transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-lime min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Habib-ur-Rehman LinkedIn profile"
                  className="p-3 rounded-lg border border-hairline bg-surface hover:bg-surface-elevated hover:border-accent-lime/60 hover:text-accent-lime text-content-secondary transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-lime min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: AI Systems Console Status Card */}
          <motion.div variants={itemVariants} className="lg:col-span-5 w-full">
            <div className="console-card rounded-xl overflow-hidden shadow-sm">
              {/* Card Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-base/80 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-content-muted font-medium">
                    {heroContent.systemStatus.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-accent-lime">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-lime animate-pulse" />
                  <span>LIVE</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Status Field */}
                <div>
                  <div className="font-mono text-[10px] text-content-muted uppercase tracking-wider mb-1">
                    [01] // CURRENT AVAILABILITY
                  </div>
                  <div className="flex items-center gap-2 text-sm font-mono text-content-primary font-medium">
                    <span className="inline-block w-2 h-2 rounded-full bg-accent-lime shadow-[0_0_8px_var(--accent-lime)]" />
                    <span>{heroContent.systemStatus.status}</span>
                  </div>
                </div>

                {/* Role Field */}
                <div className="pt-2 border-t border-hairline/60">
                  <div className="font-mono text-[10px] text-content-muted uppercase tracking-wider mb-1">
                    [02] // VERIFIED INTERNSHIP
                  </div>
                  <div className="flex items-center gap-2 text-sm font-mono text-content-primary">
                    <Cpu className="w-3.5 h-3.5 text-accent-lime shrink-0" />
                    <span>{heroContent.systemStatus.activeRole}</span>
                  </div>
                </div>

                {/* Location Field */}
                <div className="pt-2 border-t border-hairline/60">
                  <div className="font-mono text-[10px] text-content-muted uppercase tracking-wider mb-1">
                    [03] // BASE LOCATION
                  </div>
                  <div className="flex items-center gap-2 text-sm font-mono text-content-secondary">
                    <MapPin className="w-3.5 h-3.5 text-accent-cyan shrink-0" />
                    <span>{heroContent.systemStatus.location}</span>
                  </div>
                </div>

                {/* Core Stack Tags */}
                <div className="pt-2 border-t border-hairline/60">
                  <div className="font-mono text-[10px] text-content-muted uppercase tracking-wider mb-2">
                    [04] // ACTIVE PRODUCTION STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {heroContent.systemStatus.coreStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono border border-hairline bg-base/50 text-content-primary hover:border-accent-lime/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interactive Stage 3 RAG Pipeline Architecture Diagram */}
                <div className="pt-3 border-t border-hairline/60">
                  <RagPipelineDiagram />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Strip Under Hero with Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-16 sm:mt-20 pt-8 border-t border-hairline"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {heroContent.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="flex flex-col border-l border-hairline pl-4 sm:pl-6 relative group"
              >
                <span className="font-mono text-[10px] text-content-muted uppercase tracking-wider mb-1">
                  // METRIC 0{idx + 1}
                </span>
                <div className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-content-primary group-hover:text-accent-lime transition-colors">
                  <StatCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </div>
                <span className="text-xs sm:text-sm text-content-secondary mt-1 font-mono">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
