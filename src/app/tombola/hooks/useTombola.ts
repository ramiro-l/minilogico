import { create } from "zustand";
import type { SentenceComplete } from "../types";
import { loadRandomSentenceComplete } from "../utils/loadRandomSentenceComplete";
import { useSentenceComplete } from "./useSentenceComplete";

export const MIN_EXERCISES = 1;
export const MAX_EXERCISES = 100;
export const MAX_EXERCISES_DEFAULT = 10;

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTY_CONFIG = {
  easy: {
    label: "Fácil",
    maxOptions: 3,
    maxBlanks: 1,
  },
  medium: {
    label: "Medio",
    maxOptions: 3,
    maxBlanks: 2,
  },
  hard: {
    label: "Difícil",
    maxOptions: Infinity,
    maxBlanks: Infinity,
  },
} as const;

interface Hook {
  completedExercises: number;
  limitExercises: number;
  difficulty: Difficulty;
  history: SentenceComplete[];
  status: "idle" | "playing" | "finished";
  init: () => void;
  advance: () => void;
  reset: () => void;
  setLimitExercises: (limit: number) => void;
  setDifficulty: (difficulty: Difficulty) => void;
}

export const useTombola = create<Hook>((set, get) => ({
  limitExercises: MAX_EXERCISES_DEFAULT,
  difficulty: "medium" as Difficulty,
  completedExercises: 1,
  history: [],
  status: "idle",

  init: () => {
    set({
      completedExercises: 1,
      history: [],
      status: "playing",
    });
    const { difficulty } = get();
    useSentenceComplete.getState().init(loadRandomSentenceComplete(difficulty));
  },

  advance: () => {
    const { getInfo, init } = useSentenceComplete.getState();
    const { completedExercises, limitExercises, difficulty } = get();

    set((state) => ({
      history: [...state.history, { ...getInfo() }],
      completedExercises: state.completedExercises + 1,
    }));

    if (completedExercises === limitExercises) {
      set({ status: "finished" });
    } else {
      set(() => ({
        status: "playing",
      }));
      init(loadRandomSentenceComplete(difficulty));
    }
  },

  reset: () => set({ completedExercises: 1, history: [], status: "idle" }),

  setLimitExercises: (limit: number) => {
    if (MIN_EXERCISES <= limit && limit <= MAX_EXERCISES) {
      set({ limitExercises: limit });
    }
  },

  setDifficulty: (difficulty: Difficulty) => set({ difficulty }),
}));
