"use client";
import { RadioGroupItem } from "../ui/radio-group";
import { FormControl, FormLabel } from "../ui/form";

type ChoiceData = {
  id: string;
  value: string;
  label: string;
};

const RadioChoice = ({ id, label, value }: ChoiceData) => {
  return (
    <>
      <FormControl>
        <RadioGroupItem value={value} id={id} />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor={id}>{label}</FormLabel>
      </FormControl>
    </>
  );
};

export default RadioChoice;
