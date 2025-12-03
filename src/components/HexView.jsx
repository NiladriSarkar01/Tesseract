import React, { useMemo } from 'react';
import { Zap, Hexagon, Maximize2 } from 'lucide-react';

// --- CONSTANTS ---
const CONFIG = {
  // Standard Hexagon Clip Path
  HEXAGON_PATH: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
};

// --- DATA GENERATOR ---
const generateHiveData = (count = 25) => { // Increased count to fill space
  const baseImages = [
    '1535295972055-1c762f4483e5',
    '1550751827-4bd374c3f58b',
    '1515630278258-407f66498911',
    '1555664424-778a69022365',
    '1526374965328-7f61d4dc18c5',
    '1558346490-a72e53ae2d4f',
    '1531297461318-0f8e17153c4c',
    '1488590528505-98d2b5aba04b'
  ];

  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    title: `Log_${i + 1}`,
    src: `https://images.unsplash.com/photo-${baseImages[i % baseImages.length]}?auto=format&fit=crop&q=80&w=400`
  }));
};

/**
 * SUB-COMPONENT: Single Hexagon Card
 */
const HexCard = ({ image }) => {
  return (
    // 1. Base Size: Smaller (w-24 h-28)
    // 2. Hover Scale: Massive (scale-[2.8])
    <div className="group relative w-16 h-20 md:w-24 md:h-28 flex items-center justify-center z-10 hover:z-50 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.2,1)] hover:scale-[2.8]">
      
      {/* 1. Glow Effect (Hover) */}
      <div className="absolute inset-0 bg-red-500/60 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-110" />

      {/* 2. The Border Layer (Background Color) */}
      <div 
        className="absolute inset-0 bg-red-900/30 group-hover:bg-white transition-colors duration-300"
        style={{ clipPath: CONFIG.HEXAGON_PATH }}
      />

      {/* 3. The Content Layer (Inset to reveal border) */}
      <div 
        className="absolute inset-[1.5px] bg-[#0a0a0a] overflow-hidden"
        style={{ clipPath: CONFIG.HEXAGON_PATH }}
      >
        {/* Image */}
        <img 
          src={image.src} 
          alt={image.title} 
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.7] group-hover:grayscale-0 transition-all duration-300"
        />
        
        {/* Dark Overlay (Fades out on hover) */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-300" />

        {/* Hover Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-black/60 backdrop-blur-sm p-0.5 rounded-full border border-white/20 mb-0.5">
            <Maximize2 size={8} className="text-white" />
          </div>
          <span className="text-[6px] font-black text-white uppercase tracking-wider bg-black/50 px-1.5 py-0.5 rounded leading-none">
            VIEW
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * MAIN COMPONENT: Hexagon Gallery
 */
const HexagonGallery = () => {
  const galleryData = useMemo(() => generateHiveData(25), []);

  return (
    <section className="min-h-screen bg-transparent text-white py-24 font-sans relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-900/10 border border-red-500/20 mb-6">
             <Zap size={14} className="text-red-500 fill-current animate-pulse" />
             <span className="text-xs font-bold tracking-widest text-red-400 uppercase">Hive_Database</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-2">
             DIGITAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">MOSAIC</span>
          </h2>
          <p className="text-gray-500 text-sm font-mono">Processing visual fragments...</p>
        </div>

        {/* Hex Grid Layout */}
        <div className="flex justify-center items-center w-full">
          <div className="grid-container">
            {galleryData.map((item, idx) => (
              <div key={item.id} className="hex-cell">
                <HexCard image={item} index={idx + 1} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CSS Grid Logic */}
      <style>{`
        .grid-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 1000px;
          margin: 0 auto;
        }

        .hex-cell {
          /* Reduced negative margins for smaller hexes */
          margin: 0 2px -18px 2px; 
          position: relative;
        }

        /* Mobile: Simple offset */
        @media (max-width: 767px) {
           .hex-cell:nth-child(odd) {
              margin-left: 34px; /* Adjusted for w-16 width */
           }
           .hex-cell {
              margin: 0 1px -14px 1px;
           }
        }

        /* Desktop Interlocking Logic */
        @media (min-width: 768px) {
            /* Shift pattern for ~9 items per row.
               52px = (Width w-24 (96px) / 2) + margin offset approx.
            */
            .hex-cell:nth-child(19n + 11) {
               margin-left: 52px; 
            }
            .hex-cell {
               margin: 0 2px -22px 2px;
            }
        }
      `}</style>
    </section>
  );
};

export default HexagonGallery;