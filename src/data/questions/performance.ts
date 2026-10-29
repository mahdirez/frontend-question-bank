import type { Question } from "@/types/question";

export const performanceQuestions: Question[] = [
  {
    id: "perf-core-web-vitals-01",
    level: "advanced",
    topic: "performance",
    question: "What are the Core Web Vitals and how do you improve each one?",
    answer:
      "Core Web Vitals measure real user experience through three metrics.\n\nLCP (Largest Contentful Paint) measures loading. Improve it with optimized and properly sized images, preloading the hero image, faster server response and less render-blocking CSS and JS.\n\nINP (Interaction to Next Paint) measures responsiveness and replaced FID. Improve it by breaking up long tasks, reducing main-thread JavaScript and avoiding heavy work in event handlers.\n\nCLS (Cumulative Layout Shift) measures visual stability. Improve it by reserving space for images, ads and embeds with width and height or aspect-ratio, and by avoiding content injected above existing content.",
  },
];
