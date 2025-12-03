import React from 'react';
import Background from './VideoBackground.jsx'; // Import your component

const VideoSection = () => {
  return (
    <div className="relative w-full h-[93vh] overflow-hidden bg-black font-sans">
      
      {/* 1. The Video Layer (Bottom - Visible through the text) */}
      <video 
        src="/src/assets/marvel.mp4" 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* 2. The SVG Mask Layer (Middle) */}
      <div className="absolute inset-0 z-10 bg-transparent">
        <svg className="w-full h-full">
          <defs>
            <mask id="text-mask">
              {/* White = Visible (The Background Component) */}
              <rect width="100%" height="100%" fill="white" />
              
              {/* Black = Invisible (The Text Hole for Video) */}
              <text 
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                dominantBaseline="middle"
                className="font-black tracking-tighter text-[15vw] md:text-[20vw]"
                style={{ transformBox: 'fill-box', transformOrigin: 'center', transform: 'scaleY(1.35)' }}
                fill="black"
              >
                TESSERACT
              </text>
            </mask>
          </defs>

          {/* The Magic: foreignObject allows us to put the React Component 
            INSIDE the SVG and apply the mask to it.
          */}
          <foreignObject x="0" y="0" width="100%" height="100%" mask="url(#text-mask)">
            {/* We force the background to be 100% height/width of the SVG.
                The mask cuts the hole in THIS component.
            */}
            <div className="w-full h-full relative">
               <Background />
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* 3. The Top Text Layer (Overlays) */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-10 pointer-events-none">
        {/* Top Text */}
        <div className="text-center">
          <h2 className="text-white text-sm md:text-base font-bold tracking-[0.2em] uppercase opacity-80">
            GURUNANAK INSTITUTE OF TECHNOLOGY
          </h2>
          <p className="text-white text-xs md:text-sm font-light tracking-widest uppercase opacity-60 mt-1">
            Presents
          </p>
        </div>

        {/* Bottom Right Text */}
        <div className="text-right">
          <p className="text-white text-xs md:text-sm font-medium tracking-wider opacity-70">
            Let’s pick up right where we left off — <span className="font-bold">and take it even further.</span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default VideoSection;