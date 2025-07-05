import { useDraggable, useDroppable } from "@dnd-kit/core";
import InlineLaTeX from "@/components/InlineLaTeX";
import type { Option } from "../../../types";

import { AREA, LOCATION } from "./const";

interface Props {
  id: string;
  userResponse?: Option;
}

export default function ItemBlank({ id, userResponse }: Props) {
  const { isOver, setNodeRef: setDroppableRef } = useDroppable({
    id,
    data: { area: AREA.blank },
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: id,
    data: { userResponse, location: LOCATION.blank },
    disabled: !userResponse?.value,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const setNodeRef = (node: HTMLElement | null) => {
    setDroppableRef(node);
    setDraggableRef(node);
  };

  return (
    <div className="relative inline-block">
      {isDragging && (
        <div
          className={`-mb-3.5 absolute mx-1 mt-1.5 inline-flex h-10 min-w-20 items-center justify-center rounded-2xl border-2 border-gray-300 border-dashed bg-gray-50 px-3 py-1 font-medium opacity-50 shadow-sm transition-all duration-50 hover:border-gray-400`}
        >
          {userResponse?.value && <InlineLaTeX math={userResponse?.value} />}
        </div>
      )}
      <div
        ref={setNodeRef}
        style={style}
        {...(userResponse?.value ? { ...attributes, ...listeners } : {})}
        className={`-mb-3.5 mx-1 inline-flex h-10 min-w-20 items-center justify-center rounded-2xl border-2 px-3 py-1 font-medium shadow-sm transition-all duration-50 ${
          isOver
            ? "z-0 border-blue-400 border-dashed bg-blue-50 shadow-md"
            : userResponse?.value && !isDragging
              ? `border-gray-200 hover:border-gray-300 hover:shadow-md`
              : "border-gray-300 border-dashed bg-gray-50 hover:border-gray-400"
        } ${isDragging ? "rotate-2 cursor-grabbing opacity-50" : "cursor-grab"}`}
      >
        {userResponse?.value && <InlineLaTeX math={userResponse?.value} />}
      </div>
    </div>
  );
}
