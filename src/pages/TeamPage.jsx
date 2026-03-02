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
            className={`relative transition-transform duration-200 ${
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

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
      {/* IMAGE */}
      <div className="relative w-full md:w-5/12 h-64 md:h-full perspective">
        <div className="relative w-full h-full group preserve-3d">
          {/* FRAME (DESKTOP ONLY) */}
          <div className="hidden md:block absolute inset-0 rounded-xl border border-white/20 backdrop-blur-md bg-white/5 shadow-[0_0_40px_rgba(0,255,255,0.12)]" />

          <img
            src={member.img}
            alt={member.name}
            loading="eager"
            decoding="async"
            className="
              absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)]
              object-contain rounded-lg
              will-change-transform
              transition-transform duration-500
              md:group-hover:scale-[1.04]
              md:group-hover:rotate-x-[5deg]
              md:group-hover:rotate-y-[-5deg]
            "
          />

          {/* HOLO SWEEP (DESKTOP ONLY) */}
          <div className="hidden md:block absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
            <div className="absolute -left-full top-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent rotate-12 group-hover:animate-[sweep_1.2s_ease-out_forwards]" />
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col bg-[#050505]/90 md:backdrop-blur">
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

        <div className="mt-auto flex items-center gap-3">
          <button
            onClick={() => (window.location.href = `mailto:${member.email}`)}
            className="
              flex-1 flex items-center justify-center gap-2 py-3
              bg-white text-black font-semibold text-xs uppercase tracking-widest
              rounded-lg transition-all
              hover:bg-cyan-400
              active:scale-[0.98]
            "
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
    <div className="h-[79vh] mt-17 bg-[#020408] text-white relative overflow-hidden">
      <main className="h-full flex items-center justify-center px-6">
        {active ? (
          <div className="w-full max-w-6xl h-[600px]">
            <HoloProfile member={active} />
          </div>
        ) : (
          <div className="text-gray-500 flex flex-col items-center">
            <Search size={40} />
            NO AGENTS
          </div>
        )}
      </main>

      <AgentDeck
        members={TEAM_DATA}
        selectedId={selectedId}
        onSelect={handleSelect}
      />

      {/* GLOBAL PERF SAFETY */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none }
        .no-scrollbar { scrollbar-width: none }
        .perspective { perspective: 1000px }
        .preserve-3d { transform-style: preserve-3d }

        @keyframes sweep {
          from { transform: translateX(-60%) rotate(12deg); }
          to { transform: translateX(60%) rotate(12deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
