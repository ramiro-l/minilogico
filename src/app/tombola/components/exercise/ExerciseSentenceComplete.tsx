import InlineLaTeX from "@/components/InlineLaTeX";
import { useSentenceComplete } from "../../hooks/useSentenceComplete";
import DragDropContext from "./sentenceComplete/DragDropContext";
import DragDropOptions from "./sentenceComplete/DragDropOptions";
import DragDropSentence from "./sentenceComplete/DragDropSentence";

export default function ExerciseSentenceComplete() {
  const { sentence, options, title, labels, setAnswer, removeAnswer } =
    useSentenceComplete();

  return (
    <>
      <p className="mb-4 font-bold text-xl">
        <InlineLaTeX math={title} fontSizeLatex="text-normal" />
      </p>
      <div className="-mt-3 flex w-full justify-between">
        <Labels labels={labels} />
      </div>
      <DragDropContext
        handleDragCompletion={setAnswer}
        handleRemoveAnswer={removeAnswer}
      >
        <DragDropSentence sentence={sentence} />
        <DragDropOptions options={options} />
      </DragDropContext>
    </>
  );
}

function Labels({ labels }: { labels: string[] }) {
  return (
    <p className="text-black/70 text-xs">
      {labels.map((label) => (
        <span
          key={`label-${label}`}
          className="mr-2 inline-flex items-center rounded-md bg-gray-200 px-2 font-medium "
        >
          {label}
        </span>
      ))}
    </p>
  );
}
