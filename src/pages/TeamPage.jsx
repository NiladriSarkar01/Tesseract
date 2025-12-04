import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Users,
  Shield,
  Code,
  Zap,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Terminal,
  ChevronRight,
  ChevronLeft,
  Activity,
  Crosshair,
  Scan,
  User,
} from "lucide-react";
import { TEAM_DATA } from "../lib/data";

// --- COMPONENT: AGENT SELECTOR DECK (Bottom Strip) ---
const AgentDeck = ({ members, selectedId, onSelect }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to selected item
  useEffect(() => {
    if (scrollRef.current) {
      const selectedEl = scrollRef.current.querySelector(
        `[data-id="${selectedId}"]`
      );
      if (selectedEl) {
        selectedEl.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedId]);

  return (
    <div className="fixed bottom-0 left-0 w-full h-24 bg-transparent backdrop-blur-xl border-t border-white/10 z-40 flex flex-col">
      {/* Decorative Top Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

      <div
        ref={scrollRef}
        className="flex-1 flex items-center gap-4 overflow-x-auto px-6 py-2 no-scrollbar"
      >
        {members.map((member) => (
          <button
            key={member.id}
            data-id={member.id}
            onClick={() => onSelect(member.id)}
            className={`relative group flex-shrink-0 transition-all duration-300 ${
              selectedId === member.id
                ? "scale-105 z-10"
                : "scale-95 opacity-60 hover:opacity-100 hover:scale-100"
            }`}
          >
            {/* Avatar Box */}
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedId === member.id
                  ? "border-cyan-500 shadow-[0_0_15px_rgba(0,138,138,0.6)]"
                  : "border-white/20 group-hover:border-white/50"
              }`}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Active Indicator */}
            {selectedId === member.id && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_5px_cyan]"></div>
            )}
          </button>
        ))}

        {/* Empty State in Deck */}
        {members.length === 0 && (
          <div className="w-full text-center text-gray-500 font-mono text-xs">
            NO AGENTS FOUND
          </div>
        )}
      </div>
    </div>
  );
};

// --- COMPONENT: HOLO PROFILE (Main Stage) ---
const HoloProfile = ({ member, onNext, onPrev }) => {
  if (!member) return null;

  return (
    <div className="relative w-full h-full flex flex-col transform scale-95 md:scale-100 md:flex-row animate-in fade-in zoom-in-95 duration-500">
      {/* Background Grid for this section */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* --- LEFT: VISUAL --- */}
      <div className="relative w-full md:w-5/12 h-48 md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-white/10 group">
        {/* Image */}
        <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay z-10"></div>
        <img
          key={member.id}
          src={member.img}
          alt={member.name}
          className="w-full h-full object-contain object-center transition-transform duration-700"
        />

        {/* Navigation Overlays (Desktop Hover) */}
        <div className="absolute inset-0 z-20 flex justify-between items-center px-2 opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button
            onClick={onPrev}
            className="p-3 rounded-full bg-black/50 hover:bg-cyan-600 text-white transition-all backdrop-blur-md border border-white/10"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={onNext}
            className="p-3 rounded-full bg-black/50 hover:bg-cyan-600 text-white transition-all backdrop-blur-md border border-white/10"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Mobile Nav (Always Visible) */}
        <div className="md:hidden absolute bottom-4 right-4 z-30 flex gap-2">
          <button
            onClick={onPrev}
            className="p-2 rounded-full bg-black/60 border border-white/20 text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            className="p-2 rounded-full bg-black/60 border border-white/20 text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Scanner Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_15px_rgba(0,138,138,0.8)] opacity-30 animate-[scan_4s_linear_infinite]"></div>
      </div>

      {/* --- RIGHT: DATA --- */}
      <div className="relative w-full md:w-7/12 p-6 md:p-8 flex flex-col bg-[#050505]/90 backdrop-blur-sm overflow-y-auto no-scrollbar">
        <div className="mb-4 md:mb-6">
          <div className="flex items-center gap-2 mb-2 md:mb-4">
            <span
              className={`px-3 py-1 rounded border text-[10px] font-bold uppercase tracking-widest ${
                member.dept === "TECH"
                  ? "bg-blue-900/20 border-blue-500/30 text-blue-400"
                  : "bg-cyan-900/20 border-cyan-500/30 text-blue-400"
              }`}
            >
              {member.dept} DIVISION
            </span>
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="text-xs font-mono text-gray-500">
              {member.level}_ACCESS
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white uppercase leading-none tracking-tight mb-1 md:mb-2">
            {member.name}
          </h1>
          <p className="text-blue-500 font-mono text-xs md:text-sm uppercase tracking-widest">
            // {member.role}
          </p>
        </div>

        <div className="p-4 md:p-5 bg-white/5 border-l-2 border-cyan-500 rounded-r-xl mb-6">
          <p className="text-gray-300 text-xs md:text-base leading-relaxed font-light">
            "{member.bio}"
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
              Specialization
            </p>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-600 w-[90%]"></div>
            </div>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
              Activity
            </p>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[95%]"></div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10 flex flex-wrap gap-4">
          <button className="flex-1 py-2.5 md:py-3 bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-cyan-500 hover:text-white transition-colors rounded-sm flex items-center justify-center gap-2 shadow-lg">
            <Mail size={16} /> Contact Agent
          </button>
          <div className="flex gap-2">
            <SocialBtn icon={Github} />
            <SocialBtn icon={Linkedin} />
            <SocialBtn icon={Twitter} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialBtn = ({ icon: Icon }) => (
  <a
    href="#"
    className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border border-white/20 text-gray-400 hover:text-white hover:border-cyan-500 hover:bg-cyan-500/10 transition-all rounded-sm"
  >
    <Icon size={18} />
  </a>
);

// --- MAIN PAGE COMPONENT ---
const TeamPage = () => {
  const [selectedMemberId, setSelectedMemberId] = useState(1);

  // Get current active member
  const activeMember =
    TEAM_DATA.find((m) => m.id === selectedMemberId) || TEAM_DATA[0];

  // Navigation Logic
  const handleNext = () => {
    const currentIndex = TEAM_DATA.findIndex((m) => m.id === activeMember.id);
    const nextIndex = (currentIndex + 1) % TEAM_DATA.length;
    if (TEAM_DATA[nextIndex]) setSelectedMemberId(TEAM_DATA[nextIndex].id);
  };

  const handlePrev = () => {
    const currentIndex = TEAM_DATA.findIndex((m) => m.id === activeMember.id);
    const prevIndex = (currentIndex - 1 + TEAM_DATA.length) % TEAM_DATA.length;
    if (TEAM_DATA[prevIndex]) setSelectedMemberId(TEAM_DATA[prevIndex].id);
  };

  return (
    <div className="h-[83vh] bg-[#020408] font-sans text-white selection:bg-cyan-500 selection:text-white relative flex flex-col overflow-hidden">
      {/* MAIN CONTENT AREA */}
      {/* Calc height: 100vh - (Header ~64px + Bottom Deck ~96px + Padding) */}
      <main className="flex-1 relative container mx-auto px-0 md:px-6 py-0 md:py-6 h-[calc(100vh-200px)] md:h-[calc(100vh-200px)] flex items-center justify-center">
        {TEAM_DATA.length > 0 ? (
          <div className="h-full w-full max-w-5xl mx-auto max-h-[600px]">
            <HoloProfile
              member={activeMember}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-mono uppercase tracking-widest">
              No matching operatives
            </p>
          </div>
        )}
      </main>

      {/* BOTTOM DECK (Sticky) */}
      <AgentDeck
        members={TEAM_DATA}
        selectedId={selectedMemberId}
        onSelect={setSelectedMemberId}
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default TeamPage;
