import type { Question } from "@/types/question";

export const javascriptQuestions: Question[] = [
  {
    id: "js-var-let-const-01",
    level: "basic",
    topic: "javascript",
    question: "What is the difference between var, let and const?",
    answer:
      "var is function-scoped, can be redeclared, and is hoisted and initialized with undefined.\n\nlet and const are block-scoped and live in the temporal dead zone until their declaration is reached, so using them earlier throws a ReferenceError.\n\nconst prevents reassigning the binding, but it does not make objects immutable. As a default, use const, use let when you need to reassign, and avoid var.",
  },
  {
    id: "js-closure-01",
    level: "intermediate",
    topic: "javascript",
    question: "What is a closure? Give a practical example.",
    answer:
      "A closure is a function that keeps access to the variables of the scope where it was created, even after that outer function has finished running.\n\nClosures are used for data privacy, function factories, memoization and callbacks that need to remember state. In the example, count is not accessible from outside, and only the returned function can change it.",
    code: {
      language: "js",
      content:
        "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\n\nconst next = createCounter();\nnext(); // 1\nnext(); // 2",
    },
  },
  {
    id: "js-event-loop-01",
    level: "advanced",
    topic: "javascript",
    question:
      "Explain the event loop. In what order does the following code log?",
    answer:
      "JavaScript runs on a single thread with a call stack. Async work is handled by the host environment, and finished callbacks are queued. When the stack is empty, the event loop first drains the microtask queue (promise callbacks, queueMicrotask), and only then takes the next macrotask (setTimeout, I/O, UI events).\n\nSo the order is 1, 4, 3, 2: the synchronous logs run first, then the promise microtask, then the timer macrotask, even with a 0ms delay.",
    code: {
      language: "js",
      content:
        'console.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nconsole.log("4");',
    },
  },
];
