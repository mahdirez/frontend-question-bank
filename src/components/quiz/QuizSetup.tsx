"use client";

import { useMemo, useState } from "react";
import { LEVEL_DOT } from "@/components/Badges";
import FilterChip from "@/components/FilterChip";
import { LEVEL_META, TOPIC_META } from "@/lib/constants";
import { resetProgress, useProgress } from "@/lib/progress";
import { filterPool, shuffle } from "@/lib/quiz";
import {
  LEVELS,
  TOPICS,
  type Level,
  type Question,
  type Topic,
} from "@/types/question";

const COUNT_OPTIONS = [5, 10, 20];

interface QuizSetupProps {
  questions: Question[];
  onStart: (questions: Question[]) => void;
}

export default function QuizSetup({ questions, onStart }: QuizSetupProps) {
  const progress = useProgress();

  const [level, setLevel] = useState<Level | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [onlyUnmastered, setOnlyUnmastered] = useState(false);
  const [count, setCount] = useState<number | "all">(10);

  const availableTopics = useMemo(
    () => TOPICS.filter(t => questions.some(q => q.topic === t)),
    [questions],
  );

  const pool = useMemo(
    () => filterPool(questions, { level, topic, onlyUnmastered }, progress),
    [questions, level, topic, onlyUnmastered, progress],
  );

  const stats = useMemo(() => {
    let known = 0;
    let unknown = 0;
    for (const q of questions) {
      if (progress[q.id] === "known") known++;
      else if (progress[q.id] === "unknown") unknown++;
    }
    return { known, unknown, fresh: questions.length - known - unknown };
  }, [questions, progress]);

  const isAll = count === "all" || count >= pool.length;
  const effectiveCount = isAll ? pool.length : count;
  const countOptions = COUNT_OPTIONS.filter(n => n < pool.length);
  const masteredPercent = questions.length
    ? Math.round((stats.known / questions.length) * 100)
    : 0;

  function handleStart() {
    onStart(shuffle(pool).slice(0, effectiveCount));
  }

  function handleReset() {
    if (window.confirm("Reset all saved quiz progress?")) resetProgress();
  }

  return (
    <div className="space-y-10">
      {/* Progress summary */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-medium">Your progress</p>
          <p className="text-sm text-muted">
            {stats.known} of {questions.length} mastered
          </p>
        </div>

        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-label="Mastered questions"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={masteredPercent}
        >
          <div
            className="h-full bg-accent transition-[width] duration-500"
            style={{ width: `${masteredPercent}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-muted">
          <p>
            {stats.known} known · {stats.unknown} to review · {stats.fresh} new
          </p>
          {stats.known + stats.unknown > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="transition-colors hover:text-foreground"
            >
              Reset progress
            </button>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 text-xs text-muted">Level</span>
          <FilterChip
            label="All"
            active={level === null}
            onClick={() => setLevel(null)}
          />
          {LEVELS.map(l => (
            <FilterChip
              key={l}
              label={LEVEL_META[l].name}
              dotClassName={LEVEL_DOT[l]}
              active={level === l}
              onClick={() => setLevel(level === l ? null : l)}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 text-xs text-muted">Topic</span>
          <FilterChip
            label="All"
            active={topic === null}
            onClick={() => setTopic(null)}
          />
          {availableTopics.map(t => (
            <FilterChip
              key={t}
              label={TOPIC_META[t].name}
              active={topic === t}
              onClick={() => setTopic(topic === t ? null : t)}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 text-xs text-muted">Length</span>
          {countOptions.map(n => (
            <FilterChip
              key={n}
              label={`${n}`}
              active={!isAll && count === n}
              onClick={() => setCount(n)}
            />
          ))}
          <FilterChip
            label={`All (${pool.length})`}
            active={isAll}
            onClick={() => setCount("all")}
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={onlyUnmastered}
            onChange={e => setOnlyUnmastered(e.target.checked)}
            className="h-4 w-4 accent-[var(--accent)]"
          />
          <span>Skip questions I already know</span>
        </label>
      </div>

      {/* Start */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleStart}
          disabled={pool.length === 0}
          className="rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start quiz
        </button>
        <p className="text-sm text-muted">
          {pool.length === 0
            ? "No questions match these options."
            : `${effectiveCount} ${effectiveCount === 1 ? "question" : "questions"}`}
        </p>
      </div>
    </div>
  );
}
