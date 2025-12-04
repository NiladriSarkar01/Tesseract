import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
// Removed useNavigate import as it requires Router context which might be missing here
import { useNavigate } from "react-router-dom";
import { EVENT_SLIDES } from "../lib/data";

const EventsSection = () => {
  const [activeId, setActiveId] = useState(0);
  const [animating, setAnimating] = useState(false);

  const navigate = useNavigate();

  const handleSlideChange = (id) => {
    if (animating || id === activeId) return;
    setAnimating(true);
    setActiveId(id);
    setTimeout(() => setAnimating(false), 800);
  };

  const handleExploreClick = (category) => {
    navigate("/events", {
      state: {
        category: category,
      },
    });
  };

  return (
    // 1. Container: w-full on mobile, w-[95%] on desktop. Fixed heights adapted for responsiveness.
    <div className="relative mx-auto w-full md:w-[95%] h-[85vh] md:h-[700px] bg-black overflow-hidden md:rounded-3xl border-y md:border border-blue-500/20 my-0 md:my-20 shadow-2xl shadow-red-900/10 group">
      {/* 1. Background Layer */}
      {EVENT_SLIDES.map((slide, index) => (
        <div
          key={`bg-${slide.id}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeId === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Color Tint - Reduced opacity on mobile for clearer image */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slide.color} opacity-20 md:opacity-40 mix-blend-screen z-0`}
          ></div>

          {/* Background Image */}
          {/* FIX: Increased opacity-80 on mobile for sharpness, opacity-40 md:blur-sm on desktop for background effect */}
          <img
            src={slide.image}
            alt="background"
            className="absolute inset-0 w-full h-full object-cover opacity-80 md:opacity-40 md:blur-sm scale-100 md:scale-105 z-[-1]"
          />

          {/* Dark Overlay for Text Readability */}
          {/* Stronger gradient on mobile to ensure text pop against the brighter image */}
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/70 to-transparent z-0"></div>
        </div>
      ))}

      {/* 2. Content Layer */}
      <div className="absolute inset-0 z-20 container mx-auto px-4 md:px-12 flex flex-col justify-center h-full pointer-events-none">
        {EVENT_SLIDES.map((slide, index) => (
          <div
            key={`content-${slide.id}`}
            // Responsive Positioning & Width
            className={`transition-all duration-700 ease-out absolute top-1/3 md:top-1/2 -translate-y-1/2 left-4 md:left-12 right-4 md:right-auto max-w-full md:max-w-2xl ${
              activeId === index
                ? "opacity-100 translate-x-0"
                : index < activeId
                ? "opacity-0 -translate-x-10 md:-translate-x-20"
                : "opacity-0 translate-x-10 md:translate-x-20"
            }`}
          >
            <div className="overflow-hidden mb-2 md:mb-4">
              <h3
                className={`text-sm md:text-2xl font-bold ${
                  slide.accent
                } tracking-widest uppercase transform transition-transform duration-700 delay-100 ${
                  activeId === index ? "translate-y-0" : "translate-y-full"
                }`}
              >
                {slide.subtitle}
              </h3>
            </div>

            <div className="overflow-hidden mb-3 md:mb-6">
              {/* Responsive Text Size: text-4xl on mobile, text-8xl on desktop */}
              <h2
                className={`text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] transform transition-transform duration-700 delay-200 ${
                  activeId === index ? "translate-y-0" : "translate-y-full"
                }`}
              >
                {slide.title}
              </h2>
            </div>

            <p
              className={`text-gray-200 md:text-gray-300 text-sm md:text-xl leading-relaxed max-w-full md:max-w-lg transform transition-all duration-700 delay-300 line-clamp-3 md:line-clamp-none ${
                activeId === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {slide.desc}
            </p>

            <button
              onClick={() => handleExploreClick(slide.title.toUpperCase())}
              className={`mt-6 md:mt-8 px-6 py-3 md:px-8 md:py-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-white text-xs md:text-base font-bold rounded-full flex items-center gap-2 hover:bg-red-500 transition-all pointer-events-auto transform duration-700 delay-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] ${
                activeId === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Explore {slide.title}{" "}
              <ArrowRight size={16} className="md:w-5 md:h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* 3. Hero Image Layer (Cutout on Right) - Hidden on Mobile */}
      <div className="absolute top-0 right-0 w-[55%] h-full z-10 pointer-events-none block">
        {EVENT_SLIDES.map((slide, index) => (
          <div
            key={`hero-${slide.id}`}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              activeId === index
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-20 scale-110"
            }`}
          >
            {/* Mask Gradient for fading bottom */}
            <div
              className="absolute inset-0 z-20"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 60%, black 100%)",
                mixBlendMode: "multiply",
              }}
            ></div>

            <img
              src={slide.image}
              alt="Hero"
              className="w-full h-full object-cover object-center"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to left, black 60%, transparent 100%)",
                maskImage:
                  "linear-gradient(to left, black 60%, transparent 100%)",
              }}
            />
          </div>
        ))}
      </div>

      {/* 4. Thumbnails Navigation - Responsive Positioning */}
      {/* Mobile: Bottom-left scrollable row. Desktop: Bottom-right fixed row. */}
      <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:right-12 md:left-auto z-30 flex gap-3 md:gap-4 pointer-events-auto overflow-hidden pb-2 md:pb-0 px-1 scrollbar-hide md:justify-end">
        {EVENT_SLIDES.map((slide, index) => (
          <div
            key={`thumb-${slide.id}`}
            onClick={() => handleSlideChange(index)}
            className={`relative w-14 h-20 md:w-28 md:h-40 rounded-lg md:rounded-xl overflow-hidden cursor-pointer transition-all duration-500 border-2 shrink-0 group ${
              activeId === index
                ? `border-${
                    slide.accent.split("-")[1]
                  }-400 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.3)] z-10`
                : "border-white/20 hover:border-red-500/50 opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
            }`}
          >
            <img
              src={slide.image}
              alt="thumb"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div
              className={`absolute inset-0 transition-colors duration-300  ${
                activeId === index
                  ? "bg-transparent"
                  : "bg-black/40 group-hover:bg-transparent"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
