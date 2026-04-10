import { render, screen, fireEvent } from "@testing-library/react";
import MoodSelector from "../app/components/ui/MoodSelector";

// helper to render with empty callbacks
const renderMoodSelector = (overrides = {}) => {
  const props = {
    onMoodChange: jest.fn(),
    onInputModeChange: jest.fn(),
    onKeyChange: jest.fn(),
    onModeChange: jest.fn(),
    ...overrides,
  };
  render(<MoodSelector {...props} />);
  return props;
};

describe("MoodSelector", () => {
  it("renders mood and custom toggle buttons", () => {
    renderMoodSelector();
    expect(screen.getByText("Mood")).toBeInTheDocument();
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("shows mood buttons by default", () => {
    renderMoodSelector();
    expect(screen.getByText("Sad")).toBeInTheDocument();
    expect(screen.getByText("Happy")).toBeInTheDocument();
    expect(screen.getByText("Mysterious")).toBeInTheDocument();
    expect(screen.getByText("Energetic")).toBeInTheDocument();
    expect(screen.getByText("Calm")).toBeInTheDocument();
    expect(screen.getByText("Romantic")).toBeInTheDocument();
  });

  it("calls onMoodChange when a mood is clicked", () => {
    const { onMoodChange } = renderMoodSelector();
    fireEvent.click(screen.getByText("Sad"));
    expect(onMoodChange).toHaveBeenCalledWith("Sad");
  });

  it("calls onInputModeChange when Custom is clicked", () => {
    const { onInputModeChange } = renderMoodSelector();
    fireEvent.click(screen.getByText("Custom"));
    expect(onInputModeChange).toHaveBeenCalledWith("custom");
  });

  it("shows key buttons when custom mode is selected", () => {
    renderMoodSelector();
    fireEvent.click(screen.getByText("Custom"));
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
    expect(screen.getByText("G")).toBeInTheDocument();
  });

  it("hides mood buttons when custom mode is selected", () => {
    renderMoodSelector();
    fireEvent.click(screen.getByText("Custom"));
    expect(screen.queryByText("Sad")).not.toBeInTheDocument();
    expect(screen.queryByText("Happy")).not.toBeInTheDocument();
  });

  it("calls onKeyChange when a key is clicked in custom mode", () => {
    const { onKeyChange } = renderMoodSelector();
    fireEvent.click(screen.getByText("Custom"));
    fireEvent.click(screen.getByText("C"));
    expect(onKeyChange).toHaveBeenCalledWith("C");
  });

  it("calls onModeChange when a scale is clicked in custom mode", () => {
    const { onModeChange } = renderMoodSelector();
    fireEvent.click(screen.getByText("Custom"));
    fireEvent.click(screen.getByText("Minor"));
    expect(onModeChange).toHaveBeenCalledWith("Minor");
  });

  it("resets selections when switching between mood and custom", () => {
    const { onMoodChange } = renderMoodSelector();
    fireEvent.click(screen.getByText("Custom"));
    fireEvent.click(screen.getByText("Mood"));
    expect(onMoodChange).toHaveBeenCalledWith(undefined);
  });
});
