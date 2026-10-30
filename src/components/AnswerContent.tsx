import type { Question } from "@/types/question";
import CodeBlock from "./CodeBlock";

interface AnswerContentProps {
  answer: Question["answer"];
  code?: Question["code"];
  className?: string;
}

export default function AnswerContent({
  answer,
  code,
  className = "text-sm",
}: AnswerContentProps) {
  return (
    <div
      className={`space-y-4 leading-relaxed text-foreground/80 ${className}`}
    >
      {answer.split("\n\n").map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
      {code && <CodeBlock {...code} />}
    </div>
  );
}
