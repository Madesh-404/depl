const flashcardResponseSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: ["flashcards"],
    },

    title: {
      type: "string",
    },

    cards: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },

          answer: {
            type: "string",
          },
        },

        required: ["question", "answer"],
      },
    },
  },

  required: ["type", "title", "cards"],
};

const quizResponseSchema = {
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: ["quiz"],
    },

    title: {
      type: "string",
    },

    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: {
            type: "string",
          },

          options: {
            type: "array",
            items: {
              type: "string",
            },
          },

          correctAnswer: {
            type: "string",
          },
        },

        required: [
          "question",
          "options",
          "correctAnswer",
        ],
      },
    },
  },

  required: [
    "type",
    "title",
    "questions",
  ],
};

export function getResponseSchema(mode) {
  if (mode === "flashcards") {
    return flashcardResponseSchema;
  }

  return quizResponseSchema;
}

export function buildPrompt({ prompt, mode }) {
  if (mode === "flashcards") {
    return `
You are a study-content generator.

Create a set of useful flashcards based on the user's topic.

Requirements:
- Generate 5 to 10 flashcards.
- Questions should test understanding.
- Answers should be concise and accurate.
- Do not include markdown.
- Return only JSON matching the provided schema.

User topic:
${prompt}
`;
  }

  return `
You are a study-content generator.

Create a multiple-choice quiz based on the user's topic.

Requirements:
- Generate 5 to 10 questions.
- Every question must have exactly 4 options.
- There must be exactly one correct answer.
- correctAnswer must exactly match one of the options.
- Questions should test understanding.
- Do not include markdown.
- Return only JSON matching the provided schema.

User topic:
${prompt}
`;
}