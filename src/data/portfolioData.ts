import { Project, SkillCategory, Experience, EducationEntry, CodingProfile, Certification } from '../types';

export const PERSONAL_INFO = {
  name: 'Aditya Prakash',
  title: 'AI-Accelerated Full-Stack Data Developer',
  targetRole: 'AI-Accelerated Full-Stack Data Developer',
  tagline: 'Crafting intelligent data pipelines, predictive models, and modern web applications with algorithmic rigor.',
  bio: 'Computer Science & Engineering undergraduate at Lovely Professional University specializing in Python, SQL, C/C++, Java, Machine Learning, Power BI analytics, and full-stack AI development. Passionate about solving complex problems and turning raw data into high-impact digital experiences.',
  email: 'aditya04112006@gmail.com',
  phone: '+91 7619448694',
  location: 'Kapurthala, Punjab – 144411',
  detailedLocation: 'Lovely Professional University, Jalandhar-Delhi G.T. Road, Phagwara, Punjab, India, 144411',
  hometown: 'Kapurthala, Punjab / Bathinda Cantt',
  github: 'https://github.com/ADITYA-prakash',
  githubUsername: 'ADITYA-prakash',
  leetcode: 'https://leetcode.com/u/x2gyI6JfIR/',
  leetcodeUsername: 'x2gyI6JfIR',
  leetcodeDisplay: 'x2gyI6JfIR',
  linkedin: 'https://www.linkedin.com/in/aditya-prakash0/',
  linkedinDisplay: 'aditya-prakash0',
  vercel: 'https://vercel.com/aditya-prakashs-projects-25df78b5',
  vercelDisplay: 'aditya-prakashs-projects',
  resumeFileName: 'Aditya_Prakash_Resume.pdf',
  avatarImage: '/profile.jpg',
  experienceYears: '1+',
  placementBatch: '2024 – 2028',
};

