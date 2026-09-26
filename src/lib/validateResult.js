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
    return false;
  }

  if (data.type !== "flashcards") {
    return false;
  }

  if (!isNonEmptyString(data.title)) {
    return false;
  }

  if (!Array.isArray(data.cards) || data.cards.length === 0) {
    return false;
  }

  return data.cards.every((card) => {
    return (
      isObject(card) &&
      isNonEmptyString(card.question) &&
      isNonEmptyString(card.answer)
    );
  });
}

function validateQuiz(data) {
  if (!isObject(data)) {
    return false;
  }

  if (data.type !== "quiz") {
    return false;
  }

  if (!isNonEmptyString(data.title)) {
    return false;
  }

  if (
    !Array.isArray(data.questions) ||
    data.questions.length === 0
  ) {
    return false;
  }

  return data.questions.every((question) => {
    if (!isObject(question)) {
      return false;
    }

    if (!isNonEmptyString(question.question)) {
      return false;
    }

    if (
      !Array.isArray(question.options) ||
      question.options.length !== 4
    ) {
      return false;
    }

    if (
      !question.options.every(isNonEmptyString)
    ) {
      return false;
    }

    if (!isNonEmptyString(question.correctAnswer)) {
      return false;
    }

    if (!question.options.includes(question.correctAnswer)) {
      return false;
    }

    return true;
  });
}

export function validateStudyResult(data, expectedMode) {
  if (expectedMode === "flashcards") {
    return validateFlashcards(data);
  }

  if (expectedMode === "quiz") {
    return validateQuiz(data);
  }

  return false;
}