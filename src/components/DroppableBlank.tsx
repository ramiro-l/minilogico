import { useDroppable } from "@dnd-kit/core";
import InlineLaTeX from "../app/tombola/InlineLaTeX";

interface Props {
  id: number;
  value: string;
  onRemove: (blankId: number) => void;
}

export default function DroppableBlank({ id, value, onRemove }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`relative mx-2 flex h-10 w-40 items-center justify-center rounded border border-dashed ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      {value && (
        <>
          <button
            type="button"
            className="-top-2 -right-2 absolute rounded-full bg-white px-1 text-red-500 text-xs"
            onClick={() => onRemove(id)}
          >
            X
          </button>
          <InlineLaTeX math={value} />
        </>
      )}
    </div>
  );
}
