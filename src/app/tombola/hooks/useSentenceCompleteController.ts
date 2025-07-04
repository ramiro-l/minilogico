// controllers/SentenceCompletionController.ts

import { useEffect, useState } from "react";
import type { Option } from "../types";
import { parseJsonToSentenceComplete } from "../utils/parseJsonToSentenceComplete";
import { useSentenceComplete } from "./useSentenceComplete";

type Status = "idle" | "playing" | "finished";

export const useSentenceCompleteController = () => {
  const [status, setStatus] = useState<Status>("idle");

  const {
    getBlank,
    updateBlank,
    addOption,
    removeOption,
    initSentenceComplete,
  } = useSentenceComplete();

  const setAnswer = (segmentId: string, response: Option) => {
    const existingBlank = getBlank(segmentId);
    if (existingBlank?.userResponse) {
      addOption(existingBlank.userResponse);
    }

    updateBlank(segmentId, response);
    removeOption(response.id);
  };

  const removeAnswer = (segmentId: string) => {
    const oldBlank = getBlank(segmentId);
    if (oldBlank?.userResponse) {
      updateBlank(segmentId, undefined);
      addOption(oldBlank.userResponse);
    }
  };

  const start = () => {
    setStatus("playing");
    const newSentenceComplete = selectRandomSentenceComplete();
    initSentenceComplete(newSentenceComplete);
  };

  const advance = () => {
    // TODO: ...
  };

  const selectRandomSentenceComplete = () => {
    //TODO: Implement logic to select a random sentence complete
    return parseJsonToSentenceComplete();
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <-- This effect runs only once on mount -->
  useEffect(() => {
    if (status === "idle") {
      start();
    }
  }, [status]);

  return {
    status,
    start,
    advance,
    setAnswer,
    removeAnswer,
  };
};
