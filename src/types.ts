type AnswerOption = {
  correct: string;
  distractors: string[];
};

type FillInSegment = string | AnswerOption;

export interface FillInTheBlankDefinition {
  prompt: string;
  segments: FillInSegment[];
}
