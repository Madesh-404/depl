import { useState } from "react";

import Flashcard from "../Flashcard/Flashcard";
import NavigationControls from "../NavigationControls/NavigationControls";

import "./FlashcardDeck.css";

function FlashcardDeck({ data, onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCard = data.cards[currentIndex];

  function handlePrevious() {
    setCurrentIndex((current) => current - 1);
  }

  function handleNext() {
    if (currentIndex === data.cards.length - 1) {
      return;
    }

    setCurrentIndex((current) => current + 1);
  }

  return (
    <section className="flashcard-deck">
      <div className="flashcard-deck__header">
        <div>
          <p className="flashcard-deck__label">FLASHCARDS</p>

          <h1>{data.title}</h1>
        </div>
      </div>

      <Flashcard
        key={currentIndex}
        question={currentCard.question}
        answer={currentCard.answer}
      />

      <NavigationControls
        currentIndex={currentIndex}
        totalItems={data.cards.length}
        onPrevious={handlePrevious}
        nextDisabled={currentIndex === data.cards.length - 1}
        onNext={handleNext}
        onExit={onExit}
      />
    </section>
  );
}

export default FlashcardDeck;
