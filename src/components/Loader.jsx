import React from "react";

const CyberLoader = ({ text = "SYNCING DATA", size = 150 }) => {
  return (
    <div
      className="flex flex-col items-center justify-center relative font-mono"
      style={{ "--loader-size": `${size}px` }}
    >
      {/* INLINE STYLES FOR CUSTOM ANIMATIONS 
         (Keeps your tailwind.config.js clean)
      */}
      <style>{`
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes text-flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; text-shadow: 0 0 10px #00fff2; }
          20%, 24%, 55% { opacity: 0.5; text-shadow: none; }
        }
      `}</style>

      {/* --- LOADER WRAPPER --- */}
      <div
        className="relative flex justify-center items-center"
        style={{ width: size, height: size }}
      >
        {/* Outer Ring - Cyan Dashed */}
        <div className="absolute w-full h-full rounded-full border-2 border-dashed border-[#0066ff] border-t-transparent border-l-transparent animate-[spin_4s_linear_infinite] shadow-[0_0_15px_rgba(0,102,255,0.3)]"></div>

        {/* Middle Ring - Cyan Solid with Reverse Spin */}
        <div
          className="absolute w-[70%] h-[70%] rounded-full border-4 border-transparent border-t-[#00fff2] border-b-[#00fff2] shadow-[0_0_20px_rgba(0,255,242,0.5)] drop-shadow-[0_0_5px_rgba(0,255,242,1)]"
          style={{ animation: "spin-reverse 2s linear infinite" }}
        >
          {/* Decorative dots on middle ring */}
          <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#00fff2] rounded-full shadow-[0_0_10px_#00fff2]"></div>
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#00fff2] rounded-full shadow-[0_0_10px_#00fff2]"></div>
        </div>

        {/* Inner Ring - Blue Pulse */}
        <div className="absolute w-[40%] h-[40%] rounded-full border-2 border-[#0066ff] opacity-60 animate-[pulse_2s_ease-in-out_infinite]"></div>

        {/* Core - The glowing center */}
        <div className="absolute w-[20%] h-[20%] bg-[#00fff2] rounded-full shadow-[0_0_10px_#00fff2,0_0_30px_#00fff2,0_0_60px_#0066ff] animate-pulse"></div>
      </div>

      {/* --- GLITCH TEXT --- */}
      <div
        className="mt-8 text-[#00fff2] text-lg tracking-[4px] uppercase font-bold relative"
        style={{ animation: "text-flicker 3s infinite" }}
      >
        {`> ${text} <`}
      </div>
    </div>
  );
};

export default CyberLoader;
