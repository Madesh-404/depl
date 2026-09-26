import "./ErrorState.css";

function ErrorState({ message, onRetry, onBack }) {
  return (
    <section className="error-state">
      <div className="error-state__icon">!</div>

      <h2>Couldn't create your study set</h2>

      <p>{message}</p>

      <div className="error-state__actions">
        <button
          type="button"
          className="error-state__primary"
          onClick={onRetry}
        >
          Try Again
        </button>

        <button
          type="button"
          className="error-state__secondary"
          onClick={onBack}
        >
          ← Edit Prompt
        </button>
      </div>
    </section>
  );
}

export default ErrorState;
