import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const flashcard = await prisma.flashcard.findMany({
    include: {
      choices: true,
    },
    orderBy: {
      next_date: "asc",
    },
  });

  return new Response(JSON.stringify(flashcard));
}
