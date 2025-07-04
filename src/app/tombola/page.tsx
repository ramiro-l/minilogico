"use client";

import InlineLaTeX from "@/components/InlineLaTeX";
import DragDropContext from "./components/DragDropContext";
import DragDropOptions from "./components/DragDropOptions";
import DragDropSentence from "./components/DragDropSentence";
import { useSentenceComplete } from "./hooks/useSentenceComplete";
import { useSentenceCompleteController } from "./hooks/useSentenceCompleteController";

export default function FillExercise() {
  const { setAnswer, removeAnswer } = useSentenceCompleteController();
  const { sentence, options, title } = useSentenceComplete();

  return (
    <div>
      <p className="mb-4 font-bold text-xl">
        <InlineLaTeX math={title} />
      </p>
      <DragDropContext
        handleDragCompletion={setAnswer}
        handleRemoveAnswer={removeAnswer}
      >
        <DragDropSentence sentence={sentence} />
        <hr className="my-10" />
        <DragDropOptions options={options} />
      </DragDropContext>
    </div>
  );
}
