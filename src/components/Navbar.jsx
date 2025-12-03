import React, { useState } from 'react';
import { Menu, X, Zap, ChevronRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import TeaserTriggerButton from './TeaserTriggerButton';
import logo from '../assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'EVENTS', href: '/events' },
    { name: 'TEAM', href: '/team' },
    { name: 'GALLERY', href: '/gallery' },
    { name: 'BROCHURE', href: '' },
  ];

  return (
    <>
      {/* 1. Fixed Navbar Header */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b 'bg-[#020408]/90 backdrop-blur-md py-3 border-cyan-900/30 shadow-lg shadow-cyan-900/10`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* --- BRAND LOGO --- */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-9 h-9 flex items-center justify-center bg-cyan-600/10 border border-cyan-500/50 rounded group-hover:bg-cyan-600/20 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 group-hover:opacity-40 animate-pulse"></div>
              <img
                src={logo}
                alt="Tesseract Logo"
                className="w-50 h-50 relative z-10 group-hover:scale-110 transition-transform object-contain"
              />
            </div>
            <div className="flex flex-col">
              <Link to="/">
                <span className="text-lg font-black tracking-tighter text-white leading-none">
                  TESSERACT<span className="text-blue-500">.IO</span>
                </span>
              </Link>
              <span className="text-[9px] font-mono text-gray-500 tracking-[0.2em] group-hover:text-green-400/80 transition-colors">
                SYSTEM_ONLINE
              </span>
            </div>
          </div>

          {/* --- DESKTOP NAVIGATION --- */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className="text-xs font-mono text-gray-400 hover:text-white transition-colors tracking-widest relative group/link"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-500 transition-all duration-300 group-hover/link:w-full"></span>
                <span className="absolute -top-3 -right-2 text-[8px] text-blue-500 opacity-0 group-hover/link:opacity-100 transition-opacity font-sans transform group-hover/link:translate-y-1">0{navLinks.indexOf(link) + 1}</span>
              </Link>
            ))}
            
            <div className="w-[1px] h-6 bg-white/10 mx-2"></div>

            {/* --- TEASER --- */}
            <Link to='/teaser'>
              <TeaserTriggerButton/>
            </Link>

            {/* --- GET PASSES LINK --- */}
            <Link 
              to="/register"
              state={{ eventId: null }} // Reset selection
              className="relative px-6 py-2 bg-transparent overflow-hidden group cursor-pointer block"
            >
              <div className="absolute inset-0 border border-white/20 rounded-sm group-hover:border-cyan-500/50 transition-colors"></div>
              <div className="absolute inset-0 bg-cyan-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                Registration <ChevronRight size={14} className="text-blue-500 group-hover:text-white transition-colors" />
              </span>
            </Link>
          </nav>

          {/* --- MOBILE TOGGLE --- */}
          <button 
            className="md:hidden text-gray-300 hover:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`absolute top-full left-0 w-full bg-[#020408] border-b border-cyan-900/30 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-500/50 mb-2">
              <Terminal size={12} /> NAVIGATION_PROTOCOL
            </div>
            
            {navLinks.map((link, idx) => (
              <Link 
                key={link.name} 
                to={link.href}
                className="flex items-center justify-between text-sm font-bold text-gray-300 hover:text-white hover:pl-4 transition-all tracking-widest py-3 border-b border-white/5 group"
                onClick={() => setIsOpen(false)}
              >
                <span>{link.name}</span>
                <span className="text-[10px] font-mono text-gray-600 group-hover:text-cyan-500">0{idx + 1}</span>
              </Link>
            ))}
            
            <Link 
              to="/register"
              state={{ eventId: null }}
              onClick={() => setIsOpen(false)}
              className="w-full mt-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-wider text-xs rounded-sm transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)] block text-center"
            >
              Initialize Access
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Spacer Div */}
      <div className="h-[60px] w-full" aria-hidden="true"></div>
    </>
  );
};

export default Navbar;