import type { Question } from "@/types/question";

export const typescriptQuestions: Question[] = [
  {
    id: "ts-any-unknown-01",
    level: "basic",
    topic: "typescript",
    question: "What is the difference between any and unknown?",
    answer:
      "any turns off type checking for a value. You can read any property, call it, or assign it anywhere, and TypeScript will not complain, so errors move from compile time to runtime.\n\nunknown is the type-safe counterpart. You can assign anything to it, but you must narrow it (typeof, in, instanceof, a type guard or a schema validator) before using it.\n\nPrefer unknown for values you do not control, such as parsed JSON, API responses and caught errors. Use any only as a last resort during migrations.",
    code: {
      language: "ts",
      content: `function parse(json: string): unknown {
  return JSON.parse(json);
}

const data = parse('{"name":"Ada"}');

// data.name; // Error: 'data' is of type 'unknown'

if (typeof data === "object" && data !== null && "name" in data) {
  console.log(data.name); // OK after narrowing
}`,
    },
  },
  {
    id: "ts-utility-types-01",
    level: "basic",
    topic: "typescript",
    question:
      "What are Partial, Pick, Omit and Record, and when would you use them?",
    answer:
      "They are built-in utility types that derive new types from existing ones, so you do not repeat yourself.\n\nPartial<T> makes every property optional (useful for update payloads). Pick<T, K> keeps only the listed keys. Omit<T, K> removes the listed keys. Record<K, V> builds an object type with keys K and values V.\n\nOther useful ones are Readonly<T>, Required<T>, ReturnType<F> and Awaited<T>. Deriving types keeps them in sync: when User changes, the derived types change with it.",
    code: {
      language: "ts",
      content: `interface User {
  id: number;
  name: string;
  email: string;
}

type UserDraft = Partial<User>;
type UserPreview = Pick<User, "id" | "name">;
type PublicUser = Omit<User, "email">;
type UsersById = Record<number, User>;`,
    },
  },
  {
    id: "ts-interface-vs-type-01",
    level: "intermediate",
    topic: "typescript",
    question: "What is the difference between interface and type?",
    answer:
      "Both can describe the shape of an object, and for plain objects they are mostly interchangeable.\n\nInterfaces can be extended with extends and can be merged: declaring the same interface twice combines the declarations. This is how libraries let you augment their types.\n\nType aliases are more flexible. They can name unions, intersections, tuples, primitives, mapped types and conditional types, which interfaces cannot express.\n\nA common convention is to use interface for public object shapes and class contracts, and type for everything else. What matters most is picking one convention and staying consistent across the codebase.",
    code: {
      language: "ts",
      content: `interface Animal {
  name: string;
}
interface Dog extends Animal {
  bark(): void;
}

// Only a type alias can do this:
type Id = string | number;
type Status = "idle" | "loading" | "error";`,
    },
  },
  {
    id: "ts-generics-01",
    level: "intermediate",
    topic: "typescript",
    question: "What are generics and why are constraints useful?",
    answer:
      "Generics let you write reusable code that keeps type information instead of falling back to any. A type parameter such as T is a placeholder that gets filled in when the function or type is used.\n\nConstraints (extends) limit what T can be, so the function body can safely use certain properties. In the second example, K must be a real key of T, and the return type T[K] is precise for every call.",
    code: {
      language: "ts",
      content: `function first<T>(items: T[]): T | undefined {
  return items[0];
}

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Ada" };
getProp(user, "name"); // string
// getProp(user, "age"); // Error: not a key of user`,
    },
  },
  {
    id: "ts-discriminated-unions-01",
    level: "advanced",
    topic: "typescript",
    question:
      "What is a discriminated union and how do you check it exhaustively?",
    answer:
      "A discriminated union is a union of object types that share a literal property (the discriminant), such as status. Checking that property narrows the whole object to the matching variant, so each branch only sees the fields that exist for it.\n\nFor exhaustiveness, add a default branch that assigns the value to never. If you later add a new variant and forget to handle it, the code stops compiling instead of failing silently at runtime.\n\nThis pattern models loading, success and error states much better than a single object with many optional fields.",
    code: {
      language: "ts",
      content: `type Result<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function render(result: Result<string>): string {
  switch (result.status) {
    case "loading":
      return "Loading...";
    case "success":
      return result.data;
    case "error":
      return result.error;
    default: {
      const _exhaustive: never = result;
      return _exhaustive;
    }
  }
}`,
    },
  },
  {
    id: "ts-strict-migration-01",
    level: "engineering",
    topic: "typescript",
    question:
      "How would you migrate a large legacy codebase to TypeScript strict mode?",
    answer:
      "Avoid a big-bang rewrite. The goal is to stop new problems immediately and pay down old ones gradually.\n\n1. Make new and changed code strict from day one, for example with a second tsconfig that only includes migrated folders, enforced in CI.\n2. Enable strict flags one at a time. noImplicitAny and strictNullChecks usually produce the most errors, so schedule them deliberately.\n3. Prefer @ts-expect-error over @ts-ignore, with a short reason. It fails when the error disappears, so stale suppressions get cleaned up.\n4. Track the number of suppressions and any usages and make CI fail if the count goes up (a ratchet).\n5. Migrate by module or by team ownership, starting with shared utilities and types that many files depend on.\n\nThe trade-off is a long period with two standards in the same repo. That is acceptable as long as the ratchet keeps moving in one direction.",
  },
];
