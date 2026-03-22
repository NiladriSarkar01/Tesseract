import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Zap,
  Search,
  X,
  ScrollText,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Phone,
  Mail,
  ArrowRight,
  Terminal,
} from "lucide-react";

import { EventCard } from "../components/EventCard.jsx";
import { ComboEventCard } from "../components/ComboEventCard.jsx";

import { EVENTS_DATA, EVENT_CATEGORIES } from "../lib/data.js";
import { useLocation, useNavigate } from "react-router-dom";

// --- COMPONENT: ABOUT MODAL ---
// ─── Category palette (matches EventCard) ───────────────────────────────────
const PALETTE = {
  CODING: { accent: "#c40886", glow: "rgba(196,8,134,0.45)" },
  MISCELLANEOUS: { accent: "#a855f7", glow: "rgba(168,85,247,0.45)" },
  INDOORGAME: { accent: "#f97316", glow: "rgba(249,115,22,0.45)" },
  GAMING: { accent: "#22c55e", glow: "rgba(34,197,94,0.45)" },
  ROBOTICS: { accent: "#eab308", glow: "rgba(234,179,8,0.45)" },
  DEFAULT: { accent: "#06b6d4", glow: "rgba(6,182,212,0.45)" },
};

function getPalette(cat = "") {
  const key = cat.toUpperCase().replace(/\s+/g, "");
  return PALETTE[key] ?? PALETTE.DEFAULT;
}

// ─── Contact Card ─────────────────────────────────────────────────────────────
const ContactCard = ({ label, person, accent }) => (
  <div
    style={{
      padding: "12px 14px",
      background: "rgba(255,255,255,0.03)",
      border: `1px solid rgba(255,255,255,0.08)`,
      borderRadius: 2,
      transition: "border-color 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent}50`)}
    onMouseLeave={(e) =>
      (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
    }
  >
    <p
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 8,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: accent,
        marginBottom: 6,
      }}
    >
      {label}
    </p>
    <p
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 20,
        letterSpacing: "0.05em",
        color: "#fff",
        marginBottom: 8,
      }}
    >
      {person.name || "N/A"}
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {person.mobile && (
        <a
          href={`tel:${person.mobile}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9,
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
          }
        >
          <Phone size={10} style={{ color: accent }} />
          {person.mobile}
        </a>
      )}
      {person.email && (
        <a
          href={`mailto:${person.email}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9,
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
          }
        >
          <Mail size={10} style={{ color: accent }} />
          {person.email}
        </a>
      )}
    </div>
  </div>
);

// ─── Section heading ──────────────────────────────────────────────────────────
const SectionHeading = ({ icon, label, accent }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      paddingBottom: 10,
      marginBottom: 12,
      borderBottom: `1px solid rgba(255,255,255,0.07)`,
    }}
  >
    <span style={{ color: accent }}>{icon}</span>
    <span
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: accent,
      }}
    >
      {label}
    </span>
  </div>
);

// ─── AboutModal ───────────────────────────────────────────────────────────────
import { AboutModal } from "../components/AboutModel.jsx";

/**
 * Main Page Component
 */
const EventsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const category = location?.state?.category ?? "ALL";

  const [activeTab, setActiveTab] = useState(category);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAboutEvent, setSelectedAboutEvent] = useState(null);

  const onRegisterClick = (eventId) => {
    navigate("/register", {
      state: {
        eventId: eventId,
      },
    });
  };

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeTab === "ALL" || event.category.toUpperCase() === activeTab;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-[50vh] bg-linear-to-b from-[#0f172a] to-transparent pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      {/* Main Content */}
      <div className="relative mt-16 z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 text-cyan-400 text-xs font-bold tracking-widest uppercase">
            <Zap size={12} className="fill-current" />
            Event Schedule
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            EXPLORE THE <br /> UNIVERSE
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Dive into a curated collection of events designed to challenge your
            skills and ignite your imagination.
          </p>
        </div>
        <div className="sticky top-25 z-40 w-full backdrop-blur-xl border-b border-white/10 bg-[#020408]/80 shadow-lg shadow-red-900/5 transition-all duration-300">
          <div className="container mx-auto px-4 py-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Brand / Title */}
            <div className="flex items-center gap-2 text-red-500 w-full lg:w-auto justify-center lg:justify-start">
              <Terminal size={20} />
              <span className="text-sm font-mono tracking-widest uppercase font-bold">
                Events_Database_V3
              </span>
            </div>

            {/* Controls Container */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
              {/* Search Input */}
              <div className="relative group w-full md:w-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative flex items-center bg-[#0a0a0a] rounded-lg px-3 py-2 border border-white/10 focus-within:border-red-500/50 transition-colors">
                  <Search size={16} className="text-gray-500 shrink-0" />
                  <input
                    type="text"
                    placeholder="SEARCH..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 text-xs text-white placeholder-gray-600 font-mono w-full md:w-48 lg:w-64 focus:outline-none ml-2 uppercase"
                  />
                </div>
              </div>

              {/* Desktop Filters */}
              <div className="hidden md:flex gap-1 overflow-x-auto">
                {EVENT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-widest uppercase transition-all border cursor-pointer ${
                      activeTab === cat
                        ? "bg-red-600 border-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                        : "bg-white/5 border-white/5 text-gray-500 hover:border-red-500/30 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filters (Horizontal Scroll) */}
            <div className="md:hidden w-full overflow-x-auto pb-2 no-scrollbar">
              <div className="flex gap-2 min-w-max px-1">
                {EVENT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all border whitespace-nowrap ${
                      activeTab === cat
                        ? "bg-red-600 border-red-600 text-white shadow-lg"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Events Grid */} {/* --- MAIN GRID CONTENT --- */}
        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredEvents?.map((item) =>
              item.category.toUpperCase() === "COMBO" ? (
                <ComboEventCard
                  key={`combo-${item.id}`}
                  combo={item}
                  onRegisterClick={onRegisterClick}
                  onAboutClick={setSelectedAboutEvent}
                />
              ) : (
                <EventCard
                  key={`event-${item.id}`}
                  event={item}
                  onRegisterClick={onRegisterClick}
                  onAboutClick={setSelectedAboutEvent}
                />
              ),
            )}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
              <Search size={48} className="mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                No events found
              </h3>
              <p className="text-gray-400">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setActiveTab("ALL");
                  setSearchQuery("");
                }}
                className="mt-6 px-6 py-2 bg-cyan-500 text-black rounded-lg font-bold hover:bg-cyan-400 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        {/* --- ABOUT MODAL --- */}
        <AboutModal
          event={selectedAboutEvent}
          onClose={() => setSelectedAboutEvent(null)}
        />
        <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      </div>
    </div>
  );
};

export default EventsPage;
