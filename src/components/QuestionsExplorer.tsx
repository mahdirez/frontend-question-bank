"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LEVEL_META, TOPIC_META } from "@/lib/constants";
import {
  LEVELS,
  TOPICS,
  type Level,
  type Question,
  type Topic,
} from "@/types/question";
import { LEVEL_DOT } from "./Badges";
import FilterChip from "./FilterChip";
import QuestionCard from "./QuestionCard";

function parseLevel(value: string | null): Level | null {
  return value && (LEVELS as readonly string[]).includes(value)
    ? (value as Level)
    : null;
}

function parseTopic(value: string | null): Topic | null {
  return value && (TOPICS as readonly string[]).includes(value)
    ? (value as Topic)
    : null;
}

export default function QuestionsExplorer({
  questions,
}: {
  questions: Question[];
}) {
  const params = useSearchParams();
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);

  const [level, setLevel] = useState<Level | null>(() =>
    parseLevel(params.get("level")),
  );
  const [topic, setTopic] = useState<Topic | null>(() =>
    parseTopic(params.get("topic")),
  );
  const [query, setQuery] = useState(() => params.get("q") ?? "");
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  // Keep the URL in sync with filters (shareable links) without navigating.
  useEffect(() => {
    const sp = new URLSearchParams();
    if (level) sp.set("level", level);
    if (topic) sp.set("topic", topic);
    if (query.trim()) sp.set("q", query.trim());
    const qs = sp.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  }, [level, topic, query, pathname]);

  // Press "/" to focus the search box.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const levelCounts = useMemo(() => {
    const counts = {} as Record<Level, number>;
    for (const l of LEVELS) counts[l] = 0;
    for (const q of questions) counts[q.level]++;
    return counts;
  }, [questions]);

  const topicCounts = useMemo(() => {
    const counts = {} as Record<Topic, number>;
    for (const t of TOPICS) counts[t] = 0;
    for (const q of questions) counts[q.topic]++;
    return counts;
  }, [questions]);

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return questions.filter(q => {
      if (level && q.level !== level) return false;
      if (topic && q.topic !== topic) return false;
      if (terms.length === 0) return true;

      const haystack = [
        q.question,
        q.answer,
        TOPIC_META[q.topic].name,
        q.code?.content ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return terms.every(term => haystack.includes(term));
    });
  }, [questions, level, topic, query]);

  const hasFilters = level !== null || topic !== null || query.trim() !== "";
  const allOpen = filtered.length > 0 && filtered.every(q => openIds.has(q.id));

  function toggleOne(id: string) {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setOpenIds(prev => {
      const next = new Set(prev);
      for (const q of filtered) {
        if (allOpen) next.delete(q.id);
        else next.add(q.id);
      }
      return next;
    });
  }

  function clearFilters() {
    setLevel(null);
    setTopic(null);
    setQuery("");
  }

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        >
          <circle cx="9" cy="9" r="5.5" />
          <path d="M13.5 13.5L17 17" strokeLinecap="round" />
        </svg>

        <input
          ref={searchRef}
          type="text"
          inputMode="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search questions, answers and code…"
          aria-label="Search questions"
          className="w-full rounded-xl border border-border bg-card py-2.5 ps-9 pe-16 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
        />

        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-muted transition-colors hover:text-foreground"
          >
            Clear
          </button>
        ) : (
          <kbd className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 rounded border border-border px-1.5 font-mono text-[11px] text-muted">
            /
          </kbd>
        )}
      </div>

      {/* Filters */}
      <div className="mt-5 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-16 text-xs text-muted">Level</span>
          <FilterChip
            label="All"
            count={questions.length}
            active={level === null}
            onClick={() => setLevel(null)}
          />
          {LEVELS.map(l => (
            <FilterChip
              key={l}
              label={LEVEL_META[l].name}
              count={levelCounts[l]}
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
          {TOPICS.filter(t => topicCounts[t] > 0).map(t => (
            <FilterChip
              key={t}
              label={TOPIC_META[t].name}
              count={topicCounts[t]}
              active={topic === t}
              onClick={() => setTopic(topic === t ? null : t)}
            />
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-8 flex items-center justify-between text-sm">
        <p className="text-muted" aria-live="polite">
          {filtered.length} of {questions.length} questions
        </p>

        <div className="flex items-center gap-4">
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-muted transition-colors hover:text-foreground"
            >
              Clear filters
            </button>
          )}
          {filtered.length > 0 && (
            <button
              type="button"
              onClick={toggleAll}
              className="text-accent transition-opacity hover:opacity-80"
            >
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          )}
        </div>
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="mt-4 space-y-3">
          {filtered.map(q => (
            <QuestionCard
              key={q.id}
              question={q}
              open={openIds.has(q.id)}
              onToggle={() => toggleOne(q.id)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-border px-6 py-16 text-center">
          <p className="font-medium">No questions found</p>
          <p className="mt-1 text-sm text-muted">
            Try a different keyword or remove some filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-background"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
