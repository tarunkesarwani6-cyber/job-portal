import {
  Search,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  Award,
  Briefcase,
  Building2,
  LayoutDashboard,
  Plus,
  Brain,
  Sparkles,
  Target,
  Route,
  Bookmark,
} from "lucide-react";

/* =========================
   JOB SEEKER FEATURES
========================= */

export const jobSeekerFeatures = [
  {
    icon: Search,
    title: "AI Job Matching",
    description:
      "Get personalized job recommendations based on your skills, experience, and career goals.",
  },
  {
    icon: FileText,
    title: "AI Resume Analyzer",
    description:
      "Receive ATS scores, keyword suggestions, and resume improvement recommendations instantly.",
  },
  {
    icon: MessageSquare,
    title: "Interview Preparation",
    description:
      "Generate personalized HR and technical interview questions powered by AI.",
  },
  {
    icon: Award,
    title: "Skill Gap Analysis",
    description:
      "Identify missing skills required for your dream role and get improvement suggestions.",
  },
];

/* =========================
   EMPLOYER FEATURES
========================= */

export const employerFeatures = [
  {
    icon: Users,
    title: "Talent Discovery",
    description:
      "Access a curated pool of skilled candidates and find the perfect fit faster.",
  },
  {
    icon: BarChart3,
    title: "Recruitment Analytics",
    description:
      "Track applications, hiring funnels, and candidate engagement in real time.",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description:
      "Review trusted candidate profiles with validated skills and credentials.",
  },
  {
    icon: Clock,
    title: "Smart Hiring",
    description:
      "Reduce hiring time through intelligent candidate screening and ranking.",
  },
];

/* =========================
   AI FEATURES
========================= */

export const AI_FEATURES = [
  {
    icon: Brain,
    title: "Resume Review",
    description:
      "AI evaluates resumes and provides ATS-friendly improvement suggestions.",
  },
  {
    icon: Sparkles,
    title: "Interview Coach",
    description:
      "Generate tailored interview questions and mock interview sessions.",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description:
      "Compare your skills with job requirements and discover missing skills.",
  },
  {
    icon: Route,
    title: "Career Roadmap",
    description:
      "Get a personalized roadmap to achieve your target career path.",
  },
];

/* =========================
   EMPLOYER SIDEBAR MENU
========================= */

export const NAVIGATION_MENU = [
  {
    id: "employer-dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "post-job",
    name: "Post Job",
    icon: Plus,
  },
  {
    id: "manage-jobs",
    name: "Manage Jobs",
    icon: Briefcase,
  },
  {
    id: "company-profile",
    name: "Company Profile",
    icon: Building2,
  },
];

/* =========================
   JOB CATEGORIES
========================= */

export const CATEGORIES = [
  {
    value: "software-engineering",
    label: "Software Engineering",
  },
  {
    value: "frontend-development",
    label: "Frontend Development",
  },
  {
    value: "backend-development",
    label: "Backend Development",
  },
  {
    value: "fullstack-development",
    label: "Full Stack Development",
  },
  {
    value: "data-science",
    label: "Data Science",
  },
  {
    value: "machine-learning",
    label: "Machine Learning",
  },
  {
    value: "artificial-intelligence",
    label: "Artificial Intelligence",
  },
  {
    value: "cyber-security",
    label: "Cyber Security",
  },
  {
    value: "cloud-computing",
    label: "Cloud Computing",
  },
  {
    value: "ui-ux-design",
    label: "UI / UX Design",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "sales",
    label: "Sales",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "human-resources",
    label: "Human Resources",
  },
];

/* =========================
   JOB TYPES
========================= */

export const JOB_TYPES = [
  {
    label: "Remote",
    value: "Remote",
  },
  {
    label: "Full Time",
    value: "Full-Time",
  },
  {
    label: "Part Time",
    value: "Part-Time",
  },
  {
    label: "Internship",
    value: "Internship",
  },
  {
    label: "Contract",
    value: "Contract",
  },
];
/* =========================
   SALARY FILTERS
========================= */

export const SALARY_RANGES = [
  "Below ₹3 LPA",
  "₹3 LPA - ₹6 LPA",
  "₹6 LPA - ₹10 LPA",
  "₹10 LPA - ₹20 LPA",
  "₹20 LPA - ₹40 LPA",
  "₹40+ LPA",
];

/* =========================
   STIPEND FILTERS
========================= */

export const STIPEND_RANGES = [
  "Below ₹10k/month",
  "₹10k - ₹20k/month",
  "₹20k - ₹50k/month",
  "₹50k+/month",
];

export const EMPLOYER_MENU = [
  {
    id: "employer-dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "post-job",
    name: "Post Job",
    icon: Plus,
  },
  {
    id: "manage-jobs",
    name: "Manage Jobs",
    icon: Briefcase,
  },

  {
    id: "company-profile",
    name: "Company Profile",
    icon: Building2,
  },
];

export const JOBSEEKER_MENU = [
  {
    id: "find-jobs",
    name: "Find Jobs",
    icon: Search,
  },
  {
    id: "saved-jobs",
    name: "Saved Jobs",
    icon: Bookmark,
  },
  {
    id: "my-applications",
    name: "Applications",
    icon: FileText,
  },
  {
    id: "profile",
    name: "Profile",
    icon: Users,
  },
];