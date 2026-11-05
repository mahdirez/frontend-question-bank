import type { Question } from "@/types/question";

export const testingQuestions: Question[] = [
  {
    id: "test-pyramid-01",
    level: "basic",
    topic: "testing",
    question:
      "What are unit, integration and end-to-end tests, and how do you balance them?",
    answer:
      "Unit tests check small pieces in isolation, such as a pure function or a utility. They are fast, cheap and precise about where a failure is.\n\nIntegration tests check that several parts work together, for example a component with its state and a mocked API. They give more confidence per test.\n\nEnd-to-end tests drive a real browser through complete user journeys. They are the most realistic but also the slowest, most expensive to maintain and most prone to flakiness.\n\nThe test pyramid suggests many unit tests and few E2E tests. The 'testing trophy' for frontend puts the emphasis on integration tests, with static analysis (TypeScript, ESLint) as the base. In both models: the higher the level, the fewer tests you write, and you cover only the critical paths.",
  },
  {
    id: "test-rtl-01",
    level: "intermediate",
    topic: "testing",
    question:
      "What is the philosophy of React Testing Library, and how should you query elements?",
    answer:
      "The guiding principle is that tests should resemble how users use the software. So you interact with the UI the way a user would and assert on what they would see, instead of testing implementation details such as internal state, component instances or CSS class names.\n\nPrefer queries in this order: getByRole (with a name), getByLabelText, getByText, and use getByTestId only as a last resort. Querying by role also verifies that your markup is accessible.\n\nUse userEvent rather than fireEvent because it simulates realistic interaction sequences, and use findBy queries or waitFor for asynchronous UI. Tests written this way survive refactors because they only break when behavior changes.",
    code: {
      language: "tsx",
      content: `test("increments the counter", async () => {
  const user = userEvent.setup();
  render(<Counter />);

  await user.click(screen.getByRole("button", { name: /increment/i }));

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});`,
    },
  },
  {
    id: "test-mocking-01",
    level: "intermediate",
    topic: "testing",
    question:
      "What is the difference between stubs, spies and mocks, and what should you mock?",
    answer:
      "A stub returns canned values. A spy wraps a function and records how it was called. A mock combines a fake implementation with expectations about calls. A fake is a simplified but working implementation, such as an in-memory database.\n\nMock at the boundaries of your system: the network, time, randomness and third-party services. Avoid mocking your own modules, because heavy mocking makes tests pass while the real integration is broken, and tests become coupled to implementation.\n\nFor HTTP, a tool like MSW intercepts requests at the network level, so your code still uses the real fetch and you can reuse the same handlers across tests, Storybook and local development.",
    code: {
      language: "ts",
      content: `import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/user", () => HttpResponse.json({ name: "Ada" })),
];`,
    },
  },
  {
    id: "test-snapshot-01",
    level: "intermediate",
    topic: "testing",
    question: "What are the pros and cons of snapshot testing?",
    answer:
      "Snapshots record the output of a function or component and fail when it changes. They are quick to write and can catch unintended changes.\n\nThe downsides are significant. Large snapshots are noisy, nobody reads them carefully, and developers tend to press 'update all' when they fail, which turns the test into a rubber stamp. They also describe structure rather than behavior, so harmless refactors break them while real bugs can slip through.\n\nUse snapshots sparingly for small, stable, serializable output such as error messages, generated config or API response shapes, preferably inline so they are reviewed in the diff. For UI, prefer explicit assertions about behavior, and use visual regression testing when you care about how things look.",
  },
  {
    id: "test-flaky-01",
    level: "advanced",
    topic: "testing",
    question: "What causes flaky end-to-end tests and how do you fix them?",
    answer:
      "A flaky test passes and fails without any code change. Common causes are fixed sleeps instead of waiting for conditions, tests sharing data or depending on execution order, real network calls and third-party services, animations and timing races, unstable selectors, and parallel tests competing for the same database records.\n\nThe fixes follow the causes. Use auto-waiting, web-first assertions instead of arbitrary timeouts. Give each test its own isolated data and clean up after it. Mock or stub external services. Disable animations in the test environment and control time with fake clocks. Select elements by role or a dedicated test id rather than fragile CSS paths.\n\nRetries can hide the problem and should be a last resort. Track flaky tests, quarantine them quickly so they do not erode trust in the suite, and treat each one as a bug to fix.",
    code: {
      language: "ts",
      content: `// Flaky: guesses how long the page needs
await page.waitForTimeout(2000);

// Reliable: waits until the condition is true
await expect(
  page.getByRole("heading", { name: "Dashboard" }),
).toBeVisible();`,
    },
  },
  {
    id: "test-strategy-01",
    level: "engineering",
    topic: "testing",
    question:
      "How would you design a testing strategy for a large frontend application?",
    answer:
      "Start from risk, not coverage numbers: what would hurt users or the business most if it broke?\n\n1. Static analysis first: strict TypeScript and ESLint catch a whole class of bugs for free.\n2. Unit tests for complex logic and utilities.\n3. Component and integration tests as the main layer, using Testing Library with mocked network boundaries.\n4. A small set of E2E tests for critical journeys such as login, checkout and core workflows, kept deliberately few and stable.\n5. Visual regression for the design system, and automated accessibility checks (axe) plus manual audits.\n6. Contract tests or shared schemas so frontend and API cannot silently drift apart.\n\nIn CI, run fast tests on every pull request and heavier E2E suites on merge or nightly, sharded and parallelized. Treat coverage as a signal, not a target, set a flake budget, and use production monitoring (error tracking, real user metrics) as the final safety net.\n\nThe trade-off is always confidence against speed and maintenance cost. A suite that is slow or flaky gets ignored, which is worse than having fewer tests.",
  },
];
