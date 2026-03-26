import React, { useRef, useState } from "react";
import {
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  Users,
  IndianRupee,
  Layers,
  Tag,
  Zap,
} from "lucide-react";

import { COMBO_END_DATE, getPalette } from "../lib/data.js";
import { getPriceLabel } from "../lib/utils.js";

// ─── Tilt hook ────────────────────────────────────────────────────────────────
function useTilt(max = 10) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -max;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`;
    const glare = el.querySelector(".combo-glare");
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
    const glare = el.querySelector(".combo-glare");
    if (glare) glare.style.background = "transparent";
  };

  return { ref, handleMouseMove, handleMouseLeave };
}

// ─── ComboEventCard ───────────────────────────────────────────────────────────
export const ComboEventCard = ({ combo, onRegisterClick, onAboutClick }) => {
  const pal = getPalette("COMBO");
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(8);
  const [expanded, setExpanded] = useState(false);

  const includedEvents = combo.events ?? [];
  const visibleEvents = expanded ? includedEvents : includedEvents.slice(0, 3);

  const monoFont = "'Share Tech Mono', monospace";
  const displayFont = "'Bebas Neue', sans-serif";

  const onMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = `0 0 0 1px ${pal.accent}, 0 8px 40px ${pal.glow}`;
  };
  const onMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = "none";
    handleMouseLeave();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&display=swap');

        @keyframes ec-blink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.15; }
        }
        @keyframes combo-scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(2000%); }
        }
        @keyframes combo-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0;   }
        }

        .combo-img-inner { transition: transform 0.5s ease; }
        .combo-img-inner:hover { transform: scale(1.07); }
        .combo-btn-register:hover { filter: brightness(1.2); }

        .combo-event-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 7px;
          border-radius: 1px;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.03);
          transition: border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
      `}</style>

      <div style={{ position: "relative", paddingTop: 12 }}>
        {/* Ghost layer 2 — furthest back */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 10,
            right: -10,
            bottom: 0,
            background: "#07090f",
            border: `1px solid ${pal.accent}0D`,
            borderRadius: 2,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Ghost layer 1 */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: 5,
            right: -5,
            bottom: 0,
            background: "#07090f",
            border: `1px solid ${pal.accent}18`,
            borderRadius: 2,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* ── Main card ── */}
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            position: "relative",
            zIndex: 2,
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
          {combo.isClosed && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 30,
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

          {/* Glare — purely visual, never intercepts clicks */}
          <div
            className="combo-glare"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              pointerEvents: "none",
              borderRadius: 2,
            }}
          />

          {/* Scanlines — purely visual */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              pointerEvents: "none",
              background:
                "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.06) 2px,rgba(0,0,0,0.06) 4px)",
            }}
          />

          {/* Scan beam — purely visual */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 40,
              zIndex: 10,
              pointerEvents: "none",
              background: `linear-gradient(180deg, transparent, ${pal.accent}0B, transparent)`,
              animation: "combo-scan 5s linear infinite",
            }}
          />

          {/* ══ IMAGE ══ */}
          <div
            style={{
              position: "relative",
              height: 160,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={combo.image}
              alt={combo.title}
              className="combo-img-inner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "saturate(0.55) contrast(1.2)",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(7,9,15,0.1) 20%, rgba(7,9,15,0.93) 100%)",
                pointerEvents: "none",
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
                  pointerEvents: "none",
                  ...s,
                }}
              />
            ))}

            {/* COMBO PACK + pulse dot */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                display: "flex",
                alignItems: "center",
                gap: 6,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 10,
                  height: 10,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: pal.accent,
                    animation: "combo-pulse-ring 1.6s ease-out infinite",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    inset: 1,
                    borderRadius: "50%",
                    background: pal.accent,
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  border: `1px solid ${pal.accent}`,
                  color: pal.accent,
                  background: `#000000`,
                  borderRadius: 1,
                }}
              >
                COMBO PACK
              </span>
            </div>

            {/* LIMITED TIME OFFER */}
            <span
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontFamily: monoFont,
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "3px 6px",
                border: `1px solid ${pal.accent}`,
                color: pal.accent,
                background: "#000000",
                borderRadius: 2,
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              ENDING: {COMBO_END_DATE.toLocaleDateString("en-GB")}
            </span>

            {/* Category badge */}
            <span
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                fontFamily: monoFont,
                fontSize: 8,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "2px 8px",
                border: `1px solid ${pal.accent}`,
                color: pal.accent,
                background: `${pal.accent}18`,
                borderRadius: 1,
                pointerEvents: "none",
              }}
            >
              {combo.category ?? "COMBO"}
            </span>

            {/* Event count */}
            <span
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                fontFamily: monoFont,
                fontSize: 8,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.35)",
                display: "flex",
                alignItems: "center",
                gap: 3,
                pointerEvents: "none",
              }}
            >
              <Layers size={9} style={{ color: pal.accent }} />
              {includedEvents.length} EVENTS
            </span>

            {/* ID */}
            <span
              style={{
                position: "absolute",
                top: 28,
                right: 10,
                fontFamily: monoFont,
                fontSize: 8,
                color: "rgba(255,255,255,0.28)",
                letterSpacing: "0.1em",
                pointerEvents: "none",
              }}
            >
              #{String(combo.id).padStart(3, "0")}
            </span>
          </div>

          {/* ══ BODY ══ */}
          <div
            style={{
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 9,
              flex: 1,
              position: "relative",
              zIndex: 20,
            }}
          >
            {/* Title */}
            <h3
              style={{
                fontFamily: displayFont,
                fontSize: 21,
                letterSpacing: "0.05em",
                color: "#fff",
                margin: 0,
                lineHeight: 1.1,
                textShadow: `0 0 20px ${pal.glow}`,
              }}
            >
              {combo.title}
            </h3>

            {/* Meta */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {[
                { icon: <Calendar size={10} />, val: combo.date },
                { icon: <Clock size={10} />, val: combo.time },
                { icon: <MapPin size={10} />, val: combo.venue },
              ].map((m, i) => (
                <span
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    fontFamily: monoFont,
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
                fontFamily: monoFont,
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
              {combo.desc}
            </p>

            {/* Separator */}
            <div
              style={{
                height: 1,
                background: `linear-gradient(90deg, ${pal.accent}, transparent)`,
                opacity: 0.4,
              }}
            />

            {/* Included events */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: 7,
                  color: "rgba(255,255,255,0.22)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                INCLUDED_EVENTS::
              </span>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {visibleEvents.map((ev, i) => {
                  const ep = getPalette(ev.category);
                  return (
                    <span
                      key={i}
                      className="combo-event-tag"
                      style={{
                        borderColor: `${ep.accent}55`,
                        color: ep.accent,
                      }}
                    >
                      <Tag size={7} />
                      {ev.title}
                    </span>
                  );
                })}

                {!expanded && includedEvents.length > 3 && (
                  <button
                    onClick={() => setExpanded(true)}
                    style={{
                      fontFamily: monoFont,
                      fontSize: 8,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 7px",
                      borderRadius: 1,
                      border: `1px solid ${pal.accent}44`,
                      color: pal.accent,
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    +{includedEvents.length - 3} MORE
                  </button>
                )}

                {expanded && (
                  <button
                    onClick={() => setExpanded(false)}
                    style={{
                      fontFamily: monoFont,
                      fontSize: 8,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "3px 7px",
                      borderRadius: 1,
                      border: `1px solid rgba(255,255,255,0.1)`,
                      color: "rgba(255,255,255,0.35)",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    COLLAPSE
                  </button>
                )}
              </div>
            </div>

            {/* Separator */}
            <div
              style={{
                height: 1,
                background: `linear-gradient(90deg, transparent, ${pal.accent}, transparent)`,
                opacity: 0.3,
              }}
            />

            {/* Price row */}
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
                  fontFamily: monoFont,
                  fontSize: 9,
                  color: pal.accent,
                }}
              >
                <IndianRupee size={10} />
                {getPriceLabel(combo)}
              </span>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: monoFont,
                  fontSize: 9,
                  color: "rgba(255,255,255,0.28)",
                }}
              >
                <Users size={10} />
                {combo.minMembers && combo.maxMembers
                  ? `${combo.minMembers}–${combo.maxMembers} members`
                  : "Team"}
              </span>
            </div>

            {/* Savings highlight */}
            {combo.savings > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 8px",
                  background: `${pal.accent}12`,
                  border: `1px solid ${pal.accent}30`,
                  borderRadius: 1,
                }}
              >
                <Zap size={9} style={{ color: pal.accent, flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: monoFont,
                    fontSize: 8,
                    color: pal.accent,
                    letterSpacing: "0.08em",
                  }}
                >
                  BUNDLE DISCOUNT — SAVE ₹{combo.savings} VS INDIVIDUAL
                </span>
              </div>
            )}

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
                onClick={() => onAboutClick?.(combo)}
                style={{
                  flex: 1,
                  padding: "7px 0",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.45)",
                  fontFamily: monoFont,
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
                className="combo-btn-register"
                onClick={() => {
                  if (combo.isClosed) return;
                  onRegisterClick?.(combo.id);
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
                  fontFamily: monoFont,
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
              zIndex: 20,
            }}
          >
            <span
              style={{
                fontFamily: monoFont,
                fontSize: 7,
                color: "rgba(255,255,255,0.15)",
                letterSpacing: "0.2em",
              }}
            >
              PKG::LOADED · {includedEvents.length} MODULES
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
      </div>
    </>
  );
};
