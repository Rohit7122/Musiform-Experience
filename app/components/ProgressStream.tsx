"use client";

import { NodeProgress } from "../types";

interface ProgressStreamProps {
  nodes: NodeProgress[];
  description: string;
  isGenerating: boolean;
}

const NODE_LABELS: Record<string, string> = {
  build_config: "Building generation parameters",
  generate: "Generating music with AI model",
  validate: "Validating music quality",
  describe: "Writing musical description",
};

export default function ProgressStream({
  nodes,
  description,
  isGenerating,
}: ProgressStreamProps) {
  // Don't render anything until generation starts or there is progress to show.
  if (!isGenerating && nodes.length === 0) return null;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">
        Generation Progress
      </h3>

      {/* Node progress steps */}
      <div className="space-y-3">
        {Object.entries(NODE_LABELS).map(([nodeName, label]) => {
          const node = nodes.find((n) => n.name === nodeName);
          const status = node?.status ?? "pending";

          return (
            <div key={nodeName} className="flex items-center gap-3">
              {/* Status icon */}
              <div className="w-6 h-6 flex items-center justify-center">
                {status === "done" && <span className="text-green-400">✓</span>}
                {status === "running" && (
                  <span className="animate-spin text-purple-400">⟳</span>
                )}
                {status === "pending" && (
                  <span className="text-gray-600">○</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-sm ${
                  status === "done"
                    ? "text-gray-300"
                    : status === "running"
                      ? "text-purple-300 font-medium"
                      : "text-gray-600"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Streaming description */}
      {description && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <p className="text-gray-300 text-sm leading-relaxed">
            {description}
            {/* Blinking cursor while streaming */}
            {isGenerating && (
              <span className="animate-pulse text-purple-400">▊</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
