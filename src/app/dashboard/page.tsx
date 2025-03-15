"use client";

import useSWR, { useSWRConfig } from "swr";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import NewFlashcardForm from "@/components/widgets/newflashcardform";
import FlashcardOverview from "@/components/widgets/flashcardoverview";
import { useRouter } from "next/navigation";

const FlashcardPage = () => {
  const {
    data: flashcards,
    error,
    isLoading,
  } = useSWR("/api/flashcards/get/all");

  const router = useRouter();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="mb-5 flex justify-between">
        <span className="text-2xl font-semibold dark:text-slate-200">
          Flashcards
        </span>
        <div>
          <Button
            className="mr-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-300 dark:text-black dark:hover:bg-blue-400"
            onClick={() => router.replace("/flashcards")}
          >
            Do flashcards
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                New Flashcard..
              </Button>
            </DialogTrigger>
            <DialogContent className="py-6 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add a new flashcard</DialogTitle>
                <DialogDescription>
                  Fill in the form below to add a new flashcard
                </DialogDescription>
              </DialogHeader>
              <NewFlashcardForm />
              {/* <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {flashcards.map((flashcard: any, index) => (
          <FlashcardOverview key={index} flashcard={flashcard} />
        ))}
      </div>
    </>
  );
};

export default FlashcardPage;
