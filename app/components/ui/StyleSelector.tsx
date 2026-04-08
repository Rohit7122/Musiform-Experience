"use client";

import { useState } from "react";

interface StyleSelectorProps {
  onStyleChange: (style: "Classical" | "Jazz") => void;
}

const STYLES = [
  {
    name: "Classical" as const,
    description: "Trained on Maestro v3",
    icon: "🎹",
    disabled: false,
  },
  {
    name: "Jazz" as const,
    description: "Coming soon",
    icon: "🎷",
    disabled: true, // ← disabled
  },
];

export default function StyleSelector({ onStyleChange }: StyleSelectorProps) {
  const [selected, setSelected] = useState<"Classical" | "Jazz">("Classical");

  function handleSelect(style: "Classical" | "Jazz", disabled: boolean) {
    if (disabled) return;
    setSelected(style);
    onStyleChange(style);
  }

  return (
    <div className="flex gap-4">
      {STYLES.map((style) => (
        <button
          key={style.name}
          onClick={() => handleSelect(style.name, style.disabled)}
          disabled={style.disabled}
          className={`flex-1 p-4 rounded-xl border transition-all ${
            style.disabled
              ? "border-gray-800 bg-gray-900/50 text-gray-600 cursor-not-allowed opacity-50"
              : selected === style.name
                ? "border-purple-500 bg-purple-500/10 text-white"
                : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"
          }`}
        >
          <div className="text-2xl mb-2">{style.icon}</div>
          <div className="font-medium">{style.name}</div>
          <div className="text-xs mt-1 opacity-70">{style.description}</div>
          {style.disabled && (
            <div className="text-xs mt-2 text-purple-500/70 font-medium">
              Coming Soon
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
