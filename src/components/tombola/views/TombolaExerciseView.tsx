import ExerciseAdvanceButton from "@/components/tombola/exercise/ExerciseAdvanceButton";
import ExerciseProgress from "@/components/tombola/exercise/ExerciseProgress";
import ExerciseSentenceComplete from "@/components/tombola/exercise/ExerciseSentenceComplete";

export default function TombolaExerciseView() {
  return (
    <div className="mx-auto mt-4 flex flex-col gap-4 py-6 lg:mt-12">
      <ExerciseProgress />

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <ExerciseSentenceComplete />
      </div>

      <ExerciseAdvanceButton />
    </div>
  );
}
