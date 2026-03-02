import React, { useState, memo, useCallback } from "react";
import {
  X,
  Database,
  ChevronDown,
  Loader2,
  Zap,
  ShieldAlert,
  Terminal,
  Download,
  Eye,
} from "lucide-react";

/* ----------------------------------
   DATA
---------------------------------- */

const TOTAL_IMAGES = 78;

const BASE_URL = "https://res.cloudinary.com/dtvxydxiv/image/upload";

const DEMO_DATA = Array.from({ length: TOTAL_IMAGES }, (_, i) => {
  const id = i + 1;
  return {
    id,
    title: `DATA_UNIT_${String(id).padStart(3, "0")}`,
    thumb: `${BASE_URL}/w_800,q_auto,f_auto/tesseract/gallery/img${id}.jpg`,
    full: `${BASE_URL}/w_1800,q_auto,f_auto/tesseract/gallery/img${id}.jpg`,
    status: "ENCRYPTED",
  };
});

const assignSizes = (data) => {
  const pattern = ["large", "small", "small", "tall", "small", "wide"];
  return data.map((item, i) => ({
    ...item,
    size: pattern[i % pattern.length],
  }));
};

const DATA = assignSizes(DEMO_DATA);

/* ----------------------------------
   SIZE MAP
---------------------------------- */

const sizeClasses = {
  small: "col-span-1 row-span-1 h-[280px]",
  large: "col-span-2 row-span-2 h-[580px]",
  wide: "col-span-2 row-span-1 h-[280px]",
  tall: "col-span-1 row-span-2 h-[580px]",
};

/* ----------------------------------
   HERO
---------------------------------- */

const GalleryHero = ({ count }) => (
  <section className="relative h-[60vh] bg-black flex items-center justify-center border-b border-cyan-900/30 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px]" />

    <div className="relative z-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1 mb-8 border border-cyan-500/40 text-cyan-400 text-[10px] font-mono tracking-widest">
        <Zap size={12} /> TERMINAL_LINK_ACTIVE
      </div>

      <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
        ARCH_01
      </h1>

      <div className="mt-6 text-cyan-500 text-[10px] font-mono tracking-[0.4em] flex justify-center items-center gap-2">
        <Database size={12} /> {count} OBJECTS_FOUND
      </div>
    </div>
  </section>
);

/* ----------------------------------
   CARD (MEMOIZED)
---------------------------------- */

const DatabaseCard = memo(function DatabaseCard({ item, onClick }) {
  return (
    <div
      onClick={() => onClick(item)}
      className={`
        group relative overflow-hidden cursor-pointer
        border border-white/5 bg-black
        transition-all duration-300
        hover:border-cyan-400/60
        hover:-translate-y-1
        ${sizeClasses[item.size]}
      `}
    >
      {/* IMAGE */}
      <img
        src={item.thumb}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="
          absolute inset-0 w-full h-full object-cover
          will-change-transform
          transition-transform duration-500
          group-hover:scale-105
        "
      />

      {/* HEAVY EFFECTS — DESKTOP ONLY */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-10">
        <div
          className="
            absolute -inset-[30%]
            bg-white/10 backdrop-blur-md
            mix-blend-overlay
            rotate-[-6deg]
            translate-x-[-12%] translate-y-[12%]
            group-hover:translate-x-[12%]
            group-hover:translate-y-[-12%]
            transition-transform duration-700
          "
        />
      </div>

      {/* HUD */}
      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute top-3 right-3 text-[9px] font-mono text-cyan-400 tracking-widest">
          ACTIVE
        </div>
        <div className="absolute bottom-3 left-3 text-sm font-semibold text-white">
          {item.title}
        </div>
      </div>
    </div>
  );
});

/* ----------------------------------
   PAGE
---------------------------------- */

export default function GalleryPage() {
  const [itemsToShow, setItemsToShow] = useState(12);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const visible = DATA.slice(0, itemsToShow);
  const hasMore = itemsToShow < DATA.length;

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);

    requestIdleCallback(() => {
      setItemsToShow((p) => Math.min(p + 6, DATA.length));
      setLoading(false);
    });
  }, [loading]);

  return (
    <div className="min-h-screen bg-black text-white font-mono pb-20 selection:bg-cyan-500/50">
      <GalleryHero count={DATA.length} />

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        {/* TOP BAR */}
        <div className="sticky top-6 z-40 mb-12 p-4 bg-black/60 backdrop-blur-xl border border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-4 text-[10px] tracking-widest text-gray-400">
            <Terminal size={14} className="text-cyan-500" />
            SESSION_ACTIVE
            <Eye size={14} />
            VIEW_{visible.length}/{TOTAL_IMAGES}
          </div>
          <div className="text-cyan-500/70 animate-pulse text-[10px] tracking-widest">
            AUTH_ADMIN_ROOT
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {visible.map((item) => (
            <DatabaseCard key={item.id} item={item} onClick={setSelected} />
          ))}
        </div>

        {/* LOAD MORE */}
        {hasMore && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-12 py-5 border border-cyan-500/40 hover:border-cyan-400 transition-all text-[11px] tracking-[0.4em]"
            >
              {loading ? (
                <span className="flex gap-3 items-center">
                  <Loader2 className="animate-spin" size={16} />
                  FETCHING
                </span>
              ) : (
                <span className="flex gap-3 items-center">
                  <ChevronDown size={16} />
                  SYNC_ARCHIVE
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-[80vh] bg-[#050505] border border-white/10 flex"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-4 -right-4 bg-cyan-500 text-black p-3"
            >
              <X size={22} />
            </button>

            <div className="w-2/3 relative">
              <img
                src={selected.full}
                loading="eager"
                decoding="async"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="w-1/3 p-10 flex flex-col bg-black">
              <div className="mb-auto">
                <div className="flex gap-2 items-center text-red-500 text-[10px] tracking-widest mb-6">
                  <ShieldAlert size={14} /> CLASSIFIED
                </div>

                <h2 className="text-4xl font-black italic mb-8">
                  {selected.title}
                </h2>

                <p className="text-gray-400 text-xs leading-relaxed">
                  High-frequency signal detected. Encrypted payload confirmed.
                </p>
              </div>

              <button className="mt-10 py-4 bg-white text-black text-[11px] tracking-[0.2em] font-black flex items-center justify-center gap-2 hover:bg-cyan-400">
                <Download size={14} /> DOWNLOAD_SOURCE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REDUCED MOTION */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
