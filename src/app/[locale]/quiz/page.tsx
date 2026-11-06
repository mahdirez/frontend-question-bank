import type { Metadata } from "next";
import Quiz from "@/components/quiz/Quiz";
import { getAllQuestions } from "@/lib/questions";

export const metadata: Metadata = {
  title: "Quiz",
  description:
    "Test yourself with a randomized frontend quiz and track your progress.",
};

export default function QuizPage() {
  const questions = getAllQuestions();

  return (
    <section className="mx-auto max-w-2xl py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Quiz</h1>
      <p className="mt-2 mb-8 text-muted">
        Answer in your head, reveal, then rate yourself honestly.
      </p>

      <Quiz questions={questions} />
    </section>
  );
}
