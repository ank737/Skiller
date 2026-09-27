import {
  Activity, AlertTriangle, Award, BarChart3, BookOpen, Brain, Briefcase, Building2,
  CheckCircle2, Clock, Code2, FileText, Gauge, GraduationCap, Lightbulb, LineChart, Link2,
  ListChecks, Mail, MapPin, Rocket, Sparkles, Star, Target, TrendingUp, Trophy, Users, Zap,
} from 'lucide-react';

export type Feature = {
  icon: typeof Brain;
  title: string;
  description: string;
  accent: string;
};

export const features: Feature[] = [
  {
    icon: Brain,
    title: 'AI Resume Analysis',
    description: 'Our AI reads your resume the way recruiters do — surfacing what stands out, what is missing, and what to rewrite first.',
    accent: 'from-brand-500 to-brand-600',
  },
  {
    icon: AlertTriangle,
    title: 'Skill Gap Detection',
    description: 'Compare your profile against real job listings to see the exact skills separating you from your target role.',
    accent: 'from-amber-500 to-orange-500',
  },
  {
    icon: MapPin,
    title: 'Career Roadmap',
    description: 'A personalized week-by-week plan with courses, projects, and milestones tailored to the role you want next.',
    accent: 'from-accent-500 to-accent-600',
  },
  {
    icon: Briefcase,
    title: 'Smart Job Recommendations',
    description: 'Roles ranked by how well they match your skills, experience level, and stated preferences — refreshed daily.',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Gauge,
    title: 'ATS Score',
    description: 'See how applicant tracking systems read your resume, with a score and a checklist to push it higher.',
    accent: 'from-rose-500 to-pink-500',
  },
  {
    icon: Lightbulb,
    title: 'Resume Improvement Tips',
    description: 'Specific, line-level rewrites — turn "responsible for" into impact statements with measurable outcomes.',
    accent: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Users,
    title: 'Interview Preparation',
    description: 'Practice with role-specific questions, STAR-framework prompts, and AI feedback on your answers.',
    accent: 'from-violet-500 to-purple-500',
  },
  {
    icon: LineChart,
    title: 'Progress Tracking',
    description: 'Watch your ATS score, skill coverage, and application pipeline move in the right direction over time.',
    accent: 'from-indigo-500 to-brand-500',
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
  icon: typeof Brain;
};

export const howItWorksSteps: Step[] = [
  {
    number: '01',
    title: 'Create Account',
    description: 'Sign up in under a minute and tell us the role you are aiming for.',
    icon: Rocket,
  },
  {
    number: '02',
    title: 'Upload Resume',
    description: 'Drop in your PDF or Word resume — we parse it securely in seconds.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'AI Analysis',
    description: 'Get an ATS score, skill map, and a plain-English summary of your profile.',
    icon: Brain,
  },
  {
    number: '04',
    title: 'Explore Jobs',
    description: 'Browse roles ranked by match, with gaps clearly called out.',
    icon: Briefcase,
  },
  {
    number: '05',
    title: 'Start Your Roadmap',
    description: 'Follow a personalized plan that closes your gaps week by week.',
    icon: Target,
  },
];

export type Testimonial = {
  name: string;
  role: string;
  school: string;
  quote: string;
  avatar: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Aisha Patel',
    role: 'Software Engineering Intern',
    school: 'Georgia Tech',
    quote:
      'Skiller told me my resume was missing Kubernetes and Terraform for the roles I wanted. Six weeks on the roadmap later, I had two internship offers.',
    avatar: 'AP',
    rating: 5,
  },
  {
    name: 'Marcus Lee',
    role: 'Incoming Data Analyst',
    school: 'UC Berkeley',
    quote:
      'The ATS score was a wake-up call — I was at 54. After following the rewrite tips I hit 89 and started hearing back from companies.',
    avatar: 'ML',
    rating: 5,
  },
  {
    name: 'Sofia Ramirez',
    role: 'Product Design Intern',
    school: 'Rhode Island School of Design',
    quote:
      'The skill gap analysis pointed me to two Figma plugins I had never used. Adding them to my portfolio got me my first design internship.',
    avatar: 'SR',
    rating: 4,
  },
  {
    name: 'Daniel Kim',
    role: 'Backend Engineering Intern',
    school: 'University of Waterloo',
    quote:
      'I loved that the job recommendations showed a match percentage. It saved me from applying to roles I was never going to get.',
    avatar: 'DK',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'ML Research Intern',
    school: 'Carnegie Mellon',
    quote:
      'The roadmap broke "learn PyTorch" into a realistic six-week plan with a capstone project. That project became my interview talking point.',
    avatar: 'PN',
    rating: 5,
  },
  {
    name: 'Jordan Blake',
    role: 'Frontend Developer',
    school: 'Bootcamp Grad',
    quote:
      'As a career switcher I had no idea what roles to target. Skiller matched me to frontend roles and gave me a plan to fill my React gaps.',
    avatar: 'JB',
    rating: 4,
  },
];

