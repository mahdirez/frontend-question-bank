import type { Question } from "@/types/question";

export const cssQuestions: Question[] = [
  {
    id: "css-box-model-01",
    level: "basic",
    topic: "css",
    question: "Explain the CSS box model and what box-sizing: border-box does.",
    answer:
      "Every element is a box made of four layers, from inside out: content, padding, border and margin.\n\nBy default (content-box), width and height only apply to the content, so padding and border are added on top and make the element larger than the declared width. With box-sizing: border-box, width and height include the content, padding and border, which makes layout math much more predictable.",
    code: {
      language: "css",
      content: "*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}",
    },
  },
  {
    id: "css-stacking-context-01",
    level: "advanced",
    topic: "css",
    question:
      "What is a stacking context, and why can z-index sometimes seem to be ignored?",
    answer:
      "A stacking context is an isolated group of elements that are painted together. z-index values are only compared between elements inside the same stacking context, so a child with z-index: 9999 can never appear above an element outside of its parent's context if that parent sits lower.\n\nA new stacking context is created by the root element, by positioned elements with a z-index other than auto, and by properties such as opacity below 1, transform, filter and isolation: isolate.\n\nWhen z-index seems ignored, look for an ancestor that accidentally created a stacking context. isolation: isolate is a clean way to create one on purpose.",
  },
];
