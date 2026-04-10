import { render, screen } from "@testing-library/react";
import Result from "../app/components/Result";
import { MidiStats } from "../app/types";

const mockStats: MidiStats = {
  duration: 30.5,
  total_notes: 200,
  note_density: 4.2,
  pitch_range: 40,
  avg_velocity: 65.0,
  lowest_note: "A3",
  highest_note: "C6",
};

describe("Result", () => {
  it("renders nothing when no midi path", () => {
    const { container } = render(
      <Result midiPath={undefined} description="" passed={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows success heading when midi path provided", () => {
    render(
      <Result midiPath="./outputs/test.mid" description="" passed={true} />
    );
    expect(
      screen.getByText("Music Generated Successfully")
    ).toBeInTheDocument();
  });

  it("shows llm description when provided", () => {
    render(
      <Result
        midiPath="./outputs/test.mid"
        description="A melancholic piece in A minor"
        passed={true}
      />
    );
    expect(
      screen.getByText("A melancholic piece in A minor")
    ).toBeInTheDocument();
  });

  it("shows passed quality check when passed is true", () => {
    render(
      <Result midiPath="./outputs/test.mid" description="" passed={true} />
    );
    expect(screen.getByText("✓ Passed quality check")).toBeInTheDocument();
  });

  it("shows warning when passed is false", () => {
    render(
      <Result midiPath="./outputs/test.mid" description="" passed={false} />
    );
    expect(screen.getByText("⚠ Generated with warnings")).toBeInTheDocument();
  });

  it("shows midi stats when validation provided", () => {
    render(
      <Result
        midiPath="./outputs/test.mid"
        description=""
        passed={true}
        validation={{ score: 0.9, stats: mockStats }}
      />
    );
    expect(screen.getByText("30.5s")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("A3 – C6")).toBeInTheDocument();
    expect(screen.getByText("90%")).toBeInTheDocument();
  });

  it("shows download button", () => {
    render(
      <Result midiPath="./outputs/test.mid" description="" passed={true} />
    );
    expect(screen.getByText("⬇ Download MIDI")).toBeInTheDocument();
  });
});
