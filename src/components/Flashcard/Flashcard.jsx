import { useState } from "react";
import "./Flashcard.css";

function Flashcard({ question, answer }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleFlip() {
    setIsFlipped((current) => !current);
  }

  return (
    <button
      type="button"
      className={`flashcard ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="flashcard__content">
        <div className="flashcard__front">
          <span className="flashcard__label">QUESTION</span>

          <h2>{question}</h2>

          <span className="flashcard__hint">
            Click to reveal answer
          </span>
        </div>

        <div className="flashcard__back">
          <span className="flashcard__label">ANSWER</span>

          <p>{answer}</p>
        </div>
      </div>
    </button>
  );
}

export default Flashcard;