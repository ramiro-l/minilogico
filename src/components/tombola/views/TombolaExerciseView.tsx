import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { useTombola } from "@/lib/tombola/hooks/useTombola";

import ExerciseSentenceComplete from "../exercise/ExerciseSentenceComplete";

export default function TombolaExerciseView() {
  const { advance, limitExercises, completedExercises } = useTombola();

  return (
    <div className="m-auto flex flex-col gap-4 p-6">
      <div className="space-y-2">
        <div className="flex justify-between text-gray-600 text-sm">
          <span>
            Ejercicio {completedExercises} de {limitExercises}
          </span>
          <span>
            {Math.round(((completedExercises - 1) / limitExercises) * 100)}%
            completado
          </span>
        </div>
        <Progress
          value={((completedExercises - 1) / limitExercises) * 100}
          className="h-2"
        />
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <ExerciseSentenceComplete />
      </div>

      <Button
        className="w-full select-none"
        onClick={advance}
        disabled={completedExercises > limitExercises}
      >
        {completedExercises >= limitExercises ? "Terminar" : "Siguiente"}
      </Button>
    </div>
  );
}
