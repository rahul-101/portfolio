// ---------- Types ----------
export type Skill = { name: string; icon: string; level: number };
export type SkillCategory = { title: string; icon: string; skills: Skill[] };
export type Certification = { name: string; provider: string; year?: string; icon: string; bg: string; verify?: string };
export type Project = {
  title: string;
  tag: string;
  desc: string;
  badges: string[];
  metrics: { value: string; label: string }[];
  links?: { label: string; href: string; primary?: boolean }[];
  featured?: boolean;
};
export type TimelineEntry = {
  role: string;
  org: string;
  orgLogo: string;
  date: string;
  tag: string;
  points: string[];
};
export type Writing = { tag: string; title: string; desc: string; meta: string };
export type Testimonial = { name: string; role: string; company: string; companyLogo: string; avatar: string; linkedin: string; quote: string; bg: string };

// ---------- Hero ----------
export const hero = {
  tagline: 'Agentic AI • Automation • Data Solutions',
  firstName: 'Rahul',
  lastName: 'Biswas',
  typewriterPrefix: 'I build',
  roles: ['Intelligent Agents', 'Resilient Automation', 'Data Platforms', 'AI Workflows'],
  sub: 'Senior Specialist in Agentic AI, automation and data — I design intelligent systems that plan, act, and prove their impact with numbers.',
  metaChips: ['Kolkata, India', '6+ Years Experience', '13 Certifications'],
};

// ---------- About ----------
export const about = {
  label: '01 — About',
  title: 'Engineering Intelligence Into Operations.',
  paragraphs: [
    "I'm Rahul Biswas, a Senior Specialist with over 6 years of experience designing and deploying intelligent systems across the enterprise stack. My journey began in data engineering and business intelligence—building ETL pipelines, optimizing SQL queries, and crafting Power BI dashboards—and has evolved into architecting agentic AI workflows that autonomously plan, reason, and act to deliver measurable business outcomes.",
    'Today I operate at the intersection of three technical domains: <strong>Agentic AI</strong> (orchestrating multi-agent systems with CrewAI, LangGraph, and Claude for adaptive decision-making), <strong>Resilient Automation</strong> (developing Python-based automation frameworks, REST APIs, and infrastructure-as-code with Ansible and Terraform), and <strong>Data Platforms</strong> (designing SQL Server and Power BI solutions that transform raw telemetry into actionable insights with full traceability).',
    'The common thread is delivery with evidence — every workflow I build comes with observability, traceability, and a number attached to it. This ensures that automation and AI initiatives are not just technically sound but also demonstrably impactful, enabling stakeholders to make informed decisions based on measurable outcomes.',
  ],
  stats: [
    { value: 6, suffix: '+', label: 'Years of Experience' },
    { value: 13, suffix: '+', label: 'Certifications' },
    { value: 4, suffix: '+', label: 'Industry Verticals' },
    { value: 2, suffix: '', label: 'Organizations' },
  ],
  industries: [
    { name: 'Consumer Goods', icon: 'layers' },
    { name: 'Financial Services', icon: 'bank' },
    { name: 'Telecom', icon: 'signal' },
    { name: 'Agriculture', icon: 'leaf' },
  ],
  industriesSub: 'Hands-on delivery across four verticals — from network-scale automation to financial remediation.',
  pillars: [
    {
      title: 'Agentic AI',
      desc: 'Multi-agent workflows and LLM orchestration with CrewAI, LangGraph and Claude.',
      icon: 'agent',
    },
    {
      title: 'Automation',
      desc: 'Python, Ansible, Flask APIs and AWX orchestration powering end-to-end workflows.',
      icon: 'bolt',
    },
    {
      title: 'Data Solutions',
      desc: 'ETL, SSIS, SQL Server and Power BI transforming telemetry and raw data into insight.',
      icon: 'chart',
    },
  ],
};