// ---- Analysis data ----
export const atsScore = 78;

export const skillsFound = [
  'React', 'TypeScript', 'REST APIs', 'Git', 'Node.js', 'CSS', 'Jest', 'Agile',
];

export const missingSkills = [
  'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'CI/CD', 'System Design',
];

export const resumeStrengths = [
  'Quantified impact with metrics on three bullet points',
  'Clear progression of responsibility across internships',
  'Strong projects section with live links',
  'Consistent verb-first bullet structure',
];

export const resumeWeaknesses = [
  'No cloud or infrastructure keywords — filtered out by many ATS',
  'Summary is generic and does not mention target role',
  'Two bullet points lack measurable outcomes',
  'Missing a dedicated skills section header',
];

export const keywordMatch = [
  { keyword: 'React', present: true, weight: 92 },
  { keyword: 'TypeScript', present: true, weight: 88 },
  { keyword: 'Node.js', present: true, weight: 80 },
  { keyword: 'AWS', present: false, weight: 95 },
  { keyword: 'Docker', present: false, weight: 78 },
  { keyword: 'GraphQL', present: false, weight: 70 },
  { keyword: 'CI/CD', present: false, weight: 74 },
  { keyword: 'System Design', present: false, weight: 82 },
];

export const careerSuggestions = [
  {
    role: 'Frontend Engineer',
    match: 91,
    reason: 'Your React and TypeScript skills align strongly with entry-level frontend roles.',
    companies: ['Vercel', 'Linear', 'Stripe'],
  },
  {
    role: 'Full-Stack Developer',
    match: 84,
    reason: 'Node.js and REST experience round out a full-stack profile, with backend gaps to close.',
    companies: ['Notion', 'Figma', 'Retool'],
  },
  {
    role: 'Backend Engineer',
    match: 67,
    reason: 'Strong API work, but cloud and system design gaps limit backend roles for now.',
    companies: ['Datadog', 'Supabase', 'PlanetScale'],
  },
];

export const resumeImprovementTips = [
  {
    section: 'Summary',
    tip: 'Replace the generic objective with a one-line positioning statement naming your target role and top two skills.',
    priority: 'High',
  },
  {
    section: 'Experience',
    tip: 'Add a metric to the "Built dashboard" bullet — e.g. "reduced reporting time by 40% for a 12-person team".',
    priority: 'High',
  },
  {
    section: 'Skills',
    tip: 'Create a dedicated Skills section and add AWS, Docker, and GraphQL to pass ATS keyword filters.',
    priority: 'High',
  },
  {
    section: 'Projects',
    tip: 'Add a one-line outcome to each project — what it did and how many people used it.',
    priority: 'Medium',
  },
  {
    section: 'Education',
    tip: 'List relevant coursework (Data Structures, Web Development) to strengthen junior-profile signals.',
    priority: 'Low',
  },
];

export const aiSummary =
  'You are a strong frontend-leaning full-stack candidate with solid React, TypeScript, and Node.js fundamentals. Your resume communicates impact well in most bullets, but it is being filtered out by ATS for backend and cloud roles because it lacks keywords like AWS, Docker, and CI/CD. Closing the infrastructure gap and sharpening your summary will unlock significantly more interviews.';

