"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

interface MCQCardProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export default function MCQCard({ question, options, correctIndex, explanation }: MCQCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
  };

  return (
    <Card className="my-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {options.map((option, i) => {
          const isCorrect = i === correctIndex;
          const isSelected = i === selected;
          let bg = "bg-muted/50 hover:bg-muted";
          if (revealed && isCorrect) bg = "bg-accent/15 border-accent";
          if (revealed && isSelected && !isCorrect) bg = "bg-destructive/15 border-destructive";

          return (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              className={`w-full text-left p-3 rounded-md border transition-colors flex items-center gap-3 ${bg}`}
            >
              <span className="font-mono text-sm text-muted-foreground w-6">{String.fromCharCode(65 + i)}.</span>
              <span className="text-sm flex-1">{option}</span>
              {revealed && isCorrect && <CheckCircle className="h-4 w-4 text-accent" />}
              {revealed && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-destructive" />}
            </button>
          );
        })}
        {revealed && explanation && (
          <p className="text-sm text-muted-foreground mt-3 pl-2 border-l-2 border-primary">{explanation}</p>
        )}
      </CardContent>
    </Card>
  );
}
