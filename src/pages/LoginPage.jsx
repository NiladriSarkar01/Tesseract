import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldAlert, Lock, Cpu, Skull, Eye, Wifi, AlertTriangle, User } from 'lucide-react';

// --- SUB-COMPONENTS ---

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Matrix characters (Katakana + Latin)
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(5, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ef4444'; // Red text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20 z-0" />;
};

const HexColumn = () => {
  const [hexLines, setHexLines] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLine = Array(4).fill(0).map(() => 
        `0x${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()}`
      ).join(' ');
      
      setHexLines(prev => [newLine, ...prev.slice(0, 20)]);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:block fixed right-0 top-0 bottom-0 w-64 bg-black/40 border-l border-red-900/30 p-4 font-mono text-[10px] text-red-500/50 overflow-hidden pointer-events-none z-10">
      <div className="mb-2 text-red-500 font-bold animate-pulse">MEMORY_DUMP // LIVE</div>
      {hexLines.map((line, i) => (
        <div key={i} className="opacity-70">{line}</div>
      ))}
    </div>
  );
};

// --- MAIN COMPONENT ---

const LoginPage = ({ onLoginSuccess, onCancel }) => {
  const [stage, setStage] = useState('idle'); // idle, hacking, login, success, denied
  const [logs, setLogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const logsEndRef = useRef(null);
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // The "Messy" Hacking Sequence
  const initiateSequence = () => {
    setStage('hacking');
    setGlitchIntensity(1); // Start heavy glitch
    
    const commands = [
      "INITIALIZING BRUTE FORCE...",
      "TARGETING PORT 22 (SSH)...",
      "BYPASSING FIREWALL... SUCCESS",
      "INJECTING SQL PAYLOAD... DROP TABLE USERS --",
      "ERROR: SEGMENTATION FAULT AT 0x004F3A",
      "RETRYING WITH ROOT PRIVILEGES...",
      "ACCESSING KERNEL MEMORY...",
      "DECRYPTING SSL TRAFFIC...",
      "WARNING: INTRUSION DETECTED",
      "DISABLING TRACKING BEACONS...",
      "SPOOFING IP ADDRESS (192.168.X.X)...",
      "DOWNLOADING CREDENTIALS...",
      "OVERRIDING BIOS SECURITY...",
      "SYSTEM VULNERABILITY EXPLOITED",
      "ESTABLISHING SECURE TUNNEL...",
      "ROOT ACCESS: GRANTED"
    ];

    let i = 0;
    // Faster log speed
    const interval = setInterval(() => {
      if (i >= commands.length) {
        clearInterval(interval);
        setGlitchIntensity(0); // Stop glitch
        setTimeout(() => setStage('login'), 500);
        return;
      }
      
      const isError = commands[i].includes('ERROR') || commands[i].includes('WARNING');
      const newLog = {
        text: commands[i] + (Math.random() > 0.5 ? ` [${Math.floor(Math.random() * 100)}ms]` : ''),
        type: isError ? 'error' : 'success',
        id: Math.random()
      };
      
      setLogs(prev => [...prev, newLog]);
      // Randomly shake screen
      if (Math.random() > 0.7) setGlitchIntensity(2);
      else setGlitchIntensity(1);

      i++;
    }, 80);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') { 
      setStage('success');
      setTimeout(() => {
        if(onLoginSuccess) onLoginSuccess();
      }, 3000);
    } else {
      setStage('denied');
      setGlitchIntensity(3); // Massive glitch on fail
      setLogs(prev => [...prev, { text: "CRITICAL FAILURE: HASH MISMATCH", type: 'error', id: Math.random() }]);
      setTimeout(() => {
        setStage('login');
        setGlitchIntensity(0);
      }, 2000);
      setPassword('');
    }
  };

  return (
    <div className={`min-h-screen bg-[#020000] text-red-500 font-mono flex flex-col relative overflow-hidden selection:bg-red-500 selection:text-black ${glitchIntensity > 1 ? 'animate-glitch' : ''}`}>
      
      {/* 1. Matrix Rain Background */}
      <MatrixRain />
      
      {/* 2. Hex Dump Sidebar */}
      {stage !== 'idle' && <HexColumn />}

      {/* CRT Scanline Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20"></div>
      
      {/* Top Bar */}
      <div className="flex justify-between items-center border-b border-red-900/30 p-2 relative z-20 bg-black/80 backdrop-blur">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-red-500 animate-pulse" />
          <span className="text-xs tracking-[0.2em] font-bold">ROOT@TECHVERSE:~/ADMIN</span>
        </div>
        <div className="flex gap-4 text-[10px] md:text-xs font-bold">
           <span className="flex items-center gap-1 text-red-500">
             <Wifi size={10} /> {Math.floor(Math.random() * 99)}MS
           </span>
           <span className={`${stage === 'hacking' ? 'text-yellow-500 animate-pulse' : 'text-red-500'}`}>
             CPU: {stage === 'hacking' ? '99' : '12'}%
           </span>
        </div>
      </div>

      {/* STAGE: IDLE */}
      {stage === 'idle' && (
        <div className="flex-grow flex flex-col items-center justify-center relative z-20 animate-in fade-in duration-1000">
          <div className="border border-red-500/50 p-10 bg-black/80 backdrop-blur-md rounded-none max-w-lg w-full text-center hover:shadow-[0_0_50px_rgba(220,38,38,0.3)] transition-all group relative overflow-hidden">
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500"></div>

            <ShieldAlert size={80} className="mx-auto mb-6 text-red-600 animate-[pulse_3s_ease-in-out_infinite]" />
            <h1 className="text-4xl font-black mb-2 tracking-tighter glitch-text" data-text="RESTRICTED_ACCESS">RESTRICTED_ACCESS</h1>
            <p className="text-xs text-red-400 mb-8 font-mono tracking-widest">
              SECURE SERVER // BIOMETRIC SCAN REQUIRED
            </p>
            
            <button 
              onClick={initiateSequence}
              className="w-full py-4 bg-red-600 text-black hover:bg-white transition-all font-black tracking-[0.2em] text-sm flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <Cpu size={18} />
              OVERRIDE_LOCK
            </button>
            
            <button 
              onClick={onCancel}
              className="mt-6 text-[10px] uppercase tracking-widest text-red-500/40 hover:text-red-500 transition-colors"
            >
              [ Abort Mission ]
            </button>
          </div>
        </div>
      )}

      {/* STAGE: HACKING SEQUENCE */}
      {stage === 'hacking' && (
        <div className="flex-grow p-4 md:p-12 relative z-20 overflow-hidden flex flex-col justify-end">
          <div className="max-w-3xl w-full mx-auto font-mono text-xs md:text-sm space-y-1">
            {logs.map((log) => (
              <div key={log.id} className={`${log.type === 'error' ? 'text-red-500 font-bold bg-red-900/20 px-2' : 'text-red-400'}`}>
                <span className="mr-2 opacity-50">root@sys:~#</span>
                {log.text}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      )}

      {/* STAGE: LOGIN FORM */}
      {(stage === 'login' || stage === 'denied') && (
        <div className="flex-grow flex flex-col items-center justify-center relative z-20 animate-in zoom-in duration-300">
           <div className={`max-w-md w-full border-2 border-red-600 bg-black p-8 relative shadow-[0_0_100px_rgba(220,38,38,0.2)] ${stage === 'denied' ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
             
             {/* "Secure" Header */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4 text-red-500 font-bold tracking-widest text-xs border border-red-600">
                LEVEL 5 SECURITY CLEARANCE
             </div>

             <div className="flex justify-center mb-8">
                <Lock size={40} className="text-red-500" />
             </div>

             <form onSubmit={handleLogin} className="space-y-6 font-mono">
               <div className="group relative">
                 <div className="absolute -inset-1 bg-red-600 rounded opacity-20 group-focus-within:opacity-40 blur transition-opacity"></div>
                 <div className="relative flex items-center bg-black border border-red-800 p-3">
                   <User size={18} className="text-red-500 mr-3" />
                   <input 
                     type="text" 
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     className="bg-transparent border-none outline-none text-red-500 w-full placeholder-red-900 tracking-wider"
                     placeholder="IDENTITY"
                     autoFocus
                     autoComplete="off"
                   />
                 </div>
               </div>

               <div className="group relative">
                 <div className="absolute -inset-1 bg-red-600 rounded opacity-20 group-focus-within:opacity-40 blur transition-opacity"></div>
                 <div className="relative flex items-center bg-black border border-red-800 p-3">
                   <Eye size={18} className="text-red-500 mr-3" />
                   <input 
                     type="password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="bg-transparent border-none outline-none text-red-500 w-full placeholder-red-900 tracking-wider"
                     placeholder="PASSPHRASE"
                     autoComplete="off"
                   />
                 </div>
               </div>

               <button 
                 type="submit"
                 className="w-full py-4 bg-red-600 text-black font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 mt-6 relative group overflow-hidden"
               >
                 <span className="relative z-10">AUTHENTICATE</span>
                 <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-0"></div>
               </button>
             </form>
             
             {stage === 'denied' && (
                <div className="mt-4 text-center text-red-500 font-bold animate-pulse text-xs bg-red-900/20 p-2 border border-red-500/50">
                    ⚠ UNAUTHORIZED ATTEMPT LOGGED ⚠
                </div>
             )}
           </div>
        </div>
      )}

      {/* STAGE: SUCCESS */}
      {stage === 'success' && (
         <div className="fixed inset-0 bg-green-900/20 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="text-center">
               <div className="relative">
                 <div className="absolute inset-0 bg-green-500 blur-[50px] opacity-20 animate-pulse"></div>
                 <Skull size={100} className="relative z-10 mx-auto text-green-500 mb-6 animate-bounce" />
               </div>
               <h1 className="text-6xl font-black text-green-500 mb-2 tracking-tighter glitch-text">ACCESS GRANTED</h1>
               <p className="text-green-400 font-mono tracking-widest text-sm mb-8">WELCOME BACK, OPERATOR.</p>
               
               {/* Loading Bar */}
               <div className="w-80 h-2 bg-green-900/50 mx-auto rounded-full overflow-hidden border border-green-500/30">
                  <div className="h-full bg-green-400 animate-[loading_1.5s_linear_infinite] shadow-[0_0_10px_#4ade80]"></div>
               </div>
            </div>
         </div>
      )}

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-1deg); }
          75% { transform: translateX(5px) rotate(1deg); }
        }
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          100% { width: 100%; transform: translateX(100%); }
        }
        .animate-glitch {
          animation: glitch-anim 0.2s infinite;
        }
        @keyframes glitch-anim {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 red;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 blue;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;