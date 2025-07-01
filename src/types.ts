export type AnswerOption = {
  correct: string;
  distractors: string[];
};

export type FillInSegment = string | AnswerOption;

export interface FillInTheBlankDefinition {
  prompt: string;
  segments: FillInSegment[];
}
