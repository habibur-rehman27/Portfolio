import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Terminal, Cpu } from 'lucide-react';

export const RagPipelineDiagram: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  // Pause animation when off-screen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const nodes = [
    { label: 'DOCS', sub: 'PDF / URL', x: 40, y: 35 },
    { label: 'CHUNKING', sub: 'Batch Delay', x: 130, y: 35 },
    { label: 'EMBED', sub: 'Vectors', x: 220, y: 35 },
    { label: 'VECTOR DB', sub: 'Namespace', x: 310, y: 35 },
    { label: 'LLM AGENT', sub: 'CrewAI / GenAI', x: 400, y: 35 },
    { label: 'ANSWER', sub: 'Grounded', x: 490, y: 35 },
  ];

  const animateActive = isInView && !shouldReduceMotion;

  return (
    <div
      ref={containerRef}
      className="p-3 sm:p-4 rounded-xl border border-hairline bg-base/80 shadow-inner"
      aria-label="RAG Architecture Data Flow Diagram: Documents to Chunking to Embeddings to Vector DB to LLM to Grounded Answer"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-hairline font-mono text-[10px]">
        <div className="flex items-center gap-1.5 text-accent-lime font-semibold">
          <Terminal className="w-3 h-3 text-accent-lime" />
          <span>RAG.PIPELINE // DATA_FLOW</span>
        </div>
        <div className="flex items-center gap-1.5 text-accent-cyan">
          <Cpu className="w-3 h-3" />
          <span>{animateActive ? 'TRANSMITTING' : 'STATIC_MODE'}</span>
        </div>
      </div>

      {/* Responsive SVG Canvas */}
      <div className="w-full overflow-x-auto pb-1">
        <svg
          viewBox="0 0 540 70"
          className="w-full min-w-[460px] h-auto select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Connecting Hairline Bus */}
          <line
            x1="40"
            y1="35"
            x2="490"
            y2="35"
            stroke="var(--border-hairline)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Animated Traveling Data Pulses (Lime and Cyan) */}
          {animateActive && (
            <>
              {/* Pulse 1: Lime */}
              <circle r="3.5" fill="var(--accent-lime)">
                <animateMotion
                  path="M 40,35 L 490,35"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Pulse 2: Cyan (Staggered) */}
              <circle r="2.5" fill="var(--accent-cyan)">
                <animateMotion
                  path="M 40,35 L 490,35"
                  dur="3s"
                  begin="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          {/* Pipeline Nodes */}
          {nodes.map((node, i) => (
            <g key={node.label}>
              {/* Node Card Box */}
              <rect
                x={node.x - 36}
                y={node.y - 24}
                width="72"
                height="48"
                rx="6"
                fill="var(--bg-surface)"
                stroke={i === 3 || i === 4 ? 'var(--accent-lime)' : 'var(--border-hairline)'}
                strokeWidth={i === 3 || i === 4 ? '1.25' : '1'}
              />

              {/* Node Center Dot */}
              <circle
                cx={node.x}
                cy={node.y - 12}
                r="2"
                fill={i === 3 || i === 4 ? 'var(--accent-lime)' : 'var(--accent-cyan)'}
              />

              {/* Node Primary Mono Label */}
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="8.5"
                fontFamily="JetBrains Mono, monospace"
                fontWeight="600"
              >
                {node.label}
              </text>

              {/* Node Sub-text */}
              <text
                x={node.x}
                y={node.y + 16}
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="6.5"
                fontFamily="JetBrains Mono, monospace"
              >
                {node.sub}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Bottom Technical Footnote */}
      <div className="mt-2 pt-2 border-t border-hairline/60 flex items-center justify-between font-mono text-[9px] text-content-muted">
        <span>INPUT // PDF & WEB</span>
        <span className="text-accent-lime font-medium">OUTPUT // GROUNDED CITATION</span>
      </div>
    </div>
  );
};
