import React from 'react';

interface ProjectArchitectureDiagramProps {
  projectId: string;
}

export const ProjectArchitectureDiagram: React.FC<ProjectArchitectureDiagramProps> = ({
  projectId,
}) => {
  if (projectId === 'fullstack-rag-platform') {
    return (
      <div className="p-4 rounded-xl border border-hairline bg-base/90 overflow-x-auto">
        <div className="font-mono text-[10px] text-accent-lime uppercase tracking-wider mb-2 font-semibold">
          // ARCHITECTURE // NAMESPACE-ISOLATED RAG PIPELINE + AUTH
        </div>
        <svg
          viewBox="0 0 620 90"
          className="w-full min-w-[560px] h-auto select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Flow connecting line */}
          <line
            x1="50"
            y1="40"
            x2="570"
            y2="40"
            stroke="var(--border-hairline)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Flow Nodes */}
          {/* Node 1: Ingestion */}
          <g>
            <rect x="15" y="18" width="75" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--border-hairline)" />
            <text x="52" y="38" textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">UPLOAD</text>
            <text x="52" y="50" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="JetBrains Mono, monospace">PDF / URL</text>
          </g>

          {/* Node 2: Chunking */}
          <g>
            <rect x="110" y="18" width="80" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--border-hairline)" />
            <text x="150" y="38" textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">CHUNKING</text>
            <text x="150" y="50" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="JetBrains Mono, monospace">Batch-Delay 429</text>
          </g>

          {/* Node 3: Embeddings */}
          <g>
            <rect x="210" y="18" width="80" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--border-hairline)" />
            <text x="250" y="38" textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">EMBEDDING</text>
            <text x="250" y="50" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="JetBrains Mono, monospace">GenAI Dense</text>
          </g>

          {/* Node 4: Pinecone */}
          <g>
            <rect x="310" y="18" width="95" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--accent-lime)" strokeWidth="1.5" />
            <text x="357" y="36" textAnchor="middle" fill="var(--accent-lime)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">PINECONE</text>
            <text x="357" y="50" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="JetBrains Mono, monospace">Namespace Isolated</text>
          </g>

          {/* Node 5: LLM Generation */}
          <g>
            <rect x="425" y="18" width="75" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--accent-cyan)" strokeWidth="1.25" />
            <text x="462" y="38" textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">LLM AGENT</text>
            <text x="462" y="50" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="JetBrains Mono, monospace">FastAPI API</text>
          </g>

          {/* Node 6: Answer */}
          <g>
            <rect x="520" y="18" width="85" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--accent-lime)" strokeWidth="1.5" />
            <text x="562" y="38" textAnchor="middle" fill="var(--accent-lime)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">ANSWER</text>
            <text x="562" y="50" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="JetBrains Mono, monospace">Grounded Q&amp;A</text>
          </g>

          {/* Auth & Security Layer Noted Across Top */}
          <rect x="15" y="70" width="590" height="16" rx="4" fill="var(--accent-cyan-glow)" stroke="var(--accent-cyan)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="310" y="81" textAnchor="middle" fill="var(--accent-cyan)" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            [SECURITY ENVELOPE] // AUTHENTICATION &amp; AUTHORIZATION (RBAC) DATA ISOLATION
          </text>
        </svg>
      </div>
    );
  }

  if (projectId === 'rag-web-search-assistant') {
    return (
      <div className="p-4 rounded-xl border border-hairline bg-base/90 overflow-x-auto">
        <div className="font-mono text-[10px] text-accent-lime uppercase tracking-wider mb-2 font-semibold">
          // ARCHITECTURE // MULTI-SOURCE INGESTION &amp; LIVE WEB HYBRID
        </div>
        <svg
          viewBox="0 0 540 85"
          className="w-full min-w-[480px] h-auto select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Bus */}
          <line
            x1="50"
            y1="35"
            x2="480"
            y2="35"
            stroke="var(--border-hairline)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Multi-source Ingestion */}
          <g>
            <rect x="15" y="14" width="95" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--border-hairline)" />
            <text x="62" y="33" textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">INGESTION</text>
            <text x="62" y="46" textAnchor="middle" fill="var(--text-muted)" fontSize="6.5" fontFamily="JetBrains Mono, monospace">PDF/Web/YouTube</text>
          </g>

          {/* ChromaDB Node */}
          <g>
            <rect x="135" y="14" width="95" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--accent-lime)" strokeWidth="1.5" />
            <text x="182" y="33" textAnchor="middle" fill="var(--accent-lime)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">CHROMADB</text>
            <text x="182" y="46" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="JetBrains Mono, monospace">Vector Knowledge</text>
          </g>

          {/* Gemini API Node */}
          <g>
            <rect x="255" y="14" width="90" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--accent-cyan)" strokeWidth="1.25" />
            <text x="300" y="33" textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">GEMINI API</text>
            <text x="300" y="46" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="JetBrains Mono, monospace">Reasoning Core</text>
          </g>

          {/* Answer Node */}
          <g>
            <rect x="375" y="14" width="145" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--accent-lime)" strokeWidth="1.5" />
            <text x="447" y="33" textAnchor="middle" fill="var(--accent-lime)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="700">SOURCE-CITED ANSWER</text>
            <text x="447" y="46" textAnchor="middle" fill="var(--text-muted)" fontSize="6.5" fontFamily="JetBrains Mono, monospace">Grounded Citations</text>
          </g>

          {/* Serper Web Search branch */}
          <rect x="210" y="65" width="180" height="16" rx="4" fill="var(--accent-cyan-glow)" stroke="var(--accent-cyan)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="300" y="76" textAnchor="middle" fill="var(--accent-cyan)" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            + OPTIONAL LIVE SERPER WEB SEARCH
          </text>
        </svg>
      </div>
    );
  }

  if (projectId === 'resume-enhancement-system') {
    return (
      <div className="p-4 rounded-xl border border-hairline bg-base/90 overflow-x-auto">
        <div className="font-mono text-[10px] text-accent-lime uppercase tracking-wider mb-2 font-semibold">
          // ARCHITECTURE // 6-AGENT CREWAI PIPELINE
        </div>
        <svg
          viewBox="0 0 540 85"
          className="w-full min-w-[480px] h-auto select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Connector */}
          <line
            x1="60"
            y1="40"
            x2="470"
            y2="40"
            stroke="var(--border-hairline)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Input Node */}
          <g>
            <rect x="15" y="18" width="105" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--border-hairline)" />
            <text x="67" y="38" textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">RESUME + JOB</text>
            <text x="67" y="50" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="JetBrains Mono, monospace">PyPDF2 Parsing</text>
          </g>

          {/* 6 CrewAI Agents Node */}
          <g>
            <rect x="155" y="18" width="170" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--accent-lime)" strokeWidth="1.5" />
            <text x="240" y="37" textAnchor="middle" fill="var(--accent-lime)" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="700">6 CREWAI AGENTS</text>
            <text x="240" y="50" textAnchor="middle" fill="var(--text-muted)" fontSize="7" fontFamily="JetBrains Mono, monospace">Skill Gap &amp; HR/DSA Prep</text>
          </g>

          {/* Output PDF Plan */}
          <g>
            <rect x="360" y="18" width="160" height="44" rx="6" fill="var(--bg-surface)" stroke="var(--accent-cyan)" strokeWidth="1.5" />
            <text x="440" y="37" textAnchor="middle" fill="var(--text-primary)" fontSize="8.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">IMPROVEMENT PLAN</text>
            <text x="440" y="50" textAnchor="middle" fill="var(--accent-lime)" fontSize="7" fontFamily="JetBrains Mono, monospace">Downloadable PDF</text>
          </g>
        </svg>
      </div>
    );
  }

  return null;
};

