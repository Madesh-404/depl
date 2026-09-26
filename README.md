# AI Study Assistant

This is a React-based study assistant that turns a user's topic or notes into interactive **flashcards or quizzes** using an AI model.

The application does not behave like a chatbot. Instead, the AI returns structured JSON, which is validated and rendered as interactive React components.

## Features

* Generate AI-powered flashcards or quizzes from free-form text
* Choose between Flashcards and Quiz mode
* Interactive flashcard flip animation
* Previous / Next navigation
* Multiple-choice quiz interaction
* Quiz score calculation
* Retry only incorrectly answered questions
* Retake the complete quiz
* Loading, error, and empty states
* Request timeout handling
* Protection against stale API responses
* AI response validation
* Responsive layout for mobile devices

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* React Hooks
* Fetch API

### Backend

* Node.js
* Express
* Gemini API
* dotenv

## Project Structure

```text
src/
├── components/
│   ├── PromptInput/
│   ├── StudyModeSelector/
│   ├── FlashcardDeck/
│   ├── Flashcard/
│   ├── Quiz/
│   ├── QuizQuestion/
│   ├── ScoreCard/
│   ├── NavigationControls/
│   ├── LoadingState/
│   └── ErrorState/
├── lib/
│   ├── api.js
│   └── validateResult.js
├── App.jsx
├── App.css
└── index.css

server/
├── index.js
├── generate.js
├── prompt.js
└── validate.js
```

## How It Works

```text
User enters a topic
        ↓
Selects Flashcards or Quiz
        ↓
React sends request to Express
        ↓
Express sends structured-generation request to Gemini
        ↓
Gemini returns JSON
        ↓
Backend parses and validates the response
        ↓
Validated data is returned to React
        ↓
React renders interactive study components
```

The LLM is treated as an **untrusted external data source**. The application does not directly assume that the generated response is valid.

## Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

The API key is kept on the server and is not exposed to the React frontend.

### 4. Start the application

```bash
npm start
```

The command starts both the frontend and backend development servers.

Open the frontend using the URL shown by Vite, typically:

```text
http://localhost:5173
```

## AI Response Handling

The application requests structured JSON from the AI rather than free-form text.

### Flashcard response

```json
{
  "type": "flashcards",
  "title": "JavaScript Closures",
  "cards": [
    {
      "question": "What is a closure?",
      "answer": "A function that retains access to its lexical environment."
    }
  ]
}
```

### Quiz response

```json
{
  "type": "quiz",
  "title": "JavaScript Basics",
  "questions": [
    {
      "question": "Which keyword creates a block-scoped variable?",
      "options": [
        "var",
        "let",
        "function",
        "global"
      ],
      "correctAnswer": "let"
    }
  ]
}
```

## Reliability and Error Handling

The application handles several failure cases:

* Empty user input
* Invalid study mode
* AI API failures
* Empty AI responses
* Malformed JSON
* Unexpected AI response structures
* Empty flashcard or quiz arrays
* Invalid quiz options
* Invalid quiz correct answers
* Requests that take too long
* Stale responses from older requests

The backend validates AI-generated data before returning it to the frontend.

The frontend also performs validation before storing the response in application state.

## AI Usage

AI tools were used during development for:

* Brainstorming application architecture
* Discussing implementation approaches
* Debugging issues
* Reviewing code and identifying edge cases
* Improving error-handling logic
* Generating and refining parts of the implementation

The generated code was reviewed, tested, modified, and integrated manually.

I understand the implemented code and can explain the architecture, AI integration, validation logic, and React state management.

## Limitations

* AI-generated study material may contain factual inaccuracies.
* The application depends on the availability of the configured AI provider.
* Generated content is not persisted between sessions.
* Authentication is not implemented.
* Study sessions are not stored in a database.
* The application currently supports flashcards and multiple-choice quizzes only.

## Future Improvements

Possible future improvements include:

* Save and reload study sessions
* Dark mode
* Keyboard navigation improvements
* Additional interactive block types
* Streaming AI responses

## Time Spent

Approximately **8 hours** were spent designing, implementing, testing, and documenting the application.

The focus was kept on building a reliable core experience rather than adding a large number of partially implemented features.
