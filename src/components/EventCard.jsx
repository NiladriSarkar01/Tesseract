import React, { useState, useRef } from "react";
import { ArrowRight, Zap, Clock, MapPin, Calendar } from "lucide-react";

/*
  HOW TO USE:
  Replace your existing EventCard component with this file.
  Props: { event, onRegisterClick, onAboutClick }
  
  Add these styles to your global CSS (or a <style> tag in your root):
  See the <CardStyles> component at the bottom, or copy the CSS block.
*/

// ─── Tilt-on-hover hook ────────────────────────────────────────────────────
function useTilt(max = 12) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -max;
    const rotateY = ((x - cx) / cx) * max;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`;
    // Move the glare layer
    const glare = el.querySelector(".ec-glare");
    if (glare) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(6,182,212,0.22) 0%, transparent 65%)`;
    }
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    const glare = el.querySelector(".ec-glare");
    if (glare) glare.style.background = "transparent";
  };

  return { ref, handleMouseMove, handleMouseLeave };
}

// ─── Category accent colours ───────────────────────────────────────────────
const CATEGORY_PALETTE = {
  CODING: {
    accent: "#c40886",
    glow: "rgba(6,182,212,0.45)",
    label: "#0e7490",
  },
  MISCELLANEOUS: {
    accent: "#a855f7",
    glow: "rgba(168,85,247,0.45)",
    label: "#7e22ce",
  },
  INDOORGAME: {
    accent: "#f97316",
    glow: "rgba(249,115,22,0.45)",
    label: "#c2410c",
  },
  GAMING: { accent: "#22c55e", glow: "rgba(34,197,94,0.45)", label: "#15803d" },
  ROBOTICS: {
    accent: "#eab308",
    glow: "rgba(234,179,8,0.45)",
    label: "#a16207",
  },
  DEFAULT: {
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.45)",
    label: "#0e7490",
  },
};

function getPalette(category = "") {
  return CATEGORY_PALETTE[category.toUpperCase()] ?? CATEGORY_PALETTE.DEFAULT;
}

