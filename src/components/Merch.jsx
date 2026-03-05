import React, { useState, useEffect } from "react";
import {
  Shirt,
  Tag,
  ShoppingCart,
  Zap,
  Code,
  AlertTriangle,
  Lock,
  User,
  Mail,
  Phone,
  Upload,
  QrCode,
  CheckCircle,
  ArrowRight,
  X,
  ChevronLeft,
} from "lucide-react";

// --- SUB-COMPONENTS (Defined outside to prevent focus loss) ---
const TerminalInput = ({
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label className="text-[10px] text-cyan-500 font-mono uppercase tracking-widest mb-1.5 block">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <Icon
          size={14}
          className="text-gray-500 group-focus-within:text-cyan-500 transition-colors"
        />
      </div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="w-full bg-black/60 border border-gray-700 focus:border-cyan-500 text-white font-mono text-sm rounded-sm py-3 pl-10 pr-4 outline-none transition-all duration-300 focus:ring-1 focus:ring-cyan-500/30 caret-cyan-400 relative z-0"
        required
      />
    </div>
  </div>
);

const Merch = () => {
  // --- CONFIGURATION ---
  const IS_STOCK_AVAILABLE = false;
  const NEXT_DROP_DATE = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 3,
  ).toISOString(); // 3 days from now

  const productName = "CYBER_CORE TEE";
  const productPrice = "₹999.00";
  const productId = "TSRT-2025-001";
  const imageUrl = "";
  const upiId = "pay-cyber-merch@upi";

  // --- STATE ---
  const [isSoldOut, setIsSoldOut] = useState(!IS_STOCK_AVAILABLE);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [view, setView] = useState("product"); // 'product', 'form', 'payment', 'success'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    size: "M",
    proof: null,
  });
  const [filePreview, setFilePreview] = useState(null);

  // --- LOGIC ---
  useEffect(() => {
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
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, proof: file }));
      setFilePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="py-8 md:py-16 bg-transparent font-sans text-white relative overflow-hidden min-h-screen flex items-center justify-center selection:bg-cyan-500 selection:text-black">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-3">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-3xl font-black text-white uppercase mb-1 tracking-tighter">
            {view === "success" ? (
              "TRANSACTION COMPLETE"
            ) : (
              <>
                ACCESS{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
                  THE GEAR
                </span>
              </>
            )}
          </h2>
          <p className="text-sm md:text-base text-gray-400 font-mono tracking-wider">
            {view === "product"
              ? `/PRODUCT_ID: ${productId}`
              : `/SYSTEM: SECURE_CHECKOUT_GATEWAY`}
          </p>
        </div>

        {/* Merch Container */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* Left Column (Visuals) */}
          <div className="lg:col-span-3">
            <div
              className={`relative transition-all duration-500 border p-1 bg-black/50 ${isSoldOut ? "border-gray-800" : "border-cyan-800 shadow-[0_0_30px_rgba(6,182,212,0.1)]"}`}
            >
              <div className="rounded-sm overflow-hidden relative">
                {isSoldOut && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <div className="bg-gray-900/90 text-blue-500 font-black text-4xl md:text-5xl tracking-tighter px-10 py-2 transform -rotate-12 border-y-4 border-cyan-500 shadow-2xl">
                      LOCKED
                    </div>
                  </div>
                )}

                <img
                  src={imageUrl}
                  alt={productName}
                  className={`w-full h-auto object-cover aspect-[4/5] transition-all duration-700 ${isSoldOut ? "grayscale" : ""} ${view === "success" ? "opacity-30 blur-md" : ""}`}
                />

                {view === "success" && (
                  <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 duration-500">
                    <div className="bg-cyan-500 text-black p-4 rounded-full mb-6 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                      <CheckCircle size={48} />
                    </div>
                    <h4 className="text-3xl font-black italic tracking-tighter mb-2">
                      SIGNAL_ACQUIRED
                    </h4>
                    <p className="text-sm font-mono text-cyan-400 max-w-xs">
                      Transmission received. Verification process started for{" "}
                      {formData.email}
                    </p>
                    <button
                      onClick={() => setView("product")}
                      className="mt-8 text-[10px] font-mono underline text-gray-500 hover:text-white uppercase tracking-widest"
                    >
                      Return to Terminal
                    </button>
                  </div>
                )}

                {/* Scanline Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(18, 16, 16, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 16, 16, 0.5) 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Column (Controls/Forms) */}
          <div
            className={`lg:col-span-2 flex flex-col p-4 md:p-6 bg-gray-900/90 rounded-sm border-2 shadow-2xl backdrop-blur-md transition-all duration-500 ${isSoldOut ? "border-gray-800" : "border-blue-500 ring-4 ring-cyan-950/20"}`}
          >
            {/* View 1: Product Details */}
            {view === "product" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <Zap
                    size={14}
                    className={
                      isSoldOut
                        ? "text-gray-600"
                        : "text-indigo-400 animate-pulse"
                    }
                  />
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest ${isSoldOut ? "text-gray-600" : "text-indigo-400"}`}
                  >
                    UNIT_STATUS: {isSoldOut ? "SYSTEM_LOCKED" : "AVAILABLE"}
                  </span>
                </div>

                <h3
                  className={`text-2xl font-black uppercase mb-2 leading-tight ${isSoldOut ? "text-gray-500" : "text-white"}`}
                >
                  {productName}
                </h3>

                <div
                  className={`text-4xl font-mono font-extrabold mb-5 border-b pb-2 ${isSoldOut ? "text-gray-700 border-gray-800" : "text-blue-500 border-cyan-800/50"}`}
                >
                  {productPrice}
                </div>

                {!isSoldOut ? (
                  <>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start bg-gray-800/50 p-2.5 rounded-sm border-l-2 border-cyan-500 hover:bg-gray-800/80 transition-colors">
                        <Shirt
                          size={18}
                          className="text-blue-500 mr-3 mt-0.5"
                        />
                        <div>
                          <p className="text-gray-500 uppercase tracking-wider text-[10px] font-mono">
                            [01] Fabric
                          </p>
                          <p className="text-white text-xs font-mono">
                            240 GSM Tactical Fiber Blend
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start bg-gray-800/50 p-2.5 rounded-sm border-l-2 border-cyan-500 hover:bg-gray-800/80 transition-colors">
                        <Tag size={18} className="text-blue-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-gray-500 uppercase tracking-wider text-[10px] font-mono">
                            [02] Details
                          </p>
                          <p className="text-white text-xs font-mono">
                            Silicon-fused Encrypted Logos
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setView("form")}
                      className="w-full py-4 bg-blue-600 text-white font-black uppercase rounded-sm flex items-center justify-center gap-2 transition-all hover:bg-cyan-500 active:scale-95 shadow-lg shadow-cyan-900/40"
                    >
                      <span>PURCHASE SIGNAL</span>
                      <ShoppingCart size={18} />
                    </button>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-gray-800/40 border border-gray-700 p-4 text-xs font-mono text-gray-500 leading-relaxed">
                      // Neural gateway restricted. Return when the timer hits
                      zero to establish uplink.
                    </div>

                    <div className="flex gap-2 font-mono text-xl justify-center">
                      {["DAYS", "HRS", "MIN", "SEC"].map((unit, i) => (
                        <div
                          key={unit}
                          className="bg-gray-800 p-2 rounded-sm border border-gray-700 w-14 text-center"
                        >
                          {String(Object.values(timeLeft)[i]).padStart(2, "0")}
                          <span className="block text-[8px] text-gray-600 mt-1">
                            {unit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      disabled
                      className="w-full py-3 bg-gray-800 text-gray-600 font-black uppercase rounded-sm border border-gray-700 cursor-not-allowed"
                    >
                      LOCKED_ACCESS
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* View 2: Data Entry Form */}
            {view === "form" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setView("payment");
                }}
                className="animate-in fade-in slide-in-from-right-4 duration-500"
              >
                <div className="flex items-center gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setView("product")}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm font-black font-mono tracking-tighter uppercase">
                    Identity_Verification
                  </span>
                </div>

                <TerminalInput
                  icon={User}
                  label="Full Name"
                  name="name"
                  placeholder="INIT_IDENT"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <TerminalInput
                  icon={Mail}
                  label="Contact Address (Email)"
                  name="email"
                  type="email"
                  placeholder="USER@CYBER_CORE.IO"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <TerminalInput
                  icon={Phone}
                  label="Comms Channel (Mobile)"
                  name="phone"
                  type="tel"
                  placeholder="+91 XXXX XXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                />

                <div className="mb-8">
                  <label className="text-[10px] text-cyan-500 font-mono uppercase tracking-widest mb-2 block">
                    Unit Scale (Size)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["S", "M", "L", "XL"].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, size: sz }))
                        }
                        className={`py-2 text-xs font-mono font-bold border transition-all ${
                          formData.size === sz
                            ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                            : "border-gray-700 text-gray-500 hover:border-gray-500"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-cyan-600 text-black font-black uppercase rounded-sm flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all active:scale-95"
                >
                  NEXT_PHASE <ArrowRight size={18} />
                </button>
              </form>
            )}

            {/* View 3: Payment & Upload */}
            {view === "payment" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setView("form")}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm font-black font-mono tracking-tighter uppercase">
                    Payload_Transfer
                  </span>
                </div>

                <div className="bg-white p-3 rounded-sm mb-4 mx-auto w-fit shadow-xl border-4 border-cyan-900/50">
                  <div className="w-44 h-44 bg-gray-100 flex items-center justify-center relative">
                    {/* Visual QR Simulation */}
                    <div className="grid grid-cols-5 gap-1 opacity-90 p-2">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 ${Math.random() > 0.4 ? "bg-black" : "bg-transparent"}`}
                        ></div>
                      ))}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <QrCode className="text-black opacity-30" size={80} />
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6 font-mono">
                  <p className="text-xs text-cyan-500 mb-1">
                    SCAN_FOR_TRANSACTION
                  </p>
                  <p className="text-[10px] text-gray-500 tracking-tighter">
                    {upiId}
                  </p>
                </div>

                <div className="mb-6">
                  <label className="text-[10px] text-cyan-500 font-mono uppercase tracking-widest mb-2 block">
                    Upload Verification Proof
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-700 rounded-sm cursor-pointer hover:border-cyan-500 bg-black/40 transition-colors overflow-hidden relative">
                    {filePreview ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                        <img
                          src={filePreview}
                          className="h-full object-contain"
                          alt="proof"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setFilePreview(null);
                            setFormData((p) => ({ ...p, proof: null }));
                          }}
                          className="absolute top-2 right-2 bg-red-600 p-1.5 rounded-full hover:scale-110 transition-transform"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="text-gray-600 mb-2" />
                        <p className="text-[10px] font-mono text-gray-500 uppercase">
                          Attach_Screenshot_Here
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <button
                  disabled={!formData.proof}
                  onClick={() => setView("success")}
                  className={`w-full py-4 font-black uppercase rounded-sm flex items-center justify-center gap-2 transition-all ${
                    formData.proof
                      ? "bg-cyan-600 text-black hover:bg-cyan-400 active:scale-95"
                      : "bg-gray-800 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  FINALIZE_HANDSHAKE <CheckCircle size={18} />
                </button>
              </div>
            )}

            {/* View 4: Success Details (Inner Terminal) */}
            {view === "success" && (
              <div className="animate-in fade-in duration-700 space-y-5 font-mono text-[11px]">
                <div className="p-3 bg-cyan-900/10 border border-cyan-800/50 text-cyan-400/80 rounded-sm">
                  {">"} INITIATING VERIFICATION_SEQUENCE...
                  <br />
                  {">"} AUTHENTICITY_TOKEN:{" "}
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  <br />
                  {">"} STATUS: PENDING_HUMAN_VALIDATION
                </div>
                <div className="text-gray-400 leading-relaxed px-1">
                  Your order packet has been queued. Our operators will verify
                  the payment signal against your uploaded proof. You will
                  receive a dispatch notification once confirmed.
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-gray-600 mb-2">EXPECTED_ARRIVAL:</p>
                  <p className="text-white">4 - 7 SOLAR_DAYS</p>
                </div>
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-gray-800/40">
              <p className="text-center text-[10px] text-gray-600 font-mono tracking-tighter">
                // {view === "product" ? "TERMINAL_IDLE" : "SESSION_ACTIVE"} |
                SECURE_PROTOCOL_X2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merch;
