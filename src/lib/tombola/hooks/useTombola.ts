import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { useSentenceComplete } from "@/lib/tombola/hooks/useSentenceComplete";

import { loadRandomSentenceComplete } from "@/lib/tombola/parser/loadRandomSentenceComplete";

import type { SentenceComplete } from "@/lib/tombola/types/tombolaExercise";

export const MIN_EXERCISES = 1;
export const MAX_EXERCISES = 100;
export const MAX_EXERCISES_DEFAULT = 5;

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
  usedExerciseIndices: number[];
  hasHydrated: boolean;
  init: () => void;
  advance: () => void;
  setLimitExercises: (limit: number) => void;
  setDifficulty: (difficulty: Difficulty) => void;
}

export const useTombola = create<Hook>()(
  persist(
    (set, get) => ({
      limitExercises: MAX_EXERCISES_DEFAULT,
      difficulty: "medium" as Difficulty,
      completedExercises: 1,
      history: [],
      status: "idle",
      usedExerciseIndices: [],
      hasHydrated: false,

      init: () => {
        set({
          completedExercises: 1,
          history: [],
          usedExerciseIndices: [],
          status: "playing",
        });
        const { difficulty, usedExerciseIndices } = get();
        const { exercise, exerciseIndex } = loadRandomSentenceComplete(
          difficulty,
          usedExerciseIndices
        );
        useSentenceComplete.getState().init(exercise);

        set((state) => ({
          usedExerciseIndices: [...state.usedExerciseIndices, exerciseIndex],
        }));
      },

      advance: () => {
        const { getInfo, init } = useSentenceComplete.getState();
        const {
          completedExercises,
          limitExercises,
          difficulty,
          usedExerciseIndices,
        } = get();

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
          const { exercise, exerciseIndex } = loadRandomSentenceComplete(
            difficulty,
            usedExerciseIndices
          );
          init(exercise);

          set((state) => ({
            usedExerciseIndices: [...state.usedExerciseIndices, exerciseIndex],
          }));
        }
      },

      setLimitExercises: (limit: number) => {
        if (MIN_EXERCISES <= limit && limit <= MAX_EXERCISES) {
          set({ limitExercises: limit });
        }
      },

      setDifficulty: (difficulty: Difficulty) => set({ difficulty }),
    }),
    {
      name: "tombola-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
