"use client";

import { useId, useState } from "react";
import type { Question } from "@/types/question";
import { LevelBadge, TopicBadge } from "./Badges";
import CodeBlock from "./CodeBlock";

interface QuestionCardProps {
  question: Question;
  defaultOpen?: boolean;
}

export default function QuestionCard({
  question,
  defaultOpen = false,
}: QuestionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const paragraphs = question.answer.split("\n\n");

  return (
    <article
      id={question.id}
      className="scroll-mt-20 rounded-xl border border-border bg-card transition-colors hover:border-accent/60"
    >
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start justify-between gap-4 p-5 text-start"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <LevelBadge level={question.level} />
            <TopicBadge topic={question.topic} />
          </div>
          <h2 className="mt-3 font-medium leading-snug">{question.question}</h2>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={`mt-1 h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 border-t border-border px-5 py-5 text-sm leading-relaxed text-foreground/80">
            {paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-line">
                {p}
              </p>
            ))}

            {question.code && <CodeBlock {...question.code} />}
          </div>
        </div>
      </div>
    </article>
  );
}
