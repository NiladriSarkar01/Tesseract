import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Twitter, ChevronRight, Zap } from 'lucide-react';
import ArghyaImg from "../assets/arghya1.jpg";
import AikikImg from "../assets/aikik.jpg";
import AritraImg from "../assets/aritra.jpg";


/**
 * COMPONENT: Single Accordion Item (Member Card)
 */
const TeamAccordionItem = ({ member, isActive, onHover }) => {
  return (
    <div 
      onMouseEnter={onHover}
      className={`relative h-[400px] md:h-[500px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden cursor-pointer border-r border-white/10 last:border-r-0 
        ${isActive ? 'grow-3 opacity-100 grayscale-0' : 'grow opacity-50 grayscale hover:opacity-80 hover:grayscale-0'}
      `}
    >
      {/* Background Image */}
      <img 
        src={member.image} 
        alt={member.name}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-100' : 'scale-150'}`}
      />
      
      {/* Dark Gradient Overlay */}
      <div className={`absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-80' : 'opacity-60'}`}></div>

      {/* Vertical Text (Collapsed State) */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isActive ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest -rotate-90 whitespace-nowrap drop-shadow-md">
          {member.name}
        </h3>
      </div>

      {/* Expanded Content (Active State) */}
      <div className={`absolute bottom-0 left-0 w-full p-6 md:p-10 transition-all duration-500 transform ${isActive ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-10 opacity-0'}`}>
        
        <div className="w-12 h-1 bg-red-600 mb-4 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>

        <h3 className="text-3xl md:text-5xl font-black text-white uppercase leading-none mb-2">
          {member.name}
        </h3>
        <p className="text-red-400 font-mono text-sm tracking-wider uppercase mb-4 md:mb-6">
          // {member.role}
        </p>

        <p className="text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed border-l-2 border-white/20 pl-4 hidden md:block">
          {member.bio}
        </p>

        <div className="flex gap-3">
          {[Linkedin, Github, Mail].map((Icon, i) => (
            <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center text-gray-300 transition-all backdrop-blur-sm border border-white/10">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
      
      {/* Active Highlight Border */}
      {isActive && (
        <div className="absolute inset-0 border-2 border-red-500/30 pointer-events-none"></div>
      )}
    </div>
  );
};

/**
 * COMPONENT: Kinetic Accordion Container
 */
const KineticTeamGroup = ({ members }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex w-full border-y border-white/10 bg-[#0a0a0a] shadow-2xl shadow-black">
      {members.map((member, index) => (
        <TeamAccordionItem 
          key={member.id} 
          member={member} 
          isActive={activeIndex === index}
          onHover={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
};

/**
 * MAIN PAGE COMPONENT
 */
const Team = () => {
  
  // Data Structure: Teams -> Members
  const teams = [
    {
      id: "tech",
      title: "TECH SYNDICATE",
      description: "The architects of the digital realm. Building the backbone of Tesseract.",
      members: [
        { id: 1, name: "Arghya Chakraborty", role: "Tech Lead", image: ArghyaImg, bio: "Full-stack wizard ensuring the digital backbone remains unbreakable." },
        { id: 2, name: "Niladri Sarkar", role: "Backend Lead", image: AikikImg, bio: "Frontend architect obsessed with pixel perfection and performance." },
        { id: 3, name: "Aritra Chattyopadhyay", role: "Web Lead", image: AritraImg, bio: "Database master managing millions of requests per second." },
        { id: 4, name: "Aikik Patra", role: "Frontend Engineer", image: AikikImg, bio: "Keeping the servers cool while the competition heats up." },
        
      ]
    },
    {
      id: "design",
      title: "DESIGN VANGUARD",
      description: "Crafting the visual identity and immersive experiences.",
      members: [
        { id: 6, name: "Rohan Das", role: "Creative Dir", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800", bio: "The visionary behind the scarlet aesthetic." },
        { id: 7, name: "Lisa Wong", role: "UI Designer", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800", bio: "Creating interfaces that feel like the future." },
        { id: 8, name: "Mark T", role: "3D Artist", image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&q=80&w=800", bio: "Modeling the metaverse one polygon at a time." },
        { id: 9, name: "Sophie M", role: "Motion Graphics", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800", bio: "Adding kinetic life to static pixels." }
      ]
    },
    {
      id: "management",
      title: "MANAGEMENT CORPS",
      description: "Orchestrating the chaos. Logistics, sponsorships, and operations.",
      members: [
        { id: 10, name: "Arjun Mehta", role: "Chairperson", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800", bio: "Leading the charge into the unknown." },
        { id: 11, name: "Priya Singh", role: "Gen Sec", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800", bio: "The operational glue holding the event together." },
        { id: 12, name: "Karan V", role: "Finance", image: "https://images.unsplash.com/photo-1522075469751-3a3694c60e9e?auto=format&fit=crop&q=80&w=800", bio: "Managing the treasury for maximum impact." },
        { id: 13, name: "Zoya K", role: "Public Relations", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800", bio: "The voice of TechVerse to the outside world." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-red-600 selection:text-white pb-32">
      
      
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-linear-to-b from-red-900/10 to-transparent pointer-events-none z-0"></div>

      {/* Page Header */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
          <Zap size={14} className="text-red-500 fill-current" />
          <span className="text-xs font-bold tracking-[0.2em] text-red-200">CORE COMMITTEE 2025</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">
          MEET THE <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-600">TITANS</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          The brilliant minds and relentless souls working behind the scenes to make Tesseract 3.0 a reality.
        </p>
      </div>

      {/* Team Sections Loop */}
      <div className="relative z-10 flex flex-col gap-24">
        {teams.map((team,) => (
          <div key={team.id} className="container mx-auto px-4 md:px-0">
            
            {/* Team Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-4 border-l-4 border-red-600 ml-4 md:ml-0">
              <div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                  {team.title}
                </h2>
                <p className="text-gray-500 mt-2 max-w-xl text-sm md:text-base font-light">
                  {team.description}
                </p>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-red-500 font-mono text-sm tracking-widest">
                  // {team.members.length}_OPERATIVES
                </p>
              </div>
            </div>

            {/* Kinetic Accordion for this Team */}
            <KineticTeamGroup members={team.members} />
            
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 container mx-auto px-6 mt-32 text-center">
        <p className="text-gray-500 font-mono text-sm mb-4">WANT TO JOIN THE LEGION?</p>
        <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-red-500 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Apply for Volunteers
        </button>
      </div>

    </div>
  );
};

export default Team;