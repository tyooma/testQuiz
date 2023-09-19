export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Questions = Question[];

export interface WebViewModalProp {
  visible: boolean;
  close: () => void;
  url: string;
}

export interface QuizProp {
  questions: Questions;
  currentQuestion: number;
  selectedOption: string | null;
  handleAnswer: (option: string) => void;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}
