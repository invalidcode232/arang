"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";

// const fetcher = (url) => fetch(url).then((r) => r.json());

const fetcher = async (url: string, data: object) => {
  const options: RequestInit = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    credentials: "same-origin",
  };
  if (data) {
    options.method = "POST";
    options.body = JSON.stringify(data);
  }
  return fetch(url, options).then((res) => {
    if (!res.ok) {
      // global error handling
    }
    return res.json();
  });
};

export const SWRProvider = ({ children }: { children: ReactNode }) => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
