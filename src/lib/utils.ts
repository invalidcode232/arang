import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Difficulty {
  EASY = 0,
  MEDIUM = 1,
  HARD = 2,
}
