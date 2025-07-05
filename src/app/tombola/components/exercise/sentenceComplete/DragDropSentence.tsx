"use client";

import InlineLaTeX from "@/components/InlineLaTeX";
import type { SentenceComplete } from "../../../types";
import ItemBlank from "./ItemBlank";

interface Props {
  sentence: SentenceComplete["sentence"];
}

export default function DragDropSentence({ sentence }: Props) {
  return (
    <div className="leading-11">
      {sentence.map((s, idx) => {
        return typeof s === "string" ? (
          <span key={idx + s} className="inline">
            <InlineLaTeX math={s} />
            {idx < sentence.length - 1 && " "}
          </span>
        ) : (
          <span key={s.id} className="inline">
            <ItemBlank id={s.id} userResponse={s.userResponse} />
            {idx < sentence.length - 1 && " "}
          </span>
        );
      })}
    </div>
  );
}
