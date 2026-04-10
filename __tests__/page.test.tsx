import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../app/page";
import * as api from "../app/lib/api";

// mock the api module
jest.mock("../app/lib/api");
const mockGenerateMusic = api.generateMusic as jest.Mock;

// mock next/dynamic so Background doesn't cause issues
jest.mock("next/dynamic", () => () => () => null);

describe("Home page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Musiform heading", () => {
    render(<Home />);
    expect(screen.getByText("Musiform")).toBeInTheDocument();
  });

  it("renders the generate button", () => {
    render(<Home />);
    expect(screen.getByText("🎵 Generate Music")).toBeInTheDocument();
  });

  it("shows error when generate clicked without selecting mood", async () => {
    render(<Home />);
    fireEvent.click(screen.getByText("🎵 Generate Music"));
    await waitFor(() => {
      expect(screen.getByText("Please select a mood")).toBeInTheDocument();
    });
  });

  it("shows error when custom mode selected without key and scale", async () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Custom"));
    fireEvent.click(screen.getByText("🎵 Generate Music"));
    await waitFor(() => {
      expect(
        screen.getByText("Please select a key and scale")
      ).toBeInTheDocument();
    });
  });

  it("generate button is disabled while generating", async () => {
    // mock api to never resolve so button stays in generating state
    mockGenerateMusic.mockImplementation(() => new Promise(() => {}));

    render(<Home />);
    fireEvent.click(screen.getByText("Sad"));
    fireEvent.click(screen.getByText("🎵 Generate Music"));

    await waitFor(() => {
      expect(screen.getByText("Generating...")).toBeInTheDocument();
    });

    const button = screen.getByText("Generating...");
    expect(button).toBeDisabled();
  });

  it("shows error message when generation fails", async () => {
    mockGenerateMusic.mockRejectedValueOnce(new Error("Network error"));

    render(<Home />);
    fireEvent.click(screen.getByText("Sad"));
    fireEvent.click(screen.getByText("🎵 Generate Music"));

    await waitFor(() => {
      expect(
        screen.getByText("Generation failed — is the backend running?")
      ).toBeInTheDocument();
    });
  });

  it("shows empty state on right panel before generation", () => {
    render(<Home />);
    expect(screen.getByText("Your music will appear here")).toBeInTheDocument();
  });
});
