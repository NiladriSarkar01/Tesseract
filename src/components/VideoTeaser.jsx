import React, { useState, useEffect, useRef } from 'react';
import { Play, Volume2, VolumeX, Zap, ChevronRight, RefreshCw, Terminal, Shield, Cpu, Gamepad2, Music, Code, Globe, Lock } from 'lucide-react';
import { appName } from '../utils/Constants';

import themeSong from '../assets/themeSong.mp3';
import logo from '../assets/logo.png'

// const audioRef = useRef(null);

const VideoTeaser = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle, boot, security, reveal, hype, features, info, outro
  const [hypeWord, setHypeWord] = useState('');
  const [progress, setProgress] = useState(0);
  const [securityText, setSecurityText] = useState('SCANNING...');
  
  // Ref for the audio element
  const audioRef = useRef(null);
  // Extended Hype words
  const words = ["INNOVATE", "DISRUPT", "DOMINATE", "ASCEND", "CREATE", "CONQUER"];
  
  // Feature Icons for flash sequence
  const features = [
    { icon: Code, label: "HACKATHONS" },
    { icon: Gamepad2, label: "ESPORTS" },
    { icon: Cpu, label: "ROBOTICS" },
    { icon: Music, label: "PRO-SHOWS" },
    { icon: Globe, label: "NETWORKING" }
  ];
  const [activeFeature, setActiveFeature] = useState(0);

  const startTeaser = () => {
    setIsPlaying(true);
    setPhase('boot');
    // Play audio when teaser starts
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5; // Set default volume
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Audio play failed (likely blocked by browser):", error);
        });
      }
    }
  };
    // Handle Mute Toggle
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.muted = isMuted;
      }
    }, [isMuted]);

  // Main Animation Timeline
  useEffect(() => {
    if (!isPlaying) return;

    let timeouts = [];
    let intervals = [];

    // 1. Boot Sequence (0s - 3s)
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Variable speed for realism
        const jump = Math.random() > 0.8 ? 15 : 1;
        return Math.min(p + jump, 100);
      });
    }, 50);
    intervals.push(progressInterval);

    // 2. Security Scan (3s - 6s)
    timeouts.push(setTimeout(() => {
      setPhase('security');
      const secTexts = ["ENCRYPTING...", "VERIFYING HASH...", "BIOMETRIC SCAN...", "UPLINK SECURE"];
      let txtIdx = 0;
      const secInterval = setInterval(() => {
        setSecurityText(secTexts[txtIdx]);
        txtIdx++;
        if (txtIdx >= secTexts.length) clearInterval(secInterval);
      }, 700);
      intervals.push(secInterval);
    }, 3000));

    // 3. Logo Reveal (6s - 9s)
    timeouts.push(setTimeout(() => setPhase('reveal'), 6000));

    // 4. Hype Sequence (9s - 13s)
    timeouts.push(setTimeout(() => {
      setPhase('hype');
      let wordIndex = 0;
      
      const wordInterval = setInterval(() => {
        setHypeWord(words[wordIndex]);
        wordIndex++;
        if (wordIndex >= words.length) clearInterval(wordInterval);
      }, 600); // Slower, heavier hits
      intervals.push(wordInterval);

    }, 9000));

    // 5. Features Flash (13s - 16s)
    timeouts.push(setTimeout(() => {
      setPhase('features');
      let featIndex = 0;
      const featInterval = setInterval(() => {
        setActiveFeature(prev => (prev + 1) % features.length);
        featIndex++;
        if (featIndex > 8) clearInterval(featInterval); // Flash a few times
      }, 300); // Fast cuts
      intervals.push(featInterval);
    }, 13000));

    // 6. Info/Date (16s - 19s)
    timeouts.push(setTimeout(() => setPhase('info'), 16000));

    // 7. Outro / CTA (19s+)
    timeouts.push(setTimeout(() => {
      setPhase('outro');
      if (onComplete) onComplete();
    }, 19000));

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [isPlaying]);

  // --- RENDER PHASES ---

  const renderIdle = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black z-50 cursor-pointer group" onClick={startTeaser}>
      <div className="relative">
        <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
        <div className="relative w-24 h-24 rounded-full border-2 border-red-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.6)]">
            <Play size={32} className="text-white fill-current ml-1" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 text-center">
        <p className="text-red-500 font-mono text-sm tracking-[0.3em] animate-pulse">INITIALIZE_TRAILER_SEQUENCE</p>
      </div>
    </div>
  );

  const renderBoot = () => (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center font-mono z-40">
      <div className="w-80 mb-6">
        <div className="flex justify-between text-xs text-red-500 mb-2 font-bold tracking-widest">
          <span>SYSTEM_BOOT</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-red-900/20 rounded-sm overflow-hidden border border-red-900/50">
          <div className="h-full bg-red-600 transition-all duration-75 ease-linear" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="text-[10px] text-gray-500 space-y-1 font-mono h-32 overflow-hidden">
        <p>{'>'} BIOS_CHECK... OK</p>
        <p>{'>'} MEMORY_ALLOCATION... {progress * 12}MB</p>
        <p className={progress > 20 ? 'text-red-400' : 'hidden'}>{'>'} DECRYPTING_CORE_ASSETS...</p>
        <p className={progress > 40 ? 'text-red-400' : 'hidden'}>{'>'} LOADING_MODULES [GRAPHICS, AUDIO, NETWORK]...</p>
        <p className={progress > 60 ? 'text-red-400' : 'hidden'}>{'>'} ESTABLISHING_SECURE_UPLINK...</p>
        <p className={progress > 80 ? 'text-red-400' : 'hidden'}>{'>'} OVERRIDING_SAFETY_PROTOCOLS...</p>
        <p className={progress >= 98 ? 'text-green-500 font-bold blink' : 'hidden'}>{'>'} SYSTEM_READY</p>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="absolute inset-0 bg-[#050000] flex flex-col items-center justify-center z-40 font-mono">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-500/20 blur-xl animate-pulse"></div>
        <Shield size={80} className="text-red-500 relative z-10 animate-bounce" />
        {/* Rotating Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-dashed border-red-500/50 rounded-full animate-[spin_3s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-red-900/30 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
      </div>
      <h2 className="text-2xl text-red-500 font-bold tracking-widest mb-2 animate-pulse">{securityText}</h2>
      <div className="flex gap-1 h-1 w-24 mx-auto">
         {[...Array(5)].map((_,i) => (
           <div key={i} className="flex-1 bg-red-500/50 animate-[pulse_0.5s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.1}s`}}></div>
         ))}
      </div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(220,38,38,0.1)_50%)] bg-[size:100%_4px] pointer-events-none"></div>
    </div>
  );


  const renderReveal = () => (
    <div className="absolute inset-0 bg-[#020408] flex items-center justify-center z-40 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse"></div>
      <div className="relative text-center transform scale-150 animate-in zoom-in duration-[2000ms] ease-out">
         <div className="relative inline-block">
           <img
                src={logo}
                alt="Tesseract Logo"
                className="w-50 h-50 relative z-10 group-hover:scale-110 transition-transform object-contain"
              />
         </div>
         <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none mix-blend-difference filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
           TESSARACT
         </h1>
         <div className="absolute inset-0 bg-red-500/30 blur-[100px] mix-blend-screen animate-pulse"></div>
      </div>
    </div>
  );

  const renderHype = () => (
    <div className="absolute inset-0 bg-black flex items-center justify-center z-40 overflow-hidden">
      {/* Flashing Background */}
      <div className="absolute inset-0 bg-red-600 animate-[pulse_0.1s_ease-in-out_infinite] opacity-20"></div>
      
      <h1 key={hypeWord} className="text-6xl md:text-[10rem] font-black text-white tracking-tighter animate-in zoom-in-50 duration-300 relative z-10">
        {hypeWord}
      </h1>
      
      {/* Kinetic Type Background (faded) */}
      <h1 className="absolute text-[15rem] md:text-[25rem] font-black text-white/5 tracking-tighter select-none whitespace-nowrap animate-[spin_10s_linear_infinite]">
        {hypeWord} {hypeWord}
      </h1>
    </div>
  );

  const renderFeatures = () => {
    const FeatureIcon = features[activeFeature].icon;
    return (
      <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-40">
         <div className="relative w-48 h-48 flex items-center justify-center mb-8">
            <div className="absolute inset-0 border-4 border-red-500/20 rounded-full animate-ping"></div>
            <div className="absolute inset-0 border-2 border-red-500 rounded-full animate-[spin_2s_linear_infinite]"></div>
            <FeatureIcon size={80} className="text-white relative z-10 animate-bounce" />
         </div>
         <h2 key={activeFeature} className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white tracking-tighter uppercase animate-in slide-in-from-bottom duration-200">
            {features[activeFeature].label}
         </h2>
         {/* Scanline */}
         <div className="absolute top-0 left-0 w-full h-2 bg-red-500/50 blur-sm animate-[scan_2s_linear_infinite]"></div>
      </div>
    );
  };

  const renderInfo = () => (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-40">
       <div className="relative border-y-4 border-red-600 py-12 w-full text-center bg-red-900/20 backdrop-blur-lg animate-in zoom-in duration-700">
          <div className="overflow-hidden mb-4">
             <p className="text-3xl md:text-5xl text-white font-black tracking-[0.2em] animate-in slide-in-from-bottom duration-1000 delay-100">FEBRUARY 27-28</p>
          </div>
          <div className="overflow-hidden">
             <p className="text-xl md:text-2xl text-red-400 font-mono uppercase tracking-widest animate-in slide-in-from-top duration-1000 delay-300">SODEPUR, PANIHATI, KOLKATA</p>
          </div>
       </div>
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_50px_rgba(220,38,38,1)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-1 bg-red-500 shadow-[0_0_50px_rgba(220,38,38,1)]"></div>
       </div>
    </div>
  );

  const renderOutro = () => (
    <div className="absolute inset-0 bg-[#050000] flex flex-col items-center justify-center z-40 animate-in fade-in duration-1000">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent)]"></div>
       
       <div className="text-center relative z-10">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-red-500/30 bg-red-900/10 text-red-400 text-xs font-mono">
             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> SYSTEM ONLINE
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tight">
            ARE YOU <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600 animate-pulse">READY?</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button className="group relative px-10 py-5 bg-red-600 text-white font-bold uppercase tracking-widest text-sm rounded-sm overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.6)]">
              <span className="relative z-10 flex items-center gap-2">
                Register Now <ChevronRight size={16} />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="absolute inset-0 flex items-center justify-center gap-2 text-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                 Register Now <ChevronRight size={16} />
              </span>
            </button>

            <button 
              onClick={() => { setIsPlaying(false); setTimeout(() => setPhase('idle'), 100); }}
              className="flex items-center gap-2 px-8 py-5 text-gray-500 hover:text-white border border-white/10 hover:border-white/30 rounded-sm transition-all font-mono text-xs uppercase tracking-widest backdrop-blur-md"
            >
              <RefreshCw size={14} /> Replay Sequence
            </button>
          </div>
       </div>

       {/* Footer branding */}
       <div className="absolute bottom-8 flex items-center gap-2 text-red-900/50 font-black text-3xl">
          {appName}
       </div>
    </div>
  );

  return (
    <div className="relative w-full h-[93vh] bg-black overflow-hidden font-sans selection:bg-red-500 selection:text-white">
      
      {/* Noise Overlay (Always On) */}
      <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px]"></div>

      {/* Audio Element */}
      <audio ref={audioRef} src={themeSong} preload="auto" />

      {/* Mute Toggle (Simulated) */}
      {phase !== 'idle' && (
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-8 right-8 z-[60] p-3 rounded-full bg-white/5 hover:bg-white/20 text-red-500/50 hover:text-red-500 transition-colors backdrop-blur-md border border-white/5"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      {/* Phase Renders */}
      {phase === 'idle' && renderIdle()}
      {phase === 'boot' && renderBoot()}
      {phase === 'security' && renderSecurity()}
      {phase === 'reveal' && renderReveal()}
      {phase === 'hype' && renderHype()}
      {phase === 'features' && renderFeatures()}
      {phase === 'info' && renderInfo()}
      {phase === 'outro' && renderOutro()}

      {/* Extra CSS for custom animations */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .blink {
          animation: blink-animation 1s steps(2, start) infinite;
        }
        @keyframes blink-animation {
          to { visibility: hidden; }
        }
      `}</style>

    </div>
  );
};

export default VideoTeaser;