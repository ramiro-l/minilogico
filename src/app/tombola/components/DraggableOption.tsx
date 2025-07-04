import { useDraggable } from "@dnd-kit/core";
import InlineLaTeX from "@/components/InlineLaTeX";
import type { Option } from "../types";

export default function DraggableOption({ option }: { option: Option }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: option.id, data: option });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`inline-flex h-10 cursor-grab select-none items-center justify-center rounded-2xl border bg-white px-3 py-1 font-medium shadow-sm transition-all duration-50 hover:border-gray-300 hover:shadow-md active:scale-95 ${
        isDragging
          ? "rotate-2 border-gray-300 opacity-60 shadow-lg"
          : "border-gray-200"
      }`}
    >
      <InlineLaTeX math={option.value} />
    </div>
  );
}
