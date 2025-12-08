import React, { useState, useEffect, useCallback } from "react";
import { LogOut, ShieldCheck } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import QuerySection from "../components/QuerySection";
import ApplicationSection from "../components/ApplicationSection";

const DashboardPage = () => {
  const { logout } = useAuthStore();

  const [section, setSection] = useState("applications");

  const [number, setNumber] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 20) + 1;
      setNumber(random);
    }, 1000);

    // ✅ Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020000] text-gray-300 font-mono p-6 relative overflow-hidden selection:bg-red-500 selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Top Header */}
      <header className="relative z-10 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-red-900/30 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
            <ShieldCheck className="text-red-600" size={32} />
            Admin<span className="text-red-600">_Console</span>
          </h1>
          <p className="text-xs text-red-400/60 mt-1 tracking-widest">
            // SYSTEM_STATUS: ONLINE // USER_DB_ACCESS_GRANTED
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-3 p-1 bg-[#060000] border border-red-500/20 rounded-xl shadow-[0_0_15px_#ff000020]">
            {/* Applications */}
            <button
              onClick={() => setSection("applications")}
              className={`relative px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 rounded-lg overflow-hidden
      ${
        section === "applications"
          ? "bg-gradient-to-r from-cyan-500 to-cyan-700 text-black shadow-[0_0_20px_#00ffff]"
          : "bg-black text-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_10px_#00ffff80]"
      }`}
            >
              <span className="relative z-10">Applications</span>
              {section === "applications" && (
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.4),transparent)] animate-pulse" />
              )}
            </button>

            {/* Query */}
            <button
              onClick={() => setSection("querys")}
              className={`relative px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 rounded-lg overflow-hidden
      ${
        section === "querys"
          ? "bg-gradient-to-r from-red-500 to-red-700 text-black shadow-[0_0_20px_#ff0000]"
          : "bg-black text-red-400 hover:text-red-300 hover:shadow-[0_0_10px_#ff000080]"
      }`}
            >
              <span className="relative z-10">Querys</span>
              {section === "querys" && (
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.4),transparent)] animate-pulse" />
              )}
            </button>

            {/* Analytics */}
            <button
              onClick={() => setSection("orders")}
              className={`relative px-4 py-2 text-xs uppercase tracking-widest transition-all duration-300 rounded-lg overflow-hidden
      ${
        section === "orders"
          ? "bg-gradient-to-r from-purple-500 to-purple-700 text-black shadow-[0_0_20px_#a855f7]"
          : "bg-black text-purple-400 hover:text-purple-300 hover:shadow-[0_0_10px_#a855f780]"
      }`}
            >
              <span className="relative z-10">Orders</span>
              {section === "orders" && (
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.4),transparent)] animate-pulse" />
              )}
            </button>
          </div>

          <button
            onClick={logout}
            className="p-2 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
          >
            <LogOut />
          </button>
          <div className="px-4 py-2 bg-red-900/10 border border-red-500/20 rounded flex flex-col items-end">
            <span className="text-[10px] text-red-400 uppercase tracking-wider">
              Server Load
            </span>
            <span className="text-lg font-bold text-white">{number}%</span>
          </div>
        </div>
      </header>
      {section === "applications" && <ApplicationSection />}
      {section === "querys" && <QuerySection />}
      {section === "orders" && <div>Orders Coming Soon</div>}
    </div>
  );
};

export default DashboardPage;
