"use client";

import Link from "next/link";
import { LevelBadge, TopicBadge } from "@/components/Badges";
import type { Question } from "@/types/question";
import type { Answers } from "./QuizSession";

interface QuizResultProps {
  questions: Question[];
  answers: Answers;
  onRetryMissed: (missed: Question[]) => void;
  onNewQuiz: () => void;
}

function getMessage(percent: number) {
  if (percent === 100) return "Perfect run. Time to try a harder level.";
  if (percent >= 70) return "Solid. Review the few you missed.";
  if (percent >= 40) return "Good start. Repetition will lock these in.";
  return "Everyone starts somewhere. Review the answers and try again.";
}

export default function QuizResult({
  questions,
  answers,
  onRetryMissed,
  onNewQuiz,
}: QuizResultProps) {
  const total = questions.length;
  const missed = questions.filter(q => answers[q.id] === "unknown");
  const score = total - missed.length;
  const percent = total ? Math.round((score / total) * 100) : 0;

  return (
    <div>
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted">Your result</p>
        <p className="mt-2 text-5xl font-semibold tracking-tight">
          {score}
          <span className="text-muted"> / {total}</span>
        </p>
        <p className="mt-2 font-mono text-sm text-accent">{percent}%</p>
        <p className="mt-4 text-sm text-muted">{getMessage(percent)}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {missed.length > 0 && (
          <button
            type="button"
            onClick={() => onRetryMissed(missed)}
            className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Review {missed.length} missed
          </button>
        )}
        <button
          type="button"
          onClick={onNewQuiz}
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card"
        >
          New quiz
        </button>
      </div>

      {missed.length > 0 && (
        <section className="mt-12">
          <h2 className="text-sm font-medium text-muted">To review</h2>
          <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
            {missed.map(q => (
              <li key={q.id}>
                <Link
                  href={`/questions/${q.id}`}
                  className="flex flex-col gap-2 p-4 transition-colors hover:bg-background sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="text-sm font-medium leading-snug">
                    {q.question}
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <LevelBadge level={q.level} />
                    <TopicBadge topic={q.topic} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
