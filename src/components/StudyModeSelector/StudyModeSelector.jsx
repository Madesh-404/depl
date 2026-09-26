import "./StudyModeSelector.css";

function StudyModeSelector({ mode, onChange }) {
  return (
    <div className="study-mode">
      <p>Study mode</p>

      <div className="study-mode__options">
        <button
          type="button"
          className={mode === "flashcards" ? "active" : ""}
          aria-pressed={mode === "flashcards"}
          onClick={() => onChange("flashcards")}
        >
          <strong>Flashcards</strong>
          <span>Learn & review</span>
        </button>

        <button
          type="button"
          className={mode === "quiz" ? "active" : ""}
          aria-pressed={mode === "flashcards"}
          onClick={() => onChange("quiz")}
        >
          <strong>Quiz</strong>
          <span>Test yourself</span>
        </button>
      </div>
    </div>
  );
}

export default StudyModeSelector;