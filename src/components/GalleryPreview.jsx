import React from "react";
import { ArrowRight, Zap, LucideLayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

const PREVIEW_IMAGES = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  url: `https://res.cloudinary.com/dtvxydxiv/image/upload/v1769710322/tesseract/gallery/img${i + 1}.jpg`,
  title: `PROJECT_0${i + 1}`,
  tag: i % 2 === 0 ? "UI/UX" : "RENDER",
}));

const GalleryPreview = () => {
  return (
    <section className="py-24 bg-[#00000000] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.3em]">
              <Zap size={14} className="fill-cyan-400" />
              <span>LIVE_DATA_FEED</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              VISUAL{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                ARCHIVE
              </span>
            </h2>
          </div>

          <Link to={"/gallery"}>
            <button className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 rounded-full">
              <span className="font-mono text-xs tracking-widest text-white">
                VIEW_ALL_UNITS
              </span>
              <ArrowRight
                size={16}
                className="text-cyan-400 group-hover:translate-x-2 transition-transform"
              />
            </button>
          </Link>
        </div>

        {/* The Bento-Boutique Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[800px] md:h-[600px]">
          {PREVIEW_IMAGES.map((img, idx) => (
            <div
              key={img.id}
              className={`relative group overflow-hidden rounded-2xl border border-white/5 transition-all duration-700
                ${idx === 0 ? "md:col-span-2 md:row-span-2" : ""} 
                ${idx === 1 ? "md:row-span-2" : ""}
                ${idx === 5 ? "md:col-span-2" : ""}
              `}
            >
              {/* Image Container */}
              <div className="absolute inset-0 z-0">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-all duration-1000 
                             filter saturate-[1.5] hue-rotate-[15deg] brightness-[0.7]
                             group-hover:saturate-[1] group-hover:hue-rotate-0 group-hover:brightness-100 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Glassmorphic UI Elements */}
              <div className="absolute top-4 left-4 z-10">
                <div className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
                  <span className="text-[10px] font-mono text-cyan-400 tracking-tighter">
                    {img.tag}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 z-10 transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <p className="text-white font-black text-xl tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.title}
                </p>
                <div className="h-1 w-0 group-hover:w-full bg-cyan-500 transition-all duration-700 mt-1 shadow-[0_0_10px_#06b6d4]" />
              </div>

              {/* Interactive Border Effect */}
              <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/30 transition-all duration-500 rounded-2xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Footer Meta */}
        <div className="mt-12 flex items-center gap-4 opacity-30 group">
          <LucideLayoutGrid size={16} />
          <div className="h-px flex-1 bg-gradient-to-r from-white to-transparent"></div>
          <span className="font-mono text-[10px] tracking-[0.5em]">
            END_OF_PREVIEW_REELS
          </span>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
