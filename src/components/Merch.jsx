import React, { useState, useEffect } from 'react';
import { Shirt, Tag, ShoppingCart, Zap, Code, AlertTriangle, Lock } from 'lucide-react';
import { NEXT_DROP_DATE } from '../utils/Constants';

const Merch = () => {
  // --- CONFIGURATION ---
  
  // 1. AVAILABILITY CONTROL
  // Set to TRUE to show "Purchase Signal".
  // Set to FALSE to show "Sold Out / Access Denied".
  const IS_STOCK_AVAILABLE = true; 

  // 2. COUNTDOWN TIMER TARGET
  // This date is only used to display the countdown clock when stock is unavailable.
  // It does NOT automatically change the availability state anymore.
   

  // --- COMPONENT LOGIC ---

  // Mock product data
  const productName = "CYBER_CORE TEE";
  const productPrice = "₹999.00";
  const productId = "TSRT-2025-001";
  const imageUrl = "https://placehold.co/600x700/000000/ef4444?text=CYBER_TEE_UNIT";

  // State is now strictly controlled by the variable above (initially)
  const [isSoldOut, setIsSoldOut] = useState(!IS_STOCK_AVAILABLE); 

  // --- COUNTDOWN LOGIC (Visual Only) ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // This effect handles the timer tick, but does NOT flip the isSoldOut switch automatically.
    const deadline = new Date(NEXT_DROP_DATE);

    const updateTimer = () => {
      const now = new Date();
      const difference = deadline - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Optional: Stop timer at 00:00:00
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer(); // Run once on mount
    const interval = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const handlePurchase = () => {
    // Manually trigger sold out state on click (simulating a sale)
    setIsSoldOut(true);
  };

  return (
    <div className="py-8 md:py-16 bg-transparent font-sans text-white relative overflow-hidden min-h-screen flex items-center justify-center">
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-3">
        
        {/* Header - Changes based on state */}
        <div className="text-center mb-8 md:mb-10">
          {!isSoldOut ? (
            <>
              <h2 className="text-xl md:text-3xl font-black text-white uppercase mb-1">
                ACCESS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">THE GEAR</span>
              </h2>
              <p className="text-sm md:text-base text-gray-400 font-mono tracking-wider">
                /PRODUCT_ID: {productId}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl md:text-3xl font-black text-white uppercase mb-1">
                ACCESS <span className="text-gray-600 line-through decoration-blue-500">THE GEAR</span>
              </h2>
              <p className="text-sm md:text-base text-blue-500 font-mono tracking-wider animate-pulse">
                /SYSTEM_ALERT: DROP INCOMING / LOCKED
              </p>
            </>
          )}
        </div>

        {/* Merch Container */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 items-start">
          
          {/* Product Image (Left) */}
          <div className="lg:col-span-3">
            <div className={`shadow-[0_0_20px_rgba(239,68,68,0.3)] relative transition-all duration-500 border p-1.5 bg-black/50 ${isSoldOut ? 'border-gray-700 grayscale hover:grayscale-0' : 'border-cyan-700'}`}>
              
              <div className={`transform skew-y-2 skew-x-2 rounded-sm overflow-hidden border-2 relative ${isSoldOut ? 'border-gray-800' : 'border-cyan-900/50'}`}>
                
                {/* LOCKED/SOLD OUT OVERLAY */}
                {isSoldOut && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-300">
                      <div className="bg-gray-900/90 text-blue-500 font-black text-4xl md:text-5xl tracking-tighter px-10 py-2 transform -rotate-12 border-y-4 border-cyan-500 shadow-xl">
                          LOCKED
                      </div>
                  </div>
                )}

                <div className={`transform -skew-y-2 -skew-x-2 ${isSoldOut ? 'opacity-60' : ''}`}>
                  <img 
                    src={imageUrl} 
                    alt={productName}
                    className="w-full h-auto object-cover aspect-[4/5] shadow-lg shadow-cyan-900/30"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x700/374151/D1D5DB?text=IMAGE+ERROR" }}
                  />
                </div>
                
                {/* Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30" style={{
                    backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 16, 16, 0.5) 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                }}></div>
              </div>
            </div>
          </div>
          
          {/* Product Information Terminal (Right) */}
          <div className={`lg:col-span-2 flex flex-col p-3 md:p-4 bg-gray-900/80 rounded-sm border-2 shadow-xl backdrop-blur-sm transition-colors duration-500 ${isSoldOut ? 'border-gray-700 shadow-none' : 'border-blue-500 shadow-cyan-900/30 ring-4 ring-cyan-900/20'}`}>
            
            <div className="transform skew-y-2 skew-x-2 p-2 -m-2"> 
              <div className="transform -skew-y-2 -skew-x-2">

                {/* Status Indicator */}
                {!isSoldOut ? (
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-indigo-400 animate-pulse" />
                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                      UNIT_STATUS: AVAILABLE
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={14} className="text-blue-500" />
                    <span className="text-xs font-mono text-blue-500 uppercase tracking-widest">
                      UNIT_STATUS: AWAITING DROP
                    </span>
                  </div>
                )}

                <h3 className={`text-xl md:text-2xl font-black uppercase mb-2 leading-tight ${isSoldOut ? 'text-gray-400' : 'text-white'}`}>
                  {productName}
                </h3>

                <div className={`text-4xl font-mono font-extrabold mb-3 border-b pb-1 ${isSoldOut ? 'text-gray-600 border-gray-800' : 'text-blue-500 border-cyan-800/50'}`}>
                  {productPrice}
                </div>

                {/* CONTENT AREA: SWAPS BASED ON STATE */}
                {!isSoldOut ? (
                  <div className="space-y-3 text-xs font-mono animate-in fade-in slide-in-from-right-4 duration-500">
                    {/* Data Block 1 */}
                    <div className="flex items-start bg-gray-800/50 p-1.5 rounded-sm border-l-3 border-cyan-700 hover:bg-gray-800/80 transition-colors duration-300">
                      <Shirt size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-gray-300 uppercase tracking-wider text-[10px]">[01] Product Line</p>
                        <p className="text-white text-xs">Apparel / Tactical Fiber Blend</p>
                      </div>
                    </div>
                    {/* Data Block 2 */}
                    <div className="flex items-start bg-gray-800/50 p-1.5 rounded-sm border-l-3 border-cyan-700 hover:bg-gray-800/80 transition-colors duration-300">
                      <Tag size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-gray-300 uppercase tracking-wider text-[10px]">[02] Unit Description</p>
                        <p className="text-white text-xs">High-durability garment with encrypted logo trace.</p>
                      </div>
                    </div>
                    {/* Data Block 3 */}
                    <div className="flex items-start bg-gray-800/50 p-1.5 rounded-sm border-l-3 border-cuan-700 hover:bg-gray-800/80 transition-colors duration-300">
                      <Code size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-gray-300 uppercase tracking-wider text-[10px]">[03] Configuration</p>
                        <p className="text-white text-xs">Size: S | M | L | XL</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Locked Message */}
                    <div className="bg-gray-800/50 border border-gray-700 p-3 mb-4 rounded-sm">
                        <p className="text-gray-400 text-xs font-mono mb-1 flex items-center gap-2">
                            <Lock size={12} /> SECURE GATEWAY ACTIVE
                        </p>
                        <p className="text-gray-500 text-xs leading-relaxed">
                            Access to this unit is currently restricted. Neural link synchronization required.
                        </p>
                    </div>
                    
                    {/* Countdown Timer */}
                    <div className="mb-4">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Access Granted In:</p>
                        <div className="flex gap-2 font-mono text-xl text-white">
                            <div className="bg-gray-800 p-2 rounded-sm border border-gray-700 w-12 text-center">
                                {String(timeLeft.days).padStart(2, '0')}
                                <span className="block text-[8px] text-gray-500 mt-1">DAY</span>
                            </div>
                            <div className="bg-gray-800 p-2 rounded-sm border border-gray-700 w-12 text-center">
                                {String(timeLeft.hours).padStart(2, '0')}
                                <span className="block text-[8px] text-gray-500 mt-1">HR</span>
                            </div>
                            <div className="bg-gray-800 p-2 rounded-sm border border-gray-700 w-12 text-center">
                                {String(timeLeft.minutes).padStart(2, '0')}
                                <span className="block text-[8px] text-gray-500 mt-1">MIN</span>
                            </div>
                            <div className="bg-gray-800 p-2 rounded-sm border border-gray-700 w-12 text-center text-blue-500 animate-pulse">
                                {String(timeLeft.seconds).padStart(2, '0')}
                                <span className="block text-[8px] text-gray-500 mt-1">SEC</span>
                            </div>
                        </div>
                    </div>
                  </div>
                )}
                
                {/* BUTTON AREA: SWAPS BASED ON STATE */}
                {!isSoldOut ? (
                  <>
                    <button 
                      
                      className="mt-4 w-full py-2.5 bg-blue-600 text-white font-black uppercase rounded-sm flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group hover:bg-cyan-500 active:scale-[0.98] text-base shadow-lg shadow-cyan-700/40"
                    >
                        <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 animate-pulse-slow"></div>
                        <span className="relative z-10">PURCHASE SIGNAL</span> 
                        <ShoppingCart size={18} className="relative z-10 transform group-hover:rotate-12 transition-transform" />
                    </button>
                    <p className="text-center mt-1 text-[10px] text-gray-500 font-mono">
                        // Transaction secured via Tesseract Protocol
                    </p>
                  </>
                ) : (
                  <>
                    <button disabled className="mt-2 w-full py-2.5 bg-gray-800 text-gray-500 font-black uppercase rounded-sm flex items-center justify-center gap-2 cursor-not-allowed border border-gray-700 group">
                        <Lock size={18} className="group-hover:animate-ping" />
                        <span>ACCESS DENIED</span> 
                    </button>
                    <p className="text-center mt-2 text-[10px] text-gray-600 font-mono">
                        // Return at T-Minus 00:00:00
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merch;