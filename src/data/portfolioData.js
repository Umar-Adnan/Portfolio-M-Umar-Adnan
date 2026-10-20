export const personalInfo = {
  name: "M Umar Adnan",
  title: "Full-Stack Developer & AI Practitioner",
  subtitle: "Computer Science Student @ UMT | Full-Stack (MERN & RoR) | AI/ML Practitioner | YouTuber @ TeachmeROR",
  tagline: "Small steps every day lead to big results.",
  subtagline: "Code / Learn / Build",
  location: "Lahore, Punjab, Pakistan",
  status: "Open to Work (On-site • Hybrid • Remote)",
  email: "umaradnan2710@gmail.com",
  // User's verified WhatsApp phone number
  whatsappNumber: "923004262838",
  whatsappDisplay: "0300 4262838",
  socials: {
    github: "https://github.com/Umar-Adnan",
    linkedin: "https://www.linkedin.com/in/m-umar-adnan-a36515240/",
    youtube: "https://www.youtube.com/@teach_me_ror"
  },
  stats: [
    { label: "Public Repositories", value: "24+" },
    { label: "Certifications", value: "7" },
    { label: "Internships Completed", value: "2" },
    { label: "LinkedIn Connections", value: "500+" }
  ]
};

// 1-Click WhatsApp API Direct URL (Phone: 03004262838 -> 923004262838)
export const getWhatsAppApiUrl = (customText) => {
  const message = customText || "Hi Muhammad Umar, I visited your portfolio and would like to connect regarding an opportunity!";
  return `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

// 1-Click Gmail Direct Web Composer
export const getGmailComposeUrl = (subject, body) => {
  const defaultSub = subject || "Portfolio Inquiry - Muhammad Umar Adnan";
  const defaultBody = body || "Hi Umar,\n\nI reviewed your portfolio and would love to connect regarding an opportunity / project.";
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${encodeURIComponent(defaultSub)}&body=${encodeURIComponent(defaultBody)}`;
};

export const projects = [
  {
    id: 1,
    title: "AI Calling Bot",
    category: "web",
    badge: "Flagship Web App",
    description: "An AI-powered voice calling platform designed to scale outbound operations with real-time campaign tracking, interactive audio/transcript viewer, automated lead categorization, and compliance toggles.",
    tech: ["React 19", "TypeScript", "Tailwind v4", "Zustand", "Vite", "AI Voice"],
    github: "https://github.com/Umar-Adnan/AI-Calling-Bot",
    featured: true
  },
  {
    id: 2,
    title: "Global Terrorism Impact Predictor (GTIP)",
    category: "ai",
    badge: "Supervised ML",
    description: "A dual-model ML pipeline analyzing historical attack metrics. Uses Decision Trees to classify attack success and Linear Regression to predict casualty counts, with custom Seaborn analytical dashboards.",
    tech: ["Python", "Scikit-Learn", "Decision Trees", "Linear Regression", "Seaborn", "Pandas"],
    github: "https://github.com/Umar-Adnan/Machine-Learning-Supervised-",
    featured: true
  },
  {
    id: 3,
    title: "Digital Wallet User Segmentation",
    category: "ai",
    badge: "Unsupervised ML",
    description: "An unsupervised clustering pipeline segmenting fintech digital wallet users using Principal Component Analysis (PCA) and K-Means clustering to autonomously discover authentic financial personas.",
    tech: ["Python", "Scikit-Learn", "PCA", "K-Means", "NumPy", "Matplotlib"],
    github: "https://github.com/Umar-Adnan/Machine-Learning-Unsupervised-",
    featured: true
  },
  {
    id: 4,
    title: "PyTorch Deep Learning Engineering",
    category: "ai",
    badge: "Deep Learning",
    description: "Deep Learning architecture testing exploring PyTorch core mechanics: tensor manipulation, custom nn.Module building blocks, hardware-accelerated training, and inference verification.",
    tech: ["Python", "PyTorch", "nn.Module", "CUDA Hardware Accel", "Tensors"],
    github: "https://github.com/Umar-Adnan/Artificial-Intelligence-Engineering",
    featured: true
  },
  {
    id: 5,
    title: "TravelMaster Centralized Platform",
    category: "web",
    badge: "Full-Stack System",
    description: "A centralized travel and logistics hub eliminating multi-app friction by bringing destination routing, cost estimations, weather telemetry, and tourist crowd analytics into a single responsive portal.",
    tech: ["HTML5", "CSS3", "JavaScript", "Route Planning", "Crowd Analysis"],
    github: "https://github.com/Umar-Adnan/Travel-Master",
    featured: true
  },
  {
    id: 6,
    title: "DSA Solar MLM Hierarchy Engine",
    category: "systems",
    badge: "Algorithms & C++",
    description: "Tree-based solar network modeling member hierarchies, recruitment tracking, and trickle-up commissions. Implemented using custom BFS Queue and Max-Heap Priority Queue with strict OOP design.",
    tech: ["C++", "Trees", "BFS Queue", "Max-Heap", "OOP", "Systems"],
    github: "https://github.com/Umar-Adnan/DSA-Project-MLM-Solar-Distribution-With-Ponziness",
    featured: true
  }
];

