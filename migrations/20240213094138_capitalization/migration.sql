/*
  Warnings:

  - You are about to drop the `choices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `flashcards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "choices" DROP CONSTRAINT "choices_flashcard_id_fkey";

-- DropTable
DROP TABLE "choices";

-- DropTable
DROP TABLE "flashcards";

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "next_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Choices" (
    "id" TEXT NOT NULL,
    "choice" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "flashcard_id" TEXT NOT NULL,

    CONSTRAINT "Choices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Choices" ADD CONSTRAINT "Choices_flashcard_id_fkey" FOREIGN KEY ("flashcard_id") REFERENCES "Flashcard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
