import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  ArrowRight,
  Play,
  Camera,
  Video,
  ArrowDown,
  CheckCircle,
} from "lucide-react";

/**
 * UTILS: Background Effects
 */
const CyberParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 15);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedY: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.8 ? "#ef4444" : "#ffffff",
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};

/**
 * COMPONENT: Focus Carousel (Controlled by Props)
 */
const FocusCarousel = ({ activeIndex }) => {
  // 10 Data Items
  const carouselItems = [
    {
      id: 1,
      type: "image",
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
      title: "Neon Nights",
      desc: "Pro-Show 2024",
    },
    {
      id: 2,
      type: "image",
      src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000",
      title: "Mech Wars",
      desc: "Robotics Arena",
    },
    {
      id: 3,
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-matrix-code-falling-loop-1533-large.mp4",
      title: "Mainframe",
      desc: "Cyber Security",
    },
    {
      id: 4,
      type: "image",
      src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000",
      title: "Stage Fright",
      desc: "Cultural Fest",
    },
    {
      id: 5,
      type: "image",
      src: "https://images.unsplash.com/photo-1592478411213-61535fdd861d?auto=format&fit=crop&q=80&w=1000",
      title: "Frag Out",
      desc: "Esports Final",
    },
    {
      id: 6,
      type: "image",
      src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
      title: "Hack The Planet",
      desc: "Hackathon V2",
    },
    {
      id: 7,
      type: "image",
      src: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=1000",
      title: "Crowd Surge",
      desc: "Opening Ceremony",
    },
    {
      id: 8,
      type: "video",
      src: "https://assets.mixkit.co/videos/preview/mixkit-mechanical-arm-moving-in-factory-1193-large.mp4",
      title: "Automation",
      desc: "Tech Expo",
    },
    {
      id: 9,
      type: "image",
      src: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=1000",
      title: "Vogue",
      desc: "Fashion Show",
    },
    {
      id: 10,
      type: "image",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
      title: "Pixel Art",
      desc: "Creative Workshop",
    },
  ];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
      <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
        {carouselItems.map((item, index) => {
          // Calculate relative position
          let offset = index - activeIndex;

          // Clamp offset for visibility logic (only show neighbors)
          const isActive = offset === 0;
          const isPrev = offset === -1;
          const isNext = offset === 1;

          // Styles based on position
          let transform = "translateX(0) scale(0.8) translateZ(-100px)";
          let zIndex = 0;
          let opacity = 0;
          {
            /* let rotateY = 0; */
          }
          let filter = "grayscale(100%) brightness(40%) blur(2px)";

          if (isActive) {
            transform = "translateX(0) scale(1.2) translateZ(50px)";
            zIndex = 30;
            opacity = 1;
            {
              /* rotateY = 0; */
            }
            filter = "none";
          } else if (isPrev) {
            transform =
              "translateX(-60%) scale(0.9) translateZ(-50px) rotateY(25deg)";
            zIndex = 20;
            opacity = 0.7;
          } else if (isNext) {
            transform =
              "translateX(60%) scale(0.9) translateZ(-50px) rotateY(-25deg)";
            zIndex = 20;
            opacity = 0.7;
          } else if (offset === -2 || offset === 2) {
            transform = `translateX(${
              offset * 50
            }%) scale(0.7) translateZ(-200px)`;
            zIndex = 10;
            opacity = 0.3;
          }

          // Hide others completely
          if (Math.abs(offset) > 2) opacity = 0;

          return (
            <div
              key={item.id}
              className="absolute w-[60vw] md:w-[350px] aspect-3/4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform, zIndex, opacity, filter }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    autoPlay={isActive}
                    playsInline
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>

                {/* Active Card Content */}
                <div
                  className={`absolute bottom-0 left-0 w-full p-6 transition-all duration-500 ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      {item.type === "video" ? (
                        <Video size={10} />
                      ) : (
                        <Camera size={10} />
                      )}
                      {item.type === "video" ? "LIVE" : "IMG"}
                    </span>
                    <span className="text-gray-400 text-xs font-mono">
                      0{item.id} / 10
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase leading-none mb-1">
                    {item.title}
                  </h2>
                  <p className="text-gray-400 text-sm font-mono tracking-wide">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * MAIN COMPONENT: Gallery Page with Scroll Logic
 */
const ScrollView = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollSectionRef = useRef(null);

  // Scroll Listener to Map Scroll Position to Index
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollSectionRef.current) return;

      const section = scrollSectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // The distance we can scroll within this section (Total height - 1 screen height)
      const scrollableDistance = sectionHeight - viewportHeight;

      // How far have we scrolled into the section?
      // (rect.top becomes negative as we scroll down)
      const scrolled = -sectionTop;

      if (scrolled >= 0 && scrolled <= scrollableDistance) {
        // We are INSIDE the scroll zone
        const progress = scrolled / scrollableDistance;
        // Map 0.0-1.0 to 0-9 indices
        const newIndex = Math.min(9, Math.floor(progress * 10));
        setActiveIndex(newIndex);
      } else if (scrolled < 0) {
        // Above the section
        setActiveIndex(0);
      } else {
        // Below the section
        setActiveIndex(9);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-transparent text-white font-sans selection:bg-cyan-500 selection:text-white">
      {/* --- 2. SCROLL-LOCKED CAROUSEL SECTION --- */}
      {/* Tall container to create scroll space */}
      <div
        ref={scrollSectionRef}
        className="relative h-[500vh] z-20 bg-transparent"
      >
        {/* Sticky Container that holds the Carousel in place */}
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent">
          {/* Section Header inside sticky view */}
          <div className="absolute top-12 w-full text-center z-20">
            <p className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase">
              Record {activeIndex + 1} / 10
            </p>
            {/* Progress Bar */}
            <div className="w-64 h-1 bg-white/10 mx-auto mt-4 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-600 transition-all duration-300 ease-out"
                style={{ width: `${((activeIndex + 1) / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* The Carousel (Controlled by Scroll Index) */}
          <FocusCarousel activeIndex={activeIndex} />
        </div>
      </div>
    </div>
  );
};

export default ScrollView;
