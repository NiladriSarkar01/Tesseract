import React, { useState, useEffect } from "react";
import { ArrowDown, Aperture } from "lucide-react";
import ScrollView from "../components/ScrollView";
import HexView from "../components/HexView";

/**
 * MAIN COMPONENT: Gallery Hero
 */
const GalleryHero = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-[80vh] bg-transparent overflow-hidden flex flex-col items-center justify-center font-sans text-white perspective-1000">
      {/* Grid Floor */}
      <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_bottom,transparent_0%,#26314010_100%)] mask-[linear-gradient(to_bottom,transparent,black)] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom"></div>
      </div>

      {/* 2. Main Content */}
      <div
        className="relative z-10 text-center transform transition-transform duration-100 ease-out"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {/* Floating Hologram Icon */}
        <div className="mb-8 relative inline-block group">
          <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
          <div className="relative w-24 h-24 border border-cyan-500/30 bg-black/50 backdrop-blur-md rounded-2xl flex items-center justify-center transform rotate-45 group-hover:rotate-90 transition-transform duration-700 shadow-2xl shadow-cyan-900/20">
            <Aperture
              size={48}
              className="text-blue-500 transform -rotate-45 group-hover:-rotate-90 transition-transform duration-700"
            />
          </div>
          {/* Decorative corners */}
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>
        </div>

        {/* Typography */}
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-2 relative select-none">
          <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-b from-white via-gray-200 to-gray-600">
            LEGACY-DATABASE
          </span>
          <span className="absolute top-0 left-0 text-blue-600/20 blur-sm z-0 transform translate-x-1 translate-y-1">
            LAGACY-DATABASE
          </span>
        </h1>

        <div className="flex items-center justify-center gap-4 text-sm font-mono text-blue-400/80 tracking-[0.3em] uppercase">
          <span>Visual_Logs</span>
          <div className="w-12 h-[1px] bg-cyan-500/50"></div>
          <span>Database_V3</span>
        </div>
      </div>

      {/* 3. Scroll Indicator */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] font-mono tracking-widest text-gray-500">
          SCROLL_TO_ACCESS
        </span>
        <ArrowDown size={20} className="text-blue-500" />
      </div>

      {/* Styles */}
      <style>{`
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-down {
          animation: scroll-down 20s linear infinite;
        }
        .animate-scroll-up {
          animation: scroll-up 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

const GalleryPage = () => {
  return (
    <>
      <GalleryHero />
      <ScrollView />
      <HexView />
    </>
  );
};

export default GalleryPage;
