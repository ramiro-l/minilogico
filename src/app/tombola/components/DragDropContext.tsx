"use client";

import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { Option } from "../types";

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

    // Si es una opción siendo arrastrada a un blank
    if (
      active.data.current?.value &&
      !active.data.current?.blankId &&
      over.id !== "options-zone"
    ) {
      handleDragCompletion(over.id as string, {
        id: active.id.toString(),
        value: active.data.current?.value,
      });
    }
    // Si es un blank lleno siendo arrastrado a la zona de opciones
    else if (active.data.current?.blankId && over.id === "options-zone") {
      handleRemoveAnswer(active.data.current.blankId);
    }
    // Si es un blank lleno siendo arrastrado a otro blank
    else if (active.data.current?.blankId && over.id !== "options-zone") {
      const sourceBlankId = active.data.current.blankId;
      const targetBlankId = over.id as string;

      if (sourceBlankId !== targetBlankId) {
        // Mover respuesta de un blank a otro
        handleRemoveAnswer(sourceBlankId);
        handleDragCompletion(targetBlankId, {
          id: active.id.toString().replace("blank-", ""),
          value: active.data.current.value,
        });
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
}
