export interface Profile {
  name: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  whatsappUrl: string;
  cvPath: string;
  photoPath: string; // Set to image URL or leave empty to use 'initials' fallback
  summary: string;
  statusText: string;
  availability: string;
  currently: {
    learning: string;
    building: string;
    lookingFor: string;
  };
}

export interface InternshipPhase {
  phaseNumber: number;
  title: string;
  stack: string[];
  summary: string;
  details: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  startDate: string;
  endDate: string;
  status: string;
  phases: InternshipPhase[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI & RAG' | 'Full-Stack' | 'Systems & Hardware';
  stack: string[];
  description: string;
  highlights: string[];
  liveUrl: string;
  githubUrl: string;
  image?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  isPrimary?: boolean;
  skills: string[];
}

export interface EducationInfo {
  degree: string;
  institution: string;
  location: string;
  startYear: number;
  endYear: number;
  semester: string;
  cgpa: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  issueDate: string;
}

export interface HeroContent {
  monoLabel: string;
  headlinePrefix: string;
  headlineHighlight: string;
  subtitles: string[];
  subCopy: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  systemStatus: {
    title: string;
    status: string;
    activeRole: string;
    location: string;
    coreStack: string[];
    terminalNotice: string;
  };
  stats: Array<{
    value: number;
    suffix?: string;
    label: string;
    isDecimal?: boolean;
  }>;
}

export interface ContactContent {
  sectionLabel: string;
  closingHeadline: string;
  subtext: string;
  emailLabel: string;
  socialsLabel: string;
  locationLabel: string;
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    sendingButton: string;
    subjectPrefix: string;
    successMessage: string;
    errorMessage: string;
  };
}

export interface NavigationLink {
  label: string;
  href: string;
  sectionNumber: string;
}

export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'About', href: '#about', sectionNumber: '// 01' },
  { label: 'Experience', href: '#experience', sectionNumber: '// 02' },
  { label: 'Skills', href: '#skills', sectionNumber: '// 03' },
  { label: 'Education', href: '#education', sectionNumber: '// 04' },
  { label: 'Projects', href: '#projects', sectionNumber: '// 05' },
  { label: 'Contact', href: '#contact', sectionNumber: '// 06' },
];

export const heroContent: HeroContent = {
  monoLabel: 'OPEN TO INTERNSHIPS & ENTRY-LEVEL ROLES',
  headlinePrefix: 'I build AI systems that actually',
  headlineHighlight: 'ship.',
  subtitles: [
    'AI Engineer Intern',
    'Full-Stack Developer',
    'RAG & Agents Builder',
  ],
  subCopy: 'Computer Science student specializing in RAG pipelines, multi-agent systems, and full-stack web apps.',
  primaryCta: {
    label: 'View Projects',
    href: '#projects',
  },
  secondaryCta: {
    label: 'Download CV',
    href: '/Habib-ur-Rehman_CV.pdf',
  },
  systemStatus: {
    title: 'SYS.STATUS // NODE-ONLINE',
    status: 'Open to internships & entry-level roles',
    activeRole: 'AI Engineer Intern · Acclivousbyte (2026)',
    location: 'Lahore, Pakistan',
    coreStack: ['FastAPI', 'React', 'Pinecone', 'CrewAI', 'Docker', 'Python'],
    terminalNotice: 'PIPELINE_MODULE // SLOT_RESERVED [STAGE_3_INTEGRATION]',
  },
  stats: [
    { value: 6, label: 'Projects', suffix: '' },
    { value: 3, label: 'Internship Phases', suffix: '' },
    { value: 3.64, label: 'CGPA', isDecimal: true },
    { value: 10, label: 'Technologies', suffix: '+' },
  ],
};

export const profile: Profile = {
  name: 'Habib-ur-Rehman',
  initials: 'HR',
  role: 'AI Engineer & Full-Stack Developer',
  location: 'Lahore, Pakistan',
  email: 'habibhr112211@gmail.com',
  github: 'https://github.com/habibur-rehman27',
  linkedin: 'https://www.linkedin.com/in/habib-ur-rehman27',
  whatsapp: '+923034097496',
  whatsappUrl: 'https://wa.me/923034097496',
  cvPath: '/Habib-ur-Rehman_CV.pdf',
  photoPath: '/profile.jpg',
  statusText: 'Open to internships & entry-level roles',
  availability: 'Available immediately',
  summary:
    'Motivated Computer Science student at Superior University with a strong foundation in programming, web development, database management, and applied AI/NLP. Experienced in building practical software solutions across multiple domains, from full-stack web applications and management systems to an AI-powered resume screening platform. Actively seeking internship and entry-level opportunities to apply technical skills in real-world environments.',
  currently: {
    learning: 'advanced RAG & AI agents',
    building: 'AI-powered full-stack apps',
    lookingFor: 'internships & entry-level roles',
  },
};

