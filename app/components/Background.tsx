"use client";

// Visual background layer used to add subtle glow and depth behind the app.
export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-gray-950 overflow-hidden">
      {/* Purple glow orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-purple-800/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-700/10 rounded-full blur-3xl" />
    </div>
  );
}
