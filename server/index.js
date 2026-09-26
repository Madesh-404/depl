import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { generateStudySet } from "./generate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.GEMINI_API_KEY) {
  console.error(
    "GEMINI_API_KEY is missing from .env"
  );

  process.exit(1);
}

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

const distPath = path.join(__dirname, "..", "dist");

app.use(express.static(distPath));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.post("/api/generate", async (req, res) => {
  const { prompt, mode } = req.body;

  if (
    typeof prompt !== "string" ||
    !prompt.trim()
  ) {
    return res.status(400).json({
      error: "Please provide a study topic.",
    });
  }

  if (!["flashcards", "quiz"].includes(mode)) {
    return res.status(400).json({
      error: "Invalid study mode.",
    });
  }

  try {
    const result = await generateStudySet({
      prompt: prompt.trim(),
      mode,
    });

    return res.json(result);
  } catch (error) {
    console.error("Generation error:", error);

    switch (error.message) {
      case "EMPTY_AI_RESPONSE":
        return res.status(502).json({
          error: "The AI returned an empty response.",
        });

      case "MALFORMED_AI_JSON":
        return res.status(502).json({
          error: "The AI returned invalid data.",
        });

      case "INVALID_AI_RESPONSE":
        return res.status(502).json({
          error:
            "The AI returned data in an unexpected format.",
        });

      default:
        return res.status(502).json({
          error:
            "Unable to generate your study set right now.",
        });
    }
  }
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});