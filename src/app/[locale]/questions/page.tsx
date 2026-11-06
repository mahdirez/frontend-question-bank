import type { Metadata } from "next";
import { Suspense } from "react";
import QuestionsExplorer from "@/components/QuestionsExplorer";
import { getAllQuestions } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Questions",
  description: "Browse and filter frontend questions by level and topic.",
};

function ExplorerSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-hidden="true">
      <div className="h-10 rounded-xl bg-card" />
      <div className="h-6 w-2/3 rounded-full bg-card" />
      <div className="h-6 w-1/2 rounded-full bg-card" />
      <div className="space-y-3 pt-6">
        <div className="h-24 rounded-xl bg-card" />
        <div className="h-24 rounded-xl bg-card" />
        <div className="h-24 rounded-xl bg-card" />
      </div>
    </div>
  );
}

export default function QuestionsPage() {
  const questions = getAllQuestions();

  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Questions</h1>
      <p className="mt-2 mb-8 text-muted">
        Search, filter and test yourself at every level.
      </p>

      <Suspense fallback={<ExplorerSkeleton />}>
        <QuestionsExplorer questions={questions} />
      </Suspense>
    </section>
  );
}
