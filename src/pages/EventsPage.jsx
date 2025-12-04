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

import EventCard from "../components/EventCard.jsx";

import { EVENTS_DATA, EVENT_CATEGORIES } from "../lib/data.js";
import { useLocation, useNavigate } from "react-router-dom";

// --- COMPONENT: ABOUT MODAL ---
const AboutModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 mt-15 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Main Modal Container */}
      {/* CHANGED: Increased max-width to 5xl for better spacing */}
      <div className="bg-[#050505] border border-cyan-500/30 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.15)] relative z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-gray-400 hover:bg-red-600 hover:text-white transition-colors z-20 backdrop-blur-md border border-white/10"
        >
          <X size={20} />
        </button>

        {/* Header Image */}
        <div className="relative h-48 shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover grayscale-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent flex items-end p-6">
            <div>
              <span className="px-3 py-1 rounded bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider mb-2 inline-block backdrop-blur-md">
                {event.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                {event.title}
              </h2>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-8 overflow-y-auto flex-grow custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-fixed">
          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-cyan-500 mb-3 flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-2">
              <ScrollText size={16} /> Mission Brief
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm font-mono">
              {event.desc}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded border border-white/10 bg-white/5">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                Date
              </span>
              <div className="flex items-center gap-2 text-white font-mono text-sm">
                <Calendar size={14} className="text-cyan-500" /> {event.date}
              </div>
            </div>
            <div className="p-3 rounded border border-white/10 bg-white/5">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                Time
              </span>
              <div className="flex items-center gap-2 text-white font-mono text-sm">
                <Clock size={14} className="text-cyan-500" /> {event.time}
              </div>
            </div>
            <div className="p-3 rounded border border-white/10 bg-white/5">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
                Location
              </span>
              <div className="flex items-center gap-2 text-white font-mono text-sm">
                <MapPin size={14} className="text-cyan-500" /> {event.venue}
              </div>
            </div>
          </div>

          {/* --- NEW LAYOUT: Rules & Prizes Side-by-Side --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Rules & Regulations */}
            <div>
              <h3 className="text-sm font-bold text-cyan-500 mb-3 flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-2">
                <Ticket size={16} /> Protocols
              </h3>
              <ul className="text-gray-400 space-y-2 text-sm font-mono">
                {event.rules?.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-cyan-500 shrink-0">{`>`}</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prizes */}
            <div>
              <h3 className="text-sm font-bold text-cyan-500 mb-3 flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-2">
                <Zap size={16} /> Bounties
              </h3>
              <div className="p-4 rounded border border-cyan-500/20 bg-cyan-900/10 text-cyan-200 font-mono text-sm">
                {event.prizes || "To be announced."}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold text-cyan-500 mb-4 flex items-center gap-2 uppercase tracking-widest border-b border-white/10 pb-2">
              <Phone size={16} /> Command Center
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Head Contact */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors group">
                <p className="text-[10px] font-bold uppercase text-cyan-600 mb-2 tracking-wider">
                  Event Head
                </p>
                <p className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {event.head?.name || "N/A"}
                </p>
                <div className="space-y-2 text-xs text-gray-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-cyan-600" />
                    {event.head?.mobile || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-cyan-600" />
                    {event.head?.email || "N/A"}
                  </div>
                </div>
              </div>

              {/* Co-Head Contact */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-colors group">
                <p className="text-[10px] font-bold uppercase text-cyan-600 mb-2 tracking-wider">
                  Co-Event Head
                </p>
                <p className="text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {event.coHead?.name || "N/A"}
                </p>
                <div className="space-y-2 text-xs text-gray-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-cyan-600" />
                    {event.coHead?.mobile || "N/A"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-cyan-600" />
                    {event.coHead?.email || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur flex gap-4">
          <button className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-black font-black uppercase tracking-wider rounded transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2">
            Join Protocol <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

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
      <div className="relative z-10 container mx-auto px-6 py-20">
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
        <div className="sticky top-20 z-40 w-full backdrop-blur-xl border-b border-white/10 bg-[#020408]/80 shadow-lg shadow-red-900/5 transition-all duration-300">
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
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={onRegisterClick}
                onAboutClick={setSelectedAboutEvent}
              />
            ))}
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