export const RESUME_SKILLS_SECTIONS = [
  { category: 'Programming', skills: 'Python, SQL, C++, C, Java' },
  { category: 'Data Analysis', skills: 'Pandas, NumPy, Data Cleaning, Statistics' },
  { category: 'Data Visualisation', skills: 'Power BI, Tableau, Matplotlib, Excel' },
  { category: 'BI & Analytics', skills: 'Power Query, DAX, Dashboard Development, KPI Analysis' },
  { category: 'Machine Learning', skills: 'Scikit-learn, Machine Learning' },
  { category: 'Web Development', skills: 'HTML, CSS, JavaScript, React, TypeScript' },
  { category: 'Soft Skills', skills: 'Adaptability, Time Management, Quick Learner' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming',
    description: 'Core programming and database query languages',
    iconName: 'Code',
    skills: [
      { name: 'Python', level: 'Advanced', tags: ['Data Analysis', 'ML', 'Automation'] },
      { name: 'SQL', level: 'Advanced', tags: ['Queries', 'RDBMS', 'Joins'] },
      { name: 'C++', level: 'Advanced', tags: ['OOP', 'DSA', 'Problem Solving'] },
      { name: 'C', level: 'Proficient', tags: ['Pointers', 'Memory Architecture'] },
      { name: 'Java', level: 'Proficient', tags: ['OOP', 'Backend', 'NIIT Certified'] },
    ],
  },
  {
    title: 'Data Analysis & BI',
    description: 'Data science, analytics, DAX, and business intelligence toolkits',
    iconName: 'BarChart3',
    skills: [
      { name: 'Pandas', level: 'Proficient', tags: ['DataFrames', 'Data Cleaning'] },
      { name: 'NumPy', level: 'Proficient', tags: ['Arrays', 'Vectorization'] },
      { name: 'Power BI', level: 'Advanced', tags: ['DAX', 'Power Query', 'Dashboards'] },
      { name: 'Tableau', level: 'Proficient', tags: ['Interactive BI', 'Storytelling'] },
      { name: 'Matplotlib', level: 'Proficient', tags: ['Data Viz', 'Plotting'] },
      { name: 'Excel', level: 'Advanced', tags: ['Formulas', 'Pivot Tables', 'KPIs'] },
      { name: 'Power Query', level: 'Advanced', tags: ['ETL', 'Transformations'] },
      { name: 'DAX', level: 'Advanced', tags: ['Measures', 'Calculations'] },
    ],
  },
  {
    title: 'Machine Learning & Concepts',
    description: 'Analytical methodologies and foundational computer science paradigms',
    iconName: 'Database',
    skills: [
      { name: 'Scikit-learn', level: 'Proficient', tags: ['Machine Learning', 'Models'] },
      { name: 'Machine Learning', level: 'Proficient', tags: ['Supervised', 'Unsupervised', 'Pipelines'] },
      { name: 'Data Visualisation', level: 'Advanced', tags: ['KPIs', 'Executive Reports', 'Dashboards'] },
      { name: 'Data Cleaning', level: 'Advanced', tags: ['Feature Engineering', 'Preprocessing'] },
      { name: 'Statistics', level: 'Proficient', tags: ['Probability', 'Hypothesis Testing', 'Metrics'] },
      { name: 'KPI Analysis', level: 'Advanced', tags: ['Metrics', 'Benchmarking'] },
    ],
  },
  {
    title: 'Web Development',
    description: 'Frontend, reactive web interfaces, and modern UI architectures',
    iconName: 'Code',
    skills: [
      { name: 'React', level: 'Advanced', tags: ['Components', 'Hooks', 'State'] },
      { name: 'TypeScript', level: 'Advanced', tags: ['Type Safety', 'Interfaces'] },
      { name: 'JavaScript', level: 'Advanced', tags: ['ES6+', 'Async', 'DOM'] },
      { name: 'HTML & CSS', level: 'Advanced', tags: ['Responsive', 'Tailwind CSS'] },
    ],
  },
  {
    title: 'Soft Skills',
    description: 'Professional execution, agile delivery, and collaborative mindset',
    iconName: 'Sparkles',
    skills: [
      { name: 'Adaptability', level: 'Proficient', tags: ['Rapid Learning', 'Agile'] },
      { name: 'Time Management', level: 'Proficient', tags: ['Sprint Planning', 'Delivery'] },
      { name: 'Quick Learner', level: 'Advanced', tags: ['Curiosity', 'Initiative'] },
    ],
  },
];

