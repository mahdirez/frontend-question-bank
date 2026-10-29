import type { Question } from "@/types/question";

export const architectureQuestions: Question[] = [
  {
    id: "arch-state-placement-01",
    level: "engineering",
    topic: "architecture",
    question: "How do you decide where a piece of state should live?",
    answer:
      "Start with the smallest scope and move up only when needed.\n\n1. Local state: if only one component uses it, keep it there.\n2. Lifted state: if a few nearby components share it, lift it to the closest common parent.\n3. URL state: filters, tabs, pagination and anything users should be able to share or bookmark belongs in the URL.\n4. Server state: data from an API is a cache of remote data, not app state. Use a dedicated tool (React Query, SWR, or framework data fetching) for caching, revalidation and loading states.\n5. Global client state: only for truly app-wide, client-owned data such as theme or session UI.\n\nThe trade-off is always between simplicity and reach: global state is convenient but couples everything and makes changes harder to reason about.",
  },
  {
    id: "arch-micro-frontends-01",
    level: "engineering",
    topic: "architecture",
    question:
      "When would you choose micro frontends, and what are the trade-offs?",
    answer:
      "Micro frontends split a large frontend into independently built and deployed pieces owned by separate teams. They make sense when many teams work on one product, need independent release cycles, or when you are migrating a legacy app incrementally.\n\nThe costs are real: duplicated dependencies and larger bundles, harder shared design consistency, more complex routing, state sharing and testing, and more infrastructure and governance.\n\nFor a small or medium team, a well-structured monorepo with clear module boundaries usually delivers most of the benefits at a fraction of the complexity. Choose micro frontends to solve an organizational scaling problem, not a technical one.",
  },
];
