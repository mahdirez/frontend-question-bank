import type { Question } from "@/types/question";
import { htmlQuestions } from "./html";
import { cssQuestions } from "./css";
import { javascriptQuestions } from "./javascript";
import { reactQuestions } from "./react";
import { performanceQuestions } from "./performance";
import { architectureQuestions } from "./architecture";

export const questions: Question[] = [
  ...htmlQuestions,
  ...cssQuestions,
  ...javascriptQuestions,
  ...reactQuestions,
  ...performanceQuestions,
  ...architectureQuestions,
];
