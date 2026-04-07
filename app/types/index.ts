// Send to Backend
export interface UserRequest {
  input_mode: "mood" | "custom";
  mood?: "Sad" | "Happy" | "Mysterious" | "Energetic" | "Calm" | "Romantic";
  key?: "C" | "D" | "E" | "F" | "G" | "A" | "B";
  mode?: "Major" | "Minor" | "Dorian";
  style: "Classical" | "Jazz";
  texture: "Simple" | "Normal" | "Rich";
  creativity: number;
  duration: number;
  bpm: number;
}

// Sending Backend streams back
export interface StreamEvent {
  type: "node_start" | "node_end" | "llm_token" | "complete";
  node?: string;
  message?: string;
  content?: string;
  midi_path?: string;
  description?: string;
  passed?: boolean;
}

// Node progress for UI
export interface NodeProgress {
  name: string;
  label: string;
  status: "pending" | "running" | "done";
}
