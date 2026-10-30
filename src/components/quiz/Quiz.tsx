"use client";

import { useState } from "react";
import { shuffle } from "@/lib/quiz";
import type { Question } from "@/types/question";
import QuizResult from "./QuizResult";
import QuizSession, { type Answers } from "./QuizSession";
import QuizSetup from "./QuizSetup";

type Phase =
  | { name: "setup" }
  | { name: "session"; questions: Question[] }
  | { name: "result"; questions: Question[]; answers: Answers };

export default function Quiz({ questions }: { questions: Question[] }) {
  const [phase, setPhase] = useState<Phase>({ name: "setup" });

  if (phase.name === "session") {
    return (
      <QuizSession
        questions={phase.questions}
        onFinish={answers =>
          setPhase({ name: "result", questions: phase.questions, answers })
        }
        onExit={() => setPhase({ name: "setup" })}
      />
    );
  }

  if (phase.name === "result") {
    return (
      <QuizResult
        questions={phase.questions}
        answers={phase.answers}
        onRetryMissed={missed =>
          setPhase({ name: "session", questions: shuffle(missed) })
        }
        onNewQuiz={() => setPhase({ name: "setup" })}
      />
    );
  }

  return (
    <QuizSetup
      questions={questions}
      onStart={selected => setPhase({ name: "session", questions: selected })}
    />
  );
}
