import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import InlineLaTeX from "../app/tombola/InlineLaTeX";

interface Props {
  id: string;
  content: string;
  hidden?: boolean;
}

export default function DraggableOption({ id, content, hidden }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  if (hidden) return null;

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`cursor-grab ${isDragging ? "opacity-50" : ""}`}
    >
      <Card className="m-1 px-2 py-1 text-center">
        <InlineLaTeX math={content} />
      </Card>
    </div>
  );
}
