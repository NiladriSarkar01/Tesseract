import React, { useState, useEffect } from 'react';
import { ChevronRight, Terminal, Activity, Zap } from 'lucide-react';

// You can replace this with your import if needed: import { targetDate } from '../utils/Constants';
const DEFAULT_TARGET_DATE = new Date();
DEFAULT_TARGET_DATE.setDate(DEFAULT_TARGET_DATE.getDate() + 14); // Default to 14 days out

const TimeUnit = ({ value, label, isLast }) => (
  <div className="flex items-baseline">
    <div className="flex flex-col items-center relative group cursor-default">
      
      {/* Background ambient glow for numbers */}
      <div className="absolute inset-0 bg-blue-500/20 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>

      <span className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
        {String(value).padStart(2, '0')}
        
        {/* Cyan Glitch Overlay on Hover */}
        <span className="absolute top-0 left-0 w-full h-full text-cyan-400 opacity-0 group-hover:opacity-60 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-100 mix-blend-screen">
          {String(value).padStart(2, '0')}
        </span>
        {/* Blue Glitch Overlay on Hover */}
        <span className="absolute top-0 left-0 w-full h-full text-blue-600 opacity-0 group-hover:opacity-60 group-hover:-translate-x-1 group-hover:translate-y-0.5 transition-all duration-100 mix-blend-screen delay-75">
          {String(value).padStart(2, '0')}
        </span>
      </span>
      
      <span className="text-xs md:text-sm font-mono text-cyan-500/60 uppercase tracking-[0.4em] mt-4 border-t border-blue-900/30 pt-2 w-full text-center group-hover:text-cyan-400 transition-colors">
        {label}
      </span>
    </div>
    
    {!isLast && (
      <div className="mx-4 md:mx-12 h-16 md:h-24 w-[2px] bg-gradient-to-b from-transparent via-blue-900/50 to-transparent transform rotate-12 relative">
        {/* Glowing divider pulse */}
        <div className="absolute top-0 left-0 w-full h-full bg-cyan-400/20 animate-pulse"></div>
      </div>
    )}
  </div>
);

const CountdownTimer = ({ targetDate = DEFAULT_TARGET_DATE }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = new Date(targetDate) - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 font-sans text-white relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* --- BLUE CYBER BACKGROUND --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0f172a] via-[#02040a] to-black pointer-events-none"></div>
      
      {/* Moving Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [perspective:1000px] pointer-events-none opacity-40"></div>
      
      {/* Energy Beams */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 box-shadow-[0_0_10px_#3b82f6]"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
      
      {/* Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse delay-1000"></div>
      {/* --------------------------- */}

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        
        {/* Header: System Status Style */}
        <div className="mb-20 md:mb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-green-950/20 backdrop-blur-md mb-6 hover:bg-green-900/30 transition-colors cursor-crosshair">
            <Zap size={14} className="text-cyan-400 fill-current animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
              Protocol: Cold_Fusion
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase flex flex-col md:block">
            <span className="text-gray-500 text-xl md:text-2xl font-mono tracking-widest mb-2 block md:inline md:mr-4">AWAITING</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              SIGNAL_LOCK
            </span>
          </h2>
        </div>

        {/* Timer Layout: Raw & Linear */}
        <div className="flex flex-wrap justify-center items-end gap-y-12">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <TimeUnit value={timeLeft.seconds} label="Secs" isLast={true} />
        </div>

        {/* Footer: Interactive Status Bar */}
        <div className="mt-24 w-full max-w-md">
          {/* Progress Line */}
          <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-1/2 animate-[shimmer_2s_infinite_linear]"></div>
          </div>
          
          <div className="flex justify-between items-center text-xs font-mono text-blue-400/60">
            <div className="flex items-center gap-2 group cursor-help">
              <Activity size={14} className="text-cyan-500 animate-pulse" />
              <span className="group-hover:text-cyan-300 transition-colors">SERVER_ONLINE</span>
            </div>
            
            <button className="flex items-center gap-2 hover:text-white transition-colors group bg-white/5 hover:bg-cyan-500/20 px-3 py-1.5 rounded border border-transparent hover:border-cyan-500/30">
              <Terminal size={12} />
              <span>INIT_REMINDER</span>
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform text-cyan-400" />
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer;