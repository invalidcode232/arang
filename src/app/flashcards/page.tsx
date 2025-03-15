"use client";

import { Button } from "@/components/ui/button";
import Flashcard from "@/components/widgets/flashcard";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const FlashcardPage = () => {
  const { data: flashcard, error, isLoading } = useSWR("/api/flashcards/get");

  const router = useRouter();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      {/* <div className="w-screen">
        <NewFlashcardForm />
      </div> */}

      {flashcard && <Flashcard flashcard={flashcard} />}
      {!flashcard && (
        <div>
          <span>You&apos;ve done all flashcards for today!</span>
          <br />
          <Button onClick={() => router.push("/dashboard")}>
            Go back to flashcards
          </Button>
        </div>
      )}
    </>
  );
};

export default FlashcardPage;
