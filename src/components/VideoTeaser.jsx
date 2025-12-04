import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Volume2,
  VolumeX,
  Zap,
  ChevronRight,
  RefreshCw,
  Terminal,
  Shield,
  Cpu,
  Gamepad2,
  Music,
  Code,
  Globe,
  Lock,
  Satellite,
  Wifi,
  AlertTriangle,
  Radio,
  Crosshair,
  Binary,
} from "lucide-react";
// Use local constants directly to avoid import errors if files are missing
import { appName } from "../utils/Constants";
// Placeholder for logo - standard placeholder if file missing
import logo from "../assets/logo.png";
// Placeholder for audio
import themeSong from "../assets/themeSong.mp3";
import { Link } from "react-router-dom";

const VideoTeaser = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [hypeWord, setHypeWord] = useState("");
  const [progress, setProgress] = useState(0);
  const [securityText, setSecurityText] = useState("SCANNING...");
  const [logs, setLogs] = useState([]);
  const [decodeString, setDecodeString] = useState("");

  // New state for coding phase
  const [codeSnippet, setCodeSnippet] = useState("");

  const audioRef = useRef(null);
  const logsEndRef = useRef(null);

  const words = [
    "INNOVATE",
    "DISRUPT",
    "DOMINATE",
    "ASCEND",
    "CREATE",
    "CONQUER",
  ];

  const features = [
    { icon: Code, label: "HACKATHONS" },
    { icon: Gamepad2, label: "ESPORTS" },
    { icon: Cpu, label: "ROBOTICS" },
    { icon: Music, label: "PRO-SHOWS" },
    { icon: Globe, label: "NETWORKING" },
  ];
  const [activeFeature, setActiveFeature] = useState(0);

  // Helper to add system logs
  const addLog = (text, type = "info") => {
    setLogs((prev) => [...prev.slice(-5), { text, type, id: Math.random() }]);
  };

  const startTeaser = () => {
    setIsPlaying(true);
    setPhase("boot");
    addLog("INITIALIZING_SEQUENCE...", "system");
    if (audioRef.current && themeSong) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => console.log("Audio error:", error));
      }
    }
  };

  // Decoding Effect
  useEffect(() => {
    if (!isPlaying) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    const interval = setInterval(() => {
      setDecodeString(
        Array(12)
          .fill(0)
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("")
      );
    }, 60);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Coding Typing Effect
  useEffect(() => {
    if (phase !== "coding") return;
    const codeLines = [
      `import { Future } from '${appName}';`,
      "const event = new Event('2025');",
      "await event.launch();",
      ">> COMPILATION SUCCESSFUL",
    ];
    let lineIdx = 0;
    let charIdx = 0;
    let currentText = "";

    const typeInterval = setInterval(() => {
      if (lineIdx >= codeLines.length) {
        clearInterval(typeInterval);
        return;
      }

      const line = codeLines[lineIdx];
      if (charIdx < line.length) {
        currentText += line[charIdx];
        charIdx++;
        // Hacky way to force update for this specific effect in a single state string
        // In a real app, might use an array of lines
        setCodeSnippet((prev) => {
          const lines = prev.split("\n");
          lines[lineIdx] = line.substring(0, charIdx);
          return lines.join("\n");
        });
      } else {
        lineIdx++;
        charIdx = 0;
        setCodeSnippet((prev) => prev + "\n");
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [phase]);

  // Scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  // --- MASTER TIMELINE ---
  useEffect(() => {
    if (!isPlaying) return;

    let timeouts = [];
    let intervals = [];

    // 1. Boot Sequence (0s - 3s)
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(p + (Math.random() > 0.8 ? 15 : 1), 100);
      });
    }, 50);
    intervals.push(progressInterval);

    // 2. Uplink (3s - 6s)
    timeouts.push(
      setTimeout(() => {
        setPhase("uplink");
        addLog("ESTABLISHING_UPLINK...", "info");
        setTimeout(() => addLog("CONNECTED_TO_SAT_V4", "success"), 1500);
      }, 3000)
    );

    // 3. Security Scan (6s - 9s)
    timeouts.push(
      setTimeout(() => {
        setPhase("security");
        addLog("SECURITY_PROTOCOL_INIT", "warning");
        const secTexts = [
          "ENCRYPTING...",
          "VERIFYING HASH...",
          "BIOMETRIC SCAN...",
          "UPLINK SECURE",
        ];
        let txtIdx = 0;
        const secInterval = setInterval(() => {
          setSecurityText(secTexts[txtIdx]);
          txtIdx++;
          if (txtIdx >= secTexts.length) clearInterval(secInterval);
        }, 700);
        intervals.push(secInterval);
      }, 6000)
    );

    // 4. Override (9s - 10.5s)
    timeouts.push(
      setTimeout(() => {
        setPhase("override");
        addLog("ACCESS_DENIED", "error");
        addLog("ATTEMPTING_BYPASS...", "warning");
        setTimeout(() => addLog("ROOT_ACCESS_GRANTED", "success"), 1000);
      }, 9000)
    );

    // 5. Logo Reveal (10.5s - 13.5s)
    timeouts.push(
      setTimeout(() => {
        setPhase("reveal");
        addLog("CORE_SYSTEM_ONLINE", "success");
      }, 10500)
    );

    // --- NEW DOMAIN PHASES ---

    // 6. Coding Domain (13.5s - 15.5s)
    timeouts.push(
      setTimeout(() => {
        setPhase("coding");
        setCodeSnippet(""); // Reset
        addLog("MODULE: CODING_ARENA", "info");
      }, 13500)
    );

    // 7. Robotics Domain (15.5s - 17.5s)
    timeouts.push(
      setTimeout(() => {
        setPhase("robotics");
        addLog("MODULE: ROBOTICS_LAB", "info");
      }, 15500)
    );

    // 8. Gaming Domain (17.5s - 19.5s)
    timeouts.push(
      setTimeout(() => {
        setPhase("gaming");
        addLog("MODULE: BATTLE_ZONE", "info");
      }, 17500)
    );

    // --- END NEW DOMAIN PHASES ---

    // 9. Hype Sequence (19.5s - 23.5s)
    timeouts.push(
      setTimeout(() => {
        setPhase("hype");
        let wordIndex = 0;
        const wordInterval = setInterval(() => {
          setHypeWord(words[wordIndex]);
          addLog(`EXEC: ${words[wordIndex]}`, "info");
          wordIndex++;
          if (wordIndex >= words.length) clearInterval(wordInterval);
        }, 600);
        intervals.push(wordInterval);
      }, 19500)
    );

    // 10. Features Flash (23.5s - 26.5s)
    timeouts.push(
      setTimeout(() => {
        setPhase("features");
        let featIndex = 0;
        const featInterval = setInterval(() => {
          setActiveFeature((prev) => (prev + 1) % features.length);
          featIndex++;
          if (featIndex > 8) clearInterval(featInterval);
        }, 300);
        intervals.push(featInterval);
      }, 23500)
    );

    // 11. Info/Date (26.5s - 29.5s)
    timeouts.push(setTimeout(() => setPhase("info"), 26500));

    // 12. Outro (29.5s+)
    timeouts.push(
      setTimeout(() => {
        setPhase("outro");
        addLog("SEQUENCE_COMPLETE", "success");
        if (onComplete) onComplete();
      }, 29500)
    );

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [isPlaying]);

  // --- RENDER PHASES ---

  const renderIdle = () => (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black z-50 cursor-pointer group"
      onClick={startTeaser}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
        <div className="relative w-24 h-24 rounded-full border-2 border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <div className="w-20 h-20 rounded-full bg-cyan-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)]">
            <Play size={32} className="text-white fill-current ml-1" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 text-center">
        <p className="text-cyan-500 font-mono text-sm tracking-[0.3em] animate-pulse">
          INITIALIZE_TRAILER_SEQUENCE
        </p>
      </div>
    </div>
  );

  const renderBoot = () => (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center font-mono z-40">
      <div className="w-80 mb-6">
        <div className="flex justify-between text-xs text-cyan-500 mb-2 font-bold tracking-widest">
          <span>SYSTEM_BOOT</span>
          <span>{Math.floor(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-cyan-900/20 rounded-sm overflow-hidden border border-cyan-900/50">
          <div
            className="h-full bg-cyan-500 transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="text-[10px] text-gray-500 space-y-1 font-mono h-32 overflow-hidden w-80">
        <p>{">"} BIOS_CHECK... OK</p>
        <p>
          {">"} MEMORY_ALLOCATION... {progress * 12}MB
        </p>
        <p className={progress > 20 ? "text-emerald-400" : "hidden"}>
          {">"} DECRYPTING_CORE_ASSETS...
        </p>
        <p className={progress > 40 ? "text-emerald-400" : "hidden"}>
          {">"} LOADING_MODULES [GRAPHICS, AUDIO, NETWORK]...
        </p>
        <p className={progress > 60 ? "text-emerald-400" : "hidden"}>
          {">"} ESTABLISHING_SECURE_UPLINK...
        </p>
        <p className={progress > 80 ? "text-emerald-400" : "hidden"}>
          {">"} OVERRIDING_SAFETY_PROTOCOLS...
        </p>
      </div>
    </div>
  );

  const renderUplink = () => (
    <div className="absolute inset-0 bg-[#020408] flex flex-col items-center justify-center z-40">
      <div className="relative w-64 h-64 border border-cyan-500/20 rounded-full flex items-center justify-center mb-8 animate-[spin_10s_linear_infinite]">
        <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full"></div>
        <Globe size={100} className="text-cyan-500/50 animate-pulse" />
        <Satellite
          size={32}
          className="absolute top-0 right-0 text-white animate-bounce"
        />
      </div>
      <h2 className="text-3xl font-black text-white tracking-widest mb-2">
        ESTABLISHING UPLINK
      </h2>
      <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm">
        <Wifi size={16} className="animate-ping" /> CONNECTING TO SAT_V4...
      </div>
      <p className="mt-4 font-mono text-xs text-emerald-500">{decodeString}</p>
    </div>
  );

  const renderSecurity = () => (
    <div className="absolute inset-0 bg-[#000505] flex flex-col items-center justify-center z-40 font-mono">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-emerald-500/20 blur-xl animate-pulse"></div>
        <Shield
          size={80}
          className="text-emerald-500 relative z-10 animate-bounce"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-dashed border-emerald-500/50 rounded-full animate-[spin_3s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-emerald-900/30 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
      </div>
      <h2 className="text-2xl text-emerald-500 font-bold tracking-widest mb-2 animate-pulse">
        {securityText}
      </h2>
      <div className="flex gap-1 h-1 w-24 mx-auto">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-emerald-500/50 animate-[pulse_0.5s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
    </div>
  );

  const renderOverride = () => (
    <div className="absolute inset-0 bg-red-950 flex flex-col items-center justify-center z-40">
      <div className="bg-red-600 text-white px-8 py-4 font-black text-4xl tracking-tighter rotate-[-5deg] border-4 border-white animate-[pulse_0.1s_infinite]">
        ACCESS DENIED
      </div>
      <div className="mt-8 flex items-center gap-4">
        <Lock size={40} className="text-red-500" />
        <div className="text-left">
          <p className="text-red-400 font-mono text-sm">SECURITY_LEVEL_5</p>
          <p className="text-white font-bold animate-pulse">
            BYPASSING FIREWALL...
          </p>
        </div>
      </div>
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
        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none mix-blend-difference filter drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
          {appName}
        </h1>
        <div className="absolute inset-0 bg-cyan-500/30 blur-[100px] mix-blend-screen animate-pulse"></div>
      </div>
    </div>
  );

  // --- NEW DOMAIN RENDERERS ---

  const renderCoding = () => (
    <div className="absolute inset-0 bg-black flex items-center justify-center z-40">
      <div className="w-full max-w-3xl p-8 font-mono text-emerald-400 text-xl md:text-3xl leading-relaxed overflow-hidden">
        <Binary size={64} className="text-emerald-600 mb-4 animate-bounce" />
        <div className="whitespace-pre-line border-l-4 border-emerald-500 pl-4 animate-pulse">
          {codeSnippet}
          <span className="inline-block w-3 h-6 bg-emerald-400 animate-pulse ml-1"></span>
        </div>
      </div>
      {/* Matrix Rain Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:100%_20px] pointer-events-none animate-[scan_5s_linear_infinite]"></div>
    </div>
  );

  const renderRobotics = () => (
    <div className="absolute inset-0 bg-[#050a15] flex items-center justify-center z-40 overflow-hidden">
      <div className="relative w-80 h-80 border border-blue-500/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
        <Cpu size={120} className="text-blue-400" />
        <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full"></div>
        <div className="absolute inset-4 border-b-4 border-cyan-500 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
      </div>
      <div className="absolute bottom-20 flex gap-4">
        <div className="text-center">
          <p className="text-blue-500 text-sm font-bold">CPU_LOAD</p>
          <p className="text-white text-2xl font-mono">98%</p>
        </div>
        <div className="text-center">
          <p className="text-blue-500 text-sm font-bold">MOTOR_SYNC</p>
          <p className="text-white text-2xl font-mono">OPTIMAL</p>
        </div>
      </div>
    </div>
  );

  const renderGaming = () => (
    <div className="absolute inset-0 bg-black flex items-center justify-center z-40">
      {/* Sniper Scope HUD */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 border-[50px] border-black/80 rounded-full pointer-events-none z-10"></div>
        <div className="relative z-0 w-full h-full bg-red-900/10 animate-pulse flex items-center justify-center">
          <Crosshair
            size={200}
            className="text-red-500 opacity-80 animate-[spin_0.5s_ease-out]"
          />
          <h2 className="absolute mt-32 text-4xl font-black text-red-500 tracking-[0.5em] animate-bounce">
            TARGET_LOCKED
          </h2>
        </div>
        {/* HUD Corners */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-cyan-500"></div>
        <div className="absolute top-10 right-10 w-20 h-20 border-t-4 border-r-4 border-cyan-500"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 border-b-4 border-l-4 border-cyan-500"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-4 border-r-4 border-cyan-500"></div>
      </div>
    </div>
  );

  // ----------------------------

  const renderHype = () => (
    <div className="absolute inset-0 bg-black flex items-center justify-center z-40 overflow-hidden">
      <div className="absolute inset-0 bg-blue-600 animate-[pulse_0.1s_ease-in-out_infinite] opacity-20"></div>
      <h1
        key={hypeWord}
        className="text-6xl md:text-[10rem] font-black text-white tracking-tighter animate-in zoom-in-50 duration-300 relative z-10"
      >
        {hypeWord}
      </h1>
      <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1 opacity-50">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-2 bg-cyan-500 animate-[bounce_0.5s_infinite]"
            style={{
              height: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );

  const renderFeatures = () => {
    const FeatureIcon = features[activeFeature].icon;
    return (
      <div className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-40">
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-2 border-cyan-500 rounded-full animate-[spin_2s_linear_infinite]"></div>
          <FeatureIcon
            size={80}
            className="text-white relative z-10 animate-bounce"
          />
        </div>
        <h2
          key={activeFeature}
          className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-white tracking-tighter uppercase animate-in slide-in-from-bottom duration-200"
        >
          {features[activeFeature].label}
        </h2>
      </div>
    );
  };

  const renderInfo = () => (
    <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-40">
      <div className="relative border-y-4 border-blue-600 py-12 w-full text-center bg-blue-900/20 backdrop-blur-lg animate-in zoom-in duration-700">
        <div className="overflow-hidden mb-4">
          <p className="text-3xl md:text-5xl text-white font-black tracking-[0.2em] animate-in slide-in-from-bottom duration-1000 delay-100">
            FEBRUARY 27-28
          </p>
        </div>
        <div className="overflow-hidden">
          <p className="text-xl md:text-2xl text-cyan-400 font-mono uppercase tracking-widest animate-in slide-in-from-top duration-1000 delay-300">
            SODEPUR, PANIHATI, KOLKATA
          </p>
        </div>
      </div>
    </div>
  );

  const renderOutro = () => (
    <div className="absolute inset-0 bg-[#050000] flex flex-col items-center justify-center z-40 animate-in fade-in duration-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent)]"></div>

      <div className="text-center relative z-10">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-900/10 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>{" "}
          SYSTEM ONLINE
        </div>

        <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tight">
          ARE YOU{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500 animate-pulse">
            READY?
          </span>
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link to={"/register"}>
            <button className="group relative px-10 py-5 bg-cyan-600 text-white font-bold uppercase tracking-widest text-sm rounded-sm overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(6,182,212,0.6)]">
              <span className="relative z-10 flex items-center gap-2">
                Register Now <ChevronRight size={16} />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </Link>

          <button
            onClick={() => {
              setIsPlaying(false);
              setTimeout(() => setPhase("idle"), 100);
              setLogs([]);
            }}
            className="flex items-center gap-2 px-8 py-5 text-gray-500 hover:text-white border border-white/10 hover:border-white/30 rounded-sm transition-all font-mono text-xs uppercase tracking-widest backdrop-blur-md"
          >
            <RefreshCw size={14} /> Replay Sequence
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 flex items-center gap-2 text-blue-900/50 font-black text-3xl">
        {appName}
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[93vh] bg-black overflow-hidden font-sans selection:bg-cyan-500 selection:text-white">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(6,182,212,0.1)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px]"></div>

      {/* Audio */}
      <audio ref={audioRef} src={themeSong} preload="auto" />

      {/* Mute Toggle */}
      {phase !== "idle" && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute top-8 right-8 z-[60] p-3 rounded-full bg-white/5 hover:bg-white/20 text-cyan-500/50 hover:text-cyan-500 transition-colors backdrop-blur-md border border-white/5"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      {/* Live System Logs Overlay */}
      {phase !== "idle" && (
        <div className="absolute bottom-8 left-8 z-[60] font-mono text-[10px] text-cyan-500/70 pointer-events-none flex flex-col-reverse">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`animate-in slide-in-from-left fade-in duration-300 ${
                log.type === "error"
                  ? "text-red-500"
                  : log.type === "success"
                  ? "text-green-500"
                  : ""
              }`}
            >
              {`> ${log.text}`}
            </div>
          ))}
        </div>
      )}

      {/* Phases */}
      {phase === "idle" && renderIdle()}
      {phase === "boot" && renderBoot()}
      {phase === "uplink" && renderUplink()}
      {phase === "security" && renderSecurity()}
      {phase === "override" && renderOverride()}
      {phase === "reveal" && renderReveal()}
      {phase === "coding" && renderCoding()}
      {phase === "robotics" && renderRobotics()}
      {phase === "gaming" && renderGaming()}
      {phase === "hype" && renderHype()}
      {phase === "features" && renderFeatures()}
      {phase === "info" && renderInfo()}
      {phase === "outro" && renderOutro()}

      {/* Animations CSS */}
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
