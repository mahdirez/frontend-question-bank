import type { Metadata } from "next";
import QuestionCard from "@/components/QuestionCard";
import { getAllQuestions } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Questions | FE Question Bank",
};

export default function QuestionsPage() {
  const questions = getAllQuestions();

  return (
    <section className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Questions</h1>
      <p className="mt-2 text-muted">{questions.length} questions</p>

      <div className="mt-8 space-y-3">
        {questions.map(q => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </section>
  );
}
