"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import MoodSelector from "./components/ui/MoodSelector";
import StyleSelector from "./components/ui/StyleSelector";
import TextureSelector from "./components/ui/TextureSelector";
import Sliders from "./components/ui/Sliders";
import ProgressStream from "./components/ProgressStream";
import Result from "./components/Result";
import { generateMusic } from "./lib/api";
import { UserRequest, NodeProgress, MidiStats } from "./types";

// Load particles client-side only — no SSR
const Background = dynamic(() => import("./components/Background"), {
  ssr: false,
});

export default function Home() {
  // User selections
  const [inputMode, setInputMode] = useState<"mood" | "custom">("mood");
  const [mood, setMood] = useState<string | undefined>(undefined);
  const [key, setKey] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<string | undefined>(undefined);
  const [style, setStyle] = useState<"Classical" | "Jazz">("Classical");
  const [texture, setTexture] = useState<"Simple" | "Normal" | "Rich">(
    "Normal"
  );
  const [creativity, setCreativity] = useState<number>(0.5);
  const [duration, setDuration] = useState<number>(30);
  const [bpm, setBpm] = useState<number>(80);

  // Generation state
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [nodes, setNodes] = useState<NodeProgress[]>([]);
  const [description, setDescription] = useState<string>("");
  const [midiPath, setMidiPath] = useState<string | undefined>(undefined);
  const [passed, setPassed] = useState<boolean>(false);
  const [validation, setValidation] = useState<
    { score: number; stats: MidiStats } | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  // Generate handler
  async function handleGenerate() {
    if (inputMode === "mood" && !mood) {
      setError("Please select a mood");
      return;
    }
    if (inputMode === "custom" && (!key || !mode)) {
      setError("Please select a key and scale");
      return;
    }

    setError(undefined);
    setIsGenerating(true);
    setNodes([]);
    setDescription("");
    setMidiPath(undefined);
    setPassed(false);
    setValidation(undefined);

    const request: UserRequest = {
      input_mode: inputMode,
      mood: inputMode === "mood" ? (mood as UserRequest["mood"]) : undefined,
      key: inputMode === "custom" ? (key as UserRequest["key"]) : undefined,
      mode: inputMode === "custom" ? (mode as UserRequest["mode"]) : undefined,
      style,
      texture,
      creativity,
      duration,
      bpm,
    };

    try {
      await generateMusic(request, (event) => {
        if (event.type === "node_start" && event.node) {
          setNodes((prev) => [
            ...prev,
            {
              name: event.node!,
              label: event.message || event.node!,
              status: "running",
            },
          ]);
        }
        if (event.type === "node_end" && event.node) {
          setNodes((prev) =>
            prev.map((n) =>
              n.name === event.node ? { ...n, status: "done" } : n
            )
          );
        }
        if (event.type === "llm_token" && event.content) {
          setDescription((prev) => prev + event.content);
        }
        if (event.type === "complete") {
          setMidiPath(event.midi_path);
          setPassed(event.passed ?? false);
          setValidation(event.validation);
          setIsGenerating(false);
        }
      });
    } catch {
      setError("Generation failed — is the backend running?");
      setIsGenerating(false);
    }
  }

  // Render
  return (
    <main className="h-screen bg-gray-950 text-white overflow-hidden relative">
      {/* Animated purple particle background */}
      <Background />

      {/* Subtle purple glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="h-full flex flex-col px-8 py-6 gap-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Musiform
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            AI Music Generation powered by Music Transformer
          </p>
        </div>

        {/* Two panel layout */}
        <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
          {/* LEFT PANEL — controls */}
          <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800/50 rounded-2xl p-6 flex flex-col gap-5 overflow-y-auto">
            {/* Mood */}
            <div className="space-y-2">
              <h2 className="text-gray-400 text-xs uppercase tracking-wider">
                Feel
              </h2>
              <MoodSelector
                onMoodChange={setMood}
                onInputModeChange={setInputMode}
                onKeyChange={setKey}
                onModeChange={setMode}
              />
            </div>

            {/* Style */}
            <div className="space-y-2">
              <h2 className="text-gray-400 text-xs uppercase tracking-wider">
                Style
              </h2>
              <StyleSelector onStyleChange={setStyle} />
            </div>

            {/* Texture */}
            <div className="space-y-2">
              <h2 className="text-gray-400 text-xs uppercase tracking-wider">
                Texture
              </h2>
              <TextureSelector onTextureChange={setTexture} />
            </div>

            {/* Sliders */}
            <div className="space-y-2">
              <h2 className="text-gray-400 text-xs uppercase tracking-wider">
                Fine-tune
              </h2>
              <Sliders
                onCreativityChange={setCreativity}
                onDurationChange={setDuration}
                onBpmChange={setBpm}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-xs">
                {error}
              </div>
            )}

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`mt-auto w-full py-3 rounded-xl font-semibold transition-all ${
                isGenerating
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/30"
              }`}
            >
              {isGenerating ? "Generating..." : "🎵 Generate Music"}
            </button>
          </div>

          {/* RIGHT PANEL — progress + result */}
          <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800/50 rounded-2xl p-6 flex flex-col gap-4 overflow-y-auto">
            {/* Empty state */}
            {!isGenerating && nodes.length === 0 && !midiPath && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center text-3xl">
                  🎵
                </div>
                <div>
                  <p className="text-gray-300 font-medium">
                    Your music will appear here
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    Select your preferences and hit generate
                  </p>
                </div>
              </div>
            )}

            {/* Progress stream */}
            <ProgressStream
              nodes={nodes}
              description={description}
              isGenerating={isGenerating}
            />

            {/* Result */}
            <Result
              midiPath={midiPath}
              description={description}
              passed={passed}
              validation={validation}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
