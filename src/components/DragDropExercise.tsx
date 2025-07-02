"use client";

import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import DraggableOption from "./DraggableOption";
import { useFillExercise } from "../hooks/useFillExercise";
import DroppableBlank from "./DroppableBlank";
import InlineLaTeX from "../app/tombola/InlineLaTeX";
import type { FillInTheBlankDefinition } from "../types";

interface DragDropExerciseProps {
  data: FillInTheBlankDefinition;
}

export default function DragDropExercise({ data }: DragDropExerciseProps) {
  const { answers, usedOptions, allOptions, handleDrop, handleRemove } =
    useFillExercise(data);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && active) handleDrop(over.id as number, active.id.toString());
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-wrap gap-2 text-lg leading-relaxed">
        {data.segments.map((segment, idx) => {
          return typeof segment === "string" ? (
            <InlineLaTeX math={segment} key={idx + segment} />
          ) : (
            <DroppableBlank
              key={idx}
              id={idx}
              value={answers[idx] || ""}
              onRemove={handleRemove}
            />
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap justify-center">
        {allOptions.map((opt, idx) => (
          <DraggableOption
            key={idx + opt}
            id={idx + opt}
            hidden={usedOptions.has(idx + opt)}
            content={opt}
          />
        ))}
      </div>
    </DndContext>
  );
}
