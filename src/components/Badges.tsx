import { LEVEL_META, TOPIC_META } from "@/lib/constants";
import type { Level, Topic } from "@/types/question";

export const LEVEL_DOT: Record<Level, string> = {
  basic: "bg-emerald-500",
  intermediate: "bg-sky-500",
  advanced: "bg-amber-500",
  engineering: "bg-rose-500",
};

export function LevelBadge({ level }: { level: Level }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium">
      <span className={`h-1.5 w-1.5 rounded-full ${LEVEL_DOT[level]}`} />
      {LEVEL_META[level].name}
    </span>
  );
}

export function TopicBadge({ topic }: { topic: Topic }) {
  return (
    <span className="inline-flex items-center rounded-full bg-foreground/5 px-2.5 py-0.5 text-xs font-medium text-muted">
      {TOPIC_META[topic].name}
    </span>
  );
}
