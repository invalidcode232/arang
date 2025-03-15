require("dotenv").config();

import { AzureOpenAI } from "openai";

const deployment = "gpt-4";
const apiVersion = "2024-02-15-preview";

const OpenAIClient = new AzureOpenAI({
  apiVersion,
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
  deployment,
});

export default OpenAIClient;
