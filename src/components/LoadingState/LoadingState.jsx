import "./LoadingState.css";

function LoadingState() {
  return (
    <section className="loading-state">
      <div className="loading-state__spinner" />

      <h2>Creating your study set...</h2>

      <p>
        Generating questions from your topic.
      </p>
    </section>
  );
}

export default LoadingState;