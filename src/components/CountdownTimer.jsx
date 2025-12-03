import React, { useState, useEffect } from 'react';
import { ChevronRight, Terminal, Activity } from 'lucide-react';
import { targetDate } from '../utils/Constants';

// Raw Data Time Unit
  const TimeUnit = ({ value, label, isLast }) => (
    <div className="flex items-baseline">
      <div className="flex flex-col items-center">
        <span className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none relative group cursor-default">
          {String(value).padStart(2, '0')}
          {/* Hover Glitch Effect Layer */}
          <span className="absolute top-0 left-0 w-full h-full text-cyan-500 opacity-0 group-hover:opacity-40 group-hover:translate-x-1 transition-all duration-100">
            {String(value).padStart(2, '0')}
          </span>
        </span>
        <span className="text-xs md:text-sm font-mono text-blue-500/60 uppercase tracking-[0.4em] mt-2 md:mt-4">
          {label}
        </span>
      </div>
      
      {!isLast && (
        <div className="mx-4 md:mx-12 h-16 md:h-32 w-px bg-cyan-900/40 transform rotate-12"></div>
      )}
    </div>
  );

const CountdownTimer = () => {

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6 font-sans text-white relative overflow-hidden">
      
      {/* --- PRESERVED BACKGROUND --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-600 to-transparent opacity-50"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      {/* --------------------------- */}

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        
        {/* New Header: Terminal Style */}
        <div className="mb-16 md:mb-24 text-center">
          <div className="flex items-center justify-center gap-2 text-green-500 font-mono text-sm mb-4 opacity-80">
            <Terminal size={14} />
            <span>EXEC_PROTOCOL: STARTUP</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white uppercase">
            Awaiting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">Signal</span>
          </h2>
        </div>

        {/* New Timer Layout: Raw & Linear */}
        <div className="flex flex-wrap justify-center items-end gap-y-12">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <TimeUnit value={timeLeft.seconds} label="Secs" isLast={true} />
        </div>

        {/* New Footer: Interactive Bar */}
        <div className="mt-24 w-full max-w-md">
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-cyan-500/50 w-2/3 animate-pulse"></div>
          </div>
          
          <div className="flex justify-between items-center text-xs font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-green-500 animate-pulse" />
              <span>SERVER_LIVE</span>
            </div>
            <button className="flex items-center gap-1 hover:text-cyan-400 transition-colors group">
              INITIATE_REMINDER <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CountdownTimer;