// ---------- Testimonials ----------
export const testimonials: Testimonial[] = [
  {
    name: 'Mithun Mahato',
    role: 'Network Specialist',
    company: 'HCLTech',
    companyLogo: 'images/hcltech.jpg',
    avatar: 'images/mithun.jpg',
    linkedin: 'https://www.linkedin.com/in/mithun-mahato-b40b2313a',
    bg: '#818cf8',
    quote:
      'I can confidently say Rahul Biswas is a true asset to any team. As an automation specialist, he brings deep technical expertise and a strong problem-solving mindset to every challenge. He is proficient in Python, REST API integration and SQL Server, and excels at data visualization using Power BI. Rahul also plays a key role in project management, keeping projects on track and stakeholders aligned.',
  },
  {
    name: 'Utsav Roy',
    role: 'Sr. Data Engineer',
    company: 'IBM',
    companyLogo: 'images/ibm.svg',
    avatar: 'images/utsav.jpg',
    linkedin: 'https://www.linkedin.com/in/utsavroy1',
    bg: '#22d3ee',
    quote:
      'Technically skilled, smart working and an easily approachable person. It was a great experience working alongside in freelance projects.',
  },
  {
    name: 'Suparna Hazra',
    role: 'Senior Consultant',
    company: 'EY GDS Tech Consulting',
    companyLogo: 'images/ey.svg',
    avatar: 'images/suparna.jpg',
    linkedin: 'https://www.linkedin.com/in/suparna-hazra-12a313126/',
    bg: '#34d399',
    quote:
      'Rahul is very trustworthy and helpful person. I have worked with him in several projects; his Python skills and SQL skills are really recommendable and his visualization skills equally give satisfaction to many clients.',
  },
  {
    name: 'Rohan Patra',
    role: 'Assistant Manager',
    company: 'TCS',
    companyLogo: 'images/tcs.svg',
    avatar: 'images/rohan.jpg',
    linkedin: 'https://www.linkedin.com/in/rohan-patra0000/',
    bg: '#f472b6',
    quote:
      "Rahul is one of the most dedicated professionals I've worked with and is willing to go the extra mile to help you when needed. His expertise as a data analyst is considerable and it helped our team come up with more efficient solutions.",
  },
  {
    name: 'Akash Talukdar',
    role: 'Deputy Manager',
    company: 'Protiviti India Member Firm',
    companyLogo: 'images/protiviti.jpg',
    avatar: 'images/akash.jpg',
    linkedin: 'https://www.linkedin.com/in/akash-talukder-7a9002129/',
    bg: '#fbbf24',
    quote:
      "We've joined hands on several projects, and Rahul is one of the best people I had as a partner. I highly recommend his expertise to any person looking for a BI developer and Data Analyst.",
  },
];

export const endorseChips = [
  'Python',
  'SQL Server',
  'REST APIs',
  'Power BI',
  'Automation',
  'Machine Learning',
  'Data Visualization',
  'Project Management',
];

// ---------- Skills ----------
export const skillCategories: SkillCategory[] = [
  {
    title: 'Programming',
    icon: 'code',
    skills: [
      { name: 'Python', icon: 'images/python.svg', level: 95 },
      { name: 'SQL', icon: 'images/mssql.svg', level: 90 },
      { name: 'PowerShell', icon: 'images/powershell.svg', level: 85 },
      { name: 'TypeScript', icon: 'images/typescript.svg', level: 75 },
      { name: 'JavaScript', icon: 'images/javascript.svg', level: 82 },
      { name: 'React', icon: 'images/react.svg', level: 80 },
      { name: 'CSS', icon: 'images/css.svg', level: 80 },
    ],
  },
  {
    title: 'Agentic AI & LLM',
    icon: 'agent',
    skills: [
      { name: 'Claude (Anthropic)', icon: 'images/anthropic.jpg', level: 88 },
      { name: 'CrewAI', icon: 'images/crewai.svg', level: 90 },
      { name: 'LangGraph', icon: 'images/langraph.jpg', level: 88 },
      { name: 'Codex (OpenAI)', icon: 'images/codex.jpg', level: 80 },
      { name: 'Gemini', icon: 'images/gemini.svg', level: 82 },
      { name: 'Amazon Bedrock', icon: 'images/aws.svg', level: 84 },
      { name: 'Azure AI Foundry', icon: 'images/azureaifoundry.jpg', level: 82 },
    ],
  },
  {
    title: 'Cloud Platforms',
    icon: 'cloud',
    skills: [
      { name: 'Amazon AWS', icon: 'images/aws.svg', level: 86 },
      { name: 'Microsoft Azure', icon: 'images/azure.jpg', level: 84 },
      { name: 'Google Cloud (GCP)', icon: 'images/gcp.svg', level: 80 },
    ],
  },
  {
    title: 'Databases',
    icon: 'database',
    skills: [
      { name: 'MS SQL Server', icon: 'images/mssql.svg', level: 92 },
      { name: 'MongoDB', icon: 'images/mongodb.svg', level: 82 },
      { name: 'PostgreSQL', icon: 'images/postgresql.svg', level: 80 },
    ],
  },
  {
    title: 'Frameworks & APIs',
    icon: 'wrench',
    skills: [
      { name: 'REST API Design', icon: 'images/postman.svg', level: 90 },
      { name: 'Flask', icon: 'images/flask.svg', level: 85 },
      { name: 'FastAPI', icon: 'images/fastapi.svg', level: 82 },
      { name: 'Ansible', icon: 'images/ansible.svg', level: 82 },
      { name: 'Machine Learning', icon: 'images/ml.jpg', level: 80 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: 'toolbox',
    skills: [
      { name: 'AEX Agentic AI', icon: 'images/aex.jpg', level: 88 },
      { name: 'GitHub Copilot', icon: 'images/copilot.svg', level: 80 },
      { name: 'Ansible AWX', icon: 'images/ansible.svg', level: 85 },
      { name: 'Power BI', icon: 'images/powerbi.svg', level: 87 },
      { name: 'Git / Postman / Jira / ServiceNow', icon: 'images/git.svg', level: 86 },
    ],
  },
];

export const strengths = [
  'Troubleshooting',
  'Research & Development',
  'Root Cause Analysis',
  'Requirement Gathering',
  'Documentation',
  'Workflow Design',
];

// ---------- Credentials ----------
export const certifications: Certification[] = [
  { name: 'Azure AI Fundamentals', provider: 'Microsoft', year: '2024', icon: 'images/microsoft.svg', bg: '#0078d4', verify: 'https://learn.microsoft.com/api/credentials/share/en-us/RahulBiswas-8574/348D940154D76727?sharingId' },
  { name: 'Claude Certified Developer — Foundations (CCDV-F)', provider: 'Anthropic', icon: 'images/anthropic.jpg', bg: '#fff', verify: 'https://www.credly.com/badges/377108d7-cf15-4951-a46b-5b5a9e30f803/linked_in_profile' },
  { name: 'Claude Certified Architect — Foundations (CCAR-F)', provider: 'Anthropic', icon: 'images/anthropic.jpg', bg: '#fff', verify: 'https://www.credly.com/badges/01a92870-e851-4043-9e73-a1bc625c6b1a/linked_in_profile' },
  { name: 'AWS Partner — Agentic AI Essentials', provider: 'Amazon Web Services', icon: 'images/aws.svg', bg: '#ff9900', verify: 'https://www.credly.com/badges/1cc6c506-d362-4a08-9f87-f51c951c2093/linked_in_profile' },
  { name: 'Claude 101', provider: 'Anthropic · Skilljar', icon: 'images/anthropic.jpg', bg: '#fff', verify: 'https://verify.skilljar.com/c/b23hj8q3srsu' },
  { name: 'Introduction to Claude Cowork', provider: 'Anthropic · Skilljar', icon: 'images/anthropic.jpg', bg: '#fff', verify: 'https://verify.skilljar.com/c/8sze8omup69c' },
  { name: 'Fundamentals of LLMs', provider: 'Hugging Face', icon: 'images/huggingface.svg', bg: '#1a1a1a', verify: 'https://huggingface.co/agents-course' },
  { name: 'AI Agents Fundamentals', provider: 'Hugging Face', icon: 'images/huggingface.svg', bg: '#1a1a1a', verify: 'https://huggingface.co/datasets/agents-course/certificates/resolve/main/certificates/Incognito-1105/2026-03-02.png' },
  { name: 'Applied Machine Learning in Python', provider: 'Coursera', year: '2019', icon: 'images/coursera.jpg', bg: '#fff', verify: 'https://www.coursera.org/verify/N7DF8PFB9ENC' },
  { name: 'Advanced RPA Professional', provider: 'Automation Anywhere · 2019', icon: 'images/automationanywhere.jpg', bg: '#fff' },
  { name: 'SQL Intermediate', provider: 'HackerRank', year: '2024', icon: 'images/hackerrank.svg', bg: '#1f8f6d', verify: 'https://www.hackerrank.com/certificates/iframe/000ac6e129a0' },
  { name: 'MySQL Basics', provider: 'Great Learning', year: '2021', icon: 'images/greatlearning.jpg', bg: '#fff', verify: 'https://olympus1.greatlearning.in/course_certificate/UKCBWUZE' },
  { name: 'Python', provider: 'TestDome · 2021', icon: 'images/testdome.svg', bg: '#2c2f33', verify: 'https://app.testdome.com/cert/fff2ec2e4ea94caa98808e3bbd348124' },
];

export const education = {
  degree: 'B.Tech — Electronics & Communication Engineering',
  school: 'Guru Nanak Institute of Technology',
  years: '2015–2019',
  icon: 'images/gurunank.svg',
  bg: '#0ea5e9',
};

export const awards = [
  { title: 'Project Leadership Award', desc: 'For delivering high-impact automation initiatives.' },
  { title: 'Technical Excellence Award', desc: 'For engineering excellence and innovation.' },
];

// ---------- Projects ----------
export const personalProjects: Project[] = [
  {
    title: 'FinSight — AI Personal Finance Tracker',
    tag: 'GitHub · Active',
    featured: true,
    desc: 'Local-first finance workspace that ingests transactions from manual entry, Gmail alerts, receipt OCR and bill uploads; classifies them with pluggable AI providers; and surfaces budgets, reports, a financial-health meter and a weekly AI digest.',
    badges: ['React', 'Vite', 'TypeScript', 'FastAPI', 'MongoDB', 'OCR', 'Python'],
    metrics: [
      { value: '8', label: 'AI Providers Supported' },
      { value: '4', label: 'Transaction Sources' },
      { value: '6', label: 'Financial Types' },
    ],
    links: [
      { label: 'Source Code', href: 'https://github.com/rahul-101/ai-personal-finance-tracker', primary: true },
      { label: 'Docs', href: 'https://github.com/rahul-101/ai-personal-finance-tracker/tree/main/docs' },
    ],
  },
  {
    title: 'OpenOps AI — Autonomous Incident Response',
    tag: 'GitHub · Active',
    featured: true,
    desc: 'Enterprise incident-response platform with a 5-stage AIOps lifecycle — ingest, analyze, decide, execute, verify — driven by five specialized agents, risk-gated remediation, RAG over incident history and a real-time command center.',
    badges: ['FastAPI', 'Google ADK', 'Gemini', 'MongoDB', 'Prometheus', 'Python 3.11'],
    metrics: [
      { value: '471', label: 'Tests Passing' },
      { value: '60+', label: 'REST Endpoints' },
      { value: '5', label: 'Agent Lifecycle' },
    ],
    links: [
      { label: 'Source Code', href: 'https://github.com/rahul-101/openops-ai', primary: true },
      { label: 'Docs', href: 'https://github.com/rahul-101/openops-ai/tree/main/docs' },
    ],
  },
];

export const professionalProjects: Project[] = [
  {
    title: 'Agentic AI Enterprise Orchestration',
    tag: 'HCLTech · 2025–Now',
    desc: 'Multi-agent orchestration framework for enterprise automation — planning, reasoning and autonomous execution with CrewAI, LangGraph, custom LLM components and AEX tools, with observability and traceability built in.',
    badges: ['CrewAI', 'LangGraph', 'Claude', 'AEX Agentic AI', 'Python', 'LLM'],
    metrics: [
      { value: '5+', label: 'Agent Workflows' },
      { value: '4', label: 'Enterprise Integrations' },
      { value: '100%', label: 'Traceability' },
    ],
  },
  {
    title: 'Network Capacity & Telemetry Platform',
    tag: 'HCLTech · 2023–2025',
    desc: 'Capacity-utilization monitoring for a global WAN environment — SFTP ingestion, unstructured-data transformation and curated loads into SQL Server for 24,000+ network devices.',
    badges: ['Python', 'SQL Server', 'Ansible', 'AWX', 'ServiceNow', 'Power BI'],
    metrics: [
      { value: '24,000+', label: 'Devices Monitored' },
      { value: '80%', label: 'Manual Effort Cut' },
      { value: '80%', label: 'MTTR Improvement' },
    ],
  },
  {
    title: 'VM Lifecycle Automation & REST API Integration',
    tag: 'HCLTech · 2021–2023',
    desc: 'Asynchronous Python automation for VM commissioning and decommissioning, node configuration, protection jobs and image restoration, exposed through Flask REST APIs for consistent, fast provisioning.',
    badges: ['Python', 'asyncio', 'Flask', 'REST API', 'PowerShell', 'Jira'],
    metrics: [
      { value: '3+', label: 'REST APIs Built' },
      { value: '100%', label: 'Provisioning Consistency' },
      { value: 'Async', label: 'Scalable Workflows' },
    ],
  },
  {
    title: 'KYC Remediation & Reconciliation Engine',
    tag: 'Protiviti · 2021',
    desc: 'Automation of KYC remediation for banks across Germany and the UK — fuzzy reconciliation in Python, Excel automation, live dashboards and audit-ready tracking.',
    badges: ['Python', 'PowerShell', 'VBA', 'SSIS', 'SQL Server', 'Power BI'],
    metrics: [
      { value: '2', label: 'Banking Regions' },
      { value: '1', label: 'Fuzzy Match Engine' },
      { value: 'Live', label: 'Progress Dashboards' },
    ],
  },
  {
    title: 'Telecom Data Migration & Price Forecasting',
    tag: 'Protiviti · 2019–2020',
    desc: 'Complex SQL data-migration with field-level validation, a price-prediction model (logistic regression, K-means), and Power BI dashboards built from food-and-beverage datasets.',
    badges: ['SQL', 'Python', 'Logistic Regression', 'K-Means', 'Power BI'],
    metrics: [
      { value: '10+', label: 'Migration Rules' },
      { value: 'ML', label: 'Price Forecasting' },
      { value: '2', label: 'Insight Dashboards' },
    ],
  },
];

// ---------- Experience ----------
export const timeline: TimelineEntry[] = [
  {
    role: 'Senior Specialist',
    org: 'HCLTech',
    orgLogo: 'images/hcltech.jpg',
    date: 'Oct 2025 — Present',
    tag: 'Agentic AI, Automation & Data',
    points: [
      'Leading Agentic AI development for enterprise automation — architecting multi-step orchestration and autonomous execution that replaces manual, human-in-the-loop workflows.',
      'Designing multi-agent workflows with CrewAI, LangGraph, custom LLM components and AEX tools, enabling complex tasks to be decomposed and executed reliably.',
      'Building reusable, Python-based agent frameworks with API, data and prompt-driven integration that standardize how agents connect to enterprise systems.',
      'Establishing engineering standards for LLM evaluation, observability, modular design and maintainability so agentic solutions scale beyond prototypes.',
      'Driving measurable ROI: automating tasks that previously required dedicated manual effort, cutting turn-around time and improving process consistency.',
    ],
  },
  {
    role: 'Specialist',
    org: 'HCLTech',
    orgLogo: 'images/hcltech.jpg',
    date: 'Sep 2023 — Sep 2025',
    tag: 'Global Consumer Goods',
    points: [
      'Led automation and optimization for large-scale global WAN, switch and router environments spanning 24,000+ network devices.',
      'Designed a capacity-utilization monitoring platform with SFTP ingestion, unstructured-data transformation and curated SQL Server loads.',
      'Engineered Python automation pipelines that eliminated repetitive manual checks and reduced human error in network operations.',
      'Built executive-facing Power BI dashboards that made capacity trends, utilization and anomalies visible at a glance.',
      '<strong>Delivered 80% reduction in manual effort and 80% improvement in MTTR</strong> — turning network data into proactive, data-driven decisions.',
    ],
  },
  {
    role: 'Senior Analyst',
    org: 'HCLTech',
    orgLogo: 'images/hcltech.jpg',
    date: 'Sep 2021 — Sep 2023',
    tag: 'Financial Services',
    points: [
      'Developed asynchronous Python automation for speed, scalability and reliability, enabling parallel execution of long-running provisioning tasks.',
      'Created REST APIs with Flask to connect automation components and external systems, standardizing how workflows are triggered and monitored.',
      'Automated VM commissioning and decommissioning, node configuration, protection jobs and image restoration — improving provisioning consistency to 100%.',
      'Applied unit testing, Git version control and Jira-based agile practices to keep automation reliable and auditable.',
    ],
  },
  {
    role: 'Consultant 2 — Data & BI Consultant',
    org: 'Protiviti India Member Firm',
    orgLogo: 'images/protiviti.jpg',
    date: 'Jan 2021 — Sep 2021',
    tag: 'Financial Services',
    points: [
      'Led KYC remediation automation for banks across Germany and the UK using Python, PowerShell and VBA to streamline client onboarding.',
      'Built a Python fuzzy-reconciliation solution that matched entity records accurately, significantly reducing false positives in production remediation.',
      'Designed SSIS packages, ETL procedures and SQL Server scheduling routines for reliable, scheduled data processing.',
      'Performed UBO investigations, data-quality checks and reconciliation, ensuring regulatory and audit readiness.',
      'Delivered live progress dashboards in Power BI that kept stakeholders informed and audit-ready in real time.',
    ],
  },
  {
    role: 'Consultant 1 — Data & BI Consultant',
    org: 'Protiviti India Member Firm',
    orgLogo: 'images/protiviti.jpg',
    date: 'Jun 2019 — Dec 2020',
    tag: 'Telecom & Agriculture',
    points: [
      'Developed complex SQL scripts for telecom data-migration with field-level validations, ensuring clean, accurate handovers between systems.',
      'Built a price-prediction model using logistic regression and K-means clustering to forecast trends and support pricing decisions.',
      'Transformed food-and-beverage datasets into Power BI dashboards, surfacing insight from raw, unstructured data.',
      'Collaborated with clients to translate business requirements into technical deliverables, improving data-driven decision-making across teams.',
    ],
  },
];

// ---------- Writing ----------
export const writing: Writing[] = [
  {
    tag: 'Agentic AI',
    title: 'Designing Multi-Agent Workflows with CrewAI & LangGraph',
    desc: 'Planners, executors and validators are easy to sketch and hard to keep honest. This walks the orchestration patterns that survived production: bounded task graphs, structured hand-offs, and the guardrails that stop agents from looping, hallucinating state or trusting their own output.',
    meta: 'Draft · 6 Min Read',
  },
  {
    tag: 'Data Engineering',
    title: 'From Telemetry to Insight: Monitoring 24,000+ Devices',
    desc: 'Capacity monitoring at scale is an exercise in humility. The pipeline behind the platform — SFTP ingestion, idempotent transforms, SQL Server loads and Power BI reporting — and the three failures that taught us to design for missing data first.',
    meta: 'Draft · 7 Min Read',
  },
  {
    tag: 'Automation',
    title: 'Fuzzy Matching in Production: Reconciliation Without Tears',
    desc: "Edit distance, token sets and soundex each fail differently. Here's how we tuned a fuzzy reconciliation engine for KYC remediation — threshold selection, confidence bands, human-in-the-loop queues, and why every match must leave an audit trail.",
    meta: 'Draft · 5 Min Read',
  },
  {
    tag: 'Engineering',
    title: 'Making Agentic AI Observable: Traceability by Default',
    desc: "An AI workflow you can't inspect is a liability you can't ship. Structured logs, trace IDs across every tool call, eval harnesses and a decision ledger — the practices that turn 'it works' into evidence it works.",
    meta: 'Draft · 6 Min Read',
  },
];

// ---------- Contact ----------
export const contact = {
  label: '08 — Contact',
  title: "Let's Build Something Intelligent.",
  sub: 'Open to agentic AI, automation and data engineering opportunities — and interesting conversations.',
  formEndpoint: 'https://formsubmit.co/ajax/biswas.rahul1105@gmail.com',
  email: 'biswas.rahul1105@gmail.com',
  phone: '+91 87896 34157',
  phoneHref: '+918789634157',
  linkedin: 'https://www.linkedin.com/in/rahul-biswas-3937ab164',
  linkedinLabel: 'in/rahul-biswas-3937ab164',
  github: 'https://github.com/rahul-101',
  githubLabel: 'github.com/rahul-101',
  location: 'Kolkata, India — working across time zones',
};

// ---------- Nav ----------
export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Projects', href: '#projects' },
  { label: 'Professional', href: '#professional' },
  { label: 'Experience', href: '#experience' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];

// ---------- Tech marquee (hero bottom) ----------
export const techLogos = [
  'images/python.svg',
  'images/mssql.svg',
  'images/aws.svg',
  'images/crewai.svg',
  'images/langraph.jpg',
  'images/anthropic.jpg',
  'images/powerbi.svg',
  'images/ansible.svg',
  'images/mongodb.svg',
  'images/typescript.svg',
];