export const skillDistribution = [
  { skill: 'Frontend', value: 88 },
  { skill: 'Backend', value: 72 },
  { skill: 'DevOps', value: 35 },
  { skill: 'Data', value: 58 },
  { skill: 'Design', value: 64 },
  { skill: 'Comm.', value: 80 },
];

export const atsTrend = [
  { week: 'W1', score: 54 },
  { week: 'W2', score: 61 },
  { week: 'W3', score: 66 },
  { week: 'W4', score: 72 },
  { week: 'W5', score: 75 },
  { week: 'W6', score: 78 },
];

export const resumeSections = [
  { name: 'Summary', score: 60, status: 'Needs work' },
  { name: 'Experience', score: 85, status: 'Strong' },
  { name: 'Projects', score: 78, status: 'Good' },
  { name: 'Skills', score: 45, status: 'Missing' },
  { name: 'Education', score: 90, status: 'Strong' },
];

// ---- Jobs data ----
export type Job = {
  id: string;
  company: string;
  logo: string;
  logoColor: string;
  role: string;
  location: string;
  remote: boolean;
  type: 'Internship' | 'Full-time';
  experience: 'Entry' | 'Junior' | 'Mid';
  salary: string;
  salaryNum: number;
  skills: string[];
  match: number;
  posted: string;
  description: string;
};

export const jobs: Job[] = [
  {
    id: 'j1',
    company: 'Vercel',
    logo: 'V',
    logoColor: 'from-slate-800 to-slate-950',
    role: 'Frontend Engineering Intern',
    location: 'Remote',
    remote: true,
    type: 'Internship',
    experience: 'Entry',
    salary: '$8k/mo',
    salaryNum: 8000,
    skills: ['React', 'TypeScript', 'Next.js', 'CSS'],
    match: 94,
    posted: '2d ago',
    description: 'Build the dashboard and developer experience tools used by millions of developers. You will ship to production weekly.',
  },
  {
    id: 'j2',
    company: 'Linear',
    logo: 'L',
    logoColor: 'from-indigo-500 to-accent-600',
    role: 'Full-Stack Engineering Intern',
    location: 'San Francisco, CA',
    remote: false,
    type: 'Internship',
    experience: 'Junior',
    salary: '$9k/mo',
    salaryNum: 9000,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    match: 88,
    posted: '4d ago',
    description: 'Help craft the fastest issue tracker in the world. Work across the stack on realtime sync and a pixel-perfect UI.',
  },
  {
    id: 'j3',
    company: 'Stripe',
    logo: 'S',
    logoColor: 'from-violet-600 to-indigo-700',
    role: 'Software Engineering Intern',
    location: 'New York, NY',
    remote: false,
    type: 'Internship',
    experience: 'Entry',
    salary: '$10k/mo',
    salaryNum: 10000,
    skills: ['React', 'Node.js', 'REST', 'SQL'],
    match: 86,
    posted: '1d ago',
    description: 'Join the payments platform powering millions of businesses. Interns ship features used by real merchants.',
  },
  {
    id: 'j4',
    company: 'Supabase',
    logo: 'S',
    logoColor: 'from-emerald-500 to-green-600',
    role: 'Backend Engineering Intern',
    location: 'Remote',
    remote: true,
    type: 'Internship',
    experience: 'Junior',
    salary: '$7k/mo',
    salaryNum: 7000,
    skills: ['PostgreSQL', 'Node.js', 'Docker', 'AWS'],
    match: 72,
    posted: '6d ago',
    description: 'Work on the open-source Firebase alternative. Contribute to realtime, auth, and storage features.',
  },
  {
    id: 'j5',
    company: 'Notion',
    logo: 'N',
    logoColor: 'from-slate-700 to-slate-900',
    role: 'Frontend Engineer, New Grad',
    location: 'San Francisco, CA',
    remote: false,
    type: 'Full-time',
    experience: 'Entry',
    salary: '$130k/yr',
    salaryNum: 130000,
    skills: ['React', 'TypeScript', 'CSS', 'Node.js'],
    match: 90,
    posted: '3d ago',
    description: 'Build the connected workspace used by millions. Own features end-to-end from spec to ship.',
  },
  {
    id: 'j6',
    company: 'Figma',
    logo: 'F',
    logoColor: 'from-pink-500 to-rose-600',
    role: 'Product Design Intern',
    location: 'Remote',
    remote: true,
    type: 'Internship',
    experience: 'Entry',
    salary: '$8.5k/mo',
    salaryNum: 8500,
    skills: ['Figma', 'Design Systems', 'Prototyping', 'Research'],
    match: 68,
    posted: '5d ago',
    description: 'Design features for the platform designers love. Partner with engineers to ship polished experiences.',
  },
  {
    id: 'j7',
    company: 'Datadog',
    logo: 'D',
    logoColor: 'from-purple-600 to-violet-700',
    role: 'Backend Engineer, New Grad',
    location: 'New York, NY',
    remote: false,
    type: 'Full-time',
    experience: 'Entry',
    salary: '$140k/yr',
    salaryNum: 140000,
    skills: ['Go', 'AWS', 'Docker', 'Kubernetes'],
    match: 61,
    posted: '1w ago',
    description: 'Scale the monitoring platform trusted by thousands of companies. Work on high-throughput data pipelines.',
  },
  {
    id: 'j8',
    company: 'PlanetScale',
    logo: 'P',
    logoColor: 'from-rose-500 to-pink-600',
    role: 'Developer Experience Intern',
    location: 'Remote',
    remote: true,
    type: 'Internship',
    experience: 'Junior',
    salary: '$7.5k/mo',
    salaryNum: 7500,
    skills: ['React', 'SQL', 'Node.js', 'CI/CD'],
    match: 79,
    posted: '3d ago',
    description: 'Build tools and docs for the serverless MySQL platform. Improve the developer journey from signup to scale.',
  },
];

