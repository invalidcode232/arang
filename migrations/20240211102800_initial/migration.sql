-- CreateTable
CREATE TABLE "flashcards" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "choice_ids" TEXT[],
    "answer_id" TEXT NOT NULL,
    "next_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flashcards_pkey" PRIMARY KEY ("id")
);
