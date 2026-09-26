import "./NavigationControls.css";
import { useEffect } from "react";
function NavigationControls({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  nextDisabled,
  nextLabel = "Next →",
  onExit,
}) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowLeft") {
        if (currentIndex > 0) {
          onPrevious();
        }
      }

      if (event.key === "ArrowRight") {
        if (!nextDisabled) {
          onNext();
        }
      }

      if (event.key === "Escape") {
        onExit();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    currentIndex,
    nextDisabled,
    onPrevious,
    onNext,
    onExit,
  ]);

  return (
    <div className="navigation-controls">
      <button
        type="button"
        onClick={onExit}
        className="navigation-controls__exit"
      >
        Exit
      </button>

      <div className="navigation-controls__right">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentIndex === 0}
      >
        ← Previous
      </button>

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}

export default NavigationControls;