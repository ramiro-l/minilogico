export interface Option {
  id: string;
  value: string;
}

export interface Blank {
  id: string;
  correctOption: Option;
  userResponse?: Option;
}

export interface SentenceComplete {
  title: string;
  labels: string[];
  sentence: (string | Blank)[];
  options: Option[];
}

// ==================================================================

export type ExerciseHook<T> = T & {
  init: (data: T) => void;
  getInfo: () => T;
};
