import prisma from "@/lib/prisma";
import { Difficulty } from "@/lib/utils";

export async function POST(req: Request) {
  const { isCorrect, flashcardId, difficulty } = await req.json();

  const nextDate = new Date();
  if (isCorrect) {
    if (difficulty === 0) {
      nextDate.setDate(nextDate.getDate() + 3);
    } else if (difficulty === 1) {
      nextDate.setDate(nextDate.getDate() + 1);
    } else if (difficulty === 2) {
      nextDate.setHours(nextDate.getHours() + 6);
    }
  } else {
    nextDate.setDate(nextDate.getDate() + 1);
  }

  console.log(nextDate);

  const flashcard = await prisma.flashcard.update({
    where: {
      id: flashcardId,
    },
    data: {
      next_date: nextDate,
    },
  });

  return new Response(JSON.stringify(flashcard));
}
