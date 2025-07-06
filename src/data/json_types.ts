// Tipos para la nueva estructura de ejercicios

export interface AnswerOption {
  correct: string;
  distractors: string[];
}

export type SentenceSegment = string | AnswerOption;

export interface ExerciseDefinition {
  labels: string[];
  title: string;
  sentence: SentenceSegment[];
}

export interface ExercisesData {
  materia: string;
  exercises: ExerciseDefinition[];
}