export const RAW_SKILLS = [
  'Python',
  'SQL',
  'C++',
  'C',
  'Java',
  'Pandas',
  'NumPy',
  'Data Cleaning',
  'Statistics',
  'Power BI',
  'Tableau',
  'Matplotlib',
  'Excel',
  'Power Query',
  'DAX',
  'Dashboard Development',
  'KPI Analysis',
  'Scikit-learn',
  'Machine Learning',
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'TypeScript',
  'Adaptability',
  'Time Management',
  'Quick Learner',
  'Gemini API',
  'Vite',
  'Tailwind CSS',
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'google-ai-data-analysis',
    title: 'AI for Data Analysis',
    subTitle: 'Course Certificate',
    issuer: 'Google & Coursera',
    badge: 'Google Authorized Certificate',
    date: "Jul 21, 2026",
    credentialId: '1OQ6THZN6NSS',
    verificationUrl: 'https://coursera.org/verify/1OQ6THZN6NSS',
    signatory: 'Amanda Brophy — Global Director of Google Career Certificates',
    recipient: 'Aditya Prakash',
    overview: 'An online course authorized by Google and offered through Coursera. Certified competency in applying AI tools to data analysis workflows, structured insight extraction, prompt-driven analysis, and automated decision intelligence.',
    skills: ['AI Data Analysis', 'Generative AI', 'Prompt Engineering', 'Structured Insights', 'Decision Intelligence'],
    accentColor: '#4285F4',
    imageUrl: '/certificates/cert_google_ai_data_analysis.svg',
    type: 'coursera-google'
  },
  {
    id: 'google-ai',
    title: 'Google AI Professional Certificate',
    subTitle: 'Online Professional Certificate',
    issuer: 'Google & Coursera',
    badge: 'Professional Certificate (7 Courses)',
    date: "Aug 2, 2026",
    credentialId: 'WDOGRHWYYN7H',
    verificationUrl: 'https://www.coursera.org/account/accomplishments/specialization/WDOGRHWYYN7H',
    signatory: 'Amanda Brophy — Global Director of Google Career Certificates',
    recipient: 'Aditya Prakash',
    overview: 'Those who earn the Google AI Professional Certificate are fluent in AI, and have completed 7 courses demonstrating their ability to apply AI to skills where AI is transforming work: Brainstorming, Research, Communication, Content Creation, Data Analysis, and Coding. Built a portfolio of 20+ artifacts using AI and vibe coded custom AI solutions.',
    modules: [
      'AI Fundamentals',
      'AI for Brainstorming and Planning',
      'AI for Research and Insights',
      'AI for Writing and Communicating',
      'AI for Content Creation',
      'AI for Data Analysis',
      'AI for App Building'
    ],
    skills: ['Artificial Intelligence', 'Generative AI', 'Prompt Engineering', 'AI Data Analysis', 'AI App Building'],
    accentColor: '#4285F4',
    imageUrl: '/certificates/cert_google_ai.svg',
    type: 'coursera-google'
  },
  {
    id: 'meta-frontend',
    title: 'Introduction to Front-End Development',
    subTitle: 'Course Certificate',
    issuer: 'Meta & Coursera',
    badge: 'Meta Certified Course',
    date: "Aug 25, 2026",
    credentialId: '9MMUP2UFGZEX',
    verificationUrl: 'https://www.coursera.org/account/accomplishments/verify/9MMUP2UFGZEX',
    signatory: 'Taught by Meta Experts',
    recipient: 'Aditya Prakash',
    overview: 'An online course authorized by Meta and offered through Coursera. Certified proficiency in modern front-end web fundamentals, responsive interfaces, UI component hierarchies, and browser rendering lifecycles.',
    skills: ['Frontend Architecture', 'HTML5 & CSS3', 'JavaScript & Web Standards', 'Responsive UI', 'UI Components'],
    accentColor: '#0081FB',
    imageUrl: '/certificates/cert_meta_frontend.svg',
    type: 'coursera-meta'
  },
  {
    id: 'dbms-infosys',
    title: 'Database Management System Part - 1',
    subTitle: 'Course Completion Certificate',
    issuer: 'Infosys Springboard',
    badge: 'Infosys Navigate Your Next',
    date: "July 14, 2026",
    duration: 'Completed July 14, 2026 (Issued July 15, 2026)',
    signatory: 'Satheesha B. Nanjappa — Senior Vice President and Head Education, Training and Assessment, Infosys Limited',
    recipient: 'Aditya Prakash',
    overview: 'Awarded by Infosys Springboard for successfully completing the comprehensive Database Management System Part - 1 program covering relational data modeling, query optimization, and transaction management.',
    skills: ['RDBMS Architecture', 'SQL Queries & Optimization', 'Database Normalization', 'Relational Algebra', 'Data Integrity'],
    accentColor: '#007CC3',
    imageUrl: '/certificates/cert_infosys_dbms.svg',
    type: 'infosys'
  },
  {
    id: 'java-niit-lpu',
    title: 'Programming in JAVA',
    subTitle: 'Certificate of Appreciation',
    issuer: 'iamneo / neo colab — An NIIT Venture × LPU',
    badge: 'NIIT Venture × LPU',
    date: "21-May-2026",
    duration: '18-Jan-2026 to 20-May-2026',
    credentialId: '22DJ3BK15L9bM5Dj3Bk1',
    signatory: 'SENTHIKUMAR TP',
    recipient: 'Aditya Prakash',
    overview: 'Certificate of Appreciation proudly presented for successfully completing Programming in JAVA, demonstrating strong commitment, consistency, and excellence throughout the course duration.',
    skills: ['Core Java', 'Object Oriented Programming (OOP)', 'Collections Framework', 'Exception Handling', 'Algorithms in Java'],
    accentColor: '#EA580C',
    imageUrl: '/certificates/cert_java_niit.svg',
    type: 'iamneo'
  },
  {
    id: 'c-cpp-bgtechvista',
    title: 'Professional Course in C / C++',
    subTitle: 'Professional Course (2M)',
    issuer: 'BG TECHVISTA',
    badge: 'ISO 27001 Certified • CII Member',
    date: "29/07/2025",
    duration: '30/05/2025 to 29/07/2025',
    credentialId: 'BG/2025/46',
    recipient: 'Aditya Prakash S/o Sh. Satya Prakash of Bathinda Cantt',
    signatory: 'Authorised Signatory & Managing Director (ISO 9001:2008 Certified)',
    overview: 'Underwent 2-Month Intensive Professional Course in C / C++. Certified as a hardworking & innovative individual with strong command over low-level memory management, pointers, and object-oriented architectures.',
    skills: ['C Programming', 'C++ OOP', 'Pointers & Dynamic Memory', 'Data Structures', 'File Handling & Algorithms'],
    accentColor: '#DC2626',
    imageUrl: '/certificates/cert_cpp_bgtechvista.svg',
    type: 'bgtechvista'
  },
];

