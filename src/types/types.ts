interface ChoiceData {
  text: string;
  isCorrect: boolean;
}

interface FlashcardFormData {
  question: string;
  choices: ChoiceData[];
}

export type { ChoiceData, FlashcardFormData };
