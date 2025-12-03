import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Search
} from 'lucide-react';

import EventCard from '../components/EventCard.jsx';

/**
 * Snowfall Background Component
 */
const Snowfall = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((width * height) / 10000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.5,
          speedY: Math.random() * 1 + 0.2,
          speedX: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > height) {
          p.y = 0;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

/**
 * Event Card Component
 */


/**
 * Main Page Component
 */
const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy Data representing the "Darpan" event mix
  const events = [
    {
      id: 1,
      title: "FrostByte Hackathon",
      category: "Technical",
      date: "Nov 15, 2025",
      time: "10:00 AM - 10:00 AM (24h)",
      venue: "Main Auditorium",
      image: "https://images.unsplash.com/photo-1504384308090-c54be3855212?auto=format&fit=crop&q=80&w=1000",
      desc: "The flagship 24-hour coding marathon. Solve real-world problems in a frozen environment."
    },
    {
      id: 2,
      title: "RoboWars: Sub-Zero",
      category: "Technical",
      date: "Nov 16, 2025",
      time: "02:00 PM",
      venue: "Open Air Theatre",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000",
      desc: "Clash of the metal titans. Build your bot and battle for supremacy in the arena."
    },
    {
      id: 3,
      title: "Valorant: Icebox",
      category: "Esports",
      date: "Nov 15-16, 2025",
      time: "11:00 AM Onwards",
      venue: "Gaming Lab 1",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000",
      desc: "5v5 Tactical Shooter tournament. Highest frags takes home the prize pool."
    },
    {
      id: 4,
      title: "Cosmic Concert",
      category: "Cultural",
      date: "Nov 17, 2025",
      time: "06:00 PM",
      venue: "Main Ground",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000",
      desc: "A night of melody and madness featuring top indie bands and DJ sets."
    },
    {
      id: 5,
      title: "Aurora Fashion Show",
      category: "Cultural",
      date: "Nov 16, 2025",
      time: "05:00 PM",
      venue: "Main Auditorium",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1000",
      desc: "Walk the ramp in style. Theme: Cyberpunk Winter."
    },
    {
      id: 6,
      title: "Pixel Art Workshop",
      category: "Workshop",
      date: "Nov 15, 2025",
      time: "01:00 PM",
      venue: "Seminar Hall B",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
      desc: "Learn to create stunning 8-bit art and game assets from industry pros."
    },
    {
      id: 7,
      title: "FIFA 25 Championship",
      category: "Esports",
      date: "Nov 16, 2025",
      time: "10:00 AM",
      venue: "Gaming Lab 2",
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&q=80&w=1000",
      desc: "1v1 Football simulation. Prove your skills on the virtual pitch."
    },
    {
      id: 8,
      title: "UI/UX Designathon",
      category: "Technical",
      date: "Nov 15, 2025",
      time: "09:00 AM",
      venue: "Design Studio",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&q=80&w=1000",
      desc: "Redesign the future. A sprint to create the most intuitive interfaces."
    }
  ];

  const categories = ["All", "Technical", "Cultural", "Esports", "Workshop"];

  const filteredEvents = events.filter(event => {
    const matchesCategory = activeTab === 'All' || event.category === activeTab;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500 selection:text-black">
      <Snowfall />
      
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-[50vh] bg-linear-to-b from-[#0f172a] to-transparent pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 text-cyan-400 text-xs font-bold tracking-widest uppercase">
            <Zap size={12} className="fill-current" />
            Event Schedule
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            EXPLORE THE <br/> UNIVERSE
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Dive into a curated collection of events designed to challenge your skills and ignite your imagination.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-4 z-50 mb-12">
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto shadow-2xl">
            
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === cat 
                      ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#020617] border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5">
            <Search size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
            <p className="text-gray-400">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {setActiveTab('All'); setSearchQuery('')}}
              className="mt-6 px-6 py-2 bg-cyan-500 text-black rounded-lg font-bold hover:bg-cyan-400 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default EventsPage;
