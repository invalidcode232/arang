/*
  Warnings:

  - A unique constraint covering the columns `[answer_id]` on the table `flashcards` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "flashcards_answer_id_key" ON "flashcards"("answer_id");

-- AddForeignKey
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "choices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
