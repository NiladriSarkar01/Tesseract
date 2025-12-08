import React, { useState } from "react";
import {
  X,
  Database,
  ChevronDown,
  Loader2,
  Search,
  Zap,
  Cpu,
} from "lucide-react";

// --- 1. CONFIGURATION & DATA GENERATION ---

const TOTAL_IMAGES = 78;

// Programmatically generate 70 items
const DEMO_DATA = Array.from({ length: TOTAL_IMAGES }, (_, index) => {
  const id = index + 1;
  return {
    id: id,
    title: `Image ${id}`,
    // Points to public/gallery/img1.jpg, img2.jpg, etc.
    img: `/gallery/img${id}.JPG`,
    desc: "",
  };
});

// --- 2. UTILITY FUNCTIONS ---

// Helper to assign random sizes for the Bento Grid look
const assignSizes = (data) => {
  // Pattern to repeat for grid variety
  const pattern = [
    "large",
    "small",
    "small",
    "tall",
    "small",
    "wide",
    "small",
    "small",
  ];

  return data.map((item, index) => ({
    ...item,
    size: pattern[index % pattern.length],
  }));
};

// Process the data
const PROCESSED_DATA = assignSizes(DEMO_DATA);

// --- 3. SUB-COMPONENTS ---

const GalleryHero = ({ count }) => {
  return (
    <section className="relative w-full h-[50vh] bg-[#050505] flex flex-col items-center justify-center border-b border-gray-800 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-[#050505] to-[#050505]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent opacity-50"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div className="relative z-10 text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-6 backdrop-blur-sm">
          <Zap size={12} className="fill-cyan-400" />
          <span>SYSTEM ONLINE</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2">
          LEGACY_DB
        </h1>

        <div className="h-1 w-24 bg-cyan-500 mx-auto mb-6 shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>

        <div className="flex items-center justify-center gap-3 text-cyan-500 font-mono text-xs tracking-[0.2em]">
          <Database size={14} />
          <span>INDEXING {count} FILES</span>
        </div>
      </div>
    </section>
  );
};

const DatabaseCard = ({ item, onClick }) => {
  const sizeClasses = {
    small: "col-span-1 row-span-1 h-[250px]",
    large: "col-span-1 md:col-span-2 row-span-2 h-[516px]", // 250*2 + 16 gap
    tall: "col-span-1 row-span-2 h-[516px]",
    wide: "col-span-1 md:col-span-2 row-span-1 h-[250px]",
  };

  return (
    <div
      onClick={() => onClick(item)}
      className={`relative group overflow-hidden border border-gray-800 bg-gray-900/40 cursor-pointer ${
        sizeClasses[item.size]
      }`}
    >
      <div className="absolute inset-0 bg-gray-800 animate-pulse" />

      <img
        src={item.img}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.parentNode.classList.add("bg-red-900/20");
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

      {/* Scanner Line Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.8)] translate-y-[-100%] group-hover:translate-y-[600px] transition-transform duration-[1.5s] ease-linear pointer-events-none"></div>

      {/* Corner Accents */}
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg md:text-xl font-bold text-white font-mono truncate uppercase leading-none">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

// --- 4. MAIN COMPONENT ---

const GalleryPage = () => {
  const [itemsToShow, setItemsToShow] = useState(12);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Pagination Logic (No filtering)
  const visibleItems = PROCESSED_DATA.slice(0, itemsToShow);
  const hasMore = itemsToShow < PROCESSED_DATA.length;

  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate "Decryption" delay
    setTimeout(() => {
      setItemsToShow((prev) => prev + 8);
      setLoadingMore(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 pb-20 font-sans">
      <GalleryHero count={PROCESSED_DATA.length} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Controls Toolbar - Now only shows count since filters are gone */}
        <div className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-md py-4 mb-8 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 font-mono text-sm">
            <Cpu size={16} className="text-cyan-500 animate-pulse" />
            <span>VISIBLE_UNITS: {visibleItems.length}</span>
          </div>

          <div className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">
            ARCHIVE_MODE: UNRESTRICTED
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-auto gap-4 transition-all">
          {visibleItems.map((item) => (
            <DatabaseCard key={item.id} item={item} onClick={setSelectedItem} />
          ))}
        </div>

        {/* Empty State */}
        {visibleItems.length === 0 && (
          <div className="py-20 text-center border border-dashed border-gray-800 rounded-lg">
            <Search className="mx-auto text-gray-700 mb-4" size={48} />
            <p className="text-gray-500 font-mono text-sm">NO DATA FOUND</p>
          </div>
        )}

        {/* "Load More" Sector Trigger */}
        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="group relative px-10 py-4 bg-gray-900 border border-gray-800 hover:border-cyan-500/50 hover:bg-cyan-950/20 transition-all duration-300 w-full md:w-auto overflow-hidden"
            >
              <div className="flex items-center gap-3 font-mono text-sm tracking-[0.2em] text-cyan-400 group-hover:text-cyan-300 relative z-10">
                {loadingMore ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    DECRYPTING...
                  </>
                ) : (
                  <>
                    <ChevronDown
                      size={16}
                      className="group-hover:translate-y-1 transition-transform"
                    />
                    ACCESS_NEXT_SECTOR
                  </>
                )}
              </div>
              {/* Button decorative scanline */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:animate-shimmer" />

              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-50 group-hover:opacity-100"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-50 group-hover:opacity-100"></div>
            </button>
          </div>
        )}

        {/* End of Line Indicator */}
        {!hasMore && visibleItems.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-4 opacity-50">
            <div className="h-px w-12 bg-gray-800"></div>
            <div className="text-center text-[10px] font-mono text-gray-500 tracking-[0.3em]">
              END OF ARCHIVE
            </div>
            <div className="h-px w-12 bg-gray-800"></div>
          </div>
        )}
      </div>

      {/* Modal / Viewer */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative bg-[#0a0a0a] border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-transparent hover:border-red-500/50 transition-all rounded-full"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-900 border-b md:border-b-0 md:border-r border-gray-800">
              <img
                src={selectedItem.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="mb-auto">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-600 text-[10px] font-mono">
                    ID: #{selectedItem.id}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white font-mono mb-6 leading-tight">
                  {selectedItem.title}
                </h2>

                <div className="space-y-4 text-gray-400 font-light text-sm leading-relaxed">
                  <p>
                    Detailed analysis of {selectedItem.title} currently
                    restricted. Please upgrade your clearance level to access
                    full metadata.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-mono uppercase">
                    Clearance
                  </span>
                  <span className="text-xs text-white font-mono">
                    LEVEL 5 ALPHA
                  </span>
                </div>
                <button className="px-6 py-2 bg-white text-black font-mono text-xs font-bold hover:bg-cyan-400 transition-colors uppercase tracking-widest">
                  Download Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
