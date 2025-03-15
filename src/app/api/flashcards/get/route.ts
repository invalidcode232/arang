import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const flashcard = await prisma.flashcard.findFirst({
    include: {
      choices: true,
    },
    where: {
      next_date: {
        lte: new Date(),
      },
    },
    orderBy: {
      next_date: "asc",
    },
  });

  return new Response(JSON.stringify(flashcard));
}
