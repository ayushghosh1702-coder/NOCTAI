import { Project, UserProfile } from '../types';

export const ALL_AVAILABLE_SKILLS = [
  'Python',
  'Java',
  'C++',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'FastAPI',
  'Django',
  'Machine Learning',
  'Deep Learning',
  'Data Science',
  'Cybersecurity',
  'IoT',
  'Cloud',
  'Blockchain',
  'Computer Vision',
  'NLP',
  'SQL',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'Tailwind CSS',
  'Next.js',
  'PyTorch',
  'TensorFlow',
  'Kubernetes'
];

export const ALL_INTEREST_DOMAINS = [
  'AI/ML',
  'Healthcare',
  'Education',
  'Agriculture',
  'Finance',
  'Sports',
  'Environment',
  'Cybersecurity',
  'Smart Cities',
  'E-commerce',
  'Social Impact',
  'Entertainment'
];

export const CAREER_GOALS = [
  'Software Developer',
  'AI/ML Engineer',
  'Data Scientist',
  'Cybersecurity',
  'Cloud Engineer',
  'Full Stack Developer',
  'Entrepreneur',
  'Research'
];

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'usr_demo_101',
  name: 'Ayush',
  email: 'ayush@paruluniversity.ac.in',
  college: 'PARUL UNIVERSITY',
  branch: 'Computer Science & Engineering',
  degree: 'B.Tech',
  year: '4th Year (Final Year)',
  skills: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQL', 'NLP', 'PostgreSQL'],
  interests: ['AI/ML', 'Education', 'Social Impact'],
  experience: 'Intermediate',
  teamSize: '2',
  budget: '₹1,000–₹5,000',
  availableTime: '8 weeks',
  careerGoal: 'AI/ML Engineer',
  profileCompleted: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  currentProjectId: 'ai-resume-analyzer'
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    tagline: 'Automated skill extraction, ATS benchmark scoring, and personalized career gap recommendations.',
    description: 'An AI-powered platform that analyzes resumes, extracts skills using NLP, calculates ATS compatibility, and provides personalized improvement suggestions.',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    matchScore: 94,
    difficulty: 'Intermediate',
    duration: '8 weeks',
    budget: '₹3,000',
    domain: 'AI/ML',
    requiredSkills: ['Python', 'NLP', 'React', 'FastAPI'],
    technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'NLP', 'SpaCy', 'Docker'],
    careerRelevance: 'Directly aligns with AI/ML Engineer and Full Stack Developer roles with heavy practical NLP pipeline experience.',
    problemStatement: 'Modern Applicant Tracking Systems (ATS) reject over 75% of college applicants due to format mismatches, unindexed keywords, and poor skill taxonomy alignment. Students lack actionable, line-by-line feedback on how to calibrate their resumes for specific job descriptions.',
    objectives: [
      'Parse multi-format resumes (PDF, DOCX) into structured JSON schema using PDFMiner & python-docx.',
      'Build an NLP entity extraction pipeline to identify technical skills, work experiences, certifications, and educational credentials.',
      'Compute semantic similarity scores against target job specifications using Sentence-Transformers embeddings.',
      'Generate contextual critique: missing keywords, weak impact verbs, and tailored bullet-point rewrites.'
    ],
    targetUsers: ['Final-year college graduates', 'Campus placement committees', 'Junior tech job seekers'],
    expectedOutcome: 'A deployable web application with real-time PDF upload, skill radar charts, ATS score breakdown, and downloadable AI-enhanced resume drafts.',
    whyThisProject: 'Offers the perfect intersection of practical NLP, clean REST API architecture, and tangible visual utility that evaluators and recruiters immediately appreciate.',
    feasibility: {
      overall: 87,
      skillFit: 92,
      timeFit: 85,
      budgetFit: 95,
      teamFit: 80,
      technologyFit: 90,
      verdict: 'High Viability — Ideal for an 8-week timeline with a 2-student team with Python & React fundamentals.',
      keyChallenge: 'Handling heterogeneous multi-column PDF layouts and OCR scans gracefully.'
    },
    features: [
      {
        id: 'feat_1',
        title: 'Resume Upload & Validation',
        description: 'Multi-format document ingestion pipeline supporting PDF, DOCX with size and MIME validation.',
        tier: 'mvp',
        difficulty: 'Low',
        expectedImpact: 'Moderate'
      },
      {
        id: 'feat_2',
        title: 'Resume Text & Layout Extraction',
        description: 'Extract raw text, sections (Education, Skills, Experience), and structural metadata using PDFMiner.',
        tier: 'mvp',
        difficulty: 'Medium',
        expectedImpact: 'High'
      },
      {
        id: 'feat_3',
        title: 'Skill Extraction & Entity Recognition',
        description: 'Custom SpaCy NER model trained on 1,500+ tech competencies and ontology mappings.',
        tier: 'mvp',
        difficulty: 'Medium',
        expectedImpact: 'High'
      },
      {
        id: 'feat_4',
        title: 'ATS Resume Scoring Engine',
        description: 'Multi-factor algorithm evaluating readability, section presence, quantification of results, and contact data.',
        tier: 'mvp',
        difficulty: 'Medium',
        expectedImpact: 'High'
      },
      {
        id: 'feat_5',
        title: 'Improvement Suggestions & Bullet Rewriter',
        description: 'Generates active action verb suggestions and recommendations to quantify accomplishments.',
        tier: 'mvp',
        difficulty: 'Medium',
        expectedImpact: 'High'
      },
      {
        id: 'feat_6',
        title: 'Job Description Matching',
        description: 'Compare resume vectors against pasted job postings using cosine similarity on BERT embeddings.',
        tier: 'advanced',
        difficulty: 'High',
        expectedImpact: 'Transformative'
      },
      {
        id: 'feat_7',
        title: 'AI-Generated Personalized Recommendations',
        description: 'Dynamic recommendations for learning modules and missing certifications based on industry requirements.',
        tier: 'advanced',
        difficulty: 'High',
        expectedImpact: 'High'
      },
      {
        id: 'feat_8',
        title: 'Skill Gap & Wage Impact Analysis',
        description: 'Visual benchmark comparing student profile to entry-level market median requirements.',
        tier: 'advanced',
        difficulty: 'Medium',
        expectedImpact: 'High'
      },
      {
        id: 'feat_9',
        title: 'Resume Comparison Matrix',
        description: 'Side-by-side diffing between draft revisions to measure ATS score progression over time.',
        tier: 'advanced',
        difficulty: 'Medium',
        expectedImpact: 'Moderate'
      },
      {
        id: 'feat_10',
        title: 'Career Prediction & Path Forecasting',
        description: 'Predicts high-affinity engineering specializations using multi-label classification on candidate project history.',
        tier: 'innovative',
        difficulty: 'High',
        expectedImpact: 'Transformative'
      },
      {
        id: 'feat_11',
        title: 'Personalized Learning Roadmap Generator',
        description: 'Auto-synthesizes step-by-step GitHub repositories and documentation links for detected skill gaps.',
        tier: 'innovative',
        difficulty: 'High',
        expectedImpact: 'High'
      },
      {
        id: 'feat_12',
        title: 'Automated ATS LaTeX Optimization',
        description: 'One-click conversion of parsed content into a guaranteed 100% ATS-parseable LaTeX resume PDF.',
        tier: 'innovative',
        difficulty: 'High',
        expectedImpact: 'Transformative'
      }
    ],
    techStack: [
      {
        category: 'Frontend',
        name: 'React + TypeScript',
        badge: 'UI Layer',
        whyUseThis: 'Type safety, component reusability, rich ecosystem for PDF rendering and interactive charts.',
        alternatives: ['Next.js', 'Vue 3']
      },
      {
        category: 'Backend',
        name: 'FastAPI (Python 3.11)',
        badge: 'REST Engine',
        whyUseThis: 'Native asynchronous handling, automatic OpenAPI/Swagger documentation, lightning-fast execution, and seamless Python AI package integration.',
        alternatives: ['Django REST', 'Flask']
      },
      {
        category: 'Database',
        name: 'PostgreSQL 16',
        badge: 'Relational Store',
        whyUseThis: 'Robust ACID guarantees for student profiles, schema flexibility with JSONB columns for parsed resumes, and pgvector readiness.',
        alternatives: ['MySQL', 'Supabase']
      },
      {
        category: 'AI / ML',
        name: 'Python + SpaCy + HuggingFace',
        badge: 'NLP Pipeline',
        whyUseThis: 'SpaCy provides fast rule-based + statistical NER; HuggingFace sentence-transformers enable zero-shot job description semantic matching.',
        alternatives: ['NLTK', 'OpenAI API']
      },
      {
        category: 'Authentication',
        name: 'JWT (JSON Web Tokens) with Argon2',
        badge: 'Security',
        whyUseThis: 'Stateless auth suitable for distributed frontends; secure password hashing with salt.',
        alternatives: ['OAuth 2.0', 'Firebase Auth']
      },
      {
        category: 'Deployment',
        name: 'Docker + Render / AWS EC2',
        badge: 'Infrastructure',
        whyUseThis: 'Containerization guarantees zero dependency mismatch between local development and cloud production.',
        alternatives: ['Railway', 'Vercel']
      }
    ],
    architecture: {
      summary: 'Three-tier decoupled microservice architecture separating document ingestion, asynchronous NLP parsing workers, and relational persistence.',
      nodes: [
        {
          id: 'n_student',
          name: 'Student / User',
          type: 'client',
          description: 'Accesses web app on desktop or mobile to upload CVs and view analysis reports.',
          technologies: ['Web Browser', 'HTTPS']
        },
        {
          id: 'n_frontend',
          name: 'React Frontend (SPA)',
          type: 'client',
          description: 'Renders dynamic drag-and-drop uploaders, resume radar analytics, and real-time score indicators.',
          technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Recharts']
        },
        {
          id: 'n_backend',
          name: 'FastAPI Backend Gateway',
          type: 'api',
          description: 'Orchestrates file validation, rate limiting, token verification, and payload routing.',
          technologies: ['FastAPI', 'Uvicorn', 'Pydantic']
        },
        {
          id: 'n_auth',
          name: 'Authentication Module',
          type: 'service',
          description: 'Issues and verifies JWT claims, managing password hashing and RBAC sessions.',
          technologies: ['JWT', 'PyJWT', 'Passlib']
        },
        {
          id: 'n_business',
          name: 'Business Logic & Scoring',
          type: 'service',
          description: 'Calculates ATS weighted metrics, readability indexes (Flesch-Kincaid), and rubric criteria.',
          technologies: ['Python Algorithmic Engine']
        },
        {
          id: 'n_ai',
          name: 'AI / NLP Pipeline Service',
          type: 'service',
          description: 'Extracts entities, runs named skill matching, and computes semantic vector distances.',
          technologies: ['SpaCy en_core_web_md', 'SentenceTransformers', 'PDFMiner.six']
        },
        {
          id: 'n_database',
          name: 'PostgreSQL Database',
          type: 'storage',
          description: 'Persists user accounts, historical resume versions, benchmark target skills, and test datasets.',
          technologies: ['PostgreSQL 16', 'SQLAlchemy ORM', 'Alembic']
        },
        {
          id: 'n_external',
          name: 'External Job APIs & LLM',
          type: 'external',
          description: 'Optional enrichment layer fetching live market job descriptions and generating nuanced feedback.',
          technologies: ['RapidAPI Jobs', 'LLM Provider']
        }
      ],
      flows: [
        { from: 'n_student', to: 'n_frontend', label: 'Interacts via UI', protocol: 'HTTPS' },
        { from: 'n_frontend', to: 'n_backend', label: 'Sends Upload & JSON Requests', protocol: 'REST / Bearer Token' },
        { from: 'n_backend', to: 'n_auth', label: 'Validates Auth & Session', protocol: 'Internal' },
        { from: 'n_backend', to: 'n_business', label: 'Dispatches Analysis Job', protocol: 'Async Task' },
        { from: 'n_business', to: 'n_ai', label: 'Passes Document Buffer for Parsing', protocol: 'In-Memory Stream' },
        { from: 'n_ai', to: 'n_database', label: 'Saves Parsed Entities & Vector Embeddings', protocol: 'PostgreSQL / TCP' },
        { from: 'n_business', to: 'n_database', label: 'Queries Benchmark Taxonomies', protocol: 'SQLAlchemy' },
        { from: 'n_ai', to: 'n_external', label: 'Fetches Benchmark Job Specs', protocol: 'REST / JSON' }
      ],
      dataFlowDescription: '1. Student drops a PDF resume in React. 2. React initiates a multipart form upload to `/api/v1/resumes/analyze`. 3. FastAPI validates MIME header and streams bytes to the NLP pipeline. 4. PDFMiner extracts raw text blocks. 5. SpaCy NER extracts recognized skills and categorizes sections. 6. Business logic calculates ATS rubric score (0-100). 7. PostgreSQL stores the results. 8. JSON payload returns to React for instant radar visualization.',
      securityPractices: [
        'Sanitize uploaded PDF binaries to prevent embedded script exploits (CVE-2010-0188 protection).',
        'Store files in private object storage, serving signed URLs with short 15-minute TTL.',
        'Enforce strict CORS policies and rate limit API endpoints to 30 requests/minute per IP.'
      ]
    },
    roadmap: [
      {
        id: 'ph_1',
        phaseNumber: 1,
        name: 'Research & Problem Definition',
        description: 'Understand ATS scoring mechanisms, competitive analysis, and dataset gathering.',
        duration: 'Week 1 - 2',
        tasks: [
          { id: 't_1', title: 'Problem Analysis & Lit Review', description: 'Survey existing ATS platforms (Workday, Greenhouse, Taleo) and understand parsing heuristics.', status: 'completed', estimatedDays: 3, deliverable: 'Literature survey report' },
          { id: 't_2', title: 'Competitor & Gap Analysis', description: 'Evaluate Jobscan and ResumeWorded feature sets and identify gaps for college students.', status: 'completed', estimatedDays: 2, deliverable: 'Feature differentiation matrix' },
          { id: 't_3', title: 'Dataset Acquisition & Annotation', description: 'Curate a seed dataset of 200+ open-source resumes with diverse formatting.', status: 'completed', estimatedDays: 4, deliverable: 'Cleaned anonymized dataset' }
        ]
      },
      {
        id: 'ph_2',
        phaseNumber: 2,
        name: 'System Planning & Architecture',
        description: 'Schema modeling, API contracts, and technology bench testing.',
        duration: 'Week 3',
        tasks: [
          { id: 't_4', title: 'Requirements Specification (SRS)', description: 'Formalize IEEE-compliant software requirements specification document.', status: 'completed', estimatedDays: 2, deliverable: 'SRS Document v1.0' },
          { id: 't_5', title: 'System Architecture & Data Flows', description: 'Map out UML component diagrams, sequence diagrams, and microservice topology.', status: 'completed', estimatedDays: 2, deliverable: 'UML Architecture Diagram' },
          { id: 't_6', title: 'Database Design & ER Modeling', description: 'Create normalized PostgreSQL tables for users, resumes, skills, and scores.', status: 'completed', estimatedDays: 3, deliverable: 'ER diagram & Alembic migrations' }
        ]
      },
      {
        id: 'ph_3',
        phaseNumber: 3,
        name: 'Core Development',
        description: 'Building backend endpoints, NLP pipeline, and dynamic React components.',
        duration: 'Week 4 - 6',
        tasks: [
          { id: 't_7', title: 'Backend REST API in FastAPI', description: 'Build user auth, file upload endpoints, and asynchronous response handlers.', status: 'in-progress', estimatedDays: 6, deliverable: 'FastAPI server with Swagger docs' },
          { id: 't_8', title: 'NLP Extraction Pipeline', description: 'Implement SpaCy entity ruler and regex patterns for contact info, skills, and dates.', status: 'in-progress', estimatedDays: 7, deliverable: 'NLP extraction module with 90%+ precision' },
          { id: 't_9', title: 'React Frontend Dashboard', description: 'Build drag-and-drop resume uploader, score gauges, and skill tag cloud.', status: 'not-started', estimatedDays: 5, deliverable: 'Responsive client interface' }
        ]
      },
      {
        id: 'ph_4',
        phaseNumber: 4,
        name: 'Testing & Validation',
        description: 'Rigorous unit testing, benchmark evaluation against real recruiter reviews, and bug fixes.',
        duration: 'Week 7',
        tasks: [
          { id: 't_10', title: 'Unit & Integration Testing', description: 'Pytest suite for PDF parsing edge cases (scanned files, encrypted PDFs, multi-columns).', status: 'not-started', estimatedDays: 3, deliverable: '85%+ code test coverage' },
          { id: 't_11', title: 'Accuracy & Recruiter Validation', description: 'Benchmark scoring engine against 50 scored resumes evaluated by senior talent scouts.', status: 'not-started', estimatedDays: 3, deliverable: 'Validation report' }
        ]
      },
      {
        id: 'ph_5',
        phaseNumber: 5,
        name: 'Deployment & Viva Prep',
        description: 'Production containerization, live deployment, presentation slides, and demo script.',
        duration: 'Week 8',
        tasks: [
          { id: 't_12', title: 'Dockerization & Cloud Deployment', description: 'Write multi-stage Dockerfiles and deploy to cloud provider with live HTTPS URL.', status: 'not-started', estimatedDays: 3, deliverable: 'Live public URL' },
          { id: 't_13', title: 'Project Viva Presentation & Defense Prep', description: 'Prepare 15-slide PowerPoint deck, architecture charts, and answer flashcards.', status: 'not-started', estimatedDays: 3, deliverable: 'Defense presentation slide deck' }
        ]
      }
    ],
    vivaQuestions: [
      {
        id: 'v_1',
        question: 'Why did you choose FastAPI over Django or Flask for your backend?',
        category: 'architecture',
        suggestedAnswer: 'FastAPI was chosen because of its native asynchronous support (ASGI via Starlette and Uvicorn), which allows non-blocking I/O during heavy document uploads. Furthermore, FastAPI leverages Python type hints with Pydantic for automated request validation and instant OpenAPI (Swagger) documentation, cutting down boilerplate by over 40% compared to Flask while providing significantly lower latency than monolithic Django.',
        sampleEvaluationKeypoints: [
          'Mention ASGI / async concurrency benefits for I/O operations',
          'Explain Pydantic data validation and auto-generated OpenAPI docs',
          'Compare latency overhead against Django monolith'
        ]
      },
      {
        id: 'v_2',
        question: 'How does your NLP model extract technical skills when resumes use varying formatting?',
        category: 'aiml',
        suggestedAnswer: 'We employ a hybrid approach combining Rule-Based Pattern Matchers (EntityRuler in SpaCy) with a curated tech ontology of 1,500+ keywords, followed by a fine-tuned Named Entity Recognition (NER) statistical model. To handle variations like "React.js", "React", or "ReactJS", we canonicalize entities through a skill alias lookup dictionary. For multi-column PDFs, layout-aware text extraction preserves structural bounding boxes so skills are not scrambled with personal headers.',
        sampleEvaluationKeypoints: [
          'Explain hybrid approach (Rule-based EntityRuler + statistical NER)',
          'Mention entity canonicalization and skill alias normalization',
          'Address multi-column layout handling'
        ]
      },
      {
        id: 'v_3',
        question: 'What is the algorithmic formula behind your ATS Resume Score calculation?',
        category: 'technical',
        suggestedAnswer: 'The ATS score is a weighted composite score (0–100): 35% Skill Density & Job Match (cosine similarity of embeddings), 25% Section Completeness (mandatory presence of Education, Experience, Skills, Contact), 20% Impact Quantification (ratio of bullet points containing numerical metrics or percentages), and 20% Formatting & Readability (Flesch Reading Ease index and font parsing compatibility).',
        sampleEvaluationKeypoints: [
          'State the weighted component distribution',
          'Explain cosine similarity on embeddings',
          'Mention quantifiable metric ratios and readability formula'
        ]
      },
      {
        id: 'v_4',
        question: 'How do you handle security vulnerabilities such as malicious PDF payload uploads?',
        category: 'technical',
        suggestedAnswer: 'We enforce defense-in-depth: First, we validate file signatures using magic numbers (checking for %PDF- header) rather than trusting client MIME types. Second, we restrict file size to 5MB. Third, the parsing engine runs in an isolated unprivileged container without access to the host file system. Fourth, all extracted text is sanitized before being written to the database or rendered in the DOM to prevent Stored XSS.',
        sampleEvaluationKeypoints: [
          'Magic number binary validation vs header spoofing',
          'Containerized sandbox execution without root privilege',
          'Input sanitization preventing Stored XSS'
        ]
      },
      {
        id: 'v_5',
        question: 'What happens if the PostgreSQL database experiences a spike in concurrent resume queries?',
        category: 'database',
        suggestedAnswer: 'To handle concurrency, we configure connection pooling via SQLAlchemy with PgBouncer. Frequently accessed static entities like the master skill ontology are cached in-memory with Redis. Resume parsing jobs are dispatched asynchronously through a Celery/RabbitMQ worker queue so the HTTP worker is immediately freed rather than blocking on synchronous DB transactions.',
        sampleEvaluationKeypoints: [
          'Connection pooling with PgBouncer',
          'In-memory caching for taxonomy lookup',
          'Asynchronous worker decoupling (message queue)'
        ]
      },
      {
        id: 'v_6',
        question: 'What is the primary technical limitation of your current implementation?',
        category: 'basic',
        suggestedAnswer: 'The main limitation is processing image-only, scanned PDF resumes where text is flattened into raster pixels. In the current prototype, optical character recognition (OCR using Tesseract) adds 4-6 seconds of latency per page and struggles with low-contrast fonts. In our future scope, we plan to integrate lightweight WebAssembly OCR running client-side.',
        sampleEvaluationKeypoints: [
          'Identify scanned / raster image PDF limitations',
          'Address OCR latency tradeoffs',
          'Offer feasible mitigation strategy'
        ]
      }
    ],
    improvements: [
      {
        id: 'imp_1',
        title: 'Add AI-Powered Career Recommendation Engine',
        category: 'innovation',
        description: 'Utilize multi-label classification to forecast adjacent career tracks where the student possesses 70%+ transferable skills.',
        impact: 'High',
        difficulty: 'Medium',
        addedToRoadmap: false,
        technicalSteps: [
          'Create vector representations of candidate resume profiles',
          'Train nearest-neighbor search over 50,000 career taxonomy profiles',
          'Add a "Career Horizons" radar card in the student dashboard'
        ]
      },
      {
        id: 'imp_2',
        title: 'Optimize Document Parsing with Asynchronous Workers',
        category: 'performance',
        description: 'Offload CPU-intensive PDF parsing and vector calculation to background Celery workers with WebSockets progress streaming.',
        impact: 'High',
        difficulty: 'Medium',
        addedToRoadmap: true,
        technicalSteps: [
          'Install Celery with Redis broker',
          'Convert FastAPI route to dispatch async task ID immediately',
          'Add WebSocket connection in React to render incremental 25%, 50%, 100% parsing steps'
        ]
      },
      {
        id: 'imp_3',
        title: 'ClamAV Malware Scanning on Ingested Files',
        category: 'security',
        description: 'Integrate an automated ClamAV daemon container that scans incoming byte streams before passing them to parsing engines.',
        impact: 'High',
        difficulty: 'Hard',
        addedToRoadmap: false,
        technicalSteps: [
          'Spin up clamav/clamav docker image in docker-compose',
          'Add pyclamd hook in file upload middleware',
          'Reject infected files with HTTP 422 and log security incident'
        ]
      },
      {
        id: 'imp_4',
        title: 'Interactive In-Browser Resume Annotation & Heatmap',
        category: 'ux',
        description: 'Allow students to hover over resume sections to see recruiter gaze heatmaps and contextual inline advice pins.',
        impact: 'Medium',
        difficulty: 'Medium',
        addedToRoadmap: false,
        technicalSteps: [
          'Implement PDF.js text layer overlay in React',
          'Bind bounding box coordinates returned from PDFMiner',
          'Render interactive tooltip cards over flagged bullet points'
        ]
      },
      {
        id: 'imp_5',
        title: 'Read Replica & Horizontal Autoscaling',
        category: 'scalability',
        description: 'Configure PostgreSQL read replicas for intensive analytics queries and deploy FastAPI across Kubernetes pods.',
        impact: 'High',
        difficulty: 'Hard',
        addedToRoadmap: false,
        technicalSteps: [
          'Set up streaming replication in PostgreSQL',
          'Write Kubernetes HPA (Horizontal Pod Autoscaler) manifest targeting 70% CPU threshold',
          'Stress test with Locust load simulator'
        ]
      }
    ],
    documentationDrafts: {
      abstract: 'In the contemporary hyper-competitive tech employment landscape, automated Applicant Tracking Systems (ATS) act as algorithmic gatekeepers, filtering out up to 75% of job applicants before human review. College graduates are disproportionately impacted due to improper document structuring, ambiguous skill phrasing, and ignorance of keyword matching taxonomies. This project presents "AI Resume Analyzer", a comprehensive intelligent web platform that extracts unstructured text from heterogeneous resume formats, leverages customized Named Entity Recognition (NER) models to map technical competencies, and computes an objective ATS compatibility score. By evaluating keyword density against live job requirements and providing concrete prescriptive rewrites, the system elevates student placement readiness. Experimental benchmarking on 200 diverse engineering resumes demonstrates an extraction accuracy exceeding 92% and offers students actionable feedback within 4 seconds.',
      introduction: 'The transition from university education to professional enterprise engineering represents a critical juncture for final-year students. However, the initial screening stage is dominated by commercial Applicant Tracking Systems that rely heavily on computational parsing and semantic indexing. Traditional feedback mechanisms—such as university career cells—are constrained by human bandwidth, leading to generalized advice rather than quantifiable technical calibration. AI Resume Analyzer addresses this bottleneck by democratizing algorithmic resume assessment. By pairing modern web architectures with robust Natural Language Processing libraries, the system delivers instant, transparent, and academically sound feedback tailored to each student\'s technical trajectory.',
      problemStatement: 'Existing resume evaluation tools either impose exorbitant subscription fees, provide generic cosmetic suggestions without technical skill depth, or fail to handle modern multi-column PDF layouts reliably. Consequently, qualified engineering students frequently face automated rejections without understanding whether the failure stemmed from formatting errors, missing technical nomenclature, or insufficient achievement quantification. There is an acute need for an open, student-friendly, and mathematically transparent ATS analysis engine.',
      objectives: '1. Develop a high-speed document ingestion service supporting diverse MIME types (PDF, DOCX) with security sanitization.\n2. Engineer a specialized NLP skill extraction pipeline utilizing SpaCy and pre-trained language representations.\n3. Formulate a multi-criteria scoring algorithm covering skill relevance, section structure, result quantification, and readability.\n4. Design an intuitive, responsive React user interface featuring real-time visual score breakdowns and interactive suggestion cards.\n5. Implement an automated draft generation tool enabling students to download ATS-compliant LaTeX and plain-text revisions.',
      methodology: 'The research and development lifecycle adopted an agile microservices-inspired methodology. The pipeline consists of four sequential stages: Ingestion & Text Normalization, Information Extraction & NER, Semantic Matching & Scoring, and Presentation. PDF files are processed using layout-aware stream extraction to preserve reading order. The extracted corpus is tokenized and evaluated against a curated ontology of 1,500+ technical skills. Semantic similarity against target job descriptions is computed using cosine similarity across normalized dense sentence embeddings. Finally, scores are compiled via a weighted linear regression model calibrated against recruiter evaluation rubrics.',
      systemRequirements: 'Hardware Requirements:\n- Processor: Multi-core Intel Core i5 / AMD Ryzen 5 or higher\n- RAM: Minimum 8 GB (16 GB recommended for local vector model embeddings)\n- Storage: 20 GB available disk space for dependencies and datasets\n\nSoftware Requirements:\n- Operating System: Ubuntu 22.04 LTS / macOS / Windows 11 with WSL2\n- Backend Runtime: Python 3.11+\n- Frontend Runtime: Node.js 20+ & Vite\n- Database: PostgreSQL 16\n- Key Libraries: FastAPI, SpaCy 3.7, Pydantic, React 18, Tailwind CSS, Sentence-Transformers',
      futureScope: 'Future iterations will integrate multimodal Vision-Language Models (VLMs) to visually evaluate resume aesthetics, color contrast, and typographic hierarchy simultaneously with text semantics. Furthermore, client-side WebAssembly OCR will enable offline processing of scanned document images without requiring costly server-side GPU allocation. Integration with campus placement management ERPs will enable university placement coordinators to batch-analyze entire student cohorts before placement drives.',
      conclusion: 'AI Resume Analyzer demonstrates that accessible, open-source AI tooling can significantly bridge the information asymmetry between college applicants and commercial hiring algorithms. By decomposing resume analysis into transparent, actionable metrics—ranging from Named Entity skill tagging to impact quantification—the platform equips final-year students with the agency and insight required to present their authentic engineering capabilities effectively.'
    },
    isSaved: true,
    progress: 68,
    completedStages: ['Research', 'Requirements', 'UI Design', 'Database'],
    currentStage: 'Backend Development',
    nextStage: 'AI Integration'
  },
  {
    id: 'smart-agri-crop-disease',
    title: 'Smart Agri: Edge AI Crop Disease Diagnostic & Yield Advisor',
    tagline: 'Deep learning leaf lesion classification on low-power edge devices with multilingual farmer advisory.',
    description: 'An IoT and Computer Vision platform that detects foliar crop diseases via mobile cameras, runs offline inference on edge devices, and provides localized treatment remedies.',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    matchScore: 91,
    difficulty: 'Intermediate',
    duration: '10 weeks',
    budget: '₹4,500',
    domain: 'Agriculture',
    requiredSkills: ['Python', 'Computer Vision', 'Deep Learning', 'React'],
    technologies: ['PyTorch', 'MobileNetV3', 'FastAPI', 'React', 'OpenCV', 'Tailwind CSS'],
    careerRelevance: 'Exceptional for Computer Vision Engineer, Edge AI Specialist, and IoT Product Developer roles.',
    problemStatement: 'Smallholder farmers lose 30-40% of crop yields annually to plant pathologies due to delayed diagnosis and lack of localized agronomist consultations.',
    objectives: [
      'Train a lightweight CNN (MobileNetV3) achieving >95% top-1 accuracy on PlantVillage dataset.',
      'Deploy quantized models on mobile web using TensorFlow.js / ONNX runtime for offline field access.',
      'Provide organic and chemical remedy recommendations in regional languages.'
    ],
    targetUsers: ['Smallholder farmers', 'Agricultural extension officers', 'Kisan Call Centers'],
    expectedOutcome: 'Mobile web app capable of diagnosing 38 plant disease classes from leaf photos in under 500ms.',
    whyThisProject: 'Direct social impact, strong hardware/software intersection, and impressive visual live camera demonstration during final-year viva.',
    feasibility: {
      overall: 89,
      skillFit: 88,
      timeFit: 85,
      budgetFit: 92,
      teamFit: 90,
      technologyFit: 91,
      verdict: 'High Feasibility — Pre-trained model transfer learning significantly reduces dataset acquisition bottlenecks.',
      keyChallenge: 'Handling noisy field lighting and varied camera angles in real agricultural settings.'
    },
    features: [
      { id: 'ag_1', title: 'Live Camera Leaf Scanning', description: 'Real-time camera feed with bounding box alignment guidelines.', tier: 'mvp', difficulty: 'Low', expectedImpact: 'Moderate' },
      { id: 'ag_2', title: 'Offline Edge Inference', description: 'Quantized INT8 model runs directly in client browser memory.', tier: 'mvp', difficulty: 'Medium', expectedImpact: 'High' },
      { id: 'ag_3', title: 'Localized Treatment Prescriptions', description: 'Step-by-step pesticide dosage and organic bio-control alternatives.', tier: 'mvp', difficulty: 'Low', expectedImpact: 'High' },
      { id: 'ag_4', title: 'Weather-Informed Disease Spread Forecaster', description: 'Correlates humidity and precipitation forecasts with fungal outbreak vectors.', tier: 'advanced', difficulty: 'Medium', expectedImpact: 'High' },
      { id: 'ag_5', title: 'Drone Multispectral Imagery Stitching', description: 'Imports aerial farm drone orthomosaics for whole-field blight heatmaps.', tier: 'innovative', difficulty: 'High', expectedImpact: 'Transformative' }
    ],
    techStack: [
      { category: 'AI / ML', name: 'PyTorch & ONNX Runtime', badge: 'Model Core', whyUseThis: 'Fast transfer learning on MobileNet architectures, smooth quantization for client browser inference.' },
      { category: 'Frontend', name: 'React + Vite (PWA)', badge: 'Mobile Web', whyUseThis: 'Service workers allow offline operation in low-connectivity rural farm fields.' },
      { category: 'Backend', name: 'FastAPI', badge: 'API Service', whyUseThis: 'High-throughput image processing and agricultural data aggregation.' },
      { category: 'Database', name: 'PostgreSQL & PostGIS', badge: 'Geo Database', whyUseThis: 'Spatial querying of disease outbreaks across geographic coordinates.' }
    ],
    architecture: {
      summary: 'Edge-first hybrid architecture executing inference on-device while syncing spatial outbreak data to cloud PostgreSQL.',
      nodes: [
        { id: 'ag_c', name: 'Farmer PWA Client', type: 'client', description: 'Captures leaf photos and runs ONNX inference offline.', technologies: ['React PWA', 'ONNX.js'] },
        { id: 'ag_b', name: 'FastAPI Geo-Backend', type: 'api', description: 'Collects outbreak telemetry and distributes treatment database updates.', technologies: ['FastAPI', 'Python'] },
        { id: 'ag_d', name: 'PostGIS Spatial Store', type: 'storage', description: 'Stores geo-tagged outbreak logs for regional blight heatmapping.', technologies: ['PostgreSQL', 'PostGIS'] }
      ],
      flows: [
        { from: 'ag_c', to: 'ag_b', label: 'Syncs Diagnostic Records', protocol: 'HTTPS / JSON' },
        { from: 'ag_b', to: 'ag_d', label: 'Inserts Spatial Outbreak Coordinates', protocol: 'PostGIS / SQL' }
      ],
      dataFlowDescription: 'Photos taken on phone camera are processed by an in-browser quantized ONNX model. If network is available, diagnosis telemetry is synced to PostGIS for agricultural community heatmapping.',
      securityPractices: ['Anonymize farmer GPS coordinates to county/block level to protect land privacy.']
    },
    roadmap: [
      { id: 'ph_ag1', phaseNumber: 1, name: 'Dataset Preparation & Transfer Learning', description: 'Train MobileNet on PlantVillage dataset with data augmentation.', duration: 'Weeks 1-3', tasks: [{ id: 't_ag1', title: 'Model Training & Validation', description: 'Achieve >94% precision across 38 classes.', status: 'completed', estimatedDays: 7, deliverable: 'Trained PyTorch model' }] },
      { id: 'ph_ag2', phaseNumber: 2, name: 'Model Quantization & PWA Development', description: 'Export to ONNX and build offline-first React UI.', duration: 'Weeks 4-7', tasks: [{ id: 't_ag2', title: 'Client Inference Engine', description: 'Integrate ONNX Runtime Web.', status: 'in-progress', estimatedDays: 8, deliverable: 'Working offline mobile scanner' }] },
      { id: 'ph_ag3', phaseNumber: 3, name: 'Advisory Engine & Field Testing', description: 'Build regional remedies database and field validate on farm samples.', duration: 'Weeks 8-10', tasks: [{ id: 't_ag3', title: 'Agronomist Field Trial', description: 'Evaluate against 50 real farm specimens.', status: 'not-started', estimatedDays: 6, deliverable: 'Field evaluation report' }] }
    ],
    vivaQuestions: [
      {
        id: 'vq_ag1',
        question: 'Why did you select MobileNet over heavier models like ResNet-50 or VGG-16?',
        category: 'aiml',
        suggestedAnswer: 'MobileNet utilizes depthwise separable convolutions which drastically reduce floating-point operations (FLOPs) and model parameter size (from ~100MB down to ~14MB) with less than a 3% dip in accuracy. This enables deployment directly inside web browsers and on low-spec smartphones without requiring cloud GPU roundtrips.',
        sampleEvaluationKeypoints: ['Depthwise separable convolutions', 'FLOPs and parameter reduction', 'Feasibility for client-side edge inference']
      }
    ],
    improvements: [
      {
        id: 'imp_ag1',
        title: 'Voice-Based Query Interface in Regional Dialects',
        category: 'ux',
        description: 'Integrate speech-to-text allowing non-literate rural farmers to describe symptoms and receive audio advisories.',
        impact: 'High',
        difficulty: 'Medium',
        addedToRoadmap: false,
        technicalSteps: ['Integrate Whisper API or Web Speech API', 'Add text-to-speech voice playback for treatments']
      }
    ],
    documentationDrafts: {
      abstract: 'Agriculture forms the socioeconomic backbone of developing nations, yet crop diseases cause catastrophic economic loss. This project designs an edge-computed deep learning framework deployed on lightweight mobile web devices for real-time crop disease diagnosis. Utilizing depthwise separable convolutional architectures quantized to INT8 precision, the system executes inference directly within client memory in under 400ms without relying on cloud connectivity. The solution provides actionable bio-control and chemical countermeasures tailored to local soil contexts.',
      introduction: 'Crop pathology mitigation requires immediate diagnosis before systemic spread. By migrating complex neural networks to low-cost smartphones, this project equips smallholders with expert agronomic insights directly in the field.',
      problemStatement: 'Existing agricultural diagnostic services require high-bandwidth cellular networks and expensive subscription consulting, rendering them inaccessible to rural farm operators who experience the highest disease incidence.',
      objectives: '1. Develop a high-accuracy neural vision classifier for 38 crop disease pathologies.\n2. Quantize model weights for sub-second offline browser execution.\n3. Build an intuitive multilingual advisory dashboard.',
      methodology: 'Transfer learning on MobileNetV3 using 54,000 leaf images, followed by post-training quantization and PWA service worker encapsulation.',
      systemRequirements: 'Node.js 20, Python 3.11, PyTorch, ONNX Runtime Web, React, Tailwind CSS.',
      futureScope: 'Integration with soil moisture sensor telemetry and drone imagery for macro-level agricultural forecasting.',
      conclusion: 'The project demonstrates that edge artificial intelligence offers a resilient, zero-marginal-cost intervention to safeguard crop yields and bolster food security.'
    },
    isSaved: true,
    progress: 42,
    completedStages: ['Dataset Gathering', 'Model Training'],
    currentStage: 'PWA Development',
    nextStage: 'Field Testing'
  },
  {
    id: 'decentralized-credential-verifier',
    title: 'Decentralized Academic Credential Verifier',
    tagline: 'Tamper-proof academic diploma verification using zero-knowledge proofs on Ethereum L2.',
    description: 'A Web3 verification protocol allowing universities to issue cryptographically signed soulbound diplomas while enabling students to selectively disclose credentials via zero-knowledge proofs.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    matchScore: 88,
    difficulty: 'Advanced',
    duration: '12 weeks',
    budget: '₹2,500',
    domain: 'Blockchain',
    requiredSkills: ['Blockchain', 'JavaScript', 'TypeScript', 'React', 'Cybersecurity'],
    technologies: ['Solidity', 'Polygon / Arbitrum', 'React', 'Ethers.js', 'IPFS', 'Hardhat'],
    careerRelevance: 'High demand in Web3 engineering, cryptography, and secure identity infrastructure.',
    problemStatement: 'Academic credential fraud costs employers billions annually while traditional university verification processes take weeks of manual registrar validation.',
    objectives: [
      'Write gas-optimized ERC-721 Soulbound Token (SBT) smart contracts.',
      'Implement IPFS cryptographic hashing for diploma metadata persistence.',
      'Enable instantaneous one-click employer verification portal with cryptographic signature checks.'
    ],
    targetUsers: ['University registrars', 'College alumni', 'Corporate talent acquisition'],
    expectedOutcome: 'A complete dApp enabling institutional minting and instant tamper-proof verification.',
    whyThisProject: 'Demonstrates modern cryptographic identity, smart contract security auditing, and real utility beyond cryptocurrency speculation.',
    feasibility: {
      overall: 85,
      skillFit: 82,
      timeFit: 84,
      budgetFit: 94,
      teamFit: 86,
      technologyFit: 89,
      verdict: 'Viable with free testnet faucet deployments on Polygon Amoy or Sepolia.',
      keyChallenge: 'Gas optimization and preventing non-transferable token transfer bypasses.'
    },
    features: [
      { id: 'bc_1', title: 'Soulbound Token (SBT) Minting', description: 'Non-transferable tokens linked irreversibly to student DID wallet.', tier: 'mvp', difficulty: 'Medium', expectedImpact: 'Transformative' },
      { id: 'bc_2', title: 'Employer Verification Portal', description: 'Instant verification by dragging certificate PDF or entering student public address.', tier: 'mvp', difficulty: 'Low', expectedImpact: 'High' },
      { id: 'bc_3', title: 'Zero-Knowledge GPA Proofs', description: 'Prove GPA > 3.5 without revealing the exact numerical grade using ZK-SNARKs.', tier: 'innovative', difficulty: 'High', expectedImpact: 'Transformative' }
    ],
    techStack: [
      { category: 'Backend', name: 'Solidity & Hardhat', badge: 'Smart Contract', whyUseThis: 'Standard smart contract development suite with automated testing.' },
      { category: 'Frontend', name: 'React + TypeScript + Wagmi', badge: 'dApp Web', whyUseThis: 'Seamless Web3 wallet connectivity (MetaMask, WalletConnect).' },
      { category: 'Cloud & Storage', name: 'IPFS / Pinata', badge: 'Decentralized Storage', whyUseThis: 'Content-addressable permanent storage for academic PDF artifacts.' }
    ],
    architecture: {
      summary: 'Decentralized dApp model connecting student and university wallets directly to EVM L2 smart contracts with IPFS metadata storage.',
      nodes: [
        { id: 'bc_u', name: 'University Registrar', type: 'client', description: 'Authorizes and mints soulbound diplomas using private key.', technologies: ['MetaMask', 'React dApp'] },
        { id: 'bc_s', name: 'Polygon L2 Smart Contract', type: 'service', description: 'Stores irrevocable diploma hashes and revocation registry.', technologies: ['Solidity', 'EVM'] },
        { id: 'bc_i', name: 'IPFS Decentralized Storage', type: 'storage', description: 'Stores encrypted diploma PDF and transcript metadata.', technologies: ['IPFS', 'Pinata'] }
      ],
      flows: [
        { from: 'bc_u', to: 'bc_i', label: 'Uploads Diploma Metadata', protocol: 'IPFS Pinning' },
        { from: 'bc_u', to: 'bc_s', label: 'Calls issueDiploma(studentDID, ipfsHash)', protocol: 'EVM Transaction' }
      ],
      dataFlowDescription: 'Registrar issues certificate hash on Polygon. Employers verify integrity directly by querying smart contract state without intermediary fees.',
      securityPractices: ['Implement OpenZeppelin AccessControl for institutional role management.']
    },
    roadmap: [
      { id: 'ph_bc1', phaseNumber: 1, name: 'Smart Contract Design', description: 'Write SBT ERC-5192 contract and test gas efficiency.', duration: 'Weeks 1-4', tasks: [{ id: 't_bc1', title: 'Solidity Contract & Test Suite', description: '100% test coverage with Hardhat.', status: 'completed', estimatedDays: 10, deliverable: 'Audited Solidity contract' }] },
      { id: 'ph_bc2', phaseNumber: 2, name: 'dApp Frontend & IPFS Integration', description: 'Build registrar issuance dashboard and employer verifier.', duration: 'Weeks 5-8', tasks: [{ id: 't_bc2', title: 'React Web3 Integration', description: 'Wagmi & Ethers.js integration.', status: 'not-started', estimatedDays: 8, deliverable: 'Functional Web3 portal' }] }
    ],
    vivaQuestions: [
      {
        id: 'vq_bc1',
        question: 'What makes a Soulbound Token different from standard ERC-721 NFTs?',
        category: 'architecture',
        suggestedAnswer: 'Standard ERC-721 tokens are freely transferable between addresses. Soulbound Tokens (EIP-5192) permanently bind the token to the recipient\'s address by disabling the `transferFrom` and `safeTransferFrom` functions, throwing a revert upon any transfer attempt. This makes them ideal for representing non-transferable identity credentials like university degrees.',
        sampleEvaluationKeypoints: ['Non-transferability specification (EIP-5192)', 'Disabling transferFrom hooks', 'Representation of permanent identity traits']
      }
    ],
    improvements: [
      {
        id: 'imp_bc1',
        title: 'Revocation Registry with Timelock',
        category: 'security',
        description: 'Enable academic institutions to revoke fraudulent degrees with a mandatory 7-day governance timelock.',
        impact: 'High',
        difficulty: 'Medium',
        addedToRoadmap: false,
        technicalSteps: ['Add revokeCredential function with event emission', 'Implement UI badge for revoked diplomas']
      }
    ],
    documentationDrafts: {
      abstract: 'Academic document fraud undermines trust in educational credentials. This project proposes an EVM-compatible Decentralized Academic Credential Verifier utilizing Soulbound Tokens (EIP-5192) and decentralized storage. Credentials minted by verified educational public keys cannot be transferred or counterfeited, allowing corporate employers to verify validity instantly with mathematical certainty.',
      introduction: 'Verifying degrees requires phone or email exchanges with registrar bureaus. Blockchain enables instantaneous peer-to-peer verification with zero intermediary reliance.',
      problemStatement: 'Paper and PDF certificates are trivially forged using digital editing tools, while background verification agencies charge exorbitant fees.',
      objectives: '1. Architect gas-efficient Soulbound contracts on Polygon.\n2. Store immutable credential metadata on IPFS.\n3. Provide zero-friction one-click employer verification.',
      methodology: 'Smart contract development using Solidity and Hardhat, integrated with React and Wagmi Web3 connectors.',
      systemRequirements: 'Node.js, Hardhat, Polygon testnet RPC, MetaMask, React, Tailwind CSS.',
      futureScope: 'Decentralized Autonomous Organization (DAO) governance for university accreditation verification.',
      conclusion: 'The implementation establishes a robust, cryptographically verifiable standard for educational credential issuance.'
    },
    isSaved: false,
    progress: 30,
    completedStages: ['Contract Modeling'],
    currentStage: 'Solidity Development',
    nextStage: 'Frontend Integration'
  },
  {
    id: 'cyber-threat-sentinel',
    title: 'CyberSentinel: Zero-Trust Log Anomaly & SIEM Platform',
    tagline: 'Real-time telemetry log anomaly detection using unsupervised Isolation Forests and automated incident triage.',
    description: 'A lightweight Security Information and Event Management (SIEM) dashboard that ingests server access logs, flags lateral movement anomalies using machine learning, and recommends automated firewall mitigation scripts.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    matchScore: 89,
    difficulty: 'Intermediate',
    duration: '8 weeks',
    budget: '₹1,500',
    domain: 'Cybersecurity',
    requiredSkills: ['Cybersecurity', 'Python', 'Machine Learning', 'React', 'SQL'],
    technologies: ['Python', 'FastAPI', 'React', 'ElasticSearch / SQLite', 'Scikit-Learn', 'Tailwind CSS'],
    careerRelevance: 'Direct match for SOC Analyst, Cybersecurity Engineer, and DevSecOps roles.',
    problemStatement: 'Security Operation Centers (SOCs) suffer from alert fatigue, receiving over 10,000 raw log lines per hour with minimal contextual prioritization.',
    objectives: [
      'Parse Apache, Nginx, and SSH syslog streams into normalized JSON schemas.',
      'Train unsupervised Isolation Forests to flag brute-force and SQL injection anomalies.',
      'Generate iptables and Cloudflare firewall rule snippets for one-click threat containment.'
    ],
    targetUsers: ['Junior SOC analysts', 'DevOps engineers', 'System administrators'],
    expectedOutcome: 'Interactive SOC command center dashboard with attack heatmaps and incident triage checklists.',
    whyThisProject: 'Evaluators love cybersecurity topics; demonstrates deep understanding of networking protocols, ML anomaly detection, and actionable defense.',
    feasibility: {
      overall: 88,
      skillFit: 90,
      timeFit: 86,
      budgetFit: 96,
      teamFit: 84,
      technologyFit: 87,
      verdict: 'Highly Feasible — Can utilize publicly available DARPA / CIC-IDS2017 security datasets.',
      keyChallenge: 'Minimizing false-positive anomaly alert rates in high-throughput traffic.'
    },
    features: [
      { id: 'cs_1', title: 'Live Syslog Stream Ingestion', description: 'Accepts real-time syslog payloads via HTTP webhooks or file drag-and-drop.', tier: 'mvp', difficulty: 'Low', expectedImpact: 'Moderate' },
      { id: 'cs_2', title: 'Unsupervised ML Anomaly Classifier', description: 'Flags unusual IP request frequencies and abnormal payload lengths.', tier: 'mvp', difficulty: 'Medium', expectedImpact: 'High' },
      { id: 'cs_3', title: 'Automated Firewall Remediation Generator', description: 'Auto-generates iptables / UFW commands to block offending IP subnets.', tier: 'mvp', difficulty: 'Low', expectedImpact: 'High' },
      { id: 'cs_4', title: 'MITRE ATT&CK Matrix Mapping', description: 'Correlates flagged incidents against standard MITRE ATT&CK tactics.', tier: 'advanced', difficulty: 'Medium', expectedImpact: 'Transformative' }
    ],
    techStack: [
      { category: 'Backend', name: 'Python FastAPI', badge: 'Log Pipeline', whyUseThis: 'Rapid asynchronous processing of incoming log streams.' },
      { category: 'AI / ML', name: 'Scikit-Learn (Isolation Forest)', badge: 'Anomaly Engine', whyUseThis: 'Fast unsupervised anomaly detection without requiring labeled attack ground truth.' },
      { category: 'Frontend', name: 'React + Lucide + Recharts', badge: 'SOC UI', whyUseThis: 'High-density tabular data visualization and dynamic attack charts.' }
    ],
    architecture: {
      summary: 'Stream ingestion architecture utilizing Python async queues, scikit-learn anomaly scoring, and React SOC dashboards.',
      nodes: [
        { id: 'cs_n1', name: 'Nginx / SSH Syslog Source', type: 'external', description: 'Generates access and authentication logs.', technologies: ['Syslog', 'HTTP'] },
        { id: 'cs_n2', name: 'FastAPI Ingestion Gateway', type: 'api', description: 'Normalizes raw strings into structured JSON.', technologies: ['FastAPI'] },
        { id: 'cs_n3', name: 'Anomaly Inference Engine', type: 'service', description: 'Scores log vectors using trained Isolation Forests.', technologies: ['Scikit-Learn'] },
        { id: 'cs_n4', name: 'React SOC Console', type: 'client', description: 'Displays live alerts, risk gauges, and remediation controls.', technologies: ['React'] }
      ],
      flows: [
        { from: 'cs_n1', to: 'cs_n2', label: 'Streams Syslogs', protocol: 'POST /api/logs' },
        { from: 'cs_n2', to: 'cs_n3', label: 'Normalized Log Vectors', protocol: 'In-Memory Buffer' },
        { from: 'cs_n3', to: 'cs_n4', label: 'Real-Time Alert Push', protocol: 'WebSocket' }
      ],
      dataFlowDescription: 'Syslogs are parsed into structured IP, user-agent, and status code features, passed through an Isolation Forest model, and visualized in the SOC dashboard.',
      securityPractices: ['Mask sensitive credentials and API tokens in raw log text before indexing.']
    },
    roadmap: [
      { id: 'ph_cs1', phaseNumber: 1, name: 'Log Parsing & Dataset Sourcing', description: 'Gather CIC-IDS2017 logs and write regex parsers.', duration: 'Weeks 1-2', tasks: [{ id: 't_cs1', title: 'Regex Normalization Pipeline', description: 'Parse SSH and Nginx logs.', status: 'completed', estimatedDays: 5, deliverable: 'Log parser suite' }] },
      { id: 'ph_cs2', phaseNumber: 2, name: 'ML Anomaly Training', description: 'Tune Isolation Forest and One-Class SVM models.', duration: 'Weeks 3-5', tasks: [{ id: 't_cs2', title: 'Anomaly Model Training', description: 'Achieve >91% detection on brute force tests.', status: 'completed', estimatedDays: 6, deliverable: 'Pickled model pipeline' }] },
      { id: 'ph_cs3', phaseNumber: 3, name: 'SOC Dashboard UI', description: 'Build interactive incident triage view in React.', duration: 'Weeks 6-8', tasks: [{ id: 't_cs3', title: 'SOC Console Interface', description: 'Incident response panel with exportable reports.', status: 'in-progress', estimatedDays: 7, deliverable: 'Interactive frontend' }] }
    ],
    vivaQuestions: [
      {
        id: 'vq_cs1',
        question: 'Why did you select Isolation Forest over Supervised Classification (e.g. Random Forest)?',
        category: 'aiml',
        suggestedAnswer: 'Supervised models require balanced datasets of known labeled attacks, which are rare in enterprise environments and fail to catch zero-day exploits. Isolation Forests operate in an unsupervised manner by recursively partitioning feature space; anomalous points require far fewer splits to be isolated, making them uniquely capable of spotting novel, unforeseen attack patterns.',
        sampleEvaluationKeypoints: ['Unsupervised vs supervised limitation for zero-days', 'Recursive partitioning mechanism', 'Sensitivity to few-split outliers']
      }
    ],
    improvements: [
      {
        id: 'imp_cs1',
        title: 'Integration with VirusTotal API for IP Reputation',
        category: 'security',
        description: 'Auto-query VirusTotal threat intelligence feeds for flagged source IP addresses to display global abuse scores.',
        impact: 'High',
        difficulty: 'Easy',
        addedToRoadmap: true,
        technicalSteps: ['Add async request to VirusTotal v3 IP endpoint', 'Render malicious score badge in incident drawer']
      }
    ],
    documentationDrafts: {
      abstract: 'Contemporary cybersecurity defenses are overwhelmed by heterogeneous log streams. This project develops CyberSentinel, an automated SIEM and anomaly classification platform. Leveraging unsupervised Isolation Forests, the system detects anomalous behavioral sequences—such as credential stuffing and port enumeration—without requiring labeled attack datasets, delivering prioritized mitigation commands to SOC analysts.',
      introduction: 'Security analysts face severe alert fatigue. CyberSentinel automates first-level log triage, separating normal operational noise from stealthy intrusions.',
      problemStatement: 'Traditional signature-based IDS engines fail to identify zero-day heuristics, while commercial enterprise SIEMs (Splunk, QRadar) are prohibitively complex and expensive.',
      objectives: '1. Ingest raw syslogs with resilient regex parsing.\n2. Apply unsupervised machine learning for anomaly isolation.\n3. Output immediate containment firewalls scripts.',
      methodology: 'FastAPI async ingestion pipeline coupled with scikit-learn anomaly scoring and React dashboard visualization.',
      systemRequirements: 'Python 3.11, Scikit-learn, FastAPI, React, Tailwind CSS.',
      futureScope: 'Automated honeypot deployment for active adversary deception.',
      conclusion: 'The system provides an accessible, high-performance security automation platform suitable for academic and enterprise deployments.'
    },
    isSaved: false,
    progress: 55,
    completedStages: ['Log Parsing', 'Model Training'],
    currentStage: 'Frontend Development',
    nextStage: 'Testing'
  },
  {
    id: 'mediscan-health-records',
    title: 'MediScan: FHIR Electronic Health Record & Symptom Triage',
    tagline: 'Secure FHIR-compliant patient records with transformer-powered symptom triage and drug interaction alerts.',
    description: 'A healthcare interoperability platform that organizes patient electronic health records in HL7 FHIR format, provides symptom triage suggestions, and checks prescription drug-drug interactions in real time.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    matchScore: 92,
    difficulty: 'Intermediate',
    duration: '12 weeks',
    budget: '₹3,500',
    domain: 'Healthcare',
    requiredSkills: ['Python', 'Django', 'React', 'SQL', 'NLP'],
    technologies: ['Django', 'React', 'PostgreSQL', 'BioBERT', 'HL7 FHIR', 'Tailwind CSS'],
    careerRelevance: 'Tremendous demand in HealthTech startups, hospital management systems, and clinical informatics.',
    problemStatement: 'Fragmented hospital databases prevent seamless patient data portability, and medication reconciliation errors cause preventable adverse drug events.',
    objectives: [
      'Implement standard HL7 FHIR Patient and Observation resource schemas.',
      'Screen concurrent prescriptions against the open FDA National Drug Code interaction database.',
      'Provide intuitive clinical charts for vitals over time with threshold alerts.'
    ],
    targetUsers: ['Clinicians', 'Outpatient individuals', 'Hospital administrators'],
    expectedOutcome: 'A HIPAA-inspired clinical portal with patient timelines, drug conflict banners, and PDF export.',
    whyThisProject: 'Healthcare is universally respected in academic project evaluations; demonstrates technical rigor in standards (FHIR), database modeling, and patient safety.',
    feasibility: {
      overall: 86,
      skillFit: 88,
      timeFit: 82,
      budgetFit: 95,
      teamFit: 85,
      technologyFit: 88,
      verdict: 'Strong candidate with clear academic and societal value.',
      keyChallenge: 'Strict data privacy compliance and handling complex medical terminologies.'
    },
    features: [
      { id: 'md_1', title: 'FHIR JSON Patient Records', description: 'Full compliance with HL7 FHIR Release 4 standard schemas.', tier: 'mvp', difficulty: 'Medium', expectedImpact: 'Transformative' },
      { id: 'md_2', title: 'Real-Time Drug Interaction Checker', description: 'Cross-checks prescribed medications for known contraindications and severity warnings.', tier: 'mvp', difficulty: 'Medium', expectedImpact: 'High' },
      { id: 'md_3', title: 'BioBERT Symptom Triage', description: 'Analyzes patient self-reported symptoms to suggest clinical specialty referrals.', tier: 'advanced', difficulty: 'High', expectedImpact: 'High' }
    ],
    techStack: [
      { category: 'Backend', name: 'Django REST Framework', badge: 'Healthcare API', whyUseThis: 'Robust ORM, built-in admin portal, and strict data validation.' },
      { category: 'Database', name: 'PostgreSQL JSONB', badge: 'FHIR Store', whyUseThis: 'Structured JSONB columns allow flexible FHIR resource storage without schema thrashing.' },
      { category: 'Frontend', name: 'React + TypeScript', badge: 'Clinical UI', whyUseThis: 'High-contrast accessible clinical charts and patient timeline components.' }
    ],
    architecture: {
      summary: 'HIPAA-conscious decoupled architecture implementing standard FHIR resource APIs backed by PostgreSQL and BioBERT analysis.',
      nodes: [
        { id: 'md_c', name: 'Doctor / Patient Web Portal', type: 'client', description: 'Web interface for updating records and reviewing prescriptions.', technologies: ['React', 'TypeScript'] },
        { id: 'md_b', name: 'Django FHIR API Server', type: 'api', description: 'Enforces FHIR schema validation and role-based access control.', technologies: ['Django', 'Python'] },
        { id: 'md_db', name: 'PostgreSQL FHIR Storage', type: 'storage', description: 'Stores encrypted patient records with audit logs.', technologies: ['PostgreSQL', 'pgcrypto'] }
      ],
      flows: [
        { from: 'md_c', to: 'md_b', label: 'Sends FHIR Resource Queries', protocol: 'HTTPS / OAuth2' },
        { from: 'md_b', to: 'md_db', label: 'Encrypted Persistence', protocol: 'SQL' }
      ],
      dataFlowDescription: 'Clinician enters prescription data. Django API validates schema against FHIR specifications, checks FDA drug interaction endpoints, and renders clinical alerts.',
      securityPractices: ['Field-level encryption for sensitive Personal Health Information (PHI) with immutable audit logs.']
    },
    roadmap: [
      { id: 'ph_md1', phaseNumber: 1, name: 'FHIR Schema & Database Modeling', description: 'Model Patient, Encounter, and MedicationRequest resources.', duration: 'Weeks 1-4', tasks: [{ id: 't_md1', title: 'FHIR Model Implementation', description: 'Django models compliant with FHIR R4.', status: 'completed', estimatedDays: 8, deliverable: 'FHIR compliant models' }] },
      { id: 'ph_md2', phaseNumber: 2, name: 'Interaction Engine & API Routes', description: 'Implement drug interaction matrix and REST endpoints.', duration: 'Weeks 5-8', tasks: [{ id: 't_md2', title: 'Drug Interaction Service', description: 'Integrate openFDA drug database.', status: 'not-started', estimatedDays: 7, deliverable: 'Interaction checker API' }] }
    ],
    vivaQuestions: [
      {
        id: 'vq_md1',
        question: 'What is HL7 FHIR and why is it preferred over legacy HL7 v2 standards?',
        category: 'architecture',
        suggestedAnswer: 'HL7 FHIR (Fast Healthcare Interoperability Resources) replaces legacy pipe-delimited HL7 v2 messages with modern web standards: JSON/XML representations and RESTful APIs. It breaks medical entities into modular, reusable "Resources" (like Patient, Medication, Condition) making healthcare application development fast, human-readable, and compatible with modern mobile and web frameworks.',
        sampleEvaluationKeypoints: ['Modern JSON/REST vs legacy pipe-delimited v2', 'Modular "Resources" architecture', 'Developer ergonomic and web compatibility']
      }
    ],
    improvements: [
      {
        id: 'imp_md1',
        title: 'Offline Emergency Patient Summary QR Code',
        category: 'innovation',
        description: 'Generate an encrypted QR code containing emergency medical info (blood type, allergies, emergency contacts) readable offline by first responders.',
        impact: 'High',
        difficulty: 'Medium',
        addedToRoadmap: false,
        technicalSteps: ['Create compressed encrypted JSON payload', 'Render QR code with client download capability']
      }
    ],
    documentationDrafts: {
      abstract: 'Interoperability remains a formidable barrier in digital health. This project implements MediScan, an electronic health record system adopting the HL7 FHIR Release 4 standard. Incorporating real-time pharmaceutical contraindication screening and AI-driven clinical symptom triage, MediScan guarantees data portability while mitigating medication prescription errors.',
      introduction: 'Patient health data is frequently siloed across incompatible clinic formats. Adopting global open standards like FHIR unlocks secure interoperability.',
      problemStatement: 'Medical errors due to fragmented patient history and unflagged drug-drug interactions represent a major cause of preventable hospital complications.',
      objectives: '1. Implement robust FHIR R4 REST APIs in Django.\n2. Build a reliable drug interaction cross-checking service.\n3. Design a secure, accessible clinician and patient portal.',
      methodology: 'Iterative full-stack development using Django REST Framework and PostgreSQL with field-level encryption.',
      systemRequirements: 'Python 3.11, Django 5, PostgreSQL 16, React, Tailwind CSS.',
      futureScope: 'Integration with Apple HealthKit and Google Health Connect APIs.',
      conclusion: 'MediScan demonstrates that standards-compliant medical software can be implemented efficiently to save clinical time and safeguard lives.'
    },
    isSaved: false,
    progress: 25,
    completedStages: ['FHIR Schema Design'],
    currentStage: 'Drug Interaction Engine',
    nextStage: 'Clinician UI'
  },
  {
    id: 'edulearn-adaptive-quiz',
    title: 'EduAdaptive: Knowledge-Tracing Adaptive Learning Engine',
    tagline: 'Personalized student question pacing using Bayesian Knowledge Tracing and automated misconception diagnosis.',
    description: 'An educational technology platform that continuously models a student\'s mastery of individual concepts, dynamically adjusting quiz difficulty and pinpointing specific conceptual misconceptions.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    matchScore: 93,
    difficulty: 'Intermediate',
    duration: '6 weeks',
    budget: '₹1,800',
    domain: 'Education',
    requiredSkills: ['TypeScript', 'React', 'Node.js', 'Machine Learning', 'SQL'],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Bayesian Knowledge Tracing', 'Tailwind CSS'],
    careerRelevance: 'Strong alignment with EdTech engineering, Full Stack Web, and Data Science roles.',
    problemStatement: 'One-size-fits-all testing in colleges leads to either student boredom or frustration; educators lack real-time visibility into the exact prerequisite concept a student struggles with.',
    objectives: [
      'Model student skill acquisition using probabilistic Bayesian Knowledge Tracing (BKT).',
      'Dynamically serve questions matching student Zone of Proximal Development (ZPD).',
      'Generate conceptual prerequisite dependency graphs for course syllabi.'
    ],
    targetUsers: ['College professors', 'Self-paced students', 'Online certification academies'],
    expectedOutcome: 'A responsive learning app with interactive knowledge mastery graphs and adaptive question flows.',
    whyThisProject: 'Quick 6-week feasibility, clean mathematical modeling, and highly intuitive live demonstration for examiners.',
    feasibility: {
      overall: 94,
      skillFit: 95,
      timeFit: 94,
      budgetFit: 98,
      teamFit: 92,
      technologyFit: 95,
      verdict: 'Extremely high feasibility — Compact scope, mathematically rigorous, highly visual.',
      keyChallenge: 'Calibrating prior probability parameters for initial question cold-starts.'
    },
    features: [
      { id: 'ed_1', title: 'Adaptive Question Serving', description: 'Selects next question based on current estimated mastery probability.', tier: 'mvp', difficulty: 'Medium', expectedImpact: 'Transformative' },
      { id: 'ed_2', title: 'Knowledge Mastery Heatmap', description: 'Visual concept graph indicating mastered vs weak prerequisite concepts.', tier: 'mvp', difficulty: 'Low', expectedImpact: 'High' },
      { id: 'ed_3', title: 'Automated Misconception Diagnosis', description: 'Analyzes incorrect distractors to diagnose specific foundational misunderstandings.', tier: 'advanced', difficulty: 'Medium', expectedImpact: 'High' }
    ],
    techStack: [
      { category: 'Frontend', name: 'React + TypeScript', badge: 'Interactive UI', whyUseThis: 'Fast state updates for timer-based quizzes and interactive mastery visualizers.' },
      { category: 'Backend', name: 'Node.js + Express', badge: 'API Engine', whyUseThis: 'Lightweight asynchronous event handling for question submission.' },
      { category: 'Database', name: 'PostgreSQL', badge: 'Student Store', whyUseThis: 'Relational tracking of student attempts, question parameters, and mastery states.' }
    ],
    architecture: {
      summary: 'Client-server architecture running probabilistic mastery estimation algorithms on each response event.',
      nodes: [
        { id: 'ed_s', name: 'Student Web Client', type: 'client', description: 'Answers questions and views mastery progression.', technologies: ['React', 'Tailwind CSS'] },
        { id: 'ed_api', name: 'Express Knowledge Engine', type: 'api', description: 'Computes BKT posterior probabilities and fetches optimal next questions.', technologies: ['Node.js', 'TypeScript'] },
        { id: 'ed_db', name: 'PostgreSQL Datastore', type: 'storage', description: 'Persists item difficulty, discrimination, and student attempt logs.', technologies: ['PostgreSQL'] }
      ],
      flows: [
        { from: 'ed_s', to: 'ed_api', label: 'Submits Answer & Latency', protocol: 'REST / JSON' },
        { from: 'ed_api', to: 'ed_db', label: 'Updates Posterior Mastery in DB', protocol: 'SQL' }
      ],
      dataFlowDescription: 'Student submits an answer. Server updates the Bayesian probability of skill mastery using prior parameters (Slip, Guess, Learn rate) and selects the next question.',
      securityPractices: ['Prevent client-side answer sniffing by never sending correct option keys to browser.']
    },
    roadmap: [
      { id: 'ph_ed1', phaseNumber: 1, name: 'BKT Algorithm Implementation', description: 'Write and test Bayesian Knowledge Tracing functions in TypeScript.', duration: 'Weeks 1-2', tasks: [{ id: 't_ed1', title: 'BKT Engine', description: 'Core math functions with unit tests.', status: 'completed', estimatedDays: 5, deliverable: 'BKT math module' }] },
      { id: 'ph_ed2', phaseNumber: 2, name: 'Question Bank & API', description: 'Seed CS concepts question bank and build quiz APIs.', duration: 'Weeks 3-4', tasks: [{ id: 't_ed2', title: 'Question Bank API', description: 'Express endpoints with concept tagging.', status: 'completed', estimatedDays: 6, deliverable: 'Quiz REST endpoints' }] },
      { id: 'ph_ed3', phaseNumber: 3, name: 'Mastery Visualizations', description: 'Build interactive student dashboard in React.', duration: 'Weeks 5-6', tasks: [{ id: 't_ed3', title: 'Mastery Dashboard', description: 'Skill tree visualization.', status: 'in-progress', estimatedDays: 7, deliverable: 'Finished web portal' }] }
    ],
    vivaQuestions: [
      {
        id: 'vq_ed1',
        question: 'What are the four core parameters of Bayesian Knowledge Tracing (BKT)?',
        category: 'technical',
        suggestedAnswer: 'BKT models student knowledge as a hidden binary variable using four parameters: 1) p(L0): the prior probability the student already knows the skill before practice, 2) p(T): the transition probability of learning the skill during an opportunity, 3) p(G): the guess probability of answering correctly despite not knowing the skill, and 4) p(S): the slip probability of answering incorrectly despite knowing the skill.',
        sampleEvaluationKeypoints: ['Prior knowledge p(L0)', 'Transition / learning rate p(T)', 'Guess parameter p(G)', 'Slip parameter p(S)']
      }
    ],
    improvements: [
      {
        id: 'imp_ed1',
        title: 'Spaced Repetition Flashcard Generation',
        category: 'innovation',
        description: 'Auto-generate Anki-compatible spaced repetition review cards for concepts with slipping mastery scores.',
        impact: 'High',
        difficulty: 'Easy',
        addedToRoadmap: true,
        technicalSteps: ['Implement SM-2 algorithm calculation for interval review', 'Export review schedule in student dashboard']
      }
    ],
    documentationDrafts: {
      abstract: 'Traditional standardized examinations assess student retention statically, failing to guide individual pacing or identify foundational misunderstandings. EduAdaptive is an adaptive learning engine applying Bayesian Knowledge Tracing (BKT). By continuously recalculating posterior mastery probabilities after every student response, the platform customizes question difficulty to maintain optimal challenge while constructing transparent prerequisite diagnostic graphs for educators.',
      introduction: 'Personalized tutoring produces significantly superior learning outcomes compared to fixed classroom pacing. EduAdaptive algorithmically scales personalized pacing across web platforms.',
      problemStatement: 'Static testing penalizes students without diagnosing whether failure stemmed from careless slips or deep prerequisite gaps.',
      objectives: '1. Formulate Bayesian Knowledge Tracing algorithms for computer science syllabus topics.\n2. Engineer dynamic question serving with low latency.\n3. Provide visual mastery analytics for learners and teachers.',
      methodology: 'Probabilistic modeling implemented in Node.js and TypeScript, validated against simulated student learning curves.',
      systemRequirements: 'Node.js 20, TypeScript, PostgreSQL, React, Tailwind CSS.',
      futureScope: 'Integration with Large Language Models to generate customized pedagogical hints for detected misconceptions.',
      conclusion: 'The application showcases the power of statistical student modeling to enhance comprehension and engagement.'
    },
    isSaved: false,
    progress: 70,
    completedStages: ['Math Formulation', 'API Development'],
    currentStage: 'Dashboard Visualizer',
    nextStage: 'Testing'
  }
];
