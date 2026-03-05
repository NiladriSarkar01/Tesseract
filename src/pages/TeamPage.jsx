import React, {
  useState,
  useRef,
  useEffect,
  memo,
  useCallback,
  useMemo,
} from "react";
import { Search, Github, Linkedin, Mail, Instagram } from "lucide-react";
import { TEAM_DATA } from "../lib/data";

/* ----------------------------------
   AGENT DECK (MEMOIZED)
---------------------------------- */

const AgentDeck = memo(function AgentDeck({ members, selectedId, onSelect }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current?.querySelector(`[data-id="${selectedId}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [selectedId]);

  return (
    <div className="fixed bottom-0 left-0 w-full h-24 bg-black/40 backdrop-blur-xl border-t border-white/10 z-40">
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <div
        ref={scrollRef}
        className="flex items-center gap-4 px-6 py-3 overflow-x-auto no-scrollbar"
      >
        {members.map((m) => (
          <button
            key={m.id}
            data-id={m.id}
            onClick={() => onSelect(m.id)}
            className={`relative flex-shrink-0 transition-transform duration-200 ${
              selectedId === m.id ? "scale-110" : "opacity-60 hover:opacity-100"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-xl overflow-hidden border ${
                selectedId === m.id
                  ? "border-cyan-500 shadow-[0_0_16px_rgba(0,255,255,0.4)]"
                  : "border-white/20"
              }`}
            >
              <img
                src={m.img}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});

/* ----------------------------------
   SOCIAL (MEMOIZED)
---------------------------------- */

const Social = memo(function Social({ icon: Icon, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-cyan-500 hover:bg-cyan-500/10 transition"
    >
      <Icon size={18} />
    </a>
  );
});

/* ----------------------------------
   HOLO PROFILE (OPTIMIZED)
---------------------------------- */

const HoloProfile = memo(function HoloProfile({ member }) {
  if (!member) return null;
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafRef = useRef(null);
  const pendingRef = useRef(null);

  const handleMouseMove = (e) => {
    // Store latest coords without touching the DOM
    pendingRef.current = { x: e.clientX, y: e.clientY };

    // Only schedule a new frame if one isn't already queued
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const card = cardRef.current;
      const glare = glareRef.current;
      const pos = pendingRef.current;
      if (!card || !glare || !pos) return;
      const r = card.getBoundingClientRect();
      const x = ((pos.x - r.left) / r.width) * 100;
      const y = ((pos.y - r.top) / r.height) * 100;
      glare.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)`;
      glare.style.opacity = "1";
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="holo-profile relative w-full h-full flex flex-col md:flex-row">
      {/* IMAGE */}
      <div className="relative w-full md:w-5/12 h-64 md:h-full">
        <div
          ref={cardRef}
          className="relative w-full h-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* FRAME */}
          <div className="absolute inset-0 rounded-xl border border-white/20 backdrop-blur-md bg-white/5 shadow-[0_0_40px_rgba(0,255,255,0.12)]" />

          <img
            src={member.img}
            alt={member.name}
            loading="eager"
            decoding="async"
            className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] object-contain rounded-lg"
          />

          {/* MOUSE-TRACKING GLARE */}
          <div
            ref={glareRef}
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ opacity: 0, transition: "opacity 0.2s ease" }}
          />
        </div>
      </div>

      {/* INFO */}
      <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col bg-[#050505]/90 md:backdrop-blur overflow-y-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono text-cyan-400 tracking-widest">
            {member.level}_ACCESS
          </span>
          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider border border-cyan-500/40 text-cyan-300 bg-cyan-500/10 rounded-md">
            {member.dept}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
          {member.name}
        </h1>

        <div className="p-4 bg-white/5 border-l-2 border-cyan-500 mb-6">
          <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
        </div>

        <div className="mt-auto flex items-center gap-3 pt-4">
          <button
            onClick={() => (window.location.href = `mailto:${member.email}`)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-lg transition-all hover:bg-cyan-400 active:scale-[0.98]"
          >
            <Mail size={16} />
            Contact
          </button>

          {member.github && <Social icon={Github} href={member.github} />}
          {member.linkedin && <Social icon={Linkedin} href={member.linkedin} />}
          {member.instagram && (
            <Social icon={Instagram} href={member.instagram} />
          )}
        </div>
      </div>
    </div>
  );
});

/* ----------------------------------
   PAGE
---------------------------------- */

export default function TeamPage() {
  const [selectedId, setSelectedId] = useState(TEAM_DATA[0]?.id);

  const active = useMemo(
    () => TEAM_DATA.find((m) => m.id === selectedId),
    [selectedId],
  );

  const handleSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);

  return (
    <div
      className="bg-[#020408] text-white relative overflow-hidden"
      style={{ height: "calc(100vh - 4rem)", marginTop: "4rem" }}
    >
      <main className="h-full flex items-center justify-center px-6 pb-24">
        {active ? (
          <div className="w-full max-w-6xl h-[600px]">
            <HoloProfile member={active} />
          </div>
        ) : (
          <div className="text-gray-500 flex flex-col items-center gap-3">
            <Search size={40} />
            <span className="font-mono text-sm tracking-widest">NO AGENTS</span>
          </div>
        )}
      </main>

      <AgentDeck
        members={TEAM_DATA}
        selectedId={selectedId}
        onSelect={handleSelect}
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none }
        .no-scrollbar { scrollbar-width: none }

        .holo-profile {
          animation: holoFadeIn 0.3s ease-out forwards;
        }
        @keyframes holoFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
