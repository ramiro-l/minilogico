import { FillInTheBlankDefinition } from "@/types";
import InlineLaTeX from "../app/tombola/InlineLaTeX";
import DragDropExercise from "./DragDropExercise";

interface Props {
  data: FillInTheBlankDefinition;
}

export default function FillInTheBlankExercise({ data }: Props) {
  return (
    <>
      <h1 className="mb-4 font-bold text-xl">
        <InlineLaTeX math={data.prompt} />
      </h1>
      <DragDropExercise data={data} />
    </>
  );
}
