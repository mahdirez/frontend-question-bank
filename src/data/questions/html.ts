import type { Question } from "@/types/question";

export const htmlQuestions: Question[] = [
  {
    id: "html-semantic-01",
    level: "basic",
    topic: "html",
    question: "What is semantic HTML and why does it matter?",
    answer:
      "Semantic HTML means using elements that describe the meaning of the content (header, nav, main, article, button) instead of generic containers like div and span.\n\nIt matters because screen readers and other assistive technologies rely on these elements to expose landmarks and roles, search engines understand the page structure better, and the code is easier to read and maintain. A real button also gives you keyboard support and focus behavior for free.",
  },
  {
    id: "html-script-loading-01",
    level: "intermediate",
    topic: "html",
    question: "What is the difference between async and defer on a script tag?",
    answer:
      "Both attributes download the script in parallel without blocking HTML parsing. The difference is when the script runs.\n\ndefer: the script runs after the document has been parsed, before DOMContentLoaded, and deferred scripts keep their order.\n\nasync: the script runs as soon as it has been downloaded, which can interrupt parsing, and the execution order is not guaranteed.\n\nUse defer for scripts that depend on the DOM or on each other, and async for independent scripts such as analytics.",
    code: {
      language: "html",
      content:
        '<script src="app.js" defer></script>\n<script src="analytics.js" async></script>',
    },
  },
];
