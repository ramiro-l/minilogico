"use client";

import { Button } from "@/components/ui/button";

import {
  DIFFICULTY_CONFIG,
  type Difficulty,
  useTombola,
} from "@/lib/tombola/hooks/useTombola";

export default function DifficultySelector() {
  const { difficulty, setDifficulty } = useTombola();

  return (
    <div className="space-y-3">
      <h4 className="text-center font-medium text-gray-900 text-sm">
        Dificultad
      </h4>

      <div className="flex flex-wrap justify-center gap-2">
        {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((diff) => (
          <Button
            key={diff}
            type="button"
            variant={difficulty === diff ? "default" : "outline"}
            size="sm"
            onClick={() => setDifficulty(diff)}
            className="h-9 px-4 font-medium text-xs"
          >
            {DIFFICULTY_CONFIG[diff].label}
          </Button>
        ))}
      </div>
    </div>
  );
}
