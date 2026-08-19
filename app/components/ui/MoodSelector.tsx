"use client";

import { useState } from "react";

// MoodSelector lets the user choose either a mood or a custom key/scale.
// It reports the selection back to the parent page through callbacks.
interface MoodSelectorProps {
  onMoodChange: (mood: string | undefined) => void;
  onInputModeChange: (mode: "mood" | "custom") => void;
  onKeyChange: (key: string | undefined) => void;
  onModeChange: (mode: string | undefined) => void;
}

const MOODS = ["Sad", "Happy", "Mysterious", "Energetic", "Calm", "Romantic"];
const KEYS = ["C", "D", "E", "F", "G", "A", "B"];
const MODES = ["Major", "Minor", "Dorian"];

export default function MoodSelector({
  onMoodChange,
  onInputModeChange,
  onKeyChange,
  onModeChange,
}: MoodSelectorProps) {
  const [inputMode, setInputMode] = useState<"mood" | "custom">("mood");
  const [selectedMood, setSelectedMood] = useState<string | undefined>(
    undefined
  );
  const [selectedKey, setSelectedKey] = useState<string | undefined>(undefined);
  const [selectedMode, setSelectedMode] = useState<string | undefined>(
    undefined
  );

  function handleMoodClick(mood: string) {
    setSelectedMood(mood);
    onMoodChange(mood);
  }

  function handleInputModeToggle(mode: "mood" | "custom") {
    setInputMode(mode);
    onInputModeChange(mode);
    // reset selections when switching between mood and custom input modes
    setSelectedMood(undefined);
    setSelectedKey(undefined);
    setSelectedMode(undefined);
    onMoodChange(undefined);
    onKeyChange(undefined);
    onModeChange(undefined);
  }

  function handleKeyClick(key: string) {
    setSelectedKey(key);
    onKeyChange(key);
  }

  function handleModeClick(mode: string) {
    setSelectedMode(mode);
    onModeChange(mode);
  }

  return (
    <div className="space-y-6">
      {/* Toggle between mood and custom */}
      <div className="flex gap-2">
        <button
          onClick={() => handleInputModeToggle("mood")}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            inputMode === "mood"
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          Mood
        </button>
        <button
          onClick={() => handleInputModeToggle("custom")}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            inputMode === "custom"
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          Custom
        </button>
      </div>

      {/* Mood buttons — only show in mood mode */}
      {inputMode === "mood" && (
        <div className="flex flex-wrap gap-3">
          {MOODS.map((mood) => (
            <button
              key={mood}
              onClick={() => handleMoodClick(mood)}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                selectedMood === mood
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      )}

      {/* Key + Mode buttons — only show in custom mode */}
      {inputMode === "custom" && (
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm mb-2">Key</p>
            <div className="flex flex-wrap gap-2">
              {KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedKey === key
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">Scale</p>
            <div className="flex flex-wrap gap-2">
              {MODES.map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeClick(mode)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedMode === mode
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
