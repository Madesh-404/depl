import "./PromptInput.css";

function PromptInput({ value, onChange }) {
  return (
    <div className="prompt-input">
      <label htmlFor="study-topic">
        What do you want to study?
      </label>

      <textarea
        id="study-topic"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. Explain JavaScript closures with examples..."
        rows={5}
      />
    </div>
  );
}

export default PromptInput;