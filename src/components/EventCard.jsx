import { ArrowRight, Clock, Database, MapPin } from "lucide-react";
import React from "react";

const EventCard = ({ event, onRegisterClick, onAboutClick }) => {
  if (!event) return null;

  const {
    title = "Unknown Protocol",
    category = "System",
    date = "TBA",
    time = "TBA",
    venue = "Unknown Sector",
    image,
    desc = "Data corrupted or missing.",
  } = event;

  return (
    // FIX 1: Set fixed height to ensure all cards are uniform
    <div className="group relative w-full h-[450px] perspective-1000">
      {/* 1. The Card Body */}
      <div className="relative h-full flex flex-col bg-[#050505] border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] group-hover:-translate-y-2 rounded-sm">
        {/* Image Half (Fixed 50%) */}
        <div className="relative h-[50%] overflow-hidden shrink-0">
          {/* Color Overlay */}
          <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />

          {/* Diagonal Cut Overlay to blend into content */}
          <div
            className="absolute bottom-0 left-0 w-full h-12 bg-[#050505]"
            style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
          ></div>

          {/* Floating Date Badge */}
          <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-sm flex flex-col items-center text-white shadow-lg">
            <span className="text-[10px] font-bold uppercase text-blue-400 tracking-wider">
              {date.split(" ")[0]}
            </span>
            <span className="text-xl font-black leading-none">
              {date.split(" ")[1]?.replace(",", "")}
            </span>
          </div>
        </div>

        {/* Content Half (Fixed 50%) */}
        <div className="relative h-[50%] p-6 flex flex-col bg-[#050505]">
          {/* Category Tag */}
          <div className="absolute -top-3 right-6 bg-cyan-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-lg transform -skew-x-12">
            {category}
          </div>

          {/* FIX 2: Enforce line clamp and fixed height for title */}
          <div className="h-14 mb-2 flex items-center">
            <h3 className="text-xl md:text-2xl font-black text-white uppercase leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
              {title}
            </h3>
          </div>

          <div className="flex flex-col gap-2 mb-4 pl-2 border-l-2 border-white/10 group-hover:border-cyan-500 transition-colors">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <Clock size={12} className="text-blue-400" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <MapPin size={12} className="text-blue-400" />
              <span className="truncate">{venue}</span>
            </div>
          </div>

          {/* Action Buttons - Pushed to bottom */}
          <div className="mt-auto grid grid-cols-2 gap-3">
            <button
              onClick={() => onAboutClick && onAboutClick(event)}
              className="py-3 border border-white/10 hover:bg-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Database size={12} /> Details
            </button>
            <button
              onClick={() => onRegisterClick && onRegisterClick(event.id)}
              className="py-3 bg-white text-black hover:bg-cyan-400 hover:text-black font-black text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-1 group/btn shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
            >
              Join{" "}
              <ArrowRight
                size={12}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Animated Border Lines (Scanners) */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out"></div>
      </div>
    </div>
  );
};

export default EventCard;
