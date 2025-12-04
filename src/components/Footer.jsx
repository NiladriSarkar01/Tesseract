import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  ChevronRight,
  Zap,
  MapPin,
  Globe,
  Code,
  Terminal,
  Activity,
  Cpu,
  Wifi,
  Bot,
} from "lucide-react";
import { targetDate } from "../utils/Constants";
import logo from "../assets/logo.png";

// --- UTILS: Reveal Animation Hook & Component ---
const useElementOnScreen = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const optionsRef = useRef(options);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (containerRef.current) observer.unobserve(containerRef.current);
      }
    }, optionsRef.current);

    const currentElement = containerRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return [containerRef, isVisible];
};

const Reveal = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useElementOnScreen({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${className} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Reusable Terminal Container Component
const TerminalBox = ({
  title,
  children,
  statusColor = "green",
  statusText = "ONLINE",
}) => {
  const statusColors = {
    green: "text-green-500/80",
    blue: "text-blue-500/80",
    yellow: "text-yellow-500/80",
  };

  return (
    <div className="relative h-full bg-[#050a10] border border-white/10 rounded-xl p-1 overflow-hidden group hover:border-cyan-500/30 transition-colors flex flex-col">
      {/* Terminal Header - Compact Padding */}
      <div className="bg-white/5 px-3 py-1.5 flex items-center justify-between border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-blue-500" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wide">
            {title}
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500 transition-colors"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors"></div>
        </div>
      </div>

      {/* Terminal Body - Reduced Padding, Larger Font */}
      <div className="p-2 font-mono text-sm relative grow flex flex-col">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        <div className="relative z-10 grow">{children}</div>
        {/* Mini Status Bar */}
        <div className="mt-auto pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="animate-pulse text-green-500">●</span>
            SYS:{" "}
            <span className={statusColors[statusColor] || statusColors.green}>
              {statusText}
            </span>
          </span>
          <Wifi size={10} className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <footer className="relative bg-[#0a1a1e] border-t border-cyan-900/30 pt-8 pb-4 overflow-hidden text-white font-sans">
      {/* 1. Background Effects */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-grid-scroll"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-600/50 to-transparent"></div>
      <div className="absolute top-0 left-0 w-1/4 h-0.5 bg-cyan-500 blur-xs animate-scan-line"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* --- TOP ROW: COMPACT HEADER CARD --- */}
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-[#0a0a0a] border border-white/10 p-4 rounded-xl relative overflow-hidden group shadow-xl">
            {/* Hover Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              {/* Logo Box (Compact) */}
              <div className="relative w-9 h-9 flex items-center justify-center bg-cyan-600/10 border border-cyan-500/50 rounded group-hover:bg-cyan-600/20 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 group-hover:opacity-40 animate-pulse"></div>
                <img
                  src={logo}
                  alt="Tesseract Logo"
                  className="w-50 h-50 relative z-10 group-hover:scale-110 transition-transform object-contain"
                />
              </div>

              <div>
                {/* Reduced Brand Name Font */}
                <h2 className="text-2xl font-black tracking-tighter text-white leading-none mb-0.5">
                  TESSERACT<span className="text-cyan-500">.IO</span>
                </h2>
                {/* Reduced Subtitle Font */}
                <p className="text-gray-400 text-[10px] font-medium tracking-wide uppercase">
                  The Next Gen Techno-Cultural Phenomenon
                </p>
              </div>
            </div>

            {/* Compact Social Icons */}
            <div className="flex gap-2 mt-4 md:mt-0 relative z-10">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-300 shadow-md"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* --- MIDDLE ROW: 3 TERMINAL LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          {/* TERMINAL 1: NAV LINKS (3 Cols) */}
          <Reveal className="md:col-span-3" delay={100}>
            <TerminalBox title="NAV_LINKS.SYS">
              <ul className="space-y-0.5">
                {["Home", "Events", "Sponsors", "Team"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="group flex items-center justify-between text-gray-400 hover:text-white transition-colors py-1 px-2 rounded hover:bg-white/5 border-l-2 border-transparent hover:border-cyan-500"
                    >
                      {/* Increased Font Size */}
                      <span className="tracking-wide text-xs uppercase font-semibold">
                        {item}
                      </span>
                      <ChevronRight
                        size={14}
                        className="text-blue-600 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </TerminalBox>
          </Reveal>

          {/* TERMINAL 2: DEV TEAM (5 Cols) */}
          <Reveal className="md:col-span-6" delay={300}>
            <TerminalBox
              title="DEV_TEAM.EXE"
              statusColor="blue"
              statusText="BUSY"
            >
              <div className="h-full flex flex-col">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10 mb-1">
                  {[
                    { name: "Arghya", role: "arghya45-dev" },
                    { name: "Niladri", role: "blueBird" },
                    { name: "Aritra", role: "Rakebeery" },
                    { name: "Aikik", role: "Aikik-patra" },
                  ].map((dev, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-1.5 rounded border border-white/5 hover:bg-white/5 hover:border-cyan-500/20 transition-all cursor-pointer group/dev"
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Code
                          size={12}
                          className="text-blue-500/50 group-hover/dev:text-cyan-400"
                        />
                        {/* Increased Name Font */}
                        <span className="text-gray-300 group-hover/dev:text-white font-bold text-xs">
                          {dev.name}
                        </span>
                      </div>
                      {/* Slightly Increased Role Font */}
                      <span className="text-[10px] text-gray-600 group-hover/dev:text-cyan-400/80">
                        {dev.role}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-end justify-between border-t border-white/5 pt-1.5">
                  <div className="flex items-center gap-3">
                    {/* UPDATED ANIMATION: PATROL BOT */}
                    <div className="relative animate-patrol-bot">
                      <Bot
                        size={20}
                        className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
                      />
                      <div className="absolute top-1 left-1.5 w-1 h-0.5 bg-cyan-500 animate-ping"></div>
                    </div>
                    <div className="flex gap-0.5 ml-1">
                      <div className="w-1 h-1 bg-cyan-500/50 animate-pulse"></div>
                      <div className="w-1 h-1 bg-cyan-500/50 animate-pulse delay-75"></div>
                      <div className="w-1 h-1 bg-cyan-500/50 animate-pulse delay-150"></div>
                    </div>
                  </div>

                  {/* Timer Font */}
                  <div className="text-[10px] text-green-500/80 font-mono flex items-center gap-1.5 animate-glitch-text">
                    <Activity size={12} className="animate-pulse" />
                    T-COMPILATION:{" "}
                    <span className="text-green-400 font-bold tracking-wide">
                      {`[${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s]`}
                    </span>
                  </div>
                </div>
              </div>
            </TerminalBox>
          </Reveal>

          {/* TERMINAL 3: UPLINK (4 Cols) */}
          <Reveal className="md:col-span-3" delay={500}>
            <TerminalBox title="UPLINK.DAT">
              <div className="space-y-1.5">
                <div className="p-1.5 rounded border border-white/5 hover:border-cyan-500/30 transition-all group cursor-default">
                  <div className="flex items-center gap-2 mb-0.5 text-blue-400/80">
                    <MapPin size={12} />
                    {/* Increased Label Font */}
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      HQ_COORDS
                    </span>
                  </div>
                  {/* Increased Content Font */}
                  <p className="text-gray-400 text-xs pl-5 leading-snug group-hover:text-gray-200">
                    157/F, Nilgunj Rd, Panihati, Khardaha,
                    <br />
                    West Bengal 700110
                  </p>
                </div>

                <a
                  href="mailto:contact@techverse.io"
                  className="block p-1.5 rounded border border-white/5 hover:border-cyan-500/30 hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-0.5 text-blue-400/80">
                    <Mail size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      TRANSMISSION
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs pl-5 group-hover:text-white">
                    contact@tesseract.io
                  </span>
                </a>
              </div>
            </TerminalBox>
          </Reveal>
        </div>

        {/* --- BOTTOM BAR --- */}
        <Reveal delay={600}>
          <div className="border-t border-white/5 pt-3 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] uppercase tracking-widest text-gray-600 font-mono">
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-blue-900" />
              <p>
                © 2026 Tesseract. <span className="text-gray-800 mx-1">|</span>{" "}
                LATENCY: 12ms
              </p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-cyan-500 transition-colors">
                PRIVACY_PROTOCOL
              </a>
              <a href="#" className="hover:text-cyan-500 transition-colors">
                TERMS_OF_ENGAGEMENT
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Global Styles for Animations */}
      <style>{`
        @keyframes scan-line {
          0% { left: -25%; }
          100% { left: 100%; }
        }
        .animate-scan-line {
          animation: scan-line 4s linear infinite;
        }
        
        @keyframes grid-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        .animate-grid-scroll {
          animation: grid-scroll 3s linear infinite;
        }

        /* NEW PATROL ANIMATION: Moves left/right */
        @keyframes patrol-bot {
          0% { transform: translateX(0); }
          25% { transform: translateX(15px); }
          50% { transform: translateX(0); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .animate-patrol-bot {
          animation: patrol-bot 5s ease-in-out infinite;
        }

        /* GLITCH TEXT EFFECT */
        @keyframes glitch-text {
          0%, 95% { opacity: 1; transform: translate(0); }
          96% { opacity: 0.8; transform: translate(-2px, 1px); }
          97% { opacity: 1; transform: translate(1px, -1px); }
          98% { opacity: 0.9; transform: translate(0, 2px); }
          99% { opacity: 1; transform: translate(-1px, 0); }
          100% { opacity: 1; transform: translate(0); }
        }
        .animate-glitch-text {
          animation: glitch-text 4s infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
