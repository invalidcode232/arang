import OpenAIClient from "@/lib/openai";
import { ChatCompletion } from "openai/resources/index.mjs";
import prisma from "@/lib/prisma";
import { AIResponseSchema } from "@/types/schema";

const OPENAI_PROMPT = `
  You are given an article, which then you will questions based on it, give multiple choice answer choices, and also state whether the choice is true/false, output in JSON format.
  Example output:
  [{"question":"What's 1+1?","choices":[{"text":"2","isCorrect":true}]}]
  `;

const get_response = (res: ChatCompletion) => {
  return res.choices[0].message.content;
};

export async function POST(req: Request) {
  const { text } = await req.json();

  const res = await OpenAIClient.chat.completions.create({
    model: "",
    messages: [
      { role: "system", content: OPENAI_PROMPT },
      { role: "user", content: text },
    ],
  });

  const msg = get_response(res);
  if (!msg)
    return new Response(
      JSON.stringify({ error: "Failed to get response from OpenAI." }),
    );

  let flashcardData = [];

  try {
    flashcardData = AIResponseSchema.parse(JSON.parse(msg));
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Failed to parse response from OpenAI." }),
    );
  }

  if (!flashcardData.every((data) => data.question && data.choices?.length)) {
    return new Response(
      JSON.stringify({ error: "Question and choices are required" }),
    );
  }

  let createdFlashcards = [];
  try {
    for (let index in flashcardData) {
      const flashcard = flashcardData[index];

      const createdFlashcard = await prisma.flashcard.create({
        data: {
          question: flashcard.question,
          next_date: new Date(),
          choices: {
            create: flashcard.choices?.map((choice) => ({
              choice: choice.text,
              is_correct: choice.isCorrect === false ? false : true,
            })),
          },
        },
      });

      createdFlashcards.push(createdFlashcard);
    }

    return new Response(JSON.stringify(createdFlashcards));
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Failed to create flashcards" }),
    );
  }
}
