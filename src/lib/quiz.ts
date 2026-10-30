import type { Level, Question, Topic } from "@/types/question";
import type { Progress } from "./progress";

export interface QuizFilters {
  level: Level | null;
  topic: Topic | null;
  /** Only questions that are new or marked as "didn't know". */
  onlyUnmastered: boolean;
}

export function filterPool(
  questions: Question[],
  filters: QuizFilters,
  progress: Progress,
): Question[] {
  return questions.filter(q => {
    if (filters.level && q.level !== filters.level) return false;
    if (filters.topic && q.topic !== filters.topic) return false;
    if (filters.onlyUnmastered && progress[q.id] === "known") return false;
    return true;
  });
}

/** Fisher-Yates shuffle. Returns a new array. */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
