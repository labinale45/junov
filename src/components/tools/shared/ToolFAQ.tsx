"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface ToolFAQItem {
  question: string;
  answer: string;
}

export function ToolFAQ({ faqs }: { faqs: ToolFAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) return null;

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.question}
            className={`overflow-hidden rounded-2xl border bg-slate-900 transition-colors duration-200 ease-out ${
              isOpen ? "border-violet-500/30" : "border-white/[0.08]"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02]"
            >
              <span className="text-sm font-medium text-slate-50">{faq.question}</span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-violet-400 transition-transform duration-200 ease-out ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-200 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm leading-relaxed text-slate-400">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
