"use client";

import { useRef, useState } from "react";
import type { CodeSnippet } from "@/types/question";

export default function CodeBlock({ language, content }: CodeSnippet) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable (e.g. insecure context). Fail silently.
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <span className="font-mono text-xs uppercase text-muted">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs text-muted transition-colors hover:text-foreground"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>{content}</code>
      </pre>
    </div>
  );
}