// ─── Scoped styles (injected into <head> once, survives React re-renders) ──
const EC_STYLE_ID = "ec-card-styles";

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(EC_STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = EC_STYLE_ID;
  el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

    .ec-root {
      position: relative;
      background: #07090f;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 2px;
      overflow: hidden;
      transition: transform 0.15s ease, box-shadow 0.3s ease;
      cursor: default;
      transform-style: preserve-3d;
      will-change: transform;
      display: flex;
      flex-direction: column;
    }
    .ec-root:hover {
      box-shadow: 0 0 0 1px var(--accent, #06b6d4),
                  0 8px 40px var(--glow, rgba(6,182,212,0.3)),
                  inset 0 0 60px rgba(0,0,0,0.6);
    }
    .ec-border-glow {
      position: absolute; inset: 0; z-index: 1; pointer-events: none;
      border-radius: 2px; opacity: 0; transition: opacity 0.4s;
      background: linear-gradient(135deg, var(--accent) 0%, transparent 50%, var(--accent) 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor; mask-composite: exclude; padding: 1px;
    }
    .ec-root:hover .ec-border-glow { opacity: 1; }
    .ec-glare {
      position: absolute; inset: 0; z-index: 2; pointer-events: none;
      border-radius: 2px; transition: background 0.05s;
    }
    .ec-scanlines {
      position: absolute; inset: 0; z-index: 3; pointer-events: none;
      background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px);
    }
    .ec-img-wrap { position: relative; height: 180px; overflow: hidden; flex-shrink: 0; }
    .ec-img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.7) contrast(1.1); transition: transform 0.6s ease, filter 0.4s; }
    .ec-root:hover .ec-img { transform: scale(1.06); filter: saturate(1) contrast(1.05); }
    .ec-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to bottom, rgba(7,9,15,0.1) 30%, rgba(7,9,15,0.85) 100%);
    }
    .ec-corner {
      position: absolute; width: 16px; height: 16px;
      border-color: var(--accent, #06b6d4); border-style: solid;
      opacity: 0.7; z-index: 4; transition: width 0.3s, height 0.3s, opacity 0.3s;
    }
    .ec-root:hover .ec-corner { width: 22px; height: 22px; opacity: 1; }
    .ec-corner-tl { top: 8px; left: 8px; border-width: 2px 0 0 2px; }
    .ec-corner-tr { top: 8px; right: 8px; border-width: 2px 2px 0 0; }
    .ec-badge {
      position: absolute; bottom: 10px; left: 10px; z-index: 4;
      font-family: 'Share Tech Mono', monospace; font-size: 9px;
      letter-spacing: 0.15em; text-transform: uppercase;
      padding: 3px 8px; border-radius: 1px; border-width: 1px; border-style: solid;
      backdrop-filter: blur(4px);
    }
    .ec-id {
      position: absolute; top: 10px; right: 10px; z-index: 4;
      font-family: 'Share Tech Mono', monospace; font-size: 9px;
      color: rgba(255,255,255,0.35); letter-spacing: 0.1em;
    }
    .ec-body { padding: 16px; display: flex; flex-direction: column; gap: 10px; flex: 1; position: relative; z-index: 5; }
    .ec-title {
      font-family: 'Bebas Neue', sans-serif; font-size: 22px;
      letter-spacing: 0.05em; color: #fff; line-height: 1.1; margin: 0;
      text-shadow: 0 0 20px var(--glow, rgba(6,182,212,0.4)); transition: color 0.3s;
    }
    .ec-root:hover .ec-title { color: var(--accent, #06b6d4); }
    .ec-meta { display: flex; flex-wrap: wrap; gap: 8px; }
    .ec-meta-item {
      display: flex; align-items: center; gap: 4px;
      font-family: 'Share Tech Mono', monospace; font-size: 9px;
      color: rgba(255,255,255,0.35); letter-spacing: 0.08em; text-transform: uppercase;
    }
    .ec-desc {
      font-family: 'Share Tech Mono', monospace; font-size: 10px;
      color: rgba(255,255,255,0.4); line-height: 1.6; margin: 0;
      display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .ec-sep { height: 1px; width: 100%; opacity: 0.4; }
    .ec-prize { display: flex; align-items: center; gap: 6px; font-family: 'Share Tech Mono', monospace; font-size: 10px; }
    .ec-prize-val { color: rgba(255,255,255,0.6); margin-left: auto; font-size: 10px; }
    .ec-actions { display: flex; gap: 8px; margin-top: auto; padding-top: 4px; }
    .ec-btn-ghost {
      flex: 1; padding: 8px 0; background: transparent;
      border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.5);
      font-family: 'Share Tech Mono', monospace; font-size: 10px;
      letter-spacing: 0.15em; text-transform: uppercase; border-radius: 1px;
      cursor: pointer; transition: border-color 0.25s, color 0.25s, background 0.25s;
    }
    .ec-btn-ghost:hover { border-color: var(--accent); color: var(--accent); background: rgba(255,255,255,0.04); }
    .ec-btn-solid {
      flex: 1.5; display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 8px 0; border: none; border-radius: 1px; color: #000;
      font-family: 'Share Tech Mono', monospace; font-size: 10px;
      letter-spacing: 0.15em; text-transform: uppercase; font-weight: 700;
      cursor: pointer; transition: filter 0.25s, transform 0.15s;
    }
    .ec-btn-solid:hover { filter: brightness(1.25); transform: translateY(-1px); }
    .ec-btn-solid:active { transform: translateY(0); }
    .ec-strip {
      display: flex; align-items: center; justify-content: space-between;
      padding: 6px 16px; border-top-width: 1px; border-top-style: solid;
      z-index: 5; position: relative;
    }
    .ec-strip-text { font-family: 'Share Tech Mono', monospace; font-size: 8px; color: rgba(255,255,255,0.18); letter-spacing: 0.2em; }
    .ec-strip-dot { width: 6px; height: 6px; border-radius: 50%; animation: ec-blink 2s ease-in-out infinite; }
    @keyframes ec-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
  `;
  document.head.appendChild(el);
}

// ─── Main EventCard ────────────────────────────────────────────────────────
const EventCard = ({ event, onRegisterClick, onAboutClick }) => {
  const [hovered, setHovered] = useState(false);
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(10);
  const palette = getPalette(event.category);

  // Inject styles into <head> once — survives modal open/close re-renders
  injectStyles();

  const onLeave = () => {
    setHovered(false);
    handleMouseLeave();
  };

  return (
    <div
      ref={ref}
      className="ec-root"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{ "--accent": palette.accent, "--glow": palette.glow }}
    >
      {/* Animated border glow */}
      <div className="ec-border-glow" />

      {/* Glare overlay (controlled by useTilt) */}
      <div className="ec-glare" />

      {/* Scan-line texture */}
      <div className="ec-scanlines" />

      {/* ── Image ─────────────────────────────────── */}
      <div className="ec-img-wrap">
        <img src={event.image} alt={event.title} className="ec-img" />
        <div className="ec-img-overlay" />

        {/* Corner brackets */}
        <div className="ec-corner ec-corner-tl" />
        <div className="ec-corner ec-corner-tr" />

        {/* Category badge */}
        <span
          className="ec-badge"
          style={{
            borderColor: palette.accent,
            color: palette.accent,
            background: `${palette.accent}18`,
          }}
        >
          {event.category}
        </span>

        {/* ID slug */}
        <span className="ec-id">#{String(event.id).padStart(3, "0")}</span>
      </div>

      {/* ── Body ──────────────────────────────────── */}
      <div className="ec-body">
        {/* Title */}
        <h3 className="ec-title">{event.title}</h3>

        {/* Meta row */}
        <div className="ec-meta">
          <span className="ec-meta-item">
            <Calendar size={11} />
            {event.date}
          </span>
          <span className="ec-meta-item">
            <Clock size={11} />
            {event.time}
          </span>
          <span className="ec-meta-item">
            <MapPin size={11} />
            {event.venue}
          </span>
        </div>

        {/* Desc */}
        <p className="ec-desc">{event.desc}</p>

        {/* Separator */}
        <div
          className="ec-sep"
          style={{
            background: `linear-gradient(90deg, ${palette.accent}, transparent)`,
          }}
        />

        {/* Prize blip */}
        {event.prizes && (
          <div className="ec-prize">
            <Zap size={11} style={{ color: palette.accent }} />
            <span style={{ color: palette.accent }}>Prize Pool</span>
            <span className="ec-prize-val">{event.prizes}</span>
          </div>
        )}

        {/* Actions */}
        <div className="ec-actions">
          <button
            className="ec-btn-ghost"
            onClick={() => onAboutClick?.(event)}
            style={{ "--accent": palette.accent }}
          >
            Details
          </button>
          <button
            className="ec-btn-solid"
            onClick={() => onRegisterClick?.(event.id)}
            style={{
              background: palette.accent,
              boxShadow: `0 0 18px ${palette.glow}`,
            }}
          >
            Register <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Bottom data strip */}
      <div
        className="ec-strip"
        style={{ borderTopColor: `${palette.accent}30` }}
      >
        <span className="ec-strip-text">SYS::READY</span>
        <span
          className="ec-strip-dot"
          style={{
            background: palette.accent,
            boxShadow: `0 0 6px ${palette.accent}`,
          }}
        />
      </div>
    </div>
  );
};

export default EventCard;
