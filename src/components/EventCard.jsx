import React, { useRef } from "react";
import {
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
} from "lucide-react";

// ─── Category palette ────────────────────────────────────────────────────────
import { getPalette } from "../lib/data.js";

import { getPriceLabel } from "../lib/utils.js";

// ─── Tilt hook ───────────────────────────────────────────────────────────────
function useTilt(max = 10) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -max;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`;
    const glare = el.querySelector(".ec-glare");
    if (glare) {
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.09) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    const glare = el.querySelector(".ec-glare");
    if (glare) glare.style.background = "transparent";
  };

  return { ref, handleMouseMove, handleMouseLeave };
}

// ─── EventCard ───────────────────────────────────────────────────────────────
export const EventCard = ({ event, onRegisterClick, onAboutClick }) => {
  const pal = getPalette(event.category);
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(10);

  const onMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = `0 0 0 1px ${pal.accent}, 0 8px 40px ${pal.glow}`;
  };
  const onMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = "none";
    handleMouseLeave();
  };

  const badgeStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "3px 6px",
    border: `1px solid ${pal.accent}`,
    color: pal.accent,
    background: `#000000AA`,
    borderRadius: 2,
    whiteSpace: "nowrap",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&display=swap');
        @keyframes ec-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
        .ec-img-inner { transition: transform 0.5s ease; }
        .ec-img-inner:hover { transform: scale(1.07); }
        .ec-btn-solid:hover { filter: brightness(1.2); }
      `}</style>

      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          position: "relative",
          background: "#07090f",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "transform 0.15s ease, box-shadow 0.3s ease",
          cursor: "default",
        }}
      >
        {/* ── Registration Closed Overlay ── */}
        {event.isClosed && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 20,
              pointerEvents: "none",
              borderRadius: 2,
              background: "rgba(7,9,15,0.72)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              backdropFilter: "blur(1.5px)",
            }}
          >
            <div
              style={{
                width: "70%",
                height: 1,
                background: "rgba(255,60,60,0.5)",
              }}
            />
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 22,
                letterSpacing: "0.25em",
                color: "rgba(255,80,80,0.92)",
                textShadow: "0 0 18px rgba(255,60,60,0.6)",
                textTransform: "uppercase",
              }}
            >
              Registration Closed
            </span>
            <div
              style={{
                width: "70%",
                height: 1,
                background: "rgba(255,60,60,0.5)",
              }}
            />
          </div>
        )}

        {/* Glare */}
        <div
          className="ec-glare"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            borderRadius: 2,
          }}
        />

        {/* Scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
          }}
        />

        {/* ── Image ── */}
        <div
          style={{
            position: "relative",
            height: 175,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={event.image}
            alt={event.title}
            className="ec-img-inner"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "saturate(0.7) contrast(1.1)",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(7,9,15,0.1) 30%, rgba(7,9,15,0.88) 100%)",
            }}
          />

          {/* Corner brackets */}
          {[
            { top: 8, left: 8, borderWidth: "2px 0 0 2px" },
            { top: 8, right: 8, borderWidth: "2px 2px 0 0" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                borderStyle: "solid",
                borderColor: pal.accent,
                opacity: 0.7,
                zIndex: 4,
                ...s,
              }}
            />
          ))}

          {/* Category badge */}
          <span
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              zIndex: 4,
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 8,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "2px 8px",
              border: `1px solid ${pal.accent}`,
              color: pal.accent,
              background: `${pal.accent}18`,
              borderRadius: 1,
            }}
          >
            {event.category}
          </span>

          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              alignItems: "flex-end",
              zIndex: 10,
              maxWidth: "70%",
            }}
          >
            {event.category === "COMBO" && (
              <span style={badgeStyle}>LIMITED TIME OFFER</span>
            )}

            {event.id === 30 && (
              <span style={badgeStyle}>ONLY FOR SCHOOL STUDENTS</span>
            )}
          </div>

          {/* ID */}
          <span
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 4,
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 8,
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.1em",
            }}
          >
            #{String(event.id).padStart(3, "0")}
          </span>
        </div>

        {/* ── Body ── */}
        <div
          style={{
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 9,
            flex: 1,
            position: "relative",
            zIndex: 5,
          }}
        >
          {/* Title */}
          {event.id === 19 ? (
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 21,
                letterSpacing: "0.05em",
                color: "#fff",
                margin: 0,
                lineHeight: 1.1,
                textShadow: `0 0 20px ${pal.glow}`,
              }}
            >
              {event.title} <br /> (Treasure Hunt)
            </h3>
          ) : (
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 21,
                letterSpacing: "0.05em",
                color: "#fff",
                margin: 0,
                lineHeight: 1.1,
                textShadow: `0 0 20px ${pal.glow}`,
              }}
            >
              {event.title}
            </h3>
          )}

          {/* Meta */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {[
              { icon: <Calendar size={10} />, val: event.date },
              { icon: <Clock size={10} />, val: event.time },
              { icon: <MapPin size={10} />, val: event.venue },
            ].map((m, i) => (
              <span
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 8,
                  color: "rgba(255,255,255,0.32)",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ color: pal.accent }}>{m.icon}</span>
                {m.val}
              </span>
            ))}
          </div>

          {/* Desc */}
          <p
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 9,
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.65,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {event.desc}
          </p>

          {/* Separator */}
          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, ${pal.accent}, transparent)`,
              opacity: 0.4,
            }}
          />

          {/* Price + Team size */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 9,
                color: pal.accent,
              }}
            >
              <IndianRupee size={10} />
              {getPriceLabel(event)}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 9,
                color: "rgba(255,255,255,0.28)",
              }}
            >
              <Users size={10} />
              {event.participationMode === "solo"
                ? "Solo"
                : `${event.minMembers}–${event.maxMembers} members`}
            </span>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: 7,
              marginTop: "auto",
              paddingTop: 2,
            }}
          >
            <button
              onClick={() => onAboutClick?.(event)}
              style={{
                flex: 1,
                padding: "7px 0",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.45)",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                borderRadius: 1,
                cursor: "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = pal.accent;
                e.currentTarget.style.color = pal.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(255,255,255,0.45)";
              }}
            >
              Details
            </button>

            <button
              className="ec-btn-solid"
              onClick={() => {
                if (event.isClosed) return;
                onRegisterClick?.(event.id);
              }}
              style={{
                flex: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                padding: "7px 0",
                border: "none",
                borderRadius: 1,
                background: pal.accent,
                color: "#000",
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: `0 0 16px ${pal.glow}`,
                transition: "filter 0.2s",
              }}
            >
              Register <ArrowRight size={11} />
            </button>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px 16px",
            borderTop: `1px solid ${pal.accent}25`,
            position: "relative",
            zIndex: 5,
          }}
        >
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 7,
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.2em",
            }}
          >
            SYS::READY
          </span>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: pal.accent,
              boxShadow: `0 0 5px ${pal.accent}`,
              animation: "ec-blink 2s ease-in-out infinite",
              display: "inline-block",
            }}
          />
        </div>
      </div>
    </>
  );
};
