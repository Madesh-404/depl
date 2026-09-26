import PromptInput from "./components/PromptInput/PromptInput";
import StudyModeSelector from "./components/StudyModeSelector/StudyModeSelector";
import FlashcardDeck from "./components/FlashcardDeck/FlashcardDeck";
import Quiz from "./components/Quiz/Quiz";
import ScoreCard from "./components/ScoreCard/ScoreCard";
import LoadingState from "./components/LoadingState/LoadingState";
import ErrorState from "./components/ErrorState/ErrorState";
import { useEffect, useRef, useState } from "react";
import { generateStudySet } from "./lib/api";
import { validateStudyResult } from "./lib/validateResult";

import "./App.css";

function App() {
  const requestControllerRef = useRef(null);
  const requestIdRef = useRef(0);

  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("flashcards");
  const [result, setResult] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      requestControllerRef.current?.abort();
    };
  }, []);

  function handleExitSession() {
    setResult(null);
    setActiveQuiz(null);
    setQuizResult(null);
    setStatus("idle");
    setError("");
  }

  async function handleGenerate() {
    if (!prompt.trim()) {
      return;
    }

    
    requestControllerRef.current?.abort();

    const controller = new AbortController();

    requestControllerRef.current = controller;

    const requestId = ++requestIdRef.current;

   
    const timeoutId = setTimeout(() => {
      controller.abort("TIMEOUT");
    }, 15000);

    setStatus("loading");
    setError("");

    try {
      const result = await generateStudySet({
        prompt: prompt.trim(),
        mode,
        signal: controller.signal,
      });

      if (requestId !== requestIdRef.current) {
        return;
      }

      if (!validateStudyResult(result, mode)) {
        throw new Error("The server returned invalid study data.");
      }

      setResult(result);

      if (result.type === "quiz") {
        setActiveQuiz(result);
        setQuizResult(null);
      }

      setStatus("success");
    } catch (error) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      if (controller.signal.aborted) {
        if (controller.signal.reason === "TIMEOUT") {
          setError("The request took too long. Please try again.");
          setStatus("error");
        }

        return;
      }

      console.error(error);

      setError(
        error.message ||
          "Something went wrong while generating your study set.",
      );

      setStatus("error");
    } finally {
      clearTimeout(timeoutId);
    }
  }

  function handleQuizComplete(results) {
    setQuizResult(results);
  }

  if (status === "loading") {
    return (
      <main className="app">
        <LoadingState />
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="app">
        <ErrorState
          message={error}
          onRetry={handleGenerate}
          onBack={() => {
            setStatus("idle");
          }}
        />
      </main>
    );
  }

  if (result?.type === "flashcards") {
    return (
      <main className="app">
        <FlashcardDeck data={result} onExit={handleExitSession} />
      </main>
    );
  }

  if (result?.type === "quiz" && quizResult) {
    return (
      <main className="app">
        <ScoreCard
          score={quizResult.score}
          total={quizResult.total}
          incorrectCount={quizResult.incorrectQuestions.length}
          onRetryIncorrect={() => {
            const retryQuiz = {
              ...activeQuiz,
              questions: quizResult.incorrectQuestions,
            };

            setActiveQuiz(retryQuiz);
            setQuizResult(null);
          }}
          onRetake={() => {
            setActiveQuiz(result);
            setQuizResult(null);
          }}
          onNewStudySet={() => {
            setResult(null);
            setActiveQuiz(null);
            setQuizResult(null);
          }}
        />
      </main>
    );
  }

  if (result?.type === "quiz" && activeQuiz) {
    return (
      <main className="app">
        <Quiz
          key={activeQuiz.questions.length}
          data={activeQuiz}
          onComplete={handleQuizComplete}
          onExit={handleExitSession}
        />
      </main>
    );
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="title">AI STUDY ASSISTANT</p>

        <h1>Turn any topic into an interactive study set.</h1>

        <p className="subtitle">
          Generate flashcards or quizzes from your notes, topic, or question.
        </p>

        <div className="study-form">
          <PromptInput value={prompt} onChange={setPrompt} />

          <StudyModeSelector mode={mode} onChange={setMode} />

          <button
            className="generate-button"
            type="button"
            onClick={handleGenerate}
            disabled={!prompt.trim()}
          >
            Generate →
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
