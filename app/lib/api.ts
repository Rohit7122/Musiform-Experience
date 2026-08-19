import { UserRequest, StreamEvent } from "../types";

// API helper for sending music generation requests and processing SSE events.
const API_URL =
  process.env.NEXT_PUBLIC_MUSIFORM_API_URL || "http://localhost:8000";

export async function generateMusic(
  request: UserRequest,
  onEvent: (event: StreamEvent) => void
): Promise<void> {
  // Send POST request to FastAPI
  const response = await fetch(`${API_URL}/api/v1/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  if (!response.body) {
    throw new Error("No response body");
  }

  // Read SSE stream
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Decode chunk and split into SSE lines.
    const text = decoder.decode(value);
    const lines = text.split("\n");

    for (const line of lines) {
      // SSE events start with "data: "
      if (line.startsWith("data: ")) {
        try {
          const data = JSON.parse(line.slice(6));
          onEvent(data as StreamEvent);
        } catch {
          // noop for malformed event lines
        }
      }
    }
  }
}
