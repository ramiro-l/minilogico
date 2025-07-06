"use client";

import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";

import type { Option } from "@/lib/tombola/types/tombolaExercise";

import { AREA, LOCATION } from "./const";

interface Props {
  handleDragCompletion: (segmentId: string, option: Option) => void;
  handleRemoveAnswer: (segmentId: string) => void;
  children?: React.ReactNode;
}

export default function DragDropContext({
  handleDragCompletion,
  handleRemoveAnswer,
  children,
}: Props) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (!over || !active) return;

    const dropArea = over.data.current?.area;
    const draggedItemLocation = active.data.current?.location;

    if (dropArea === AREA.options) {
      if (draggedItemLocation === LOCATION.options) {
        return;
      }

      if (draggedItemLocation === LOCATION.blank) {
        handleRemoveAnswer(active.id.toString());
        return;
      }
    } else if (dropArea === AREA.blank) {
      if (draggedItemLocation === LOCATION.options) {
        handleDragCompletion(over.id.toString(), active.data.current?.option);
        return;
      }

      if (draggedItemLocation === LOCATION.blank) {
        handleRemoveAnswer(active.id.toString());
        handleDragCompletion(
          over.id.toString(),
          active.data.current?.userResponse
        );
        return;
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
}
