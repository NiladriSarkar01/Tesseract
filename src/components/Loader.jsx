import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// 1. MULTI-LANGUAGE TESSERACT ASSETS
// ==========================================

const tesseractTranslations = [
  "TESSERACT", // English
  "テセラクト", // Japanese
  "ТЕССЕРАКТ", // Russian
  "ΤΕΣΣΕΡΑΚΤ", // Greek
  "테세랙트", // Korean
  "टेसेरैक्ट", // Hindi
  "تسراكت", // Arabic
  "T3SS3R4CT", // Glitch/Leet
  "01010100", // Binary
  "█████████", // Redacted
  "T E S S E R A C T", // Spaced
];

// Reusable Multi-Language Text Component
const MultiLangText = ({ className = "text-4xl md:text-6xl" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Cycles rapidly through languages every 150ms
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tesseractTranslations.length);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow Effect */}
      <div
        className={`absolute ${className} font-black text-cyan-500 blur-xl opacity-50 select-none pointer-events-none`}
      >
        {tesseractTranslations[index]}
      </div>
      {/* Main Text */}
      <div
        className={`${className} font-black text-white tracking-widest drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]`}
      >
        {tesseractTranslations[index]}
      </div>
    </div>
  );
};

// Subtle CRT Scanline overlay
const ScanlineOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-20">
    <div className="w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px]" />
  </div>
);

// ==========================================
// 2. EXPORTED COMPONENTS
// ==========================================

// --- A. CyberLoader (Small Spinner for Guards) ---
export const CyberLoader = ({ text = "SYNCING", size = 150 }) => {
  return (
    <div className="flex bg-transparent flex-col items-center justify-center relative font-mono text-cyan-500 w-full h-full min-h-[200px]">
      <div className="relative flex items-center justify-center mb-6">
        {/* Minimal spinning border around the multi-lang text */}
        <div className="absolute inset-0 scale-150 border border-cyan-500/30 rounded-full border-t-cyan-400 animate-[spin_2s_linear_infinite]" />
        <div className="absolute inset-0 scale-125 border border-cyan-500/10 rounded-full border-b-blue-500 animate-[spin_3s_linear_infinite_reverse]" />

        <MultiLangText className="text-xl md:text-2xl" />
      </div>
      <div className="mt-8 text-xs tracking-[0.4em] font-bold animate-pulse text-cyan-400">
        {`> ${text} <`}
      </div>
    </div>
  );
};

// --- B. TesseractLoader (Medium Spinner for Layouts) ---
export const TesseractLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[300px] bg-transparent font-mono">
      <MultiLangText className="text-3xl md:text-4xl" />
    </div>
  );
};

// --- C. LogoLoader (Full Screen Intro - Default Export) ---
const LogoLoader = ({ isLoading = true, fullScreen = true }) => {
  const [progress, setProgress] = useState(0);
  const [activeText, setActiveText] = useState("INITIALIZING");

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }

    const texts = [
      "TRANSLATING PROTOCOLS",
      "DECRYPTING MULTIVERSE",
      "SYNCING NEURAL NET",
      "RENDERING REALITY",
    ];

    const textInterval = setInterval(() => {
      setActiveText(texts[Math.floor(Math.random() * texts.length)]);
    }, 1000);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const jump = Math.random() < 0.2 ? 15 : 1;
        return Math.min(prev + jump, 100);
      });
    }, 80);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [isLoading]);

  const containerClass = fullScreen
    ? "fixed inset-0 z-[9999] bg-black text-white"
    : "relative w-full h-[600px] bg-black text-white overflow-hidden rounded-xl border border-white/10";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="master-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className={`${containerClass} flex flex-col items-center justify-center font-mono overflow-hidden`}
        >
          {/* Background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f172a_0%,#000000_100%)]" />
          <ScanlineOverlay />

          {/* Main Multi-Language Text Centerpiece */}
          <div className="relative z-10 flex items-center justify-center h-48">
            <MultiLangText className="text-5xl md:text-7xl lg:text-8xl" />
          </div>

          {/* Progress & Status HUD */}
          <div className="relative z-20 mt-16 w-64 md:w-96">
            <div className="flex justify-between items-end mb-2 h-6">
              <span className="text-cyan-500 text-xs tracking-[0.2em] font-bold">
                {activeText}
              </span>
              <span className="text-white text-xs font-bold">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-1 bg-gray-900 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-cyan-400"
                style={{ width: `${progress}%` }}
                layoutId="progBar"
              >
                <div className="absolute right-0 top-0 h-full w-4 bg-white blur-[2px]" />
              </motion.div>
            </div>

            {/* Decorative UI Brackets */}
            <div className="absolute -left-4 top-0 bottom-0 w-2 border-l border-t border-b border-cyan-500/30 h-full" />
            <div className="absolute -right-4 top-0 bottom-0 w-2 border-r border-t border-b border-cyan-500/30 h-full" />
          </div>

          {/* Footer Technical Data */}
          <div className="absolute bottom-10 flex gap-8 text-[10px] text-cyan-900/60 tracking-widest uppercase">
            <span>LOCALIZATION: MULTIPLE</span>
            <span>//</span>
            <span>SYS.BOOT.SEQ</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoLoader;
