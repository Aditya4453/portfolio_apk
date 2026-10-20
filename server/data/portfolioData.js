const portfolioData = {
  profile: {
    name: 'Aditya Modani',
    eyebrow: 'B.Tech CSE Student · Developer · Creative Technologist',
    tagline: 'I build digital experiences where code meets creativity — from web applications and AI-powered experiments to cinematic visuals and interactive interfaces.',
    bio: "I'm Aditya, a Computer Science student at JK Lakshmipat University, Jaipur. I enjoy understanding how technology works, turning ideas into functional products, and finding ways to make digital experiences feel as good as they work. My interests span web development, AI and machine learning, interface design, and visual storytelling. I'm still learning, still experimenting, and deliberately building the skills and projects that will shape the kind of engineer and creative professional I become.",
    location: 'Jaipur, India',
    status: 'B.Tech CSE (3rd Year) · Student & Builder',
    email: 'modaniaditya06@gmail.com',
    github: 'https://github.com/adityamodani',
    linkedin: 'https://linkedin.com/in/aditya-modani',
    youtube: 'https://youtube.com',
    principles: [
      { num: '01', title: 'Understand before building', desc: 'Grasp the core problem deeply before writing a single line of architecture.' },
      { num: '02', title: 'Make ideas tangible', desc: 'Turn abstract concepts into working prototypes and interactive software.' },
      { num: '03', title: 'Learn by shipping', desc: 'True mastery comes through continuous deployment, feedback, and iterations.' },
      { num: '04', title: 'Technology with purpose', desc: 'Build systems that solve meaningful problems with clarity and restraint.' },
    ],
  },

  projects: [
    {
      title: 'SpeakFlow',
      category: 'AI / FULL-STACK DEVELOPMENT',
      year: '2025',
      tagline: 'AI Speech Evaluation & Coaching Platform',
      description: 'A speech evaluation platform designed to help people practise speaking, review their performance, and eliminate filler words through structured, latency-optimized AI feedback.',
      stack: ['FastAPI', 'MongoDB', 'Azure Blob Storage', 'Vercel', 'Python', 'React'],
      github: 'https://github.com/Aditya4453/Speakflow',
      demo: 'https://speakflow-jet.vercel.app/',
      featured: true,
      order: 1,
    },
    {
      title: 'TeachNest',
      category: 'WEB3 / HACKATHON PROJECT',
      year: '2025',
      tagline: 'Peer-to-Peer Learning Credit System',
      description: 'A peer-to-peer decentralized credit protocol exploring how smart contracts can incentivize and verify the exchange of knowledge, technical skills, and educational contributions.',
      stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Monad Testnet', 'Solidity'],
      github: 'https://github.com/Aditya4453/TeachNest',
      demo: 'https://lnmhacks-8-0-eight.vercel.app/',
      featured: true,
      order: 2,
    },
    {
      title: 'PDF RAG Knowledge Engine',
      category: 'AI / RETRIEVAL SYSTEM',
      year: '2024',
      tagline: 'Contextual Document Search & Question Answering',
      description: 'A retrieval-augmented generation engine enabling semantic search, embeddings generation, and grounded conversational question answering across complex technical documentation.',
      stack: ['Python', 'LangChain', 'ChromaDB', 'FastAPI', 'OpenAI API'],
      github: 'https://github.com/Aditya4453/PDF-RAG',
      demo: 'https://pdf-rag-engine.vercel.app',
      featured: false,
      order: 3,
    },
    {
      title: 'Parivahan Path Prototype',
      category: 'TRANSIT & ROUTE OPTIMIZATION',
      year: '2024',
      tagline: 'Urban Transit Routing & Tracking',
      description: 'A smart public transit tracking prototype featuring algorithmic route planning, real-time schedule estimation, and intuitive commuter navigation.',
      stack: ['Node.js', 'Express', 'MongoDB', 'React', 'Leaflet Maps'],
      github: 'https://github.com/Aditya4453/Build_What',
      demo: 'https://buildwhat-seven.vercel.app/',
      featured: false,
      order: 4,
    },
  ],

  skills: [
    // Frontend
    { name: 'React', category: 'Frontend' },
    { name: 'JavaScript (ES6+)', category: 'Frontend' },
    { name: 'HTML5 / CSS3', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'GSAP Motion', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },

    // Backend
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express.js', category: 'Backend' },
    { name: 'MongoDB & Mongoose', category: 'Backend' },
    { name: 'FastAPI (Python)', category: 'Backend' },
    { name: 'REST APIs & JWT Auth', category: 'Backend' },
    { name: 'Azure Blob / AWS S3', category: 'Backend' },

    // Tools & Technologies
    { name: 'Git & GitHub', category: 'Tools & Technologies' },
    { name: 'Figma', category: 'Tools & Technologies' },
    { name: 'Postman', category: 'Tools & Technologies' },
    { name: 'Vercel / Render', category: 'Tools & Technologies' },
    { name: 'Docker Fundamentals', category: 'Tools & Technologies' },
    { name: 'VS Code & DevTools', category: 'Tools & Technologies' },

    // AI & ML
    { name: 'Python', category: 'AI & ML' },
    { name: 'Computer Vision / YOLO', category: 'AI & ML' },
    { name: 'RAG & Vector Embeddings', category: 'AI & ML' },
  ],

  timeline: [
    {
      type: 'education',
      year: '2024 — 2028',
      title: 'B.Tech in Computer Science & Engineering',
      institution: 'JK Lakshmipat University',
      location: 'Jaipur, India',
      description:
        'Undergraduate student in CSE with coursework in Data Structures, Algorithms, Computer Networks, Operating Systems, Web Development, and Applied AI.',
      tags: ['Computer Science', 'Data Structures', 'Full-Stack Dev'],
    },
    {
      type: 'community',
      year: '2024 — 2025',
      title: 'Open Source Contributor & Hackathons',
      institution: 'Winter of Code 5.0 / Build with AI',
      location: 'India',
      description:
        'Selected contributor for Winter of Code 5.0; participated in Google Developers Build with AI bootcamp and collegiate hackathons, collaborating via Git PRs and rapid prototyping.',
      tags: ['Open Source', 'Git Workflow', 'Hackathons'],
    },
    {
      type: 'leadership',
      year: '2024 — 2025',
      title: 'Co-Chair — Technology Club',
      institution: 'JK Lakshmipat University',
      location: 'Jaipur, India',
      description:
        'Contributed to the student technology community through coordination, collaboration, and initiatives that brought students closer to technology and practical software building.',
      tags: ['Leadership', 'Event Planning', 'Tech Workshops'],
    },
    {
      type: 'experience',
      year: '2025 — 2026',
      title: 'Social Media & Creative Core — HackJKLU',
      institution: 'HackJKLU Student Hackathon',
      location: 'Jaipur, India',
      description:
        "Supported communication and promotion of the university's flagship hackathon through event-related technical branding, creative direction, and logistics coordination.",
      tags: ['Branding', 'Hackathon Management', 'Visual Design'],
    },
    {
      type: 'experience',
      year: '2025',
      title: 'Machine Learning Intern',
      institution: 'Bowler Academy / Tackit Analytics',
      location: 'Remote / Hybrid',
      description:
        'Explored computer-vision approaches to cricket biomechanics analytics, including data annotation, offline kinematic trials, pose-estimation workflows, and analysis of model accuracy.',
      tags: ['Computer Vision', 'YOLO Pose', 'Data Annotation', 'Model Evaluation'],
    },
    
  ],

  achievements: [
    {
      year: '2026',
      title: 'AI Capabilities and Limitations',
      organization: 'Anthropic',
      category: 'Artificial Intelligence',
      description:
        'Completed Anthropic\'s official course on understanding AI capabilities, limitations, and responsible deployment of large language models.',
      certificateUrl: 'https://verify.skilljar.com/c/m5mzn8fncxti',
      badge: 'Verified · m5mzn8fncxti',
    },
    {
      year: '2025',
      title: 'Build Real World AI Applications with Gemini and Imagen',
      organization: 'Google',
      category: 'Artificial Intelligence',
      description:
        'Earned Google skill badge for building production-grade AI applications using Gemini multimodal models and Imagen for image generation on Google Cloud.',
      certificateUrl: 'https://www.credly.com/badges/ab8a62ee-3e52-4186-b731-82c5edf8f6bc/linked_in_profile',
      badge: 'Skill Badge',
    },
    {
      year: '2025',
      title: 'Prompt Design in Vertex AI',
      organization: 'Google',
      category: 'Artificial Intelligence',
      description:
        'Earned Google skill badge for designing effective prompts and working with foundation models in Vertex AI to build and deploy generative AI solutions.',
      certificateUrl: 'https://www.credly.com/badges/199f3b34-fc48-4dc4-b9c4-d2ab11b66a91/linked_in_profile',
      badge: 'Skill Badge',
    },
    {
      year: '2024',
      title: 'Programming for Everybody (Getting Started with Python)',
      organization: 'University of Michigan · Coursera',
      category: 'Programming',
      description:
        'Completed the foundational Python programming course by the University of Michigan, covering data structures, functions, and core programming concepts.',
      certificateUrl: 'https://www.coursera.org/account/accomplishments/verify/30E0970BC3S6',
      badge: 'Verified · 30E0970BC3S6',
    },
  ],
};

module.exports = portfolioData;