// ---- Roadmap data ----
export type RoadmapPhase = {
  id: string;
  phase: string;
  title: string;
  duration: string;
  status: 'completed' | 'active' | 'upcoming';
  progress: number;
  items: { label: string; type: 'course' | 'project' | 'cert' | 'interview'; done: boolean }[];
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'p1',
    phase: 'Phase 1',
    title: 'Strengthen Frontend Foundations',
    duration: 'Weeks 1–2',
    status: 'completed',
    progress: 100,
    items: [
      { label: 'Advanced React Patterns (course)', type: 'course', done: true },
      { label: 'TypeScript Generics Deep Dive (course)', type: 'course', done: true },
      { label: 'Build an accessible component library', type: 'project', done: true },
    ],
  },
  {
    id: 'p2',
    phase: 'Phase 2',
    title: 'Close the Backend Gap',
    duration: 'Weeks 3–4',
    status: 'active',
    progress: 60,
    items: [
      { label: 'Node.js Microservices (course)', type: 'course', done: true },
      { label: 'PostgreSQL for App Developers (course)', type: 'course', done: true },
      { label: 'Ship a REST + GraphQL API project', type: 'project', done: false },
      { label: 'Interview Prep: API Design Drills', type: 'interview', done: false },
    ],
  },
  {
    id: 'p3',
    phase: 'Phase 3',
    title: 'Learn Cloud & DevOps',
    duration: 'Weeks 5–6',
    status: 'upcoming',
    progress: 0,
    items: [
      { label: 'AWS Certified Cloud Practitioner', type: 'cert', done: false },
      { label: 'Docker & Kubernetes for Developers (course)', type: 'course', done: false },
      { label: 'Containerize and deploy your API project', type: 'project', done: false },
    ],
  },
  {
    id: 'p4',
    phase: 'Phase 4',
    title: 'Interview Readiness',
    duration: 'Weeks 7–8',
    status: 'upcoming',
    progress: 0,
    items: [
      { label: 'System Design Fundamentals (course)', type: 'course', done: false },
      { label: 'Mock Frontend System Design Interview', type: 'interview', done: false },
      { label: 'Mock Behavioral Interview (STAR)', type: 'interview', done: false },
    ],
  },
];