export interface ResumeCertificate {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export const RESUME_CERTIFICATES: ResumeCertificate[] = [
  {
    title: 'AI for Data Analysis',
    issuer: 'Google & Coursera',
    date: "Jul’ 26",
    credentialUrl: 'https://coursera.org/verify/1OQ6THZN6NSS',
    imageUrl: '/certificates/cert_google_ai_data_analysis.svg',
  },
  {
    title: 'Introduction to Front-End Development',
    issuer: 'Meta & Coursera',
    date: "Aug’ 26",
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/9MMUP2UFGZEX',
    imageUrl: '/certificates/cert_meta_frontend.svg',
  },
  {
    title: 'Google AI Professional Certificate',
    issuer: 'Coursera & Google',
    date: "Aug’ 26",
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/WDOGRHWYYN7H',
    imageUrl: '/certificates/cert_google_ai.svg',
  },
  {
    title: 'Database Management System',
    issuer: 'Infosys',
    date: "July’ 26",
    imageUrl: '/certificates/cert_infosys_dbms.svg',
  },
  {
    title: 'Programming in Java',
    issuer: 'NIIT & LPU',
    date: "May’ 26",
    imageUrl: '/certificates/cert_java_niit.svg',
  },
  {
    title: 'Professional Course in C/C++',
    issuer: 'BG TechVista',
    date: "July’ 25",
    imageUrl: '/certificates/cert_cpp_bgtechvista.svg',
  },
];

export const TRAINING_EXPERIENCE = [
  {
    role: 'Full Stack Web Developer Intern',
    company: 'Uplyx Solution',
    period: "Aug' 26 – Present",
    location: 'Remote / Hybrid',
    highlights: [
      'Working on full-stack web development projects through practical assignments and industry-oriented project tasks.',
      'Developing responsive web applications while applying frontend, backend, debugging, and problem-solving concepts.',
      'Applying technical concepts to practical projects, strengthening web development skills and gaining exposure to real-world industry practices.',
    ],
  },
];

export const INTERNSHIP_EXPERIENCE = TRAINING_EXPERIENCE;

export const PROJECTS: Project[] = [
  {
    id: 'ipl-player-analysis',
    title: 'IPL Player Analysis',
    subtitle: 'Interactive Multi-Season Cricket Intelligence & Performance Suite.',
    description: 'Examined IPL player performance data covering 760+ players across 10 franchises to identify trends in batting, bowling, rankings, and overall performance.',
    fullDescription: 'Examined IPL player performance data covering 760+ players across 10 franchises to identify trends in batting, bowling, rankings, and overall performance. Developed interactive KPIs, charts, player ratings, and performance comparisons from CSV-based IPL data to support player evaluation. Built and deployed a responsive analytics application using React, TypeScript, TanStack, Vite, and Tailwind CSS, with Lovable-assisted development, GitHub, and Vercel.',
    category: 'data-analytics',
    technologies: ['React', 'TypeScript', 'TanStack', 'Vite', 'Tailwind CSS', 'Chart.js', 'Recharts', 'Three.js'],
    metrics: ['760+ Players Analyzed', '10 IPL Franchises', 'Sub-Second KPI Slicing'],
    keyFeatures: [
      'Examined IPL player performance data covering 760+ players across 10 franchises to identify trends in batting, bowling, rankings, and overall performance.',
      'Developed interactive KPIs, charts, player ratings, and performance comparisons from CSV-based IPL data to support player evaluation.',
      'Built and deployed a responsive analytics application using React, TypeScript, TanStack, Vite, and Tailwind CSS, with Lovable-assisted development, GitHub, and Vercel.',
    ],
    architectureSummary: 'High-performance React & TypeScript application leveraging TanStack, Chart.js, Recharts, and Three.js for multi-dimensional sports telemetry visualization.',
    githubUrl: 'https://github.com/ADITYA-prakash/Player-Analysis',
    liveUrl: 'https://player-analysis.vercel.app',
    imageUrl: '/project_ipl_dashboard.jpg',
    featured: true,
    stars: 1,
  },
  {
    id: 'power-generation-dashboard',
    title: 'Power Generation Dashboard (2011-2017)',
    subtitle: 'National Energy Grid Trends & Sector-Wise Geospatial Analytics.',
    description: 'Analysed India’s power generation data from 2011–2017, covering 624M total energy generated units and 62M total installed capacity, with year-wise and energy-source-wise analysis.',
    fullDescription: 'Analysed India’s power generation data from 2011–2017, covering 624M total energy generated units and 62M total installed capacity, with year-wise and energy-source-wise analysis. Visualised power generation across multiple states, regions, sectors, and energy sources, including rankings of the Top 5 states and Top 5 power stations using interactive charts, maps, KPIs, and filters. Applied Power Query, DAX, Excel, data cleaning, and data analysis to transform the dataset into an interactive Power BI dashboard, including region-wise capacity analysis across five regions and sector-wise generation insights.',
    category: 'data-analytics',
    technologies: ['Power BI', 'Excel', 'NDAP Dataset'],
    metrics: ['624M Energy Units Mapped', '62M Installed Capacity', 'Top 5 Power Stations'],
    keyFeatures: [
      'Analysed India’s power generation data from 2011–2017, covering 624M total energy generated units and 62M total installed capacity, with year-wise and energy-source-wise analysis.',
      'Visualised power generation across multiple states, regions, sectors, and energy sources, including rankings of the Top 5 states and Top 5 power stations using interactive charts, maps, KPIs, and filters.',
      'Applied Power Query, DAX, Excel, data cleaning, and data analysis to transform the dataset into an interactive Power BI dashboard, including region-wise capacity analysis across five regions and sector-wise generation insights.',
    ],
    architectureSummary: 'NDAP national datasets transformed via Power Query and DAX measures into an interactive, multi-region geospatial energy intelligence dashboard.',
    githubUrl: 'https://github.com/ADITYA-prakash/POWER-BI-DASHBOARD',
    imageUrl: '/project_power_generation.jpg',
    featured: true,
    stars: 1,
  },
  {
    id: 'eduprep-ai-learning-platform',
    title: 'EduPrep AI Learning Platform',
    subtitle: 'Intelligent AI-Powered Study Assistant & Concept Tutor.',
    description: 'Designed and launched an AIpowered educational portal with Gemini API, achieving a 95% user satisfaction rate through tailored learning modules and interactive feedback.',
    fullDescription: 'Designed and launched an AIpowered educational portal with Gemini API, achieving a 95% user satisfaction rate through tailored learning modules and interactive feedback. Implemented user authentication with Local Storage, responsive learning modules, and AI-powered features. Integrated the Gemini API to gain practical experience in API integration, JavaScript, frontend development, and AI applications.',
    category: 'ai',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Gemini API'],
    metrics: ['95% User Satisfaction', 'Real-Time AI Tutoring', 'Local Storage Auth'],
    keyFeatures: [
      'Designed and launched an AIpowered educational portal with Gemini API, achieving a 95% user satisfaction rate through tailored learning modules and interactive feedback.',
      'Implemented user authentication with Local Storage, responsive learning modules, and AI-powered features.',
      'Integrated the Gemini API to gain practical experience in API integration, JavaScript, frontend development, and AI applications.',
    ],
    architectureSummary: 'Modern JavaScript application seamlessly integrating Google Gemini API endpoints and client-side LocalStorage session management.',
    githubUrl: 'https://github.com/ADITYA-prakash/AI-Edu-Prep-NEW-',
    imageUrl: '/project_eduprep_ai.jpg',
    featured: true,
    stars: 1,
  },
];

export const EDUCATION_LIST: EducationEntry[] = [
  {
    degree: 'Bachelor of Technology',
    major: 'Computer Science and Engineering; CGPA: 8.53',
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    period: "Aug' 24 – Present",
    highlights: [
      'Specializing in Data Structures, Algorithms, Python Analytics, Machine Learning & Database Systems.',
    ],
  },
  {
    degree: 'Intermediate',
    institution: 'Kendriya Vidyalaya Bathinda Cantt',
    location: 'Bathinda Cantt, Punjab',
    period: "Mar' 23 – May' 24",
    grade: 'PCM; Percentage:71.5%',
    highlights: ['Core subjects: Physics, Chemistry, Mathematics, Computer Science.'],
  },
  {
    degree: 'Matriculate',
    institution: 'Kendriya Vidyalaya Bathinda Cantt',
    location: 'Bathinda Cantt, Punjab',
    period: "Mar' 21 – May' 22",
    grade: 'Percentage:76.7%',
  },
];

export const LANGUAGES_KNOWN = [
  { name: 'English', proficiency: 'Proficient' },
  { name: 'Hindi', proficiency: 'Native' },
];

export const CODING_PROFILES: CodingProfile[] = [
  {
    platform: 'LeetCode',
    username: 'x2gyI6JfIR',
    url: 'https://leetcode.com/u/x2gyI6JfIR/',
    stats: 'Daily Problem Solving & Algorithms',
    badge: 'Algorithms & Problem Solving',
    color: 'from-amber-600 to-orange-700',
  },
  {
    platform: 'GitHub',
    username: 'ADITYA-prakash',
    url: 'https://github.com/ADITYA-prakash',
    stats: '15 Repositories • 180+ Commits',
    badge: 'Python & Web App Creator',
    color: 'from-zinc-700 to-zinc-900',
  },
  {
    platform: 'Vercel',
    username: 'aditya-prakashs-projects-25df78b5',
    url: 'https://vercel.com/aditya-prakashs-projects-25df78b5',
    stats: 'Edge & Full-Stack Deployments',
    badge: 'Live Projects Space',
    color: 'from-zinc-900 to-black',
  },
  {
    platform: 'LinkedIn',
    username: 'aditya-prakash0',
    url: 'https://www.linkedin.com/in/aditya-prakash0/',
    stats: 'Verified Developer Profile',
    badge: 'Open to AI & Full-Stack Data Roles',
    color: 'from-blue-600 to-sky-700',
  },
];

