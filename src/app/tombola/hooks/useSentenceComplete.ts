import { create } from "zustand";
import type { Blank, ExerciseHook, Option, SentenceComplete } from "../types";

interface Hook extends ExerciseHook<SentenceComplete> {
  setAnswer: (segmentId: string, response: Option) => void;
  removeAnswer: (segmentId: string) => void;

  // Private methods
  getBlank: (segmentId: string) => Blank | undefined;
  updateBlank: (segmentId: string, userResponse: Option | undefined) => void;
  addOption: (option: Option) => void;
  removeOption: (optionId: string) => void;
}

export const useSentenceComplete = create<Hook>((set, _get) => ({
  title: "",
  labels: [],
  sentence: [],
  options: [],

  init: (data) => {
    set({
      title: data.title,
      labels: data.labels,
      sentence: data.sentence,
      options: data.options,
    });
  },

  getInfo() {
    const state = _get();
    return {
      title: state.title,
      labels: state.labels,
      sentence: state.sentence,
      options: state.options,
    };
  },

  setAnswer: (segmentId: string, response: Option) => {
    const { getBlank, updateBlank, addOption, removeOption } = _get();
    const existingBlank = getBlank(segmentId);
    if (existingBlank?.userResponse) {
      addOption(existingBlank.userResponse);
    }

    updateBlank(segmentId, response);
    removeOption(response.id);
  },

  removeAnswer: (segmentId: string) => {
    const { getBlank, updateBlank, addOption } = _get();
    const oldBlank = getBlank(segmentId);
    if (oldBlank?.userResponse) {
      updateBlank(segmentId, undefined);
      addOption(oldBlank.userResponse);
    }
  },

  getBlank: (segmentId) => {
    const state = _get();
    return state.sentence.find(
      (segment): segment is Blank =>
        typeof segment !== "string" && segment.id === segmentId
    );
  },

  updateBlank: (segmentId, userResponse) => {
    set((state) => {
      const newSentence = state.sentence.map((segment) => {
        if (typeof segment === "string") return segment;
        if (segment.id === segmentId) {
          return { ...segment, userResponse };
        }
        return segment;
      });

      return { sentence: newSentence };
    });
  },

  addOption: (option) => {
    set((state) => ({
      options: [...state.options, option],
    }));
  },

  removeOption: (optionId) => {
    set((state) => ({
      options: state.options.filter((opt) => opt.id !== optionId),
    }));
  },
}));
