import { Button } from "@/components/ui/button";

import { useTombola } from "@/lib/tombola/hooks/useTombola";

export default function ExerciseAdvanceButton() {
  const { advance, limitExercises, completedExercises } = useTombola();

  return (
    <Button
      className="w-full select-none"
      onClick={advance}
      disabled={completedExercises > limitExercises}
    >
      {completedExercises >= limitExercises ? "Terminar" : "Siguiente"}
    </Button>
  );
}
