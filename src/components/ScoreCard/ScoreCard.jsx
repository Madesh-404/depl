import "./ScoreCard.css";

function ScoreCard({
  score,
  total,
  incorrectCount,
  onRetryIncorrect,
  onRetake,
  onNewStudySet,
}) {
  const percentage = Math.round((score / total) * 100);

  return (
    <section className="score-card">
      <p className="score-card__label">QUIZ COMPLETE</p>

      <h1>
        {score} / {total}
      </h1>

      <p className="score-card__percentage">
        {percentage}% correct
      </p>

      <div className="score-card__actions">
        {incorrectCount > 0 && (
          <button
            type="button"
            className="score-card__primary"
            onClick={onRetryIncorrect}
          >
            Retry {incorrectCount} Incorrect
            {incorrectCount > 1 ? " Questions" : " Question"}
          </button>
        )}

        <button
          type="button"
          className="score-card__secondary"
          onClick={onRetake}
        >
          Retake Full Quiz
        </button>

        <button
          type="button"
          className="score-card__link"
          onClick={onNewStudySet}
        >
          ← New Study Set
        </button>
      </div>
    </section>
  );
}

export default ScoreCard;