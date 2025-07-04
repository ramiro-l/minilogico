import { v4 as uuidv4 } from "uuid";
import definition from "../data/ejemplo.json";
import type { SentenceComplete } from "../types";

export function parseJsonToSentenceComplete(): SentenceComplete {
  const { sentence, options } = definition.segments.reduce<{
    sentence: SentenceComplete["sentence"];
    options: SentenceComplete["options"];
  }>(
    (acc, segment) => {
      if (typeof segment === "string") {
        acc.sentence.push(segment);
        return acc;
      }

      const gapId = uuidv4();
      const correctId = uuidv4();

      acc.sentence.push({
        id: gapId,
        correctOption: {
          id: correctId,
          value: segment.correct,
        },
      });

      acc.options.push(
        { id: correctId, value: segment.correct },
        ...segment.distractors.map((d) => ({
          id: uuidv4(),
          value: d,
          selected: false,
        }))
      );

      return acc;
    },
    { sentence: [], options: [] }
  );

  return {
    title: definition.prompt,
    labels: [],
    sentence,
    options,
  };
}
