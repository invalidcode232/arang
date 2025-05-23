"use client";

import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useSWRConfig } from "swr";
import { useState } from "react";
import z from "zod";
import { AIResponse, AIResponseSchema } from "@/types/schema";
import Link from "next/link";

type Inputs = {
  text: string;
};

enum LoadingState {
  NotStarted,
  Loading,
  Loaded,
}

const ConverterPage = () => {
  const { fetcher } = useSWRConfig();

  const [createdFlashcards, updateCreatedFlashcards] = useState<AIResponse>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.NotStarted,
  );

  const form = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (fetcher === undefined) return;

    setLoadingState(LoadingState.Loading);

    const res = await fetcher("api/converter/convert", data);
    // console.log(res);

    let createdFlashcards: AIResponse = [];
    createdFlashcards = res;
    // TODO; Fix this shit later
    // try {
    //   createdFlashcards = AIResponseSchema.parse(data);
    // } catch (e) {
    //   console.error("Failed to parse AI Response");
    // }

    // console.log("Parse is SUCCESS");

    setLoadingState(LoadingState.Loaded);
    updateCreatedFlashcards(createdFlashcards);
    // console.log(createdFlashcards);
    // console.log(createdFlashcards.length);
  };

  return (
    <div>
      <h1 className="text-4xl dark:text-white text-center font-bold mb-2">
        Converter
      </h1>

      <p className="dark:text-slate-400 text-center my-4 text-xl">
        Convert PDFs, Images, and Audio files to flashcards.
      </p>

      <div className="flex justify-center items-center mb-8">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Textarea
            {...form.register("text")}
            className="rounded-md w-[70vw] h-[30vh] my-8 dark:text-slate-200"
          />

          {/* <div className="w-screen flex justify-center"> */}
          <div className="flex justify-center">
            <Button type="submit" className="bg-blue-400">
              Convert!
            </Button>
          </div>
          {/* </div> */}
        </form>
      </div>
      {/* <p className="dark:text-slate-400 text-center my-2 text-xs">
        Accepted file types: PDF, PNG, JPEG, MP3, WAV
      </p> */}

      <div className="min-w-full">
        {loadingState == LoadingState.Loading && (
          <div className="flex justify-center my-4">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}

        {createdFlashcards.length > 0 && (
          <>
            <div className="flex justify-center">
              <h1 className="text-2xl dark:text-white my-4 font-bold">
                Generated {createdFlashcards.length} flashcards!
              </h1>
            </div>
            <div className="flex justify-center align-center text-center dark:text-slate-400">
              <div className="grid grid-cols-3 gap-4">
                {createdFlashcards.map((flashcard, i) => (
                  <div
                    key={i}
                    className="rounded-md dark:bg-slate-700 bg-slate-200 dark:text-white text-xl p-5"
                  >
                    {flashcard.question}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center my-4">
              <Link href="/dashboard">
                <Button type="button">Go Back</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConverterPage;
