// Tipos para la nueva estructura de ejercicios

export interface AnswerOption {
  correct: string;
  distractors: string[];
}

export type SentenceSegment = string | AnswerOption;

export interface ExerciseDefinition {
  materia: string;
  labels: string[];
  title: string;
  sentence: SentenceSegment[];
}

// Tipos para compatibilidad con el sistema anterior
export interface FillInSegment {
  correct?: string;
  distractors?: string[];
}

export interface FillInTheBlankDefinition {
  prompt: string;
  segments: (string | AnswerOption)[];
}
