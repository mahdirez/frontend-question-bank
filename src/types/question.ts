export const LEVELS = [
  "basic",
  "intermediate",
  "advanced",
  "engineering",
] as const;

export type Level = (typeof LEVELS)[number];

export const TOPICS = [
  "html",
  "css",
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "performance",
  "accessibility",
  "testing",
  "architecture",
  "security",
  "browser-network",
] as const;

export type Topic = (typeof TOPICS)[number];

export interface CodeSnippet {
  language: string;
  content: string;
}

export interface Question {
  /** Unique and stable. Never change it after publishing. Format: topic-slug-NN */
  id: string;
  level: Level;
  topic: Topic;
  question: string;
  /** Plain text. Paragraphs are separated by a blank line (\n\n). */
  answer: string;
  code?: CodeSnippet;
}
