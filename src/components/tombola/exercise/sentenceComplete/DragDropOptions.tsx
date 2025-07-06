import { useDroppable } from "@dnd-kit/core";

import type { Option } from "@/lib/tombola/types/tombolaExercise";

import { AREA, OPTIONS_AREA_ID } from "./const";
import ItemOption from "./ItemOption";

interface Props {
  options: Option[];
}

export default function DragDropOptions({ options }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: OPTIONS_AREA_ID,
    data: { area: AREA.options },
  });

  return (
    <div
      ref={setNodeRef}
      className={`justify-center-safe mt-5 flex min-h-16 flex-wrap gap-x-4 gap-y-2 rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
        isOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-gray-50"
      }`}
    >
      {options.map((opt) => (
        <ItemOption key={opt.id} option={opt} />
      ))}
    </div>
  );
}
