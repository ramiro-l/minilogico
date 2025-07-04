type UUID = string;

export interface Option {
  id: UUID;
  value: string;
}

export interface Blank {
  id: UUID;
  correctOption: Option;
  userResponse?: Option;
}

export interface SentenceComplete {
  title: string;
  labels: string[];
  sentence: (string | Blank)[];
  options: Option[];
}