export const experience = [
  {
    id: 1,
    role: "FrontEnd Development Intern",
    company: "Demeta",
    location: "Remote / Hybrid",
    period: "Sep 2026",
    description: "Completed an intensive front-end internship delivering responsive, accessible web interfaces. Engineered modular UI components with modern CSS, Grid/Flexbox layouts, and cross-browser resilience.",
    skills: ["Front-End Development", "Responsive Design", "CSS3", "JavaScript", "UI Optimization"]
  },
  {
    id: 2,
    role: "Python Programming Intern",
    company: "Afynix Digital",
    location: "Remote",
    period: "Jul 2026",
    description: "Engineered Python routines and data-handling scripts. Built foundational algorithms, handled dataset cleansing, and improved program fault-tolerance and modularity.",
    skills: ["Python", "Data Processing", "Automation", "Error Handling", "Clean Code"]
  },
  {
    id: 3,
    role: "Tech Educator & Channel Lead",
    company: "TeachmeROR (YouTube)",
    location: "Lahore, Pakistan",
    period: "Ongoing",
    description: "Creating in-depth tutorial videos breaking down Ruby on Rails, web architecture, and full-stack development workflows to empower aspiring software engineers.",
    skills: ["Ruby on Rails", "Web Architecture", "Content Creation", "Developer Education"]
  },
  {
    id: 4,
    role: "Community Welfare Volunteer",
    company: "Allah Wale Foundation",
    location: "Lahore, Pakistan",
    period: "Dec 2025",
    description: "Participated in NGO training workshops, welfare distribution logistics, and community development seminars with Allah Walay Trust (AWT).",
    skills: ["Human Rights", "Public Outreach", "Event Coordination", "Leadership"]
  }
];

