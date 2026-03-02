import React, { useEffect, useState, useRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

/** Utility: cn */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- 1. SPOTLIGHT (Activated & Tuned) ---
const Spotlight = ({ className, fill = "white" }) => {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1]  h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
          />
        </filter>
      </defs>
    </svg>
  );
};

// --- 2. 3D ROTATING TESSERACT (New Visual) ---
const RotatingTesseract = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5] opacity-20 md:opacity-40 scale-75 md:scale-100">
      <div className="relative w-64 h-64 [perspective:1000px]">
        {/* Outer Cube */}
        <motion.div
          animate={{ rotateX: 360, rotateY: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full [transform-style:preserve-3d]"
        >
          {/* Faces of Outer Cube */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`outer-${i}`}
              className="absolute inset-0 border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-[1px]"
              style={{
                transform: `rotateY(${i * 90}deg) rotateX(${
                  i === 4 ? 90 : i === 5 ? -90 : 0
                }deg) translateZ(128px)`,
              }}
            />
          ))}
        </motion.div>

        {/* Inner Cube (The Tesseract Core) - Rotates Opposite */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotateX: -360, rotateY: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            className="w-32 h-32 [transform-style:preserve-3d]"
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={`inner-${i}`}
                className="absolute inset-0 border-2 border-dashed border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                style={{
                  transform: `rotateY(${i * 90}deg) rotateX(${
                    i === 4 ? 90 : i === 5 ? -90 : 0
                  }deg) translateZ(64px)`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// --- 3. DECODER TEXT (Optimized) ---
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

const DecoderText = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let frame = 0;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;

        // slow down randomness updates ⇒ smooth feel
        const updateRate = 2; // update every 2 frames instead of every frame
        if (frame % updateRate !== 0) return;

        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < Math.floor(iteration)) {
                return text[index]; // LOCKED IN, no more random flickering
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setDone(true);
        }

        // slower progress per step ⇒ buttery smooth decode
        iteration += 0.2;
      }, 40); // slower interval for smoothness
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return <span className={className}>{done ? text : displayText}</span>;
};

// --- 4. PARTICLES (Existing but applied better) ---
const Particles = () => {
  return (
    <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/30"
          initial={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
          }}
        />
      ))}
    </div>
  );
};

// --- 5. MAIN HERO ---
const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-transparent flex items-center justify-center font-sans selection:bg-cyan-500/30">
      {/* --- BACKGROUND LAYERS --- */}

      {/* 1. Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* 2. Spotlight (Top Light) */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="cyan" />
      <Spotlight
        className="-top-40 right-0 md:right-60 md:-top-20"
        fill="purple"
      />

      {/* 3. Particles */}
      <Particles />

      {/* 4. The 3D Tesseract Wireframe (Behind Text) */}
      <RotatingTesseract />

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center h-full">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-1 mb-6"
        >
          {/* Top Line */}
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-cyan-500/50" />
            <span className="text-cyan-400/80 text-xs md:text-sm tracking-[0.3em] font-medium uppercase text-center">
              Guru Nanak Institute of Technology
            </span>
            <div className="h-[1px] w-8 bg-cyan-500/50" />
          </div>

          {/* New Line — "Presents" */}
          <span className="text-cyan-500/70 text-[10px] md:text-xs tracking-[0.35em] font-semibold uppercase">
            Presents
          </span>
        </motion.div>

        {/* MAIN TITLE GROUP */}
        <div className="relative group cursor-default">
          {/* The Glitch Layers (Visible on Hover) */}
          <h1 className="absolute top-0 left-0 w-full text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-red-500/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-100 select-none">
            TESSERACT
          </h1>
          <h1 className="absolute top-0 left-0 w-full text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-blue-500/40 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-100 select-none">
            TESSERACT
          </h1>

          {/* The Main Text */}
          <h1 className="relative text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter text-white mix-blend-screen z-20">
            <DecoderText text="TESSERACT" />
          </h1>

          {/* 2026 Subtext */}
          <div className="absolute -bottom-4 right-0 md:right-4">
            <span className="text-4xl z-50 md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-purple-500 to-white opacity-80 italic">
              2026
            </span>
          </div>
        </div>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 text-center text-gray-400 max-w-lg text-sm md:text-base leading-relaxed"
        >
          Enter the multidimensional realm of innovation. Where code meets
          creativity and logic defies the laws of physics.
        </motion.p>

        {/* Interactive Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
          className="mt-12 flex flex-col md:flex-row gap-6 items-center"
        >
          {/* Primary Button */}
          <Link to={"/register"}>
            <button className="relative px-8 py-3 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-cyan-400 transition-colors duration-300 clip-path-button">
              Register Now
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-black" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-black" />
            </button>
          </Link>

          {/* Secondary Button (Glass) */}
          <Link to={"/events"}>
            <button className="px-8 py-3 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-medium uppercase tracking-wider text-sm hover:bg-white/10 transition-colors">
              Explore Events
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Styles for animation support */}
      <style jsx>{`
        .animate-spotlight {
          animation: spotlight 4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s 1 forwards;
        }

        @keyframes spotlight {
          0% {
            opacity: 0;
            transform: translate(-72%, -62%) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -40%) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
