import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { projects, type ProjectItem } from '../data/content';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'AI & RAG', 'Full-Stack', 'Systems & Hardware'];

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section
      id="projects"
      aria-label="Engineered Systems and Production Projects"
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
            // 05
          </span>
          <span className="text-content-muted">/</span>
          <span className="font-mono text-xs uppercase tracking-wider text-content-secondary font-medium">
            PROJECTS
          </span>
          <div className="h-px bg-hairline flex-1 ml-2" />
        </motion.div>

        {/* Section Intro & Animated Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-content-primary">
              Applied AI Systems & Scalable Solutions
            </h2>
            <p className="font-mono text-xs text-content-secondary mt-1">
              PRODUCTION_REPOSITORIES // 6 SYSTEMS VERIFIED ACROSS MULTIPLE DOMAINS
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-lg border border-hairline bg-surface/80 backdrop-blur-sm self-start md:self-auto"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {categories.map((cat) => {
              const isActive = selectedFilter === cat;
              const count =
                cat === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedFilter(cat)}
                  className={`relative px-3.5 py-2 text-xs font-mono rounded-md transition-all duration-200 flex items-center gap-2 focus-visible:ring-1 focus-visible:ring-accent-lime min-h-[38px] ${
                    isActive
                      ? 'bg-accent-lime text-white dark:text-[#0B0D12] font-semibold shadow-lime-glow-sm'
                      : 'text-content-secondary hover:text-content-primary hover:bg-base/60'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-black/20 text-black' : 'text-content-muted'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive Projects Grid */}
        <motion.div
          layout={!shouldReduceMotion}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              // Top 2 projects are larger "featured" cards spanning 2 columns
              const isFeatured =
                project.id === 'fullstack-rag-platform' ||
                project.id === 'smart-resume-screener';

              return (
                <motion.div
                  key={project.id}
                  layout={!shouldReduceMotion}
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={isFeatured ? 'md:col-span-2' : 'col-span-1'}
                >
                  <ProjectCard
                    project={project}
                    isFeatured={isFeatured}
                    onOpenModal={(p) => setActiveModalProject(p)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Accessible Detail Modal with Architecture Diagram */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