export const certificates = [
  {
    id: "demeta-frontend",
    title: "Front-End Development Internship",
    issuer: "DeMeta",
    recipient: "M. Umar Adnan",
    issueDate: "September 2026",
    credentialId: "DEMETA-FE-2026-904",
    description: "Completed comprehensive Front-End Development Internship focused on building responsive, modern user-friendly web interfaces and practical engineering with core web technologies.",
    skills: "Front-End Development, Responsive Design, CSS Flexbox & Grid, JavaScript",
    downloadUrl: "/certificates/demeta-frontend-internship.pdf",
    downloadFileName: "DeMeta_M_Umar_Adnan_Certificate.pdf"
  },
  {
    id: "afynix-python",
    title: "Python Programming Internship",
    issuer: "Afynix Digital",
    recipient: "M. Umar Adnan",
    issueDate: "July 2026",
    credentialId: "AFYNIX-PY-2026-782",
    description: "Awarded for exceptional commitment and completion of the Python Programming Internship, focusing on data manipulation, script optimization, and OOP architecture.",
    skills: "Python Language, Scripting, Data Handling, Clean Code",
    downloadUrl: "/certificates/afynix-python-programming.jpg",
    downloadFileName: "Afynix_Digital_Python_Programming_Certificate.jpg"
  },
  {
    id: "codecademy-flexbox-grid",
    title: "CSS Responsive Design: Flexbox & Grid",
    issuer: "Codecademy",
    recipient: "M. Umar Adnan",
    issueDate: "August 2025",
    credentialId: "CA-CSS-FLEX-GRID",
    description: "Demonstrated full mastery of two-dimensional CSS Grid layouts, one-dimensional Flexbox flow, alignment matrices, and fluid responsive adaptability.",
    skills: "CSS Grid, Flexbox, Fluid Modern Layouts, Responsive UI",
    downloadUrl: "/certificates/codecademy-flexbox-grid.jpg",
    downloadFileName: "Codecademy_CSS_Flexbox_and_Grid_Certificate.jpg"
  },
  {
    id: "codecademy-javascript",
    title: "Learn JavaScript Course",
    issuer: "Codecademy",
    recipient: "M. Umar Adnan",
    issueDate: "August 2025",
    credentialId: "CA-JS-CORE-2025",
    description: "Validated competencies in modern JavaScript ES6+, functional programming, closures, promises, asynchronous event loops, and DOM manipulation.",
    skills: "ES6+, DOM Manipulation, Async/Await, Web APIs",
    downloadUrl: "/certificates/codecademy-javascript.jpg",
    downloadFileName: "Codecademy_JavaScript_Certificate.jpg"
  },
  {
    id: "codecademy-css",
    title: "Learn CSS Course",
    issuer: "Codecademy",
    recipient: "M. Umar Adnan",
    issueDate: "August 2025",
    credentialId: "CA-CSS-CORE-2025",
    description: "Certified proficiency in CSS styling, the CSS box model, selectors, visual formatting, animations, and modern responsive layouts.",
    skills: "CSS3, Box Model, Typography, Selectors, Visual Design",
    downloadUrl: "/certificates/codecademy-css.jpg",
    downloadFileName: "Codecademy_CSS_Certificate.jpg"
  },
  {
    id: "codecademy-html",
    title: "Learn HTML Course",
    issuer: "Codecademy",
    recipient: "M. Umar Adnan",
    issueDate: "August 2025",
    credentialId: "CA-HTML-CORE-2025",
    description: "Certified proficiency in HTML5 semantic structural markup, document architecture, form validation, and web accessibility compliance.",
    skills: "HTML5, Semantic Elements, Forms, Web Accessibility",
    downloadUrl: "/certificates/codecademy-html.jpg",
    downloadFileName: "Codecademy_HTML_Certificate.jpg"
  },
  {
    id: "umt-english",
    title: "ENGLISH IMMERSION (SD-100)",
    issuer: "University of Management and Technology - UMT",
    recipient: "Muhammad Umar Adnan",
    issueDate: "October 2026",
    credentialId: "UMT-SD100-13931",
    description: "Official certificate recognizing outstanding performance in professional oral technical communication, team presentation, and corporate discourse.",
    skills: "Professional Technical Communication, Presentations, Executive Discourse",
    downloadUrl: "/certificates/umt-english-immersion.jpg",
    downloadFileName: "UMT_English_Immersion_SD100_Certificate.jpg"
  }
];

export const skillCategories = [
  {
    name: "Languages",
    items: [
      { name: "Python", level: "Advanced" },
      { name: "C++", level: "Proficient" },
      { name: "Ruby", level: "Proficient" },
      { name: "JavaScript", level: "Advanced" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "C", level: "Foundational" },
      { name: "SQL (T-SQL/Postgres)", level: "Proficient" },
      { name: "x86 Assembly", level: "Academic" }
    ]
  },
  {
    name: "Web & Full-Stack",
    items: [
      { name: "React 19", level: "Advanced" },
      { name: "Ruby on Rails", level: "Proficient" },
      { name: "Tailwind CSS v4/v3", level: "Expert" },
      { name: "Vite", level: "Advanced" },
      { name: "Bootstrap 5", level: "Proficient" },
      { name: "REST APIs", level: "Advanced" },
      { name: "Zustand / Redux", level: "Intermediate" }
    ]
  },
  {
    name: "AI / ML & Data Science",
    items: [
      { name: "PyTorch", level: "Deep Learning" },
      { name: "Scikit-Learn", level: "Supervised & Unsupervised" },
      { name: "Pandas", level: "Data Wrangling & ETL" },
      { name: "NumPy", level: "Numerical Arrays" },
      { name: "Seaborn & Matplotlib", level: "Data Visualization" },
      { name: "PCA & K-Means", level: "Clustering" }
    ]
  },
  {
    name: "Databases, Tools & Systems",
    items: [
      { name: "Git & GitHub", level: "Version Control" },
      { name: "PostgreSQL", level: "Relational DB" },
      { name: "MySQL", level: "Relational DB" },
      { name: "Linux / Bash", level: "Environment" },
      { name: "Postman", level: "API Testing" },
      { name: "VS Code & Vim", level: "IDE" },
      { name: "Figma", level: "UI/UX Prototyping" }
    ]
  }
];
