"use client";

import InlineLaTeX from "@/components/InlineLaTeX";
import type { SentenceComplete } from "../types";
import DroppableBlank from "./DroppableBlank";

interface Props {
  sentence: SentenceComplete["sentence"];
}

export default function DragDropSentence({ sentence }: Props) {
  return (
    <div className="text-lg">
      {sentence.map((s, idx) => {
        return typeof s === "string" ? (
          <span key={idx + s} className="inline">
            <InlineLaTeX math={s} />
            {idx < sentence.length - 1 && " "}
          </span>
        ) : (
          <span key={s.id} className="inline">
            <DroppableBlank id={s.id} value={s.userResponse?.value || ""} />
            {idx < sentence.length - 1 && " "}
          </span>
        );
      })}
    </div>
  );
}
