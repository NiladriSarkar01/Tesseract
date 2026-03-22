import React from "react";
import {
  X,
  ScrollText,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  Phone,
  Mail,
  ArrowRight,
  Zap,
  Layers,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPalette } from "../lib/data.js";

// ─── Contact Card ─────────────────────────────────────────────────────────────
const ContactCard = ({ label, person, accent }) => (
  <div
    style={{
      padding: "12px 14px",
      background: "rgba(255,255,255,0.03)",
      border: `1px solid rgba(255,255,255,0.08)`,
      borderRadius: 2,
      transition: "border-color 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accent}50`)}
    onMouseLeave={(e) =>
      (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
    }
  >
    <p
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 8,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: accent,
        marginBottom: 6,
        margin: "0 0 6px 0",
      }}
    >
      {label}
    </p>
    <p
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 20,
        letterSpacing: "0.05em",
        color: "#fff",
        margin: "0 0 8px 0",
      }}
    >
      {person.name || "N/A"}
    </p>
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {person.mobile && (
        <a
          href={`tel:${person.mobile}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9,
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
          }
        >
          <Phone size={10} style={{ color: accent }} />
          {person.mobile}
        </a>
      )}
      {person.email && (
        <a
          href={`mailto:${person.email}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9,
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
          }
        >
          <Mail size={10} style={{ color: accent }} />
          {person.email}
        </a>
      )}
    </div>
  </div>
);

// ─── Section Heading ──────────────────────────────────────────────────────────
const SectionHeading = ({ icon, label, accent }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      paddingBottom: 10,
      marginBottom: 12,
      borderBottom: `1px solid rgba(255,255,255,0.07)`,
    }}
  >
    <span style={{ color: accent }}>{icon}</span>
    <span
      style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: accent,
      }}
    >
      {label}
    </span>
  </div>
);