export const experience: ExperienceItem[] = [
  {
    id: 'acclivousbyte-ai-intern',
    role: 'AI Engineer Intern',
    company: 'Acclivousbyte',
    period: 'July 31, 2026 – October 07, 2026',
    startDate: 'July 31, 2026',
    endDate: 'October 07, 2026',
    status: 'Completed',
    phases: [
      {
        phaseNumber: 1,
        title: 'Backend Development',
        summary:
          'Structured, scalable API development for system foundation using Python, Poetry, FastAPI, SQLModel, and Neon PostgreSQL.',
        stack: ['Python', 'Poetry', 'FastAPI', 'SQLModel', 'Neon (PostgreSQL)'],
        details: [
          'Engineered structured and high-throughput RESTful API endpoints using FastAPI and SQLModel with type-safe schemas.',
          'Configured and connected Neon serverless PostgreSQL for reliable relational data persistence and migrations.',
          'Managed reproducible virtual environments and package builds using Poetry.',
        ],
      },
      {
        phaseNumber: 2,
        title: 'Applied Generative AI',
        summary:
          'Multi-source RAG chatbot ingestion and a 6-agent CrewAI pipeline for automated resume-vs-job analysis and interview preparation.',
        stack: ['CrewAI', 'ChromaDB', 'LangChain', 'Python', 'AI Agents'],
        details: [
          'Implemented multi-source RAG knowledge base ingesting PDFs, web URLs, and YouTube transcripts using ChromaDB.',
          'Orchestrated a 6-agent autonomous CrewAI workflow to compare resumes against job postings and extract skill gaps.',
          'Generated tailored HR, DSA, and technical domain mock interview preparation roadmaps.',
        ],
      },
      {
        phaseNumber: 3,
        title: 'Full-Stack & DevOps',
        summary:
          'React (Vite) frontend with dynamic UI, upload forms, chat interface, auth management, Pinecone vector DB, and Docker containerization.',
        stack: ['React (Vite)', 'Pinecone', 'Docker', 'Authentication & Authorization'],
        details: [
          'Built an interactive React (Vite) frontend featuring dynamic UI, multi-format upload forms, and responsive chat stream.',
          'Integrated Authentication & Authorization for robust multi-tenant data isolation and security.',
          'Implemented namespace-isolated vector search in Pinecone Vector DB.',
          'Containerized the entire application stack using Docker for consistent, portable deployments.',
        ],
      },
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    id: 'fullstack-rag-platform',
    title: 'Full-Stack RAG Platform',
    category: 'AI & RAG',
    stack: ['FastAPI', 'React (Vite)', 'Pinecone', 'Docker', 'Google GenAI'],
    description:
      'End-to-end Retrieval-Augmented Generation platform for real-time Q&A over PDFs and web URLs, with a React frontend (dynamic UI, upload forms, chat).',
    highlights: [
      'Namespace-isolated vector search in Pinecone for multi-tenant data segregation.',
      'Authentication & Authorization system for secure access and data isolation.',
      'Docker containerization for consistent deployment across environments.',
      'Resolved API rate-limiting (429 errors) via optimized chunking and batch-delay strategies.',
    ],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'smart-resume-screener',
    title: 'Smart Resume Screener & Job Portal',
    category: 'Full-Stack',
    stack: ['Flask', 'scikit-learn', 'SQLite', 'Bootstrap 5'],
    description:
      'Three role-based modules (Admin, Employer, Applicant). Employers post jobs, applicants upload resumes, and an NLP engine scores each resume against the job description to produce a match percentage.',
    highlights: [
      'NLP matching engine with TF-IDF vectorization and cosine similarity.',
      'Robust authentication via Flask-Login with role-based access control.',
      'Document parsing pipeline using pdfplumber for resume extraction.',
      'Modular MVC and Blueprint architecture using Flask-SQLAlchemy.',
    ],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'resume-enhancement-system',
    title: 'Resume Enhancement System & Interview Prep',
    category: 'AI & RAG',
    stack: ['CrewAI', 'Streamlit', 'LangChain', 'PyPDF2'],
    description:
      '6-agent CrewAI pipeline that compares a resume to a job posting, finds missing skills, and generates personalized HR, DSA and technical interview prep, compiled into a downloadable PDF improvement plan.',
    highlights: [
      'Orchestrated 6 specialized autonomous CrewAI agents with distinct analytical roles.',
      'Identifies critical skill gaps and provides tailored study roadmaps.',
      'Generates targeted DSA, HR, and technical domain mock interview questions.',
      'Generates automated, compiled downloadable PDF reports.',
    ],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'rag-web-search-assistant',
    title: 'RAG Web Search Assistant',
    category: 'AI & RAG',
    stack: ['Streamlit', 'ChromaDB', 'Gemini API', 'Serper API'],
    description:
      'Multi-source RAG chatbot ingesting PDFs, web pages and YouTube transcripts into a vector knowledge base, answering with grounded, source-cited responses, optionally augmented with live web search via the Serper API.',
    highlights: [
      'Multi-modal ingestion pipeline supporting PDFs, web URLs, and YouTube transcripts.',
      'Local vector storage and semantic search with ChromaDB.',
      'Grounded source citations generated with Gemini API.',
      'Live fallback web search augmentation through Serper API integration.',
    ],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'library-management-system',
    title: 'Library Management System',
    category: 'Systems & Hardware',
    stack: ['C++', 'OOP', 'DSA'],
    description:
      'Built twice: first with OOP principles, then enhanced with Data Structures & Algorithms for efficient search, sorting and record management.',
    highlights: [
      'First iteration: Solid Object-Oriented Design (inheritance, encapsulation, polymorphism).',
      'Second iteration: High-performance data structures for quick lookup and record sorting.',
      'File-based persistence and integrity verification.',
    ],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'automated-smart-house',
    title: 'Automated Smart House',
    category: 'Systems & Hardware',
    stack: ['Arduino', 'Hardware + Software'],
    description:
      'Multi-function home automation system integrating Arduino hardware with software control (Digital Logic Design project).',
    highlights: [
      'Digital Logic Design implementation connecting sensor arrays with microcontroller logic.',
      'Hardware-software boundary integration for automated environmental responses.',
      'Hardware state monitoring and automated triggers.',
    ],
    liveUrl: '',
    githubUrl: '',
  },
];

export const skills: SkillCategory[] = [
  {
    id: 'ai-nlp',
    category: 'AI / NLP',
    isPrimary: true,
    skills: [
      'scikit-learn',
      'Prompt Engineering',
      'Gemini API',
      'Google GenAI',
      'RAG',
      'ChromaDB',
      'Pinecone',
      'LangChain',
      'AI Agents',
      'CrewAI',
    ],
  },
  {
    id: 'languages',
    category: 'Languages',
    skills: ['Python', 'C++', 'JavaScript', 'SQL'],
  },
  {
    id: 'web-frameworks',
    category: 'Web & Frameworks',
    skills: ['HTML/CSS', 'Bootstrap 5', 'PHP', 'Flask', 'FastAPI', 'React', 'Node.js'],
  },
  {
    id: 'databases',
    category: 'Databases',
    skills: [
      'SQLite',
      'MySQL',
      'Neon (PostgreSQL)',
      'SQLModel',
      'Flask-SQLAlchemy',
      'Pinecone Vector DB',
    ],
  },
  {
    id: 'devops-security',
    category: 'DevOps & Security',
    skills: ['Docker', 'Authentication & Authorization', 'Git', 'GitHub'],
  },
  {
    id: 'tools',
    category: 'Tools',
    skills: [
      'VS Code',
      'Google Colab',
      'Poetry',
      'Arduino',
      'Cisco Packet Tracer',
      'VirtualBox',
      'MS Office',
    ],
  },
];

export const education: EducationInfo = {
  degree: 'BS Computer Science',
  institution: 'Superior University',
  location: 'Lahore, Pakistan',
  startYear: 2024,
  endYear: 2028,
  semester: '6th Semester',
  cgpa: '3.64',
};

export const coursework: string[] = [
  'Data Structures & Algorithms',
  'OOP',
  'Database Systems',
  'Web Development',
  'Computer Networks',
  'Theory of Languages',
  'Digital Logic Design',
  'Probability & Statistics',
  'Artificial Intelligence',
  'DevOps',
  'Technopreneurship',
  'Mobile Application Development',
  'Design & Analysis of Algorithms',
  'Information Security',
];

export const certifications: CertificationItem[] = [
  {
    title: 'Introduction to SQL',
    issuer: 'Sololearn',
    issueDate: 'Dec 2025',
  },
  {
    title: 'HTML, CSS, JS & Bootstrap',
    issuer: 'MindLuster',
    issueDate: 'Jul 2025',
  },
  {
    title: 'Python Programming',
    issuer: 'MindLuster',
    issueDate: 'Jun 2025',
  },
  {
    title: 'AI in Modern Encryption & Cybersecurity',
    issuer: 'IEEE Superior University',
    issueDate: '2025',
  },
];

export const contactContent: ContactContent = {
  sectionLabel: '// 06 — CONTACT',
  closingHeadline: "Let's build something intelligent.",
  subtext:
    'Actively seeking internship and entry-level opportunities to apply technical skills in real-world environments. Have a role, project, or question? Send a message directly.',
  emailLabel: 'DIRECT TRANSMISSION',
  socialsLabel: 'CONNECTED NETWORKS',
  locationLabel: 'BASE NODE',
  form: {
    nameLabel: 'Your Name',
    namePlaceholder: 'e.g. Sarah Jenkins',
    emailLabel: 'Email Address',
    emailPlaceholder: 'e.g. s.jenkins@company.com',
    messageLabel: 'Project or Opportunity Brief',
    messagePlaceholder: 'Tell me about the role, technical challenge, or team...',
    submitButton: 'Dispatch Transmission',
    sendingButton: 'Transmitting...',
    subjectPrefix: '[Portfolio Inquiry] From',
    successMessage: 'Message transmitted successfully! I will respond shortly.',
    errorMessage: 'Transmission failed. Please try again or email me directly.',
  },
};

export const footerContent = {
  copyright: '© 2026 Habib-ur-Rehman',
  tagline: 'Designed & built by Habib',
  role: 'AI Engineer & Full-Stack Developer',
};
