"use client";

import { MidiStats } from "../types";

interface ResultProps {
  midiPath: string | undefined;
  description: string;
  passed: boolean;
  validation?: {
    score: number;
    stats: MidiStats;
  };
}

export default function Result({
  midiPath,
  description,
  passed,
  validation,
}: ResultProps) {
  if (!midiPath) return null;

  return (
    <div className="bg-gray-900 border border-purple-500/30 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-green-400 text-lg">✓</span>
        <h3 className="text-white font-medium text-lg">
          Music Generated Successfully
        </h3>
      </div>

      {/* LLM generated description — streams in from Claude */}
      {description && (
        <div className="bg-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
            About this piece
          </p>
          <p className="text-gray-200 text-sm leading-relaxed">{description}</p>
        </div>
      )}

      {/* MIDI Stats grid */}
      {validation && (
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">
            Generation Stats
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">Duration</p>
              <p className="text-white font-medium">
                {validation.stats.duration}s
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">Total Notes</p>
              <p className="text-white font-medium">
                {validation.stats.total_notes}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">Note Density</p>
              <p className="text-white font-medium">
                {validation.stats.note_density}/s
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">Pitch Range</p>
              <p className="text-white font-medium">
                {validation.stats.lowest_note} – {validation.stats.highest_note}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">Avg Velocity</p>
              <p className="text-white font-medium">
                {validation.stats.avg_velocity}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">Quality Score</p>
              <p className="text-white font-medium">
                {Math.round(validation.score * 100)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Validation status */}
      <div className="flex items-center gap-2">
        <span className={passed ? "text-green-400" : "text-yellow-400"}>
          {passed ? "✓ Passed quality check" : "⚠ Generated with warnings"}
        </span>
      </div>

      {/* Download button */}
      <a
        href={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/outputs/${midiPath.split("/").pop()}`}
        download
        className="inline-flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-500/25"
      >
        ⬇ Download MIDI
      </a>
    </div>
  );
}
