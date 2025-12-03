import React, { useState } from 'react';
import { Gamepad2, Bot, Terminal, Music, ArrowRight } from 'lucide-react';

const EventsSection = () => {
  const [activeId, setActiveId] = useState(0);
  const [animating, setAnimating] = useState(false);

  const slides = [
    {
      id: 0,
      title: "GAMING",
      subtitle: "THE ARENA",
      desc: "Immerse yourself in 72 hours of non-stop competitive gaming. From Valorant to FIFA, prove your dominance.",
      color: "from-red-400 via-blue-400 to-indigo-500", // Warm tones
      accent: "text-cyan-400",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070",
      icon: Gamepad2
    },
    {
      id: 1,
      title: "ROBOTICS",
      subtitle: "STEEL CLASH",
      desc: "Witness the sparks fly as 50kg bots battle for supremacy in our state-of-the-art combat arena.",
      color: "from-orange-900 to-amber-900",
      accent: "text-orange-400",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070",
      icon: Bot
    },
    {
      id: 2,
      title: "CODING",
      subtitle: "HACKATHON",
      desc: "Sleep is for the weak. Build the next unicorn in our 36-hour intense hackathon marathon.",
      color: "from-red-900 to-rose-900",
      accent: "text-rose-400",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070",
      icon: Terminal
    },
    {
      id: 3,
      title: "CONCERT",
      subtitle: "STAR NIGHT",
      desc: "End the fest with a bang. Featuring top DJs and bands from around the country.",
      color: "from-rose-900 to-pink-900",
      accent: "text-pink-400",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070",
      icon: Music
    }
  ];

  const handleSlideChange = (id) => {
    if (animating || id === activeId) return;
    setAnimating(true);
    setActiveId(id);
    setTimeout(() => setAnimating(false), 800);
  };

  return (
    <div className="relative ml-auto mr-auto w-[95%] h-[80vh] md:h-[700px] bg-black overflow-hidden rounded-3xl border border-blue-500/20 my-20 shadow-2xl shadow-red-900/10">
      {/* 1. Background Layer */}
      {slides.map((slide, index) => (
        <div
          key={`bg-${slide.id}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            activeId === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Color Tint */}
          <div className={`absolute inset-0 bg-linear-to-br ${slide.color} opacity-50 mix-blend-screen z-0`}></div>
          
          {/* Blurred Background Image */}
          <img 
            src={slide.image} 
            alt="background"
            className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm scale-105 z-[-1]" 
          />
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-linear-to-r from-[#183232] via-black/80 to-transparent z-0"></div>
        </div>
      ))}

      {/* 2. Content Layer */}
      <div className="absolute inset-0 z-20 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full pointer-events-none">
        {slides.map((slide, index) => (
          <div 
            key={`content-${slide.id}`}
            className={`transition-all duration-700 ease-out absolute top-1/2 -translate-y-1/2 left-6 md:left-12 max-w-xl md:max-w-2xl ${
              activeId === index 
                ? "opacity-100 translate-x-0" 
                : index < activeId 
                  ? "opacity-0 -translate-x-20" 
                  : "opacity-0 translate-x-20"
            }`}
          >
            <div className="overflow-hidden mb-2 md:mb-4">
              <h3 className={`text-xl md:text-2xl font-bold ${slide.accent} tracking-widest uppercase transform transition-transform duration-700 delay-100 ${activeId === index ? "translate-y-0" : "translate-y-full"}`}>
                {slide.subtitle}
              </h3>
            </div>
            
            <div className="overflow-hidden mb-4 md:mb-6">
              <h2 className={`text-5xl md:text-8xl font-black text-white leading-none transform transition-transform duration-700 delay-200 ${activeId === index ? "translate-y-0" : "translate-y-full"}`}>
                {slide.title}
              </h2>
            </div>

            <p className={`text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg transform transition-all duration-700 delay-300 ${activeId === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {slide.desc}
            </p>

            <button className={`mt-8 px-8 py-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-white font-bold rounded-full flex items-center gap-2 hover:bg-red-500 transition-all pointer-events-auto transform duration-700 delay-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] ${activeId === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              Explore {slide.title} <ArrowRight size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* 3. Hero Image Layer (Cutout on Right) - Hidden on Mobile */}
      <div className="absolute top-0 right-0 w-[55%] h-full z-10 pointer-events-none hidden md:block">
        {slides.map((slide, index) => (
          <div
            key={`hero-${slide.id}`}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              activeId === index 
                ? "opacity-100 translate-x-0 scale-100" 
                : "opacity-0 translate-x-20 scale-110"
            }`}
          >
            {/* Mask Gradient for fading bottom */}
            <div className="absolute inset-0 z-20" style={{ background: 'linear-gradient(to bottom, transparent 60%, black 100%)', mixBlendMode: 'multiply' }}></div>
            
            <img 
              src={slide.image} 
              alt="Hero"
              className="w-full h-full object-cover object-center"
              style={{ 
                WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
                maskImage: 'linear-gradient(to left, black 60%, transparent 100%)'
              }}
            />
          </div>
        ))}
      </div>

      {/* 4. Thumbnails Navigation */}
      <div className="absolute bottom-6 right-6 md:right-12 z-30 flex gap-3 md:gap-4 pointer-events-auto overflow-x-auto max-w-full pb-2 md:pb-0 px-2 scrollbar-hide">
        {slides.map((slide, index) => (
          <div 
            key={`thumb-${slide.id}`}
            onClick={() => handleSlideChange(index)}
            className={`relative w-16 h-24 md:w-28 md:h-40 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 border-2 shrink-0 group ${
              activeId === index 
                ? `border-${slide.accent.split('-')[1]}-400 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.3)] z-10` 
                : "border-white/20 hover:border-red-500/50 opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
            }`}
          >
            <img src={slide.image} alt="thumb" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
            <div className={`absolute inset-0 transition-colors duration-300 ${activeId === index ? 'bg-transparent' : 'bg-black/40 group-hover:bg-transparent'}`}></div>
            
            <div className="absolute bottom-1 left-1 right-1 md:bottom-2 md:left-2 md:right-2">
              <slide.icon size={14} className={`text-white mb-1 md:mb-2 ${activeId === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-300`} />
              <p className="text-[9px] md:text-[10px] font-bold text-white uppercase truncate tracking-wider">{slide.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;