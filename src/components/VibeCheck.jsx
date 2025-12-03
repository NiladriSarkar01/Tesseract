import React, { useRef, useState } from 'react';
import { 
  Music, 
  Zap, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Activity
} from 'lucide-react';

// --- FUN ZONE COMPONENT ---
// Copy this component to your project
const FunZone = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="py-24 relative overflow-hidden bg-transparent text-white">
            
            {/* Background Grid - Now inside the component and transparent */}
            <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }}
            ></div>

             {/* Red/Dark Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-0 -left-20 w-80 h-80 bg-cyan-900/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cyan-500/50 bg-cyan-900/20 text-blue-400 text-xs font-mono mb-4 uppercase tracking-widest shadow-[0_0_15px_rgba(0,138,138,0.3)]">
                        <Zap size={14} className="fill-current" />
                        <span>System Override: Joy_Protocol.exe</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase mb-6 drop-shadow-[0_0_10px_rgba(0,138,138,0.5)]">
                        VIBE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">CHECK</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl font-light font-mono">
                        <span className="text-blue-500">&gt;&gt;</span> Even the most elite netrunners need to defragment their neural drive. 
                        Pause the mission. Reset your serotonin levels.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Video Container */}
                    <div className="relative group">
                        {/* Decorative Red Glow Frame */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-cyan-900 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                        
                        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-cyan-500/30 shadow-2xl">
                            {/* REPLACE 'video.mp4' WITH YOUR ACTUAL FILE PATH */}
                            <video 
                                ref={videoRef}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale-[50%] group-hover:grayscale-0"
                                autoPlay 
                                loop 
                                muted={isMuted}
                                playsInline
                                src="video.mp4" 
                            >
                                Your browser does not support the video tag.
                            </video>

                            {/* Video Controls Overlay */}
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-end justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button onClick={togglePlay} className="p-3 bg-cyan-600/20 backdrop-blur-md rounded-full border border-cyan-500/50 hover:bg-cyan-600 text-white transition">
                                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                                </button>
                                <button onClick={toggleMute} className="p-3 bg-cyan-600/20 backdrop-blur-md rounded-full border border-cyan-500/50 hover:bg-cyan-600 text-white transition">
                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Floating Badge - Caution Tape Style */}
                        <div className="absolute -top-6 -right-6 rotate-12 bg-blue-600 text-white font-black font-mono text-sm px-4 py-2 shadow-lg border-2 border-white transform group-hover:rotate-6 transition-transform">
                            WARNING: HIGH FUN LEVELS
                        </div>
                    </div>

                    {/* Fun Text Paragraphs */}
                    <div className="space-y-8 font-mono">
                        <div className="p-6 bg-cyan-900/10 border border-cyan-500/20 rounded-xl hover:bg-cyan-900/20 transition-colors hover:border-cyan-500/60 group shadow-[0_0_10px_rgba(0,138,138,0.1)]">
                            <h3 className="text-blue-400 font-bold text-xl mb-2 flex items-center gap-2 uppercase tracking-wider">
                                <Music className="group-hover:animate-bounce" /> 
                                Cognitive Recalibration
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                Studies from the <span className="text-blue-500 font-bold">Mainframe</span> indicate that 99% of compiler errors are caused by a lack of rhythm. 
                                We've embedded this encrypted broadcast of "Pure Vibes" to help you debug your soul. 
                                Watch. Nod along. Let the pixels wash over you.
                            </p>
                        </div>

                        <div className="p-6 bg-cyan-900/10 border border-cyan-500/20 rounded-xl hover:bg-cyan-900/20 transition-colors hover:border-cyan-500/60 group shadow-[0_0_10px_rgba(0,138,138,0.1)]">
                            <h3 className="text-white font-bold text-xl mb-2 flex items-center gap-2 uppercase tracking-wider">
                                <Activity className="group-hover:spin-slow text-blue-500" /> 
                                Mandatory Break Protocol
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                You've been staring at the terminal for too long. Your eyes are square. 
                                Take 30 seconds to absorb this joyous energy. 
                                <span className="text-blue-400 font-bold"> Side effects include:</span> rhythmic foot tapping, sudden urges to smile, and optimized dopamine levels.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main export for preview purposes
export default function App() {
    return (
        <div className="bg-transparent min-h-screen">
            <FunZone />
        </div>
    );
}