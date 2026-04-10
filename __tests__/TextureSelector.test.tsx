import { render, screen, fireEvent } from "@testing-library/react";
import TextureSelector from "../app/components/ui/TextureSelector";

describe("TextureSelector", () => {
  it("renders all three texture options", () => {
    render(<TextureSelector onTextureChange={jest.fn()} />);
    expect(screen.getByText("Simple")).toBeInTheDocument();
    expect(screen.getByText("Normal")).toBeInTheDocument();
    expect(screen.getByText("Rich")).toBeInTheDocument();
  });

  it("renders texture descriptions", () => {
    render(<TextureSelector onTextureChange={jest.fn()} />);
    expect(screen.getByText("Sparse, melodic")).toBeInTheDocument();
    expect(screen.getByText("Balanced texture")).toBeInTheDocument();
    expect(screen.getByText("Dense, complex")).toBeInTheDocument();
  });

  it("calls onTextureChange with Simple when clicked", () => {
    const onTextureChange = jest.fn();
    render(<TextureSelector onTextureChange={onTextureChange} />);
    fireEvent.click(screen.getByText("Simple"));
    expect(onTextureChange).toHaveBeenCalledWith("Simple");
  });

  it("calls onTextureChange with Normal when clicked", () => {
    const onTextureChange = jest.fn();
    render(<TextureSelector onTextureChange={onTextureChange} />);
    fireEvent.click(screen.getByText("Normal"));
    expect(onTextureChange).toHaveBeenCalledWith("Normal");
  });

  it("calls onTextureChange with Rich when clicked", () => {
    const onTextureChange = jest.fn();
    render(<TextureSelector onTextureChange={onTextureChange} />);
    fireEvent.click(screen.getByText("Rich"));
    expect(onTextureChange).toHaveBeenCalledWith("Rich");
  });
});
