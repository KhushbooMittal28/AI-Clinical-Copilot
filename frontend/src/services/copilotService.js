const API_BASE_URL = "http://127.0.0.1:8000";

export const askCopilot = async (question) => {
  const response = await fetch(`${API_BASE_URL}/api/rag/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: question,
      top_k: 5,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    throw new Error(
      errorData.detail || "Unable to get a response from AI Copilot."
    );
  }

  return await response.json();
};