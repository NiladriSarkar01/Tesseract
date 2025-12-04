import React from "react";
import { Play, Zap } from "lucide-react";

const TeaserTriggerButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-2 px-1.5 py-1.5 bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-full transition-all duration-500 hover:px-4 hover:border-cyan-500 hover:bg-cyan-900/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]"
    >
      {/* Animated Pulse Ring (Behind) */}
      <span className="absolute inset-0 rounded-full border border-cyan-500/50 opacity-0 group-hover:animate-ping"></span>

      {/* Icon Container - Smaller for Navbar */}
      <div className="relative w-7 h-7 flex items-center justify-center bg-cyan-600 rounded-full shadow-lg shadow-cyan-900/50 group-hover:scale-110 transition-transform duration-300">
        <Play size={12} className="text-white fill-current ml-0.5" />

        {/* Spinning Border on Hover */}
        <div className="absolute inset-0 rounded-full border-t-2 border-white opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity"></div>
      </div>
    </button>
  );
};

export default TeaserTriggerButton;
