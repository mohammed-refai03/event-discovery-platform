// STACKLY — Event Discovery & Workshop Registration Platform
// Realistic Sample Event Data

export const categories = [
  {
    id: 'technology',
    name: 'Technology',
    count: 4,
    description: 'AI, Web Development, Cloud & Next-gen Tech',
    image: './images/categories/technology.webp',
    icon: 'fa-microchip'
  },
  {
    id: 'business',
    name: 'Business',
    count: 3,
    description: 'Startups, Venture Growth & Networking',
    image: './images/categories/business.webp',
    icon: 'fa-briefcase'
  },
  {
    id: 'design',
    name: 'Design',
    count: 3,
    description: 'UI/UX, Product Design & Brand Craft',
    image: './images/categories/design.webp',
    icon: 'fa-palette'
  },
  {
    id: 'education',
    name: 'Education',
    count: 2,
    description: 'Career Strategy, Pedagogy & Skill Building',
    image: './images/categories/education.webp',
    icon: 'fa-graduation-cap'
  }
];

export const events = [
  {
    id: 'ev-1',
    title: 'Future of AI & Machine Learning Summit',
    category: 'Technology',
    date: '2027-01-24',
    displayDate: 'Sat, Jan 24, 2027 • 9:30 AM',
    location: 'San Francisco, CA',
    price: '$120',
    organizer: 'NextGen Intelligence Lab',
    availableSeats: 18,
    featured: true,
    image: './images/events/ev-1.webp',
    shortDescription: 'Explore frontier breakthroughs in autonomous agents, generative models, and scalable neural architectures.',
    description: 'Join industry pioneers and AI research teams for a comprehensive exploration of tomorrow\'s computational intelligence. Learn how frontier foundation models, multimodal agents, and real-time fine-tuning pipelines are reshaping enterprise software and human-computer symbiosis. Includes interactive live coding labs and networking with venture partners.',
    highlights: [
      'Frontier model deployment architectures',
      'Autonomous multi-agent workflows',
      'Ethical guardrails and AI safety standards',
      'Hands-on lab with leading inference engines'
    ]
  },
  {
    id: 'ev-2',
    title: 'React Architecture & Performance Workshop',
    category: 'Technology',
    date: '2027-02-12',
    displayDate: 'Fri, Feb 12, 2027 • 10:00 AM',
    location: 'Seattle, WA',
    price: '$75',
    organizer: 'Frontend Guild Global',
    availableSeats: 12,
    featured: true,
    image: './images/events/ev-2.webp',
    shortDescription: 'Deep dive into concurrent rendering, modern state patterns, and sub-second bundle optimization.',
    description: 'A masterclass designed for mid-level and senior engineers looking to push React applications to peak efficiency. We dismantle memory leaks, optimize virtual DOM reconciliation with compiler tools, build scalable micro-frontends, and establish bulletproof component contracts.',
    highlights: [
      'React Server Components & streaming SSR',
      'Zero-layout-shift asset orchestration',
      'State machines and predictable side-effects',
      'Auditing and profiling performance bottlenecks'
    ]
  },
  {
    id: 'ev-3',
    title: 'Digital Marketing & Growth Masterclass',
    category: 'Business',
    date: '2027-02-28',
    displayDate: 'Sun, Feb 28, 2027 • 1:00 PM',
    location: 'New York, NY',
    price: '$95',
    organizer: 'VentureScale Academy',
    availableSeats: 25,
    featured: true,
    image: './images/events/ev-3.webp',
    shortDescription: 'Master omnichannel attribution, conversion rate engineering, and paid acquisition loops.',
    description: 'Unlock modern enterprise marketing strategies built for the algorithmic era. Discover how top fast-growing startups scale customer acquisition through hyper-personalized messaging, lifecycle engagement engines, and conversion funnel science without burning ad budget.',
    highlights: [
      'Omnichannel attribution and measurement models',
      'AI-assisted copy generation and multivariate testing',
      'High-velocity viral referral loops',
      'Customer lifetime value (LTV) maximization'
    ]
  },
  {
    id: 'ev-4',
    title: 'Startup Growth Summit & Founders Pitch',
    category: 'Business',
    date: '2027-03-08',
    displayDate: 'Mon, Mar 08, 2027 • 9:00 AM',
    location: 'Austin, TX',
    price: '$150',
    organizer: 'LoneStar Founders Network',
    availableSeats: 8,
    featured: false,
    image: './images/events/ev-4.webp',
    shortDescription: 'Connect with seed and Series-A venture investors, key operators, and high-growth founders.',
    description: 'An exclusive assembly of 300+ visionary founders, angel investors, and venture principals. Unpack how top venture-backed companies navigate product-market fit, unit economics, international expansion, and institutional term sheet negotiations.',
    highlights: [
      'Live founder pitch competition with $50K angel prize',
      'Fireside chat with unicorn founders',
      'Term sheet negotiation workshop',
      'Curated 1-on-1 investor matchmaking'
    ]
  },
  {
    id: 'ev-5',
    title: 'UI/UX Design Systems & Micro-Interactions Bootcamp',
    category: 'Design',
    date: '2027-03-15',
    displayDate: 'Mon, Mar 15, 2027 • 11:00 AM',
    location: 'New York, NY',
    price: '$85',
    organizer: 'Studio Craft Collective',
    availableSeats: 14,
    featured: false,
    image: './images/events/ev-5.webp',
    shortDescription: 'Build tokenized design systems, accessible components, and delightful micro-interactions.',
    description: 'Transform your product design workflow. Learn how to architect robust design tokens in Figma, bridge the gap between design and engineering, create fluid 60fps micro-animations, and enforce strict WCAG 2.2 accessibility guidelines across complex enterprise apps.',
    highlights: [
      'Atomic design tokens and cross-platform synchronization',
      'Micro-animations that communicate visual feedback',
      'Designing for keyboard navigation & screen readers',
      'Design governance and version control strategies'
    ]
  },
  {
    id: 'ev-6',
    title: 'Creative Brand Identity & Visual Storytelling',
    category: 'Design',
    date: '2027-03-22',
    displayDate: 'Mon, Mar 22, 2027 • 2:00 PM',
    location: 'Chicago, IL',
    price: '$60',
    organizer: 'Atelier Vanguard',
    availableSeats: 20,
    featured: false,
    image: './images/events/ev-6.webp',
    shortDescription: 'Craft resonant brand narratives, distinctive typographic systems, and enduring visual identities.',
    description: 'Great brands are emotional anchors. This hands-on workshop equips brand strategists and visual designers with practical frameworks to conceptualize brand positioning, typographic hierarchies, color psychology, and multi-channel campaign collateral.',
    highlights: [
      'Deconstructing world-class brand architectures',
      'Custom typography pairing and editorial styling',
      'Visual storytelling across social, print, and digital',
      'Developing client-ready brand guidelines'
    ]
  },
  {
    id: 'ev-7',
    title: 'Career Development & Executive Leadership Conference',
    category: 'Education',
    date: '2027-04-05',
    displayDate: 'Mon, Apr 05, 2027 • 9:00 AM',
    location: 'Boston, MA',
    price: '$110',
    organizer: 'Horizon Leadership Institute',
    availableSeats: 30,
    featured: false,
    image: './images/events/ev-7.webp',
    shortDescription: 'Accelerate your career trajectory with executive mentoring, negotiation mastery, and strategic vision.',
    description: 'Designed for ambitious professionals stepping into leadership and management roles. Learn executive presence, consensus building across cross-functional teams, stakeholder management, and salary/equity negotiation tactics from certified leadership coaches.',
    highlights: [
      'Executive communication and strategic persuasion',
      'Managing high-performing hybrid teams',
      'Career mapping and personal board of advisors',
      'Live executive coaching clinic'
    ]
  },
  {
    id: 'ev-8',
    title: 'Full Stack Cloud Development Workshop',
    category: 'Technology',
    date: '2027-04-14',
    displayDate: 'Wed, Apr 14, 2027 • 10:30 AM',
    location: 'San Francisco, CA',
    price: '$90',
    organizer: 'CloudScale Developers',
    availableSeats: 16,
    featured: false,
    image: './images/events/ev-8.webp',
    shortDescription: 'Build serverless backends, edge-computed APIs, and automated CI/CD deployment pipelines.',
    description: 'Gain practical expertise deploying resilient cloud architectures. We will code and deploy containerized microservices, configure globally distributed edge caching, implement JWT/OAuth2 security, and configure automated GitHub Action pipelines.',
    highlights: [
      'Edge compute and low-latency API design',
      'Docker container orchestration and Kubernetes basics',
      'Zero-trust authentication and secret management',
      'Infrastructure as code (IaC) with modern toolchains'
    ]
  },
  {
    id: 'ev-9',
    title: 'Entrepreneurship & Innovation Forum 2027',
    category: 'Business',
    date: '2027-04-20',
    displayDate: 'Tue, Apr 20, 2027 • 1:30 PM',
    location: 'Seattle, WA',
    price: '$135',
    organizer: 'Northwest Venture Alliance',
    availableSeats: 22,
    featured: false,
    image: './images/events/ev-9.webp',
    shortDescription: 'Explore market disruptions, sustainable business models, and collaborative venture creation.',
    description: 'A dynamic gathering of inventors, serial entrepreneurs, and corporate innovation heads. Discussions center on identifying latent consumer needs, lean prototyping under resource constraints, and scaling sustainable, profitable business operations.',
    highlights: [
      'Disruptive business model case studies',
      'Customer discovery interview masterclass',
      'Navigating regulatory hurdles in emerging tech',
      'Networking mixer with regional incubator heads'
    ]
  },
  {
    id: 'ev-10',
    title: 'Visual Design Fundamentals & Color Theory',
    category: 'Education',
    date: '2027-05-02',
    displayDate: 'Sun, May 02, 2027 • 11:00 AM',
    location: 'Chicago, IL',
    price: '$45',
    organizer: 'Design Principles Academy',
    availableSeats: 15,
    featured: false,
    image: './images/events/ev-10.webp',
    shortDescription: 'Master visual balance, grid systems, contrast dynamics, and emotive color palettes.',
    description: 'An essential masterclass for students, junior designers, and developers wanting a rock-solid foundation in visual aesthetics. Deconstruct layout hierarchy, Gestalt principles, optical spacing, and harmonious color mathematics.',
    highlights: [
      'Gestalt principles applied to modern digital interfaces',
      'Harmonic color systems and accessible contrast scales',
      'Grid systems, baseline rhythms, and negative space',
      'Critique clinic: transforming raw layouts into polished work'
    ]
  },
  {
    id: 'ev-11',
    title: 'Product Design Experience: Zero to One',
    category: 'Design',
    date: '2027-05-18',
    displayDate: 'Tue, May 18, 2027 • 10:00 AM',
    location: 'Austin, TX',
    price: '$105',
    organizer: 'ProductCraft International',
    availableSeats: 10,
    featured: false,
    image: './images/events/ev-11.webp',
    shortDescription: 'End-to-end product design from user research and wireframing to validated interactive prototypes.',
    description: 'Step into the shoes of a Principal Product Designer. Through interactive team simulations, you will define problem statements, conduct user journey mapping, design low and high-fidelity wireframes, and test interactive prototypes with target users.',
    highlights: [
      'User journey mapping and mental model validation',
      'Rapid interactive prototyping in Figma',
      'Usability testing scripts and synthesized insights',
      'Aligning product roadmaps with business OKRs'
    ]
  },
  {
    id: 'ev-12',
    title: 'Modern Web Development & Edge Computing Summit',
    category: 'Technology',
    date: '2027-05-29',
    displayDate: 'Sat, May 29, 2027 • 9:00 AM',
    location: 'Boston, MA',
    price: '$80',
    organizer: 'Web Standards Council',
    availableSeats: 28,
    featured: false,
    image: './images/events/ev-12.webp',
    shortDescription: 'The latest in WebAssembly, service workers, streaming hydration, and edge-first web platforms.',
    description: 'Gather with web standards authors and leading web architects. Uncover how modern web performance metrics (INP, LCP, CLS) drive engagement, examine WebAssembly compilation pipelines, and leverage edge functions for lightning-fast localized response times.',
    highlights: [
      'Interaction to Next Paint (INP) optimization deep dive',
      'WebAssembly modules for browser-based computation',
      'Edge worker routing and dynamic personalized caches',
      'The future of CSS: subgrid, container queries, and anchor positioning'
    ]
  }
];

export const locations = [
  'All Locations',
  'San Francisco, CA',
  'Seattle, WA',
  'New York, NY',
  'Austin, TX',
  'Chicago, IL',
  'Boston, MA'
];

export default events;
