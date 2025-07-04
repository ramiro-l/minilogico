import { create } from "zustand";
import type { Blank, Option, SentenceComplete } from "../types";

interface Hook extends SentenceComplete {
  initSentenceComplete: (data: SentenceComplete) => void;
  reset: () => void;

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

  initSentenceComplete: (data) => {
    set({
      title: data.title,
      labels: data.labels,
      sentence: data.sentence,
      options: data.options,
    });
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

  reset: () =>
    set({
      title: "",
      labels: [],
      sentence: [],
      options: [],
    }),
}));
