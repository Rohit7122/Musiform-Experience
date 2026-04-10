import { generateMusic } from "../app/lib/api";
import { UserRequest, StreamEvent } from "../app/types";

global.fetch = jest.fn();

const mockRequest: UserRequest = {
  input_mode: "mood",
  mood: "Sad",
  style: "Classical",
  texture: "Normal",
  creativity: 0.5,
  duration: 30,
  bpm: 80,
};

function createMockStream(events: StreamEvent[]) {
  const lines = events.map((e) => `data: ${JSON.stringify(e)}`).join("\n\n");
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(lines));
      controller.close();
    },
  });
}

describe("generateMusic", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws error when response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 422,
      body: null,
    });
    await expect(generateMusic(mockRequest, jest.fn())).rejects.toThrow(
      "API error: 422"
    );
  });

  it("throws error when response body is null", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: null,
    });
    await expect(generateMusic(mockRequest, jest.fn())).rejects.toThrow(
      "No response body"
    );
  });

  it("calls onEvent for each SSE event", async () => {
    const events: StreamEvent[] = [
      { type: "node_start", node: "build_config", message: "Building..." },
      { type: "node_end", node: "build_config" },
      { type: "complete", midi_path: "./outputs/test.mid", passed: true },
    ];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: createMockStream(events),
    });
    const onEvent = jest.fn();
    await generateMusic(mockRequest, onEvent);
    expect(onEvent).toHaveBeenCalledTimes(3);
    expect(onEvent).toHaveBeenCalledWith(events[0]);
    expect(onEvent).toHaveBeenCalledWith(events[1]);
    expect(onEvent).toHaveBeenCalledWith(events[2]);
  });

  it("sends correct request to API", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: createMockStream([]),
    });
    await generateMusic(mockRequest, jest.fn());
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/generate"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockRequest),
      })
    );
  });

  it("skips malformed SSE events without crashing", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode("data: not valid json\n\n"));
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: stream,
    });
    const onEvent = jest.fn();
    await expect(generateMusic(mockRequest, onEvent)).resolves.not.toThrow();
    expect(onEvent).not.toHaveBeenCalled();
  });

  it("reads stream and calls onEvent correctly", async () => {
    const event: StreamEvent = { type: "node_start", node: "build_config" };
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
        );
        controller.close();
      },
    });
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, body: stream });
    const onEvent = jest.fn();
    await generateMusic(mockRequest, onEvent);
    expect(onEvent).toHaveBeenCalledWith(event);
  });
});
