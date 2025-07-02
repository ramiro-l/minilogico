import { useState } from "react";
import type { FillInTheBlankDefinition } from "../types";

export function useFillExercise(data: FillInTheBlankDefinition) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleDrop = (blankId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [blankId]: option }));
  };

  const handleRemove = (blankId: number) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[blankId];
      return newAnswers;
    });
  };

  const usedOptions = new Set(Object.values(answers));

  const allOptions = data.segments
    .filter((s) => typeof s !== "string")
    .flatMap((s) => [s.correct, ...s.distractors])
    .sort(() => Math.random() - 0.5);

  return {
    answers,
    usedOptions,
    allOptions,
    handleDrop,
    handleRemove,
  };
}
