"use client";

import "katex/dist/katex.min.css";
import FillInTheBlankExercise from "../../components/FillInTheBlankExercise";
import definition from "../../data/ejemplo.json";
import type { FillInTheBlankDefinition } from "../../types";

export default function FillExercise() {
  const data: FillInTheBlankDefinition = definition;

  return (
    <main className="p-6">
      <FillInTheBlankExercise data={data} />
    </main>
  );
}
