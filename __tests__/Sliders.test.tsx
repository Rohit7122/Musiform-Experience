import { render, screen, fireEvent } from "@testing-library/react";
import Sliders from "../app/components/ui/Sliders";

describe("Sliders", () => {
  it("renders all three sliders", () => {
    // render Sliders with empty callbacks
    // check Creativity, Duration, Tempo labels are on screen
  });

  it("calls onCreativityChange when creativity slider changes", () => {
    // render with jest.fn() callbacks
    // fireEvent.change on the creativity slider
    // assert onCreativityChange was called
  });

  it("calls onDurationChange when duration slider changes", () => {
    // same pattern for duration
  });

  it("calls onBpmChange when bpm slider changes", () => {
    // same pattern for bpm
  });
});
