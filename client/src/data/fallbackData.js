export const fallbackPortfolioData = {
  profile: {
    name: 'Aditya Modani',
    eyebrow: 'B.Tech CSE Student · Developer · Creative Technologist',
    tagline:
      'I build digital experiences where code meets creativity — from web applications and AI-powered experiments to cinematic visuals and interactive interfaces.',
    bio: "I'm Aditya, a Computer Science student at JK Lakshmipat University, Jaipur. I enjoy understanding how technology works, turning ideas into functional products, and finding ways to make digital experiences feel as good as they work. My interests span web development, AI and machine learning, interface design, and visual storytelling. I'm still learning, still experimenting, and deliberately building the skills and projects that will shape the kind of engineer and creative professional I become.",
    location: 'Jaipur, India',
    status: 'B.Tech CSE (3rd Year) · Student & Builder',
    email: 'modaniaditya06@gmail.com',
    github: 'https://github.com/adityamodani',
    linkedin: 'https://linkedin.com/in/aditya-modani',
    youtube: 'https://youtube.com',
  },

  projects: [
    {
      title: 'SpeakFlow',
      category: 'AI / FULL-STACK DEVELOPMENT',
      year: '2025',
      tagline: 'AI Speech Evaluation & Coaching Platform',
      description:
        'A speech evaluation platform designed to help people practise speaking, review their performance, and eliminate filler words through structured, latency-optimized AI feedback.',
      stack: ['FastAPI', 'MongoDB', 'Azure Blob Storage', 'Vercel', 'Python', 'React'],
      github: 'https://github.com/adityamodani/speakflow',
      demo: 'https://speakflow-demo.vercel.app',
      featured: true,
      order: 1,
    },
    {
      title: 'TeachNest',
      category: 'WEB3 / HACKATHON PROJECT',
      year: '2025',
      tagline: 'Peer-to-Peer Learning Credit System',
      description:
        'A peer-to-peer decentralized credit protocol exploring how smart contracts can incentivize and verify the exchange of knowledge, technical skills, and educational contributions.',
      stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Monad Testnet', 'Solidity'],
      github: 'https://github.com/adityamodani/teachnest',
      demo: 'https://teachnest.vercel.app',
      featured: true,
      order: 2,
    },
    {
      title: 'Cricket Motion Analysis',
      category: 'COMPUTER VISION / ML',
      year: '2024',
      tagline: 'Pose Estimation & Bowling Biomechanics',
      description:
        'An exploration of pose estimation and movement analysis for cricket bowling mechanics, involving annotated kinematic data, offline trials, and multi-model output comparison.',
      stack: ['Python', 'YOLO Pose', 'ViTPose', 'OpenCap', 'WHAM', 'OpenCV'],
      github: 'https://github.com/adityamodani/cricket-motion-analysis',
      demo: 'https://github.com/adityamodani/cricket-motion-analysis#demo',
      featured: true,
      order: 3,
    },
    {
      title: 'Beyond the Frame',
      category: 'FRONT-END / CREATIVE DEVELOPMENT',
      year: '2024',
      tagline: 'Cinematic Interactive Portfolio Concept',
      description:
        'A cinematic portfolio concept exploring how motion, visual storytelling, and interactive web mechanics can turn a conventional portfolio into an immersive digital narrative.',
      stack: ['React', 'GSAP', 'Tailwind CSS', 'WebGL', 'Three.js'],
      github: 'https://github.com/adityamodani/beyond-the-frame',
      demo: 'https://beyond-frame.vercel.app',
      featured: true,
      order: 4,
    },
    {
      title: 'PDF RAG Knowledge Engine',
      category: 'AI / RETRIEVAL SYSTEM',
      year: '2024',
      tagline: 'Contextual Document Search & Question Answering',
      description:
        'A retrieval-augmented generation engine enabling semantic search, embeddings generation, and grounded conversational question answering across complex technical documentation.',
      stack: ['Python', 'LangChain', 'ChromaDB', 'FastAPI', 'OpenAI API'],
      github: 'https://github.com/adityamodani/pdf-rag-engine',
      demo: 'https://pdf-rag-engine.vercel.app',
      featured: false,
      order: 5,
    },
    {
      title: 'Parivahan Path Prototype',
      category: 'TRANSIT & ROUTE OPTIMIZATION',
      year: '2024',
      tagline: 'Urban Transit Routing & Tracking',
      description:
        'A smart public transit tracking prototype featuring algorithmic route planning, real-time schedule estimation, and intuitive commuter navigation.',
      stack: ['Node.js', 'Express', 'MongoDB', 'React', 'Leaflet Maps'],
      github: 'https://github.com/adityamodani/parivahan-path',
      demo: 'https://parivahan-path.vercel.app',
      featured: false,
      order: 6,
    },
  ],

  skills: [
    { name: 'React', category: 'Frontend', proficiency: 92, level: 'Advanced', experience: '3+ yrs' },
    { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 90, level: 'Advanced', experience: '3+ yrs' },
    { name: 'HTML5 / CSS3', category: 'Frontend', proficiency: 95, level: 'Expert', experience: '4+ yrs' },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90, level: 'Advanced', experience: '3+ yrs' },
    { name: 'GSAP Motion', category: 'Frontend', proficiency: 85, level: 'Advanced', experience: '2+ yrs' },
    { name: 'Next.js', category: 'Frontend', proficiency: 82, level: 'Intermediate', experience: '2+ yrs' },

    { name: 'Node.js', category: 'Backend', proficiency: 88, level: 'Advanced', experience: '3+ yrs' },
    { name: 'Express.js', category: 'Backend', proficiency: 88, level: 'Advanced', experience: '3+ yrs' },
    { name: 'MongoDB & Mongoose', category: 'Backend', proficiency: 86, level: 'Advanced', experience: '3+ yrs' },
    { name: 'FastAPI (Python)', category: 'Backend', proficiency: 82, level: 'Intermediate', experience: '2+ yrs' },
    { name: 'REST APIs & JWT Auth', category: 'Backend', proficiency: 90, level: 'Advanced', experience: '3+ yrs' },
    { name: 'Azure Blob / AWS S3', category: 'Backend', proficiency: 78, level: 'Intermediate', experience: '2+ yrs' },

    { name: 'Git & GitHub', category: 'Tools & Technologies', proficiency: 94, level: 'Expert', experience: '4+ yrs' },
    { name: 'Figma', category: 'Tools & Technologies', proficiency: 85, level: 'Advanced', experience: '3+ yrs' },
    { name: 'Postman', category: 'Tools & Technologies', proficiency: 88, level: 'Advanced', experience: '3+ yrs' },
    { name: 'Vercel / Render', category: 'Tools & Technologies', proficiency: 88, level: 'Advanced', experience: '3+ yrs' },
    { name: 'Docker Fundamentals', category: 'Tools & Technologies', proficiency: 75, level: 'Intermediate', experience: '1+ yr' },
    { name: 'VS Code & DevTools', category: 'Tools & Technologies', proficiency: 95, level: 'Expert', experience: '4+ yrs' },

    { name: 'Python', category: 'AI & ML', proficiency: 88, level: 'Advanced', experience: '3+ yrs' },
    { name: 'Computer Vision / YOLO', category: 'AI & ML', proficiency: 80, level: 'Intermediate', experience: '2+ yrs' },
    { name: 'RAG & Vector Embeddings', category: 'AI & ML', proficiency: 78, level: 'Intermediate', experience: '1+ yr' },
  ],

  timeline: [
    {
      type: 'leadership',
      year: '2026 — Present',
      title: 'Co-Chair — Technology Club',
      institution: 'JK Lakshmipat University',
      location: 'Jaipur, India',
      description:
        'Contributing to the student technology community through coordination, collaboration, and initiatives that bring students closer to technology and practical software building.',
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
      type: 'education',
      year: '2024 — 2028',
      title: 'B.Tech in Computer Science & Engineering',
      institution: 'JK Lakshmipat University',
      location: 'Jaipur, India',
      description:
        'Undergraduate student in CSE with coursework in Data Structures, Algorithms, Computer Networks, Operating Systems, Web Development, and Applied AI.',
      tags: ['Computer Science', 'Data Structures', 'Full-Stack Dev'],
    },
  ],

  achievements: [
    {
      year: '2025',
      title: 'Winter of Code 5.0 — Selected Contributor',
      organization: 'Winter of Code / Open Source Community',
      category: 'Open Source',
      description:
        'Selected to participate in a premier open-source contribution program; collaborated on issues and merged pull requests to enhance real-world repositories.',
      certificateUrl: 'https://winterofcode.com',
      badge: 'Verified Program',
    },
    {
      year: '2025',
      title: 'Build with AI Bootcamp Participant',
      organization: 'Google Developers Community',
      category: 'Artificial Intelligence',
      description:
        'Hands-on intensive bootcamp focused on building practical applications with state-of-the-art Generative AI, embeddings, and multimodal models.',
      certificateUrl: 'https://developers.google.com',
      badge: 'Certified',
    },
    {
      year: '2025',
      title: 'HackJKLU Core Organizing Contributor',
      organization: 'JK Lakshmipat University',
      category: 'Hackathon Leadership',
      description:
        'Key contributor to organizing, technical creative outreach, and execution for 500+ hackathon participants across institutions.',
      certificateUrl: 'https://hackjklu.com',
      badge: 'Leadership Award',
    },
    {
      year: '2024',
      title: 'Technical Community & Hackathon Finalist',
      organization: 'Collegiate Hackathons & Tech Events',
      category: 'Hackathon',
      description:
        'Built and pitched innovative prototypes under rapid 24-36 hour hackathon constraints, demonstrating teamwork and problem-solving.',
      certificateUrl: 'https://github.com/adityamodani',
      badge: 'Finalist',
    },
  ],
};
