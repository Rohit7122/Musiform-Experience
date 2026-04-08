"use client";

interface SliderProps {
  onCreativityChange: (value: number) => void;
  onDurationChange: (value: number) => void;
  onBpmChange: (value: number) => void;
}

export default function Sliders({
  onCreativityChange,
  onDurationChange,
  onBpmChange,
}: SliderProps) {
  return (
    <div className="space-y-6">
      {/* Creativity */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-gray-300 text-sm font-medium">
            Creativity
          </label>
          <span className="text-purple-400 text-sm">
            Conservative → Experimental
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          onChange={(e) => onCreativityChange(Number(e.target.value) / 100)}
          className="w-full accent-purple-500"
        />
      </div>

      {/* Duration */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-gray-300 text-sm font-medium">Duration</label>
          <span className="text-purple-400 text-sm">15s → 60s</span>
        </div>
        <input
          type="range"
          min={15}
          max={60}
          defaultValue={30}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="w-full accent-purple-500"
        />
      </div>

      {/* BPM */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-gray-300 text-sm font-medium">
            Tempo (BPM)
          </label>
          <span className="text-purple-400 text-sm">60 → 120</span>
        </div>
        <input
          type="range"
          min={60}
          max={120}
          defaultValue={80}
          onChange={(e) => onBpmChange(Number(e.target.value))}
          className="w-full accent-purple-500"
        />
      </div>
    </div>
  );
}
