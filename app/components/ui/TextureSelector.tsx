"use client";

import { useState } from "react";

interface TextureSelectorProps {
  onTextureChange: (texture: "Simple" | "Normal" | "Rich") => void;
}

const TEXTURES = [
  {
    name: "Simple" as const,
    description: "Sparse, melodic",
    icon: "○",
  },
  {
    name: "Normal" as const,
    description: "Balanced texture",
    icon: "◎",
  },
  {
    name: "Rich" as const,
    description: "Dense, complex",
    icon: "●",
  },
];

export default function TextureSelector({
  onTextureChange,
}: TextureSelectorProps) {
  const [selected, setSelected] = useState<"Simple" | "Normal" | "Rich">(
    "Normal"
  );

  function handleSelect(texture: "Simple" | "Normal" | "Rich") {
    setSelected(texture);
    onTextureChange(texture);
  }

  return (
    <div className="flex gap-3">
      {TEXTURES.map((texture) => (
        <button
          key={texture.name}
          onClick={() => handleSelect(texture.name)}
          className={`flex-1 p-3 rounded-xl border transition-all ${
            selected === texture.name
              ? "border-purple-500 bg-purple-500/10 text-white"
              : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"
          }`}
        >
          <div className="text-xl mb-1">{texture.icon}</div>
          <div className="font-medium text-sm">{texture.name}</div>
          <div className="text-xs mt-1 opacity-70">{texture.description}</div>
        </button>
      ))}
    </div>
  );
}