export const weeklyGoals = [
  { label: 'Complete Node.js Microservices module 4', done: true },
  { label: 'Write 2 REST endpoints with tests', done: true },
  { label: 'Start GraphQL API project', done: false },
  { label: 'Schedule 1 mock interview', done: false },
];

export const monthlyGoals = [
  { label: 'Raise ATS score to 85', done: false, progress: 78 },
  { label: 'Apply to 15 matched roles', done: false, progress: 53 },
  { label: 'Complete Phase 2 of roadmap', done: false, progress: 60 },
  { label: 'Earn AWS Cloud Practitioner cert', done: false, progress: 0 },
];

export const milestones = [
  { label: 'First internship offer', target: 'Aug 30', icon: Trophy, done: false },
  { label: 'ATS score above 85', target: 'Aug 15', icon: Gauge, done: false },
  { label: 'Complete capstone project', target: 'Sep 5', icon: Rocket, done: false },
  { label: 'Finish Phase 1 roadmap', target: 'Jul 20', icon: CheckCircle2, done: true },
];

// ---- Dashboard data ----
export const quickStats = [
  { label: 'Resume Score', value: '78', suffix: '/100', icon: Gauge, trend: '+24', trendUp: true },
  { label: 'Applications', value: '12', suffix: 'sent', icon: Mail, trend: '+5', trendUp: true },
  { label: 'Saved Jobs', value: '8', suffix: 'roles', icon: Briefcase, trend: '+2', trendUp: true },
  { label: 'Roadmap', value: '42', suffix: '%', icon: Target, trend: '+18%', trendUp: true },
];

export const applicationPipeline = [
  { stage: 'Saved', count: 8 },
  { stage: 'Applied', count: 12 },
  { stage: 'Interview', count: 3 },
  { stage: 'Offer', count: 1 },
];

export const learningProgress = [
  { course: 'Advanced React Patterns', progress: 100, platform: 'Frontend Masters' },
  { course: 'TypeScript Generics Deep Dive', progress: 100, platform: 'Total TypeScript' },
  { course: 'Node.js Microservices', progress: 75, platform: 'Udemy' },
  { course: 'PostgreSQL for App Developers', progress: 100, platform: 'Crunchy Data' },
  { course: 'Docker & Kubernetes', progress: 0, platform: 'KodeKloud' },
];

export const recentActivities = [
  { text: 'Analyzed resume — ATS score improved to 78', time: '2h ago', icon: Brain, color: 'text-brand-500' },
  { text: 'Applied to Frontend Engineering Intern at Vercel', time: '5h ago', icon: Mail, color: 'text-accent-500' },
  { text: 'Completed "TypeScript Generics Deep Dive"', time: '1d ago', icon: BookOpen, color: 'text-emerald-500' },
  { text: 'Saved Full-Stack Engineering Intern at Linear', time: '1d ago', icon: Briefcase, color: 'text-rose-500' },
  { text: 'Started Phase 2: Close the Backend Gap', time: '2d ago', icon: Rocket, color: 'text-amber-500' },
];

export const upcomingTasks = [
  { task: 'Finish Node.js Microservices module 5', due: 'Today', priority: 'High' },
  { task: 'Mock interview: API design', due: 'Tomorrow', priority: 'High' },
  { task: 'Apply to 3 new matched roles', due: 'Aug 4', priority: 'Medium' },
  { task: 'Write GraphQL API project README', due: 'Aug 6', priority: 'Low' },
];

export const profileCompletion = 85;

export const calendarEvents = [
  { day: 4, title: 'Mock interview', type: 'interview' },
  { day: 8, title: 'Vercel callback', type: 'callback' },
  { day: 12, title: 'AWS exam', type: 'exam' },
  { day: 15, title: 'ATS target', type: 'milestone' },
  { day: 22, title: 'Linear onsite', type: 'interview' },
];
