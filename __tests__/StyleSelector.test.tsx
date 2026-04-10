import { render, screen, fireEvent } from "@testing-library/react";
import StyleSelector from "../app/components/ui/StyleSelector";

describe("StyleSelector", () => {
  it("renders Classical and Jazz options", () => {
    render(<StyleSelector onStyleChange={jest.fn()} />);
    expect(screen.getByText("Classical")).toBeInTheDocument();
    expect(screen.getByText("Jazz")).toBeInTheDocument();
  });

  it("Jazz shows coming soon label", () => {
    render(<StyleSelector onStyleChange={jest.fn()} />);
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
  });

  it("Jazz button is disabled", () => {
    render(<StyleSelector onStyleChange={jest.fn()} />);
    // find the Jazz button and check it is disabled
    const buttons = screen.getAllByRole("button");
    const jazzButton = buttons.find((btn) => btn.textContent?.includes("Jazz"));
    expect(jazzButton).toBeDisabled();
  });

  it("calls onStyleChange with Classical when clicked", () => {
    const onStyleChange = jest.fn();
    render(<StyleSelector onStyleChange={onStyleChange} />);
    const buttons = screen.getAllByRole("button");
    const classicalButton = buttons.find((btn) =>
      btn.textContent?.includes("Classical")
    );
    fireEvent.click(classicalButton!);
    expect(onStyleChange).toHaveBeenCalledWith("Classical");
  });

  it("does not call onStyleChange when Jazz is clicked", () => {
    const onStyleChange = jest.fn();
    render(<StyleSelector onStyleChange={onStyleChange} />);
    const buttons = screen.getAllByRole("button");
    const jazzButton = buttons.find((btn) => btn.textContent?.includes("Jazz"));
    fireEvent.click(jazzButton!);
    expect(onStyleChange).not.toHaveBeenCalledWith("Jazz");
  });
});
