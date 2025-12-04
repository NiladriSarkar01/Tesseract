import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Zap,
  ChevronRight,
  Terminal,
  Play,
  Globe,
  Shield,
  Cpu,
} from "lucide-react";
import TeaserTriggerButton from "./TeaserTriggerButton";

import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

// Placeholder for logo

// --- UTILS: Scramble Text Hook ---
const useScramble = (text, speed = 40) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [isHovered, text, speed]);

  return { displayText, setIsHovered };
};

// --- COMPONENT: Animated Dropdown Link ---
const AnimatedDropdownLink = ({ link, index, onClick }) => {
  const { displayText, setIsHovered } = useScramble(link.name);

  return (
    <Link
      to={link.to}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-cyan-500/30 bg-white/5 hover:bg-cyan-900/20 transition-all duration-300 overflow-hidden"
    >
      {/* Hover Scan Sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none"></div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="p-2 rounded-md bg-black/40 text-gray-500 group-hover:text-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300">
          <link.icon size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-300 group-hover:text-white tracking-widest transition-colors uppercase">
            {displayText}
          </span>
          <span className="text-[8px] font-mono text-gray-600 group-hover:text-cyan-500/70 transition-colors">
            COORD_0{index + 1}
          </span>
        </div>
      </div>

      {/* Animated Chevron */}
      <ChevronRight
        size={14}
        className="ml-auto text-gray-600 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
      />
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "HOME", to: "/", icon: Globe },
    { name: "EVENTS", to: "/events", icon: Zap },
    { name: "TEAM", to: "/team", icon: Shield },
    { name: "GALLERY", to: "/gallery", icon: Cpu },
    { name: "CONTACT", to: "/contact", icon: Cpu },
    { name: "BROCHURE", to: "#", icon: Terminal },
  ];

  return (
    <>
      {/* 1. Fixed Navbar Header */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b ${
          scrolled
            ? "bg-[#182924]/80 backdrop-blur-xl py-3 border-cyan-900/30 shadow-lg shadow-cyan-900/10"
            : "bg-transparent py-5 border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          {/* 1. LEFT: MENU TOGGLE BUTTON */}
          <div className="flex items-center justify-start flex-1 md:flex-none">
            <button
              className={`relative hidden md:flex z-[110] p-2 rounded-lg border transition-all duration-300 ${
                isOpen
                  ? "bg-red-600 border-red-500 text-white rotate-90"
                  : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {/* 2. LEFT: LOGO  */}
            <div className="flex md:hidden items-center justify-start flex-1 md:flex-none ">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative w-15 h-15 flex items-center justify-center bg-transparent  rounded-lg group-hover:bg-cyan-600/20 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-400 blur-md opacity-20 group-hover:opacity-40 animate-pulse"></div>
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-full h-full relative z-10 object-contain p-1"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* 2. CENTER: LOGO (Absolutely Centered) */}
          <div className="absolute hidden md:flex  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-15 h-15 flex items-center justify-center bg-transparent  rounded-lg group-hover:bg-cyan-600/20 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400 blur-md opacity-20 group-hover:opacity-40 animate-pulse"></div>
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full relative z-10 object-contain p-1"
                />
              </div>
            </Link>
          </div>

          {/* 3. RIGHT: ACTIONS (Teaser Only) */}
          <div className="flex items-center justify-end flex-1 md:flex-none gap-4">
            <div className="hidden md:flex items-center gap-3">
              <Link to="/teaser">
                <TeaserTriggerButton />
              </Link>
            </div>
            <button
              className={`relative md:hidden z-[110] p-2 rounded-lg border transition-all duration-300 ${
                isOpen
                  ? "bg-red-600 border-red-500 text-white rotate-90"
                  : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- DROPDOWN MENU CONTAINER (Holographic Data Stack) --- */}
        {/* UPDATED WIDTH: Increased to w-[400px] */}
        <div
          className={`absolute top-full left-0 w-full md:w-[400px] md:h-auto md:left-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isOpen
              ? "max-h-[75dvh] overflow-y-auto opacity-100 translate-y-2"
              : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          {/* The Card Body */}
          <div className="bg-[#081414]/95 backdrop-blur-2xl border border-cyan-500/30 border-t-0 rounded-b-2xl shadow-2xl shadow-black overflow-hidden mx-4 md:mx-0 relative">
            {/* Decorative Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            <div className="p-6 relative z-10 flex flex-col gap-1">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <p className="text-[10px] font-mono text-cyan-500/70 uppercase tracking-widest animate-pulse">
                  // System_Nav_Active
                </p>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <AnimatedDropdownLink
                    key={link.name}
                    link={link}
                    index={idx}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>

              {/* Actions Section */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                {/* Register Button - Now in Dropdown for both Mobile & Desktop */}
                <Link
                  to="/register"
                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-center uppercase text-xs tracking-wider rounded transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                  onClick={() => setIsOpen(false)}
                >
                  Initialize Registration
                </Link>

                {/* Teaser Button - Visible ONLY on Mobile (md:hidden) to avoid duplicate on Desktop */}
                <Link
                  to="/teaser"
                  onClick={() => setIsOpen(false)}
                  className="md:hidden w-full py-3 border border-white/10 text-gray-400 font-bold text-center uppercase text-xs tracking-wider hover:text-white hover:border-cyan-500/50 transition-colors flex items-center justify-center gap-2 rounded bg-black/40"
                >
                  <Play size={10} /> View Trailer
                </Link>
              </div>
            </div>

            {/* Footer Decor */}
            <div className="bg-black/60 p-2 flex justify-center items-center border-t border-white/5">
              <div className="flex items-center gap-2 text-[8px] font-mono text-gray-600 uppercase tracking-widest">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
                Secure_Connection_Established
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Spacer Div */}
      <div className="h-[80px] w-full" aria-hidden="true"></div>

      <style>{`
        @keyframes scan-horizontal {
          0% { transform: translateX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes scan-down {
          0% { top: -10%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes scan-fast {
           0% { transform: translateX(-100%); }
           100% { transform: translateX(100%); }
        }
        @keyframes shimmer {
           0% { background-position: 200% 0; }
           100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
