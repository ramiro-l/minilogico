import { useDraggable, useDroppable } from "@dnd-kit/core";
import InlineLaTeX from "../../../components/InlineLaTeX";

interface Props {
  id: string;
  value: string;
}

export default function DroppableBlank({ id, value }: Props) {
  const { isOver, setNodeRef: setDroppableRef } = useDroppable({ id });

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: `blank-${id}`,
    data: { value, blankId: id },
    disabled: !value,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  // Combinar refs
  const setNodeRef = (node: HTMLElement | null) => {
    setDroppableRef(node);
    setDraggableRef(node);
  };

  return (
    <div className="relative inline-block">
      {isDragging && (
        <div
          className={`-mb-3.5 absolute mx-1 mt-4 inline-flex h-10 min-w-20 items-center justify-center rounded-2xl border-2 border-gray-300 border-dashed bg-gray-50 px-3 py-1 font-medium opacity-50 shadow-sm transition-all duration-50 hover:border-gray-400`}
        >
          {value && <InlineLaTeX math={value} />}
        </div>
      )}
      <div
        ref={setNodeRef}
        style={style}
        {...(value ? { ...attributes, ...listeners } : {})}
        className={`-mb-3.5 mx-1 mt-4 inline-flex h-10 min-w-20 items-center justify-center rounded-2xl border-2 bg-white px-3 py-1 font-medium shadow-sm transition-all duration-50 ${
          isOver
            ? "border-blue-400 bg-blue-50 shadow-md"
            : value && !isDragging
              ? `border-gray-200 hover:border-gray-300 hover:shadow-md`
              : "border-gray-300 border-dashed bg-gray-50 hover:border-gray-400"
        } ${isDragging ? "rotate-2 cursor-grabbing opacity-50" : "cursor-grab"}`}
      >
        {value && <InlineLaTeX math={value} />}
      </div>
    </div>
  );
}
