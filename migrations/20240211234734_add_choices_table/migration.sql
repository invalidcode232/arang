-- CreateTable
CREATE TABLE "choices" (
    "id" TEXT NOT NULL,
    "choice" TEXT NOT NULL,
    "flashcard_id" TEXT NOT NULL,

    CONSTRAINT "choices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "choices_flashcard_id_key" ON "choices"("flashcard_id");

-- AddForeignKey
ALTER TABLE "choices" ADD CONSTRAINT "choices_flashcard_id_fkey" FOREIGN KEY ("flashcard_id") REFERENCES "flashcards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
