import { Progress } from "@/components/ui/progress";

import { useTombola } from "@/lib/tombola/hooks/useTombola";

export default function ExerciseProgress() {
  const { limitExercises, completedExercises } = useTombola();

  return (
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
  );
}
