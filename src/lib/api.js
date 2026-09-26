const API_URL = "/api/generate";

export async function generateStudySet({
  prompt,
  mode,
  signal,
}) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      prompt,
      mode,
    }),

    signal,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("INVALID_SERVER_RESPONSE");
  }

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to generate study set."
    );
  }

  return data;
}