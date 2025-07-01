"use client";

import "katex/dist/katex.min.css";
import definition from "../../data/ejemplo.json";
import { useState } from "react";
import type { FillInTheBlankDefinition } from "../../types";
import InlineLaTeX from "./InlineLaTeX";
import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import { Card } from "@/components/ui/card";

function DraggableOption({
  id,
  children,
  hidden,
}: {
  id: string;
  children: React.ReactNode;
  hidden?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  if (hidden) return null;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`cursor-grab ${isDragging ? "opacity-50" : ""}`}
    >
      <Card className="px-2 py-1 m-1 text-center">
        <InlineLaTeX math={id} />
      </Card>
    </div>
  );
}

function DroppableBlank({
  id,
  value,
  onDrop,
  onRemove,
}: {
  id: string;
  value: string;
  onDrop: (blankId: string, option: string) => void;
  onRemove: (blankId: string) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`w-40 h-10 border border-dashed rounded flex items-center justify-center mx-2 relative ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      {value ? (
        <button
          className="text-red-500 absolute -top-2 -right-2 text-xs bg-white rounded-full px-1"
          onClick={() => onRemove(id)}
        >
          X
        </button>
      ) : null}
      {value ? (
        <InlineLaTeX math={value} />
      ) : (
        <span className="text-gray-400">[ ... ]</span>
      )}
    </div>
  );
}

export default function FillExercise() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const data: FillInTheBlankDefinition = definition;

  const handleDrop = (blankId: string, option: string) => {
    const index = parseInt(blankId.replace("blank-", ""));
    setAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const handleRemove = (blankId: string) => {
    const index = parseInt(blankId.replace("blank-", ""));
    setAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[index];
      return newAnswers;
    });
  };

  const usedOptions = new Set(Object.values(answers));

  let blankIndex = 0;
  const allOptions = data.segments
    .filter(
      (s): s is { correct: string; distractors: string[] } =>
        typeof s !== "string"
    )
    .flatMap((s) => [s.correct, ...s.distractors]);
  const uniqueOptions = Array.from(new Set(allOptions)).sort(
    () => Math.random() - 0.5
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && over.id.toString().startsWith("blank-")) {
      handleDrop(over.id.toString(), active.id.toString());
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <main className="p-6">
        <h1 className="mb-4 font-bold text-xl">
          <InlineLaTeX math={data.prompt} />
        </h1>

        <div className="flex flex-wrap gap-2 text-lg leading-relaxed">
          {data.segments.map((segment, idx) => {
            if (typeof segment === "string") {
              return <InlineLaTeX math={segment} key={idx + segment} />;
            } else {
              const currentBlankIndex = blankIndex++;
              return (
                <DroppableBlank
                  key={`blank-${currentBlankIndex}`}
                  id={`blank-${currentBlankIndex}`}
                  value={answers[currentBlankIndex] || ""}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                />
              );
            }
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center">
          {uniqueOptions.map((opt) => (
            <DraggableOption key={opt} id={opt} hidden={usedOptions.has(opt)}>
              <InlineLaTeX math={opt} />
            </DraggableOption>
          ))}
        </div>
      </main>
    </DndContext>
  );
}
