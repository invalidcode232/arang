import z from "zod";

const AnswerSchema = z.object({
  text: z.string(),
  isCorrect: z.boolean(),
});

const QuestionSchema = z.object({
  question: z.string(),
  choices: z.array(AnswerSchema).optional(),
  next_date: z.date().optional(),
  id: z.string().optional(),
});

const AIResponseSchema = z.array(QuestionSchema);

type Answer = z.infer<typeof AnswerSchema>;
type Question = z.infer<typeof QuestionSchema>;
type AIResponse = z.infer<typeof AIResponseSchema>;

export { AIResponseSchema, QuestionSchema, AnswerSchema };
export type { Answer, Question, AIResponse };
