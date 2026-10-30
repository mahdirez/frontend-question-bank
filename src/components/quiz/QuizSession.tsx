"use client";

import { useCallback, useEffect, useState } from "react";
import AnswerContent from "@/components/AnswerContent";
import { LevelBadge, TopicBadge } from "@/components/Badges";
import { setStatus, type Status } from "@/lib/progress";
import type { Question } from "@/types/question";

export type Answers = Record<string, Status>;

interface QuizSessionProps {
  questions: Question[];
  onFinish: (answers: Answers) => void;
  onExit: () => void;
}

export default function QuizSession({
  questions,
  onFinish,
  onExit,
}: QuizSessionProps) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});

  const total = questions.length;
  const current = questions[index];

  const answer = useCallback(
    (status: Status) => {
      const next = { ...answers, [current.id]: status };
      setStatus(current.id, status);

      if (index + 1 >= total) {
        onFinish(next);
        return;
      }

      setAnswers(next);
      setIndex(index + 1);
      setRevealed(false);
    },
    [answers, current, index, total, onFinish],
  );

  // Keyboard: Space = reveal, 1 = didn't know, 2 = knew it
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (!revealed && e.key === " " && tag !== "BUTTON" && tag !== "A") {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && e.key === "1") {
        answer("unknown");
      } else if (revealed && e.key === "2") {
        answer("known");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [revealed, answer]);

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          Question {index + 1} of {total}
        </span>
        <button
          type="button"
          onClick={onExit}
          className="transition-colors hover:text-foreground"
        >
          End quiz
        </button>
      </div>

      <div
        className="mt-3 h-1 overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index}
      >
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${(index / total) * 100}%` }}
        />
      </div>

      <div
        key={current.id}
        className="mt-6 rounded-xl border border-border bg-card p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center gap-2">
          <LevelBadge level={current.level} />
          <TopicBadge topic={current.topic} />
        </div>

        <h2 className="mt-4 text-xl font-semibold leading-snug sm:text-2xl">
          {current.question}
        </h2>

        {revealed ? (
          <div className="mt-6 border-t border-border pt-6">
            <AnswerContent answer={current.answer} code={current.code} />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-8 w-full rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-accent"
          >
            Reveal answer
            <kbd className="ms-2 hidden rounded border border-border px-1.5 font-mono text-[11px] text-muted sm:inline">
              Space
            </kbd>
          </button>
        )}
      </div>

      {revealed && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => answer("unknown")}
            className="rounded-lg border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-rose-500 hover:text-rose-500"
          >
            Didn&apos;t know
            <kbd className="ms-2 hidden rounded border border-border px-1.5 font-mono text-[11px] text-muted sm:inline">
              1
            </kbd>
          </button>
          <button
            type="button"
            onClick={() => answer("known")}
            className="rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Knew it
            <kbd className="ms-2 hidden rounded border border-background/30 px-1.5 font-mono text-[11px] opacity-70 sm:inline">
              2
            </kbd>
          </button>
        </div>
      )}
    </div>
  );
}
