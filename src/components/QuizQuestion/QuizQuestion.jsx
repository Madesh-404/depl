import "./QuizQuestion.css";

function QuizQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
}) {
  return (
    <div className="quiz-question">
      <h2>{question.question}</h2>

      <div className="quiz-question__options">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            className={
              selectedAnswer === option ? "selected" : ""
            }
            onClick={() => onSelectAnswer(option)}
          >
            <span className="quiz-question__radio">
              {selectedAnswer === option ? "✓" : ""}
            </span>

            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuizQuestion;