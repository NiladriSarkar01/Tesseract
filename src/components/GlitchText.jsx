import React from 'react';

// Move GlitchText outside so it's not recreated on every render
const Glitch = ({ text, className }) => (
  <div className={`relative inline-block group cursor-default ${className}`}>
    {/* Main Text Layer */}
    <span className="relative z-10">{text}</span>
    
    {/* Glitch Layer 1 (Red) - Visible on Hover/Interaction */}
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-600 opacity-0 group-hover:opacity-70 group-hover:translate-x-0.5 animate-pulse duration-75 select-none">
      {text}
    </span>
    
    {/* Glitch Layer 2 (Orange) - Visible on Hover/Interaction */}
    <span className="absolute top-0 left-0 -z-10 w-full h-full text-purple-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-0.5 animate-pulse duration-100 select-none">
      {text}
    </span>
  </div>
);

const GlitchText = () => {
  return (
    <div className="bg-[#0f0202] min-h-[300px] flex flex-col justify-center items-center p-12">
      {/* Container to simulate the hero section context */}
      <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[1.1] text-white text-center">
        <Glitch
          text="TESSARACT." 
          className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-white to-purple-400 drop-shadow-[0_0_30px_rgba(239,68,68,0.4)]" 
        />
      </h1>
    </div>
  );
};

export default GlitchText;