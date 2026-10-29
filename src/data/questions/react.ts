import type { Question } from "@/types/question";

export const reactQuestions: Question[] = [
  {
    id: "react-keys-01",
    level: "intermediate",
    topic: "react",
    question:
      "Why do list items need a key, and why is the array index a bad key?",
    answer:
      "Keys let React match elements between renders so it can tell which items were added, removed or reordered, and preserve the right component state.\n\nUsing the index as a key breaks this when the list can be reordered, filtered or have items inserted. The index stays the same while the item behind it changes, so React may reuse the wrong component instance and you get stale state or inputs showing the wrong value. Use a stable, unique id from your data instead.",
  },
  {
    id: "react-rerender-01",
    level: "advanced",
    topic: "react",
    question:
      "What causes a React component to re-render, and does a parent re-render always re-render its children?",
    answer:
      "A component re-renders when its own state changes, when its parent re-renders, or when a context it consumes changes.\n\nBy default, yes: when a parent re-renders, all of its children re-render too, even if their props did not change. React.memo can skip a child when its props are shallowly equal, but only if the props are stable, so objects and functions created inline need useMemo or useCallback.\n\nA re-render is not the same as a DOM update. React renders to compare the output, and only commits real differences to the DOM. Measure with the Profiler before optimizing.",
  },
];
