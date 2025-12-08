import React from "react";
import Background from "./VideoBackground.jsx"; // Import your component

const VideoSection = () => {
  return (
    <div className="relative w-full h-[90dvh] md:h-[93vh] overflow-hidden bg-black font-sans">
      {/* 1. The Video Layer */}
      <video
        src="/src/assets/marvel.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* 2. The SVG Mask Layer */}
      <div className="absolute inset-0 z-10 bg-transparent">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="text-mask">
              <rect width="100%" height="100%" fill="white" />
              {/* --- THE FIX IS HERE --- */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                // 1. Set a huge base font size so it has enough "raw material" to stretch.
                // Removed tracking-tighter as SVG will handle spacing now.
                className="font-black text-[30vw]"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  // Slightly reduced vertical stretch for better proportions
                  transform: "scaleY(1.3)",
                }}
                // 2. FORCE the text to occupy exactly 90% of the SVG width.
                // This guarantees it will never overflow the frame.
                textLength="90%"
                // 3. Tell SVG to squeeze spacing AND glyphs to fit that 90% width.
                lengthAdjust="spacingAndGlyphs"
              >
                TESSERACT
              </text>
              {/* ----------------------- */}
            </mask>
          </defs>

          <foreignObject
            x="0"
            y="0"
            width="100%"
            height="100%"
            mask="url(#text-mask)"
          >
            <div className="w-full h-full relative">
              <Background />
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* 3. The Top Text Layer (Overlays) */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-8 md:p-10 pointer-events-none">
        {/* Top Text */}
        <div className="text-center w-full">
          <h2 className="text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-bold tracking-[0.2em] uppercase opacity-80 leading-relaxed">
            Gurunanak Institute of Technology
          </h2>
          <p className="text-white text-[9px] sm:text-[10px] md:text-xs font-light tracking-widest uppercase opacity-60 mt-1 md:mt-2">
            Presents
          </p>
        </div>

        {/* Bottom Right Text */}
        <div className="text-center sm:text-right w-full sm:w-auto self-center sm:self-end mb-4 sm:mb-0">
          <p className="text-white text-[10px] sm:text-xs md:text-sm font-medium tracking-wider opacity-70 max-w-[280px] sm:max-w-md mx-auto sm:mx-0">
            Let’s pick up right where we left off —{" "}
            <span className="font-bold text-white/90">
              and take it even further.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
