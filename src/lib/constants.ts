import type { Level, Topic } from "@/types/question";

export const LEVEL_META: Record<Level, { name: string; desc: string }> = {
  basic: {
    name: "Basic",
    desc: "HTML, CSS and JavaScript fundamentals",
  },
  intermediate: {
    name: "Intermediate",
    desc: "Async, closures, React, TypeScript",
  },
  advanced: {
    name: "Advanced",
    desc: "Performance, patterns, rendering strategies",
  },
  engineering: {
    name: "Engineering",
    desc: "Architecture, scalability, trade-offs",
  },
};

export const TOPIC_META: Record<Topic, { name: string }> = {
  html: { name: "HTML" },
  css: { name: "CSS" },
  javascript: { name: "JavaScript" },
  typescript: { name: "TypeScript" },
  react: { name: "React" },
  nextjs: { name: "Next.js" },
  performance: { name: "Performance" },
  accessibility: { name: "Accessibility" },
  testing: { name: "Testing" },
  architecture: { name: "Architecture" },
  security: { name: "Security" },
  "browser-network": { name: "Browser & Network" },
};
