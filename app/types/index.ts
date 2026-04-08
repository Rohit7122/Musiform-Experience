// What we send to the backend
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

// MIDI statistics from backend
export interface MidiStats {
  duration: number;
  total_notes: number;
  note_density: number;
  pitch_range: number;
  avg_velocity: number;
  lowest_note: string;
  highest_note: string;
}

// What the backend streams back
export interface StreamEvent {
  type: "node_start" | "node_end" | "llm_token" | "complete";
  node?: string;
  message?: string;
  content?: string;
  midi_path?: string;
  description?: string;
  passed?: boolean;
  validation?: {
    score: number;
    stats: MidiStats;
  };
}

// Node progress for UI
export interface NodeProgress {
  name: string;
  label: string;
  status: "pending" | "running" | "done";
}
