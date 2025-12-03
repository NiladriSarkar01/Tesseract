import React from 'react';
import { MapPin, Terminal, Phone, Mail, ChevronRight, Activity } from 'lucide-react';

const Map = () => {
    // NOTE: In a real environment, __app_id would be provided externally. 
    // We use a hardcoded value here for local component testing.
    const appId = "abcd1234efgh";

    // Coordinates for Guru Nanak Institute of Technology, Kolkata
    const lat = 22.695130911319747;
    const lng = 88.37888287612273;
    const address = "157/F, Nilganj Rd, Sahid Colony, Sodepur, Kolkata, West Bengal 700114";

    // Increased zoom level from z=15 to z=17 for a closer view
    const mapEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`;

    // Custom CSS for dark map iframe
    const mapStyle = {
        // This filter makes the map darker, inverts the colors, and applies a red tint for the cyber theme
        filter: 'grayscale(100%) invert(95%) hue-rotate(180deg) brightness(80%) contrast(150%)',
        border: 'none',
    };

    // Function to handle route planning
    const handlePlanRoute = () => {
        // Using the Google Maps Universal Cross-Platform URL
        // 'api=1' ensures it works reliably
        // 'destination' is set to the specific lat,lng
        // We omit 'origin' or set it to 'Current Location' to let Google Maps use the user's GPS
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        
        // Open in a new tab
        window.open(mapsUrl, '_blank');
    };

    return (
        <div className="py-20 md:py-32 bg-transparent font-sans text-white relative overflow-hidden min-h-screen flex items-center">

            {/* Background Grid and Glow */}
            <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }}
            ></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-2">
                        LOCATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">THE PORTAL</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 font-mono tracking-wider">
                        /ACCESS_POINT: {appId.substring(0, 8).toUpperCase()}_GNIT
                    </p>
                </div>

                {/* Map Container and Info Grid */}
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12">

                    {/* Map View (Left/Top) - Sized to lg:w-1/2 and slightly reduced height */}
                    <div className="lg:w-1/2 h-[350px] md:h-[550px] rounded-xl overflow-hidden border-4 border-cyan-700/50 shadow-[0_0_20px_rgba(220,38,38,0.2)] relative transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,168,168,0.5)]">
                        <iframe
                            title="Campus Location"
                            width="100%"
                            height="100%"
                            src={mapEmbedUrl}
                            style={mapStyle}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        {/* Pulsating Center Target */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <MapPin className="w-10 h-10 text-blue-500 animate-pulse drop-shadow-[0_0_10px_rgba(239,68,68,1)]" fill="currentColor" />
                            <div className="absolute inset-0 border-2 border-cyan-500 rounded-full animate-ping opacity-75" style={{ animationDuration: '2s' }}></div>
                        </div>
                    </div>

                    {/* Information Terminal (Right/Bottom) - Sized to lg:w-1/2 */}
                    <div className="lg:w-1/2 flex flex-col justify-center p-6 md:p-10 bg-gray-900/80 rounded-xl border border-cyan-700/50 backdrop-blur-sm shadow-inner shadow-cyan-900/20">

                        {/* Status Indicator */}
                        <div className="flex items-center gap-2 mb-4">
                            <Activity size={16} className="text-green-400 animate-pulse" />
                            <span className="text-xs font-mono text-green-400 uppercase tracking-widest">
                                CONNECTION_SECURE
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold uppercase text-blue-400 mb-6 border-b border-cyan-800/50 pb-2">
                            <Terminal size={20} className="inline mr-2" /> DATA_STREAM: CONTACT
                        </h3>

                        <div className="space-y-6 text-lg font-mono">

                            <div className="flex items-start">
                                <MapPin size={24} className="text-blue-500 mt-1 mr-4 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-300 uppercase tracking-wider text-sm">
                                        Location Matrix
                                    </p>
                                    <p className="text-white break-words text-base">
                                        {address}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Phone size={24} className="text-blue-500 mt-1 mr-4 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-300 uppercase tracking-wider text-sm">
                                        Comms Relay
                                    </p>
                                    <p className="text-white text-base">
                                        +91 98765 43210 (Admissions)
                                    </p>
                                    <p className="text-white text-base">
                                        +91 99887 76655 (Event Helpdesk)
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Mail size={24} className="text-blue-500 mt-1 mr-4 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-300 uppercase tracking-wider text-sm">
                                        Data Transfer
                                    </p>
                                    <p className="text-white text-base">
                                        contact@tesseract.in
                                    </p>
                                    <p className="text-white text-base">
                                        support@gniot.ac.in
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Cooler Button - Now Functional */}
                        <button 
                            onClick={handlePlanRoute}
                            className="mt-10 w-full py-3 bg-cyan-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(0,168,168,0.7)] active:scale-95 cursor-pointer"
                        >
                            {/* Subtle Glow Effect on Hover */}
                            <span className="absolute inset-0 bg-cyan-500/0 transition-all duration-500 group-hover:bg-cyan-500/20 group-hover:scale-[1.5] group-hover:opacity-100 animate-pulse-slow"></span>
                            <span className="relative z-10">PLAN YOUR ROUTE</span> 
                            <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main App component to render the Map
export default function App() {
    return <Map />;
}