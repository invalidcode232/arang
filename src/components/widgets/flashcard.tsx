"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RadioGroup } from "@/components/ui/radio-group";
import RadioChoice from "./radiochoice";
import { Button } from "../ui/button";
import { Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form, FormField } from "@/components/ui/form";
import useSWR from "swr";
import { Difficulty } from "@/lib/utils";

type FlashcardWithChoices = Prisma.FlashcardGetPayload<{
  include: {
    choices: true;
  };
}>;

const Flashcard = ({ flashcard }: { flashcard: FlashcardWithChoices }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [shouldUpdateDate, setShouldUpdateDate] = useState(false);
  const [isChoiceCorrect, setIsChoiceCorrect] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);

  const form = useForm();

  const {
    data: updateDateRes,
    error: updateDateErr,
    isLoading: updateDateLoading,
  } = useSWR(shouldUpdateDate ? `/api/flashcards/answer` : null, (url) =>
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        flashcardId: flashcard.id,
        difficulty: difficulty,
        isCorrect: isChoiceCorrect,
      }),
    }).then((res) => {
      setShouldUpdateDate(false);
      location.reload();
      return res.json();
    }),
  );

  const onFlashcardComplete = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
    setShouldUpdateDate(true);
  };

  const onSubmit = (data: any) => {
    // console.log(data);
    const choiceData = JSON.parse(data.choice);
    setIsChoiceCorrect(choiceData.isCorrect);
    setShowAnswer(true);
  };

  return (
    <Card className="w-screen md:w-5/6 md:px-8 lg:px-12">
      <CardHeader>
        <CardTitle className="text-2xl lg:text-4xl">
          {flashcard.question}
        </CardTitle>
        {/* <CardDescription className="lg:text-md md:text-sm">
          Math - Basics
        </CardDescription> */}
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="choice"
              render={({ field }) => {
                return (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {flashcard.choices.map((choice) => (
                      <RadioChoice
                        key={choice.id}
                        value={JSON.stringify({
                          id: choice.id,
                          isCorrect: choice.is_correct,
                        })}
                        id={choice.id}
                        label={choice.choice}
                      />
                    ))}
                  </RadioGroup>
                );
              }}
            />
            {!showAnswer && (
              <Button
                // onClick={() => setShowAnswer(!showAnswer)}
                type="submit"
                className="mt-4 w-full bg-blue-500 py-3 hover:bg-blue-600"
              >
                Show Answer
              </Button>
            )}
          </form>
        </Form>

        {showAnswer && (
          <div>
            {flashcard.choices.map(
              (choice) =>
                choice.is_correct && (
                  <p
                    key={choice.id}
                    className={`my-4 ${isChoiceCorrect ? "text-green-500" : "text-red-500"}`}
                  >
                    {isChoiceCorrect ? "Your answer is correct!" : `Incorrect.`}
                  </p>
                ),
            )}

            {!isChoiceCorrect && (
              <Button
                className="bg-blue-500"
                onClick={() => setShowAnswer(false)}
              >
                Try again
              </Button>
            )}

            {isChoiceCorrect && (
              <>
                <Button
                  className="mb-2 w-full bg-green-500 py-3 hover:bg-green-600"
                  onClick={() => onFlashcardComplete(Difficulty.EASY)}
                >
                  Easy (+3 days)
                </Button>

                <Button
                  className="mb-2 w-full bg-yellow-500 py-3 hover:bg-yellow-600"
                  onClick={() => onFlashcardComplete(Difficulty.MEDIUM)}
                >
                  Had to think.. (+1 days)
                </Button>

                <Button
                  className="mb-2 w-full bg-red-500 py-3 hover:bg-red-600"
                  onClick={() => onFlashcardComplete(Difficulty.HARD)}
                >
                  Hard (+6 hour)
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Flashcard;
