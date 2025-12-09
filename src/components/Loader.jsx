import React from "react";
import logo from "../assets/logo.png";

export const CyberLoader = ({ text = "SYNCING DATA", size = 150 }) => {
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

export const TesseractLoader = () => {
  return (
    <div className="tesseract-wrapper flex flex-col items-center justify-center min-h-screen bg-transparent overflow-visible font-mono select-none">
      <div className="perspective-1000">
        <div className="loader-assembly">
          <img src={logo} alt="Tesseract Logo" className="t-logo-bg" />
          <div className="ring-wrapper">
            <div className="stabilizer-ring">
              <div className="tech-bit"></div>
            </div>
            <div className="stabilizer-ring"></div>
          </div>
        </div>
      </div>

      <style>{`
        .tesseract-wrapper {
        overflow: visible !important;
          --cyan-primary: #06b6d4;
          --cyan-bright: #22d3ee;
          --glow-color: rgba(34, 211, 238, 0.6);
      }


        /* Increase overall loader assembly size */
        .loader-assembly {
         overflow: visible !important;
          position: relative;
          width: 260px;      /* was 160px */
          height: 260px;     /* was 160px */
          transform-style: preserve-3d;
          animation: float 6s ease-in-out infinite;
        }

        /* Bigger tesseract cube */
        .tesseract-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 70px;      /* was 40px */
          height: 70px;     /* was 40px */
          margin-top: -35px;
          margin-left: -35px;
          transform-style: preserve-3d;
          animation: tumble 4s linear infinite;
        }

        .core-face {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(34, 211, 238, 0.2);
          border: 2px solid #fff;       /* slightly thicker for bigger size */
          box-shadow: 0 0 25px var(--cyan-bright);
        }

        /* Adjusted cube Z distances */
        .f1 { transform: rotateY(0deg) translateZ(35px); }
        .f2 { transform: rotateY(90deg) translateZ(35px); }
        .f3 { transform: rotateY(180deg) translateZ(35px); }
        .f4 { transform: rotateY(-90deg) translateZ(35px); }
        .f5 { transform: rotateX(90deg) translateZ(35px); }
        .f6 { transform: rotateX(-90deg) translateZ(35px); }

        /* Bigger glowing center */
        .inner-power {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 35px;        /* was 20px */
          height: 35px;       /* was 20px */
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 30px 15px var(--cyan-bright);
          animation: pulse-core 0.5s ease-in-out infinite alternate;
        }

        /* Bigger containment rings */
        .stabilizer-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -120px;     /* was -70px */
          margin-top: -120px;
          width: 240px;            /* was 140px */
          height: 240px;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: var(--cyan-bright);
          border-bottom-color: var(--cyan-bright);
          box-shadow: 0 0 25px var(--glow-color);
          animation: spin 3s linear infinite;
        }

        .stabilizer-ring:nth-child(2) {
          width: 280px;          /* was 160px */
          height: 280px;
          margin-left: -140px;
          margin-top: -140px;
          border-left-color: var(--cyan-primary);
          border-right-color: var(--cyan-primary);
          border-top-color: transparent;
          border-bottom-color: transparent;
          animation: spin-reverse 5s linear infinite;
        }

        .tech-bit {
          position: absolute;
          top: -6px;      /* larger */
          left: 50%;
          transform: translateX(-50%);
          width: 12px;    /* was 8px */
          height: 12px;
          background: white;
          box-shadow: 0 0 15px white;
        }

        @keyframes spin { 
          0% { transform: rotateX(70deg) rotateZ(0deg); } 
          100% { transform: rotateX(70deg) rotateZ(360deg); } 
        }
        @keyframes spin-reverse { 
          0% { transform: rotateX(70deg) rotateZ(360deg); } 
          100% { transform: rotateX(70deg) rotateZ(0deg); } 
        }

        @keyframes tumble {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        @keyframes pulse-core {
          0% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1.6); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </div>
  );
};
