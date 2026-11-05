import type { Question } from "@/types/question";
import { htmlQuestions } from "./html";
import { cssQuestions } from "./css";
import { javascriptQuestions } from "./javascript";
import { typescriptQuestions } from "./typescript";
import { reactQuestions } from "./react";
import { nextjsQuestions } from "./nextjs";
import { performanceQuestions } from "./performance";
import { accessibilityQuestions } from "./accessibility";
import { testingQuestions } from "./testing";
import { securityQuestions } from "./security";
import { browserNetworkQuestions } from "./browser-network";
import { architectureQuestions } from "./architecture";

export const questions: Question[] = [
  ...htmlQuestions,
  ...cssQuestions,
  ...javascriptQuestions,
  ...typescriptQuestions,
  ...reactQuestions,
  ...nextjsQuestions,
  ...performanceQuestions,
  ...accessibilityQuestions,
  ...testingQuestions,
  ...securityQuestions,
  ...browserNetworkQuestions,
  ...architectureQuestions,
];
