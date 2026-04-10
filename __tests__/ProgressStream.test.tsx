import { render, screen } from "@testing-library/react";
import ProgressStream from "../app/components/ProgressStream";
import { NodeProgress } from "../app/types";

describe("ProgressStream", () => {
  it("renders nothing when not generating and no nodes", () => {
    const { container } = render(
      <ProgressStream nodes={[]} description="" isGenerating={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows progress section when generating", () => {
    render(<ProgressStream nodes={[]} description="" isGenerating={true} />);
    expect(screen.getByText("Generation Progress")).toBeInTheDocument();
  });

  it("shows all four node labels", () => {
    render(<ProgressStream nodes={[]} description="" isGenerating={true} />);
    expect(
      screen.getByText("Building generation parameters")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Generating music with AI model")
    ).toBeInTheDocument();
    expect(screen.getByText("Validating music quality")).toBeInTheDocument();
    expect(screen.getByText("Writing musical description")).toBeInTheDocument();
  });

  it("shows running node with correct styling", () => {
    const nodes: NodeProgress[] = [
      { name: "build_config", label: "Building...", status: "running" },
    ];
    render(<ProgressStream nodes={nodes} description="" isGenerating={true} />);
    expect(screen.getByText("⟳")).toBeInTheDocument();
  });

  it("shows done node with checkmark", () => {
    const nodes: NodeProgress[] = [
      { name: "build_config", label: "Building...", status: "done" },
    ];
    render(
      <ProgressStream nodes={nodes} description="" isGenerating={false} />
    );
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("shows description when provided", () => {
    const nodes: NodeProgress[] = [
      { name: "build_config", label: "Building...", status: "done" },
    ];
    render(
      <ProgressStream
        nodes={nodes}
        description="A melancholic piece in A minor"
        isGenerating={false}
      />
    );
    expect(
      screen.getByText("A melancholic piece in A minor")
    ).toBeInTheDocument();
  });

  it("shows blinking cursor while generating description", () => {
    render(
      <ProgressStream
        nodes={[]}
        description="A melancholic"
        isGenerating={true}
      />
    );
    expect(screen.getByText("▊")).toBeInTheDocument();
  });
});
