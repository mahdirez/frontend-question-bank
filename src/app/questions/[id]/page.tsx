import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AnswerContent from "@/components/AnswerContent";
import { LevelBadge, TopicBadge } from "@/components/Badges";
import {
  getAdjacentQuestions,
  getAllQuestions,
  getQuestionById,
  getRelatedQuestions,
} from "@/lib/questions";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return getAllQuestions().map(q => ({ id: q.id }));
}

function summarize(text: string, max = 155) {
  const first = text.split("\n\n")[0];
  return first.length <= max ? first : `${first.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const question = getQuestionById(id);

  if (!question) return { title: "Question not found | FE Question Bank" };

  return {
    title: `${question.question} | FE Question Bank`,
    description: summarize(question.answer),
  };
}

function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-4 py-12" aria-hidden="true">
      <div className="h-4 w-32 rounded bg-card" />
      <div className="h-6 w-48 rounded-full bg-card" />
      <div className="h-10 w-3/4 rounded bg-card" />
      <div className="h-40 rounded-xl bg-card" />
    </div>
  );
}

async function QuestionContent({ params }: Props) {
  const { id } = await params;
  const question = getQuestionById(id);

  if (!question) notFound();

  const { prev, next } = getAdjacentQuestions(question.id);
  const related = getRelatedQuestions(question);

  return (
    <article className="py-12">
      <Link
        href="/questions"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← All questions
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <LevelBadge level={question.level} />
        <TopicBadge topic={question.topic} />
      </div>

      <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight">
        {question.question}
      </h1>

      <div className="mt-8 max-w-3xl border-t border-border pt-8">
        <AnswerContent
          answer={question.answer}
          code={question.code}
          className="text-base"
        />
      </div>

      {/* Previous / Next */}
      <nav
        aria-label="Question navigation"
        className="mt-14 grid gap-3 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/questions/${prev.id}`}
            className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent"
          >
            <span className="text-xs text-muted">← Previous</span>
            <span className="mt-1 block text-sm font-medium leading-snug">
              {prev.question}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {next && (
          <Link
            href={`/questions/${next.id}`}
            className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent sm:text-end"
          >
            <span className="text-xs text-muted">Next →</span>
            <span className="mt-1 block text-sm font-medium leading-snug">
              {next.question}
            </span>
          </Link>
        )}
      </nav>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm font-medium text-muted">Related questions</h2>
          <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
            {related.map(q => (
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
    </article>
  );
}

export default function QuestionPage({ params }: Props) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <QuestionContent params={params} />
    </Suspense>
  );
}
