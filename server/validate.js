function isObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function isNonEmptyString(value) {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function validateFlashcards(data) {
  if (!isObject(data)) {
    return {
      valid: false,
      error: "AI response must be an object.",
    };
  }

  if (data.type !== "flashcards") {
    return {
      valid: false,
      error: "AI response has an invalid type.",
    };
  }

  if (!isNonEmptyString(data.title)) {
    return {
      valid: false,
      error: "Flashcard title is invalid.",
    };
  }

  if (!Array.isArray(data.cards)) {
    return {
      valid: false,
      error: "Flashcards must be an array.",
    };
  }

  if (data.cards.length === 0) {
    return {
      valid: false,
      error: "AI returned no flashcards.",
    };
  }

  if (data.cards.length > 20) {
    return {
      valid: false,
      error: "AI returned too many flashcards.",
    };
  }

  for (const card of data.cards) {
    if (!isObject(card)) {
      return {
        valid: false,
        error: "A flashcard has an invalid structure.",
      };
    }

    if (!isNonEmptyString(card.question)) {
      return {
        valid: false,
        error: "A flashcard question is invalid.",
      };
    }

    if (!isNonEmptyString(card.answer)) {
      return {
        valid: false,
        error: "A flashcard answer is invalid.",
      };
    }
  }

  return {
    valid: true,
    data,
  };
}

function validateQuiz(data) {
  if (!isObject(data)) {
    return {
      valid: false,
      error: "AI response must be an object.",
    };
  }

  if (data.type !== "quiz") {
    return {
      valid: false,
      error: "AI response has an invalid type.",
    };
  }

  if (!isNonEmptyString(data.title)) {
    return {
      valid: false,
      error: "Quiz title is invalid.",
    };
  }

  if (!Array.isArray(data.questions)) {
    return {
      valid: false,
      error: "Quiz questions must be an array.",
    };
  }

  if (data.questions.length === 0) {
    return {
      valid: false,
      error: "AI returned no quiz questions.",
    };
  }

  if (data.questions.length > 20) {
    return {
      valid: false,
      error: "AI returned too many quiz questions.",
    };
  }

  for (const question of data.questions) {
    if (!isObject(question)) {
      return {
        valid: false,
        error: "A quiz question has an invalid structure.",
      };
    }

    if (!isNonEmptyString(question.question)) {
      return {
        valid: false,
        error: "A quiz question is invalid.",
      };
    }

    if (!Array.isArray(question.options)) {
      return {
        valid: false,
        error: "Quiz options must be an array.",
      };
    }

    if (question.options.length !== 4) {
      return {
        valid: false,
        error: "Every quiz question must have exactly 4 options.",
      };
    }

    for (const option of question.options) {
      if (!isNonEmptyString(option)) {
        return {
          valid: false,
          error: "Quiz options cannot be empty.",
        };
      }
    }

    const uniqueOptions = new Set(
      question.options.map((option) => option.trim())
    );

    if (uniqueOptions.size !== question.options.length) {
      return {
        valid: false,
        error: "Quiz options must be unique.",
      };
    }

    if (!isNonEmptyString(question.correctAnswer)) {
      return {
        valid: false,
        error: "Quiz correct answer is invalid.",
      };
    }

    if (!question.options.includes(question.correctAnswer)) {
      return {
        valid: false,
        error:
          "Quiz correct answer must match one of the options.",
      };
    }
  }

  return {
    valid: true,
    data,
  };
}

export function validateStudyResult(data, expectedMode) {
  if (expectedMode === "flashcards") {
    return validateFlashcards(data);
  }

  if (expectedMode === "quiz") {
    return validateQuiz(data);
  }

  return {
    valid: false,
    error: "Invalid study mode.",
  };
}