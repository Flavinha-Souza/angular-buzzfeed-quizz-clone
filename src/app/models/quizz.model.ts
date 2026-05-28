export interface Option {
  id: number;
  name: string;
  alias: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface Quizz {
  title: string;
  questions: Question[];
  results: {
    [key: string]: string;
  };
}