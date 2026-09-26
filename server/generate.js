import { GoogleGenAI } from "@google/genai";

import {
  buildPrompt,
  getResponseSchema,
} from "./prompt.js";

import { validateStudyResult } from "./validate.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateStudySet({ prompt, mode }) {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",

    contents: buildPrompt({
      prompt,
      mode,
    }),

    config: {
      responseMimeType: "application/json",
      responseSchema: getResponseSchema(mode),
    },
  });

  const rawText = response.text;

  if (!rawText || !rawText.trim()) {
    throw new Error("EMPTY_AI_RESPONSE");
  }

  let parsedData;

  try {
    parsedData = JSON.parse(rawText);
  } catch {
    throw new Error("MALFORMED_AI_JSON");
  }

  const validation = validateStudyResult(
    parsedData,
    mode
  );

  if (!validation.valid) {
    throw new Error("INVALID_AI_RESPONSE");
  }

  return validation.data;
}