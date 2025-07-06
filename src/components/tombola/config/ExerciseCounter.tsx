"use client";

import { Button } from "@/components/ui/button";

import {
  MAX_EXERCISES,
  MIN_EXERCISES,
  useTombola,
} from "@/lib/tombola/hooks/useTombola";

export default function ExerciseCounter() {
  const { limitExercises, setLimitExercises } = useTombola();

  return (
    <div className="space-y-3">
      <h4 className="text-center font-medium text-gray-900 text-sm">
        Cantidad de ejercicios
      </h4>
      <div className="flex items-center justify-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setLimitExercises(limitExercises - 1)}
          disabled={limitExercises <= MIN_EXERCISES}
          className="h-8 w-8 p-0"
        >
          -
        </Button>
        <span className="min-w-[2rem] text-center font-mono font-semibold text-gray-800 text-sm">
          {limitExercises}
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setLimitExercises(limitExercises + 1)}
          disabled={limitExercises >= MAX_EXERCISES}
          className="h-8 w-8 p-0"
        >
          +
        </Button>
      </div>
    </div>
  );
}
