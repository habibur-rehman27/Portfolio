import React, { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SpotlightBackground } from './components/SpotlightBackground';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';

// Code-split below-the-fold sections for optimized initial load
const About = lazy(() => import('./components/About').then((m) => ({ default: m.About })));
const Experience = lazy(() =>
  import('./components/Experience').then((m) => ({ default: m.Experience }))
);
const Skills = lazy(() => import('./components/Skills').then((m) => ({ default: m.Skills })));
const Education = lazy(() =>
  import('./components/Education').then((m) => ({ default: m.Education }))
);
const Projects = lazy(() =>
  import('./components/Projects').then((m) => ({ default: m.Projects }))
);
const Contact = lazy(() =>
  import('./components/Contact').then((m) => ({ default: m.Contact }))
);
const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette }))
);

// Minimal hairline section skeleton loader
const SectionSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse" aria-hidden="true">
    <div className="h-4 w-32 bg-hairline rounded mb-6" />
    <div className="h-32 rounded-xl bg-surface/50 border border-hairline" />
  </div>
);

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-base text-content-primary selection:bg-accent-lime/30 selection:text-content-primary relative flex flex-col font-sans transition-colors duration-200">
        {/* Subtle dot-grid blueprint background with cursor spotlight */}
        <SpotlightBackground />

        {/* Custom subtle cursor ring on desktop */}
        <CustomCursor />

        {/* Sticky Minimal AI Console Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 z-10">
          {/* Eagerly rendered Above-The-Fold Hero Section */}
          <Hero />

          {/* Code-split below-the-fold sections */}
          <Suspense fallback={<SectionSkeleton />}>
            <About />
            <Experience />
            <Skills />
            <Education />
            <Projects />
            <Contact />
          </Suspense>
        </main>

        {/* Minimal Console Footer */}
        <Footer />

        {/* Keyboard Command Console */}
        <Suspense fallback={null}>
          <CommandPalette />
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default App;