// ─── AboutModal ───────────────────────────────────────────────────────────────
export const AboutModal = ({ event, onClose }) => {
  if (!event) return null;

  const navigate = useNavigate();
  const isCombo = event.category?.toUpperCase() === "COMBO";
  const pal = getPalette(event.category);

  const onRegisterClick = () => {
    navigate("/register", { state: { eventId: event.id } });
  };

  // Normalise head / coHead — always arrays
  const heads = Array.isArray(event.head)
    ? event.head
    : event.head
      ? [event.head]
      : [];
  const coHeads = Array.isArray(event.coHead)
    ? event.coHead
    : event.coHead
      ? [event.coHead]
      : [];

  const monoFont = "'Share Tech Mono', monospace";
  const displayFont = "'Bebas Neue', sans-serif";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&display=swap');
        .am-scroll::-webkit-scrollbar { width: 3px; }
        .am-scroll::-webkit-scrollbar-track { background: transparent; }
        .am-scroll::-webkit-scrollbar-thumb { background: ${pal.accent}40; border-radius: 2px; }
        @keyframes am-fadein { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes combo-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(2.4); opacity: 0;   }
        }
      `}</style>

      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(2,4,10,0.88)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}
        onClick={onClose}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            marginTop: "5rem",
            width: "100%",
            maxWidth: 1200,
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column",
            background: "#07090f",
            border: `1px solid ${pal.accent}35`,
            borderRadius: 2,
            boxShadow: `0 0 60px ${pal.glow}, 0 0 0 1px ${pal.accent}15`,
            animation: "am-fadein 0.25s ease both",
            overflow: "hidden",
          }}
        >
          {/* ── Close button ── */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 20,
              background: "rgba(0,0,0,0.65)",
              border: `1px solid rgba(255,255,255,0.1)`,
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              borderRadius: 2,
              padding: "5px 7px",
              display: "flex",
              alignItems: "center",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#dc2626";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.65)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            <X size={16} />
          </button>

          {/* ── Hero image ── */}
          <div
            style={{
              position: "relative",
              height: 200,
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={event.image}
              alt={event.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "saturate(0.75) contrast(1.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(7,9,15,0.15) 0%, rgba(7,9,15,0.95) 100%)",
              }}
            />

            {/* Corner brackets */}
            {[
              { top: 10, left: 10, borderWidth: "2px 0 0 2px" },
              { top: 10, right: 10, borderWidth: "2px 2px 0 0" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 16,
                  height: 16,
                  borderStyle: "solid",
                  borderColor: pal.accent,
                  opacity: 0.8,
                  ...s,
                }}
              />
            ))}

            {/* Title block */}
            <div style={{ position: "absolute", bottom: 16, left: 20 }}>
              {/* Category / Combo badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 6,
                }}
              >
                {isCombo && (
                  <div
                    style={{
                      position: "relative",
                      width: 8,
                      height: 8,
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
                )}
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: monoFont,
                    fontSize: 8,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    padding: "2px 10px",
                    border: `1px solid ${pal.accent}`,
                    color: pal.accent,
                    background: `${pal.accent}18`,
                    borderRadius: 1,
                  }}
                >
                  {isCombo ? "COMBO PACK" : event.category}
                </span>
                {isCombo && (
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: 8,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "2px 8px",
                      border: `1px solid ${pal.accent}`,
                      color: pal.accent,
                      background: "#000000AA",
                      borderRadius: 1,
                    }}
                  >
                    LIMITED TIME OFFER
                  </span>
                )}
              </div>

              <h2
                style={{
                  fontFamily: displayFont,
                  fontSize: "clamp(24px, 4vw, 36px)",
                  letterSpacing: "0.06em",
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1,
                  textShadow: `0 0 30px ${pal.glow}`,
                }}
              >
                {event.title}
              </h2>
            </div>

            {/* ID */}
            <span
              style={{
                position: "absolute",
                bottom: 16,
                right: 20,
                fontFamily: monoFont,
                fontSize: 9,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.1em",
              }}
            >
              #{String(event.id).padStart(3, "0")}
            </span>
          </div>

          {/* ── Scrollable content ── */}
          <div
            className="am-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "22px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Description */}
            <div>
              <SectionHeading
                icon={<ScrollText size={14} />}
                label="Mission Brief"
                accent={pal.accent}
              />
              <p
                style={{
                  fontFamily: monoFont,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                {event.desc}
              </p>
            </div>

            {/* Info grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
              }}
            >
              {[
                {
                  icon: <Calendar size={13} />,
                  label: "Date",
                  val: event.date,
                },
                { icon: <Clock size={13} />, label: "Time", val: event.time },
                {
                  icon: <MapPin size={13} />,
                  label: "Location",
                  val: event.venue,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 12px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    {item.label}
                  </span>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span style={{ color: pal.accent }}>{item.icon}</span>
                    <span
                      style={{
                        fontFamily: monoFont,
                        fontSize: 10,
                        color: "#fff",
                      }}
                    >
                      {item.val}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* ── COMBO: included events list ── */}
            {isCombo && event.events?.length > 0 && (
              <div>
                <SectionHeading
                  icon={<Layers size={14} />}
                  label="Included Events"
                  accent={pal.accent}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: 8,
                  }}
                >
                  {event.events.map((ev, i) => {
                    const ep = getPalette(ev.category);
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "10px 12px",
                          background: `${ep.accent}08`,
                          border: `1px solid ${ep.accent}30`,
                          borderRadius: 2,
                        }}
                      >
                        <Tag
                          size={10}
                          style={{ color: ep.accent, flexShrink: 0 }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: monoFont,
                              fontSize: 10,
                              color: "#fff",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {ev.title}
                          </span>
                          <span
                            style={{
                              fontFamily: monoFont,
                              fontSize: 7,
                              color: ep.accent,
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                            }}
                          >
                            {ev.category}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Savings highlight */}
                {event.savings > 0 && (
                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 12px",
                      background: `${pal.accent}10`,
                      border: `1px solid ${pal.accent}30`,
                      borderRadius: 2,
                    }}
                  >
                    <Zap
                      size={11}
                      style={{ color: pal.accent, flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontFamily: monoFont,
                        fontSize: 9,
                        color: pal.accent,
                        letterSpacing: "0.1em",
                      }}
                    >
                      BUNDLE DISCOUNT — SAVE ₹{event.savings} VS BUYING
                      INDIVIDUALLY
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ── Rules + Prizes (regular events & combos if present) ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  event.rules?.length > 0 ? "1fr 1fr" : "1fr",
                gap: 20,
              }}
            >
              {/* Rules — only for non-combo or combos that have rules */}
              {event.rules?.length > 0 && (
                <div>
                  <SectionHeading
                    icon={<Ticket size={14} />}
                    label="Protocols"
                    accent={pal.accent}
                  />
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    {event.rules.map((rule, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "flex-start",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: monoFont,
                            fontSize: 10,
                            color: pal.accent,
                            flexShrink: 0,
                            marginTop: 1,
                          }}
                        >
                          ›
                        </span>
                        <span
                          style={{
                            fontFamily: monoFont,
                            fontSize: 12,
                            color: "rgba(255,255,255,0.42)",
                            lineHeight: 1.65,
                          }}
                        >
                          {rule}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prizes */}
              <div>
                <SectionHeading
                  icon={<Zap size={14} />}
                  label="Bounties"
                  accent={pal.accent}
                />
                {event.prizes?.length > 0 ? (
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    {event.prizes.map((prize, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "14px 16px",
                          background: `${pal.accent}10`,
                          border: `1px solid ${pal.accent}25`,
                          borderRadius: 2,
                          fontFamily: monoFont,
                          fontSize: 10,
                          color: "rgba(255,255,255,0.45)",
                          lineHeight: 1.7,
                        }}
                      >
                        {prize}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span
                    style={{
                      fontFamily: monoFont,
                      fontSize: 10,
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    To be announced.
                  </span>
                )}
              </div>
            </div>

            {/* ── Contacts ── */}
            {(heads.length > 0 || coHeads.length > 0) && (
              <div>
                <SectionHeading
                  icon={<Phone size={14} />}
                  label="Command Center"
                  accent={pal.accent}
                />
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: 10,
                  }}
                >
                  {heads.map((p, i) => (
                    <ContactCard
                      key={`head-${i}`}
                      label="Event Head"
                      person={p}
                      accent={pal.accent}
                    />
                  ))}
                  {coHeads.map((p, i) => (
                    <ContactCard
                      key={`cohead-${i}`}
                      label="Co-Event Head"
                      person={p}
                      accent={pal.accent}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div
            style={{
              padding: "12px 20px",
              borderTop: `1px solid ${pal.accent}20`,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              display: "flex",
              gap: 12,
            }}
          >
            <button
              onClick={onRegisterClick}
              style={{
                flex: 1,
                padding: "11px 0",
                background: pal.accent,
                border: "none",
                borderRadius: 2,
                color: "#000",
                cursor: "pointer",
                fontFamily: monoFont,
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
                boxShadow: `0 0 24px ${pal.glow}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "filter 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter = "brightness(1.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.filter = "brightness(1)")
              }
            >
              {isCombo ? "Register Bundle" : "Join Protocol"}{" "}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
