import React, { useRef, useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, Play, ChevronRight } from "lucide-react";

// --- UTILITY: CN ---
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- CONFIGURATION: Navigation Items ---
const navItems = [
  { name: "Home", link: "/" },
  { name: "Events", link: "/events" },
  { name: "Team", link: "/team" },
  { name: "Gallery", link: "/gallery" },
  { name: "Contact", link: "/contact" },
];

// --- COMPONENTS ---
const useScramble = (text, speed = 40) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [isHovered, text, speed]);

  return { displayText, setIsHovered };
};

const AnimatedDropdownLink = ({ link, index, onClick }) => {
  const { displayText, setIsHovered } = useScramble(link.name);

  return (
    <Link
      to={link.link}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-cyan-500/30 bg-white/5 hover:bg-cyan-900/20 transition-all duration-300 overflow-hidden"
    >
      {/* Hover Scan Sweep */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none"></div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="p-2 rounded-md bg-black/40 text-gray-500 group-hover:text-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300">
          <ChevronRight size={18} className="opacity-50" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-300 group-hover:text-white tracking-widest transition-colors uppercase">
            {displayText}
          </span>
          <span className="text-[8px] font-mono text-gray-600 group-hover:text-cyan-500/70 transition-colors">
            COORD_0{index + 1}
          </span>
        </div>
      </div>

      {/* Animated Chevron */}
      <ChevronRight
        size={14}
        className="ml-auto text-gray-600 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
      />
    </Link>
  );
};

export const Navbar = ({ children, className }) => {
  const { scrollY } = useScroll(); // Track window scroll, not element ref
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Optimization: Only update state if the value actually changes
    const isVisible = latest > 50;
    if (isVisible !== visible) {
      setVisible(isVisible);
    }
  });

  return (
    <motion.div
      className={cn(
        "fixed inset-x-0 top-0 z-[100] w-full pointer-events-none",
        className
      )}
    >
      <div className="pointer-events-auto">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { visible })
            : child
        )}
      </div>
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      layout
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(4px)",
        backgroundColor: visible ? "rgba(5, 5, 10, 0.9)" : "rgba(0, 0, 0, 0.2)",
        width: visible ? "60%" : "100%",
        minWidth: visible ? "700px" : "100%",
        y: visible ? 20 : 0,
        borderRadius: visible ? "100px" : "0px",
        border: visible
          ? "1px solid rgba(34, 211, 238, 0.15)"
          : "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: visible ? "0px 10px 40px -10px rgba(0,0,0,0.5)" : "none",
        paddingLeft: visible ? "32px" : "32px",
        paddingRight: visible ? "32px" : "32px",
      }}
      // Changed from spring to easeInOut for a predictable, smooth glide
      transition={{
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier
      }}
      style={{ willChange: "transform, backdrop-filter" }}
      className={cn(
        "relative z-[60] mx-auto mb-17 hidden w-full max-w-7xl flex-row items-center justify-between self-start px-8 py-4 lg:flex",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium lg:space-x-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          className="relative px-4 py-2 text-neutral-300 transition-colors hover:text-white"
          key={`link-${idx}`}
          to={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-white/10"
              transition={{ duration: 0.35, ease: "easeOut" }} // no jitter
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      to="/"
      className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-white"
    >
      {/* Placeholder Logo Icon */}
      <div className="h-6 w-6 rounded bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
      <span className="font-bold tracking-wider text-white">TESSERACT</span>
    </Link>
  );
};

// Updated NavbarButton to support 'to' prop for Link
export const NavbarButton = ({
  children,
  className,
  to,
  onClick,
  ...props
}) => {
  const Component = to ? Link : "button";

  return (
    <Component
      to={to}
      onClick={onClick}
      className={cn(
        "relative inline-flex h-9 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900",
        className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-xs font-medium text-white backdrop-blur-3xl transition-colors hover:bg-slate-900">
        {children}
      </span>
    </Component>
  );
};

// New Teaser Button Component - Highlighted
export const TeaserButton = ({ className }) => {
  return (
    <Link
      to="/teaser"
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/60 hover:border-cyan-400 hover:text-cyan-100 transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]",
        className
      )}
    >
      <Play size={10} className="fill-current" />
      <span>Teaser</span>
    </Link>
  );
};

// --- MOBILE COMPONENTS ---

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "blur(4px)",
        backgroundColor: visible ? "rgba(5, 5, 10, 0.9)" : "rgba(0, 0, 0, 0.2)",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "16px",
        paddingLeft: visible ? "12px" : "16px",
        borderRadius: visible ? "16px" : "0px",
        y: visible ? 20 : 0,
        border: visible
          ? "1px solid rgba(34, 211, 238, 0.1)"
          : "1px solid rgba(255, 255, 255, 0.05)",
      }}
      // Changed from spring to easeInOut
      transition={{
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ willChange: "transform, backdrop-filter" }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between py-4 lg:hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -12 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -12 }}
          transition={{
            duration: 0.35,
            ease: [0.25, 0.1, 0.25, 1], // soft, silky animation
          }}
          className="absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-[#080808] border border-white/10 shadow-2xl"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return (
    <button onClick={onClick} className="p-2 text-white">
      <motion.div
        key={isOpen ? "open" : "closed"}
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: isOpen ? 0 : 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.div>
    </button>
  );
};

// --- MAIN EXPORT ---

const ResizableNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      {/* DESKTOP VIEW */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-3">
          <TeaserButton />
          <NavbarButton to="/register">Register Now</NavbarButton>
        </div>
      </NavBody>

      {/* MOBILE VIEW */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="bg-[#081414]/95 w-full backdrop-blur-2xl border border-cyan-500/30 border-t-0 rounded-b-2xl shadow-2xl shadow-black overflow-hidden md:mx-0 relative">
            {/* Decorative Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            <div className="p-6 relative z-10 flex flex-col gap-1">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                <p className="text-[10px] font-mono text-cyan-500/70 uppercase tracking-widest animate-pulse">
                  // System_Nav_Active
                </p>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                {navItems.map((link, idx) => (
                  <AnimatedDropdownLink
                    key={link.name}
                    link={link}
                    index={idx}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                ))}
              </div>

              {/* Actions Section */}
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                {/* Register Button - Now in Dropdown for both Mobile & Desktop */}
                <Link
                  to="/register"
                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-center uppercase text-xs tracking-wider rounded transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Initialize Registration
                </Link>

                {/* Teaser Button - Visible ONLY on Mobile (md:hidden) to avoid duplicate on Desktop */}
                <Link
                  to="/teaser"
                  onClick={() => setMobileMenuOpen(false)}
                  className="md:hidden w-full py-3 border border-white/10 text-gray-400 font-bold text-center uppercase text-xs tracking-wider hover:text-white hover:border-cyan-500/50 transition-colors flex items-center justify-center gap-2 rounded bg-black/40"
                >
                  <Play size={10} /> View Trailer
                </Link>
              </div>
            </div>

            {/* Footer Decor */}
            <div className="bg-black/60 p-2 flex justify-center items-center border-t border-white/5">
              <div className="flex items-center gap-2 text-[8px] font-mono text-gray-600 uppercase tracking-widest">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></div>
                Secure_Connection_Established
              </div>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export default ResizableNavbar;
