/*
  Warnings:

  - You are about to drop the column `answer_id` on the `flashcards` table. All the data in the column will be lost.
  - Added the required column `is_correct` to the `choices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "flashcards" DROP CONSTRAINT "flashcards_answer_id_fkey";

-- DropIndex
DROP INDEX "flashcards_answer_id_key";

-- AlterTable
ALTER TABLE "choices" ADD COLUMN     "is_correct" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "flashcards" DROP COLUMN "answer_id";
