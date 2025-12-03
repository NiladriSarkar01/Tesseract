import { ArrowRight, Calendar, Clock, MapPin, Search } from "lucide-react";
import React from "react";
/**
 * Event Card Component
 * Updated to include About button
 */
const EventCard = ({ event, onRegisterClick, onAboutClick }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:-translate-y-1 backdrop-blur-sm flex flex-col h-full">
      
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050000] via-transparent to-transparent z-10" />
        <img 
          src={event.image || "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000"} 
          alt={event.title} 
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/1e0000/ff4444?text=EVENT+IMAGE"; }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 z-20">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-red-500/10 border border-red-500/20 text-red-400 rounded-full backdrop-blur-md">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-20 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-1">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar size={14} className="mr-2 text-red-500" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Clock size={14} className="mr-2 text-red-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <MapPin size={14} className="mr-2 text-red-500" />
            <span>{event.venue}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {event.desc}
        </p>

        {/* Updated Button Group */}
        <div className="mt-auto flex gap-3">
            <button 
                onClick={() => onAboutClick(event)}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all flex items-center justify-center gap-2 text-gray-400 hover:text-white"
            >
                <Search size={16} /> About
            </button>
            <button 
                onClick={() => onRegisterClick(event.id)}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 border border-red-600 text-sm font-medium transition-all flex items-center justify-center gap-2 text-white"
            >
                Register
                <ArrowRight size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;