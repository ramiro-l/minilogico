import { useDroppable } from "@dnd-kit/core";
import type { Option } from "../types";
import DraggableOption from "./DraggableOption";

interface Props {
  options: Option[];
}

export default function DragDropOptions({ options }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id: "options-zone" });

  return (
    <div
      ref={setNodeRef}
      className={`justify-center-safe flex min-h-16 flex-wrap gap-x-4 gap-y-2 rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
        isOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"
      }`}
    >
      {options.length === 0 && (
        <p className="flex w-full items-center justify-center text-gray-500 text-sm">
          ...
        </p>
      )}
      {options.map((opt, _idx) => (
        <DraggableOption key={opt.id} option={opt} />
      ))}
    </div>
  );
}
