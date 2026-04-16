"use client";

import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"tell" | "ask">("tell");
  const [value, setValue] = useState("");
  const hasText = value.trim().length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl flex flex-col items-center gap-8">
        {/* Toggle */}
        <div className="relative flex bg-[var(--muted)] rounded-full p-1 w-64">
          <div
            className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-[var(--background)] shadow-sm transition-all duration-300 ${
              mode === "tell" ? "left-1" : "left-1/2"
            }`}
          />
          <button
            onClick={() => setMode("tell")}
            className="relative z-10 w-1/2 py-2 text-sm font-medium"
          >
            Tell
          </button>
          <button
            onClick={() => setMode("ask")}
            className="relative z-10 w-1/2 py-2 text-sm font-medium"
          >
            Ask
          </button>
        </div>

        {/* Input Bubble */}
        <div className="relative w-full">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={1}
            placeholder={
              mode === "tell" ? "Tell me anything..." : "Ask me anything..."
            }
            className={`
              w-full resize-none rounded-2xl px-5 py-4 pr-14 min-h-50
              bg-[var(--muted)] border border-[var(--border)]
              focus:outline-none transition-all duration-300
              ${hasText ? "rounded-br-[2.5rem]" : ""}
            `}
          />

          {/* Fold effect */}
          <div
            className={`pointer-events-none absolute bottom-0 right-0 w-15 h-15 ${hasText ? "" : "translate-10"}`}
          >
            <div className="w-full h-full bg-[var(--background)] rounded-tl-2xl shadow-inner" />
          </div>

          {/* Send Button */}
          <button
            className={`
              absolute bottom-2 right-2 w-10 h-10 rounded-full
              bg-[var(--foreground)] text-[var(--background)]
              flex items-center justify-center
              transition-all duration-300
              ${hasText ? "opacity-100 scale-100" : "opacity-0 scale-75"}
            `}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
