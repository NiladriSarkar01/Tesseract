import React, { useState, useEffect } from 'react';
import { Search, Filter, UserCheck, UserX, MoreHorizontal, Download, Users, ShieldCheck, AlertTriangle, Eye, Calendar, ChevronDown, X } from 'lucide-react';

// Dummy Data Generator for Participants
const EVENTS = ['Hackathon', 'RoboWars', 'Esports', 'Conference', 'Workshop'];

const generateParticipants = (count = 50) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `P-${1000 + i}`,
    name: `Participant ${i + 1}`,
    email: `participant${i + 1}@techverse.io`,
    // Added image field with a unique seed for variety
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${1000 + i}`,
    team: i % 3 === 0 ? 'Red Falcons' : i % 3 === 1 ? 'Blue Cyber' : 'Green Matrix',
    event: EVENTS[i % EVENTS.length], 
    status: i % 5 === 0 ? 'Pending' : i % 7 === 0 ? 'Rejected' : 'Approved',
    role: i % 10 === 0 ? 'Team Lead' : 'Member',
    registeredAt: `2025-11-${(i % 30) + 1}`
  }));
};

const AdminDashboard = () => {
  const [participants, setParticipants] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [eventFilter, setEventFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [viewImage, setViewImage] = useState(null); // State for the image popup

  useEffect(() => {
    setParticipants(generateParticipants());
  }, []);

  // Filter & Search Logic
  const filteredParticipants = participants.filter(p => {
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesEvent = eventFilter === 'All' || p.event === eventFilter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.email.toLowerCase().includes(search.toLowerCase()) ||
                          p.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesEvent && matchesSearch;
  });

  // Stats Calculation
  const stats = {
    total: participants.length,
    approved: participants.filter(p => p.status === 'Approved').length,
    pending: participants.filter(p => p.status === 'Pending').length,
    rejected: participants.filter(p => p.status === 'Rejected').length
  };

  return (
    <div className="min-h-screen bg-[#020000] text-gray-300 font-mono p-6 relative overflow-hidden selection:bg-red-500 selection:text-black">
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Image Popup Modal */}
      {viewImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setViewImage(null)}
        >
          <div 
            className="relative max-w-lg w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 shadow-2xl transform transition-all scale-100"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full transition-colors z-10"
              onClick={() => setViewImage(null)}
            >
              <X size={20} />
            </button>
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-white/5">
              <img src={viewImage} alt="Full View" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}

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
           <div className="px-4 py-2 bg-red-900/10 border border-red-500/20 rounded flex flex-col items-end">
              <span className="text-[10px] text-red-400 uppercase tracking-wider">Server Load</span>
              <span className="text-lg font-bold text-white">12%</span>
           </div>
           <button className="p-2 bg-red-600 hover:bg-red-500 text-black rounded transition-colors">
             <Download size={20} />
           </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 relative z-10">
        {[
          { label: 'Total Users', value: stats.total, icon: Users, color: 'text-blue-400', border: 'border-blue-500/30' },
          { label: 'Approved', value: stats.approved, icon: UserCheck, color: 'text-green-400', border: 'border-green-500/30' },
          { label: 'Pending', value: stats.pending, icon: AlertTriangle, color: 'text-yellow-400', border: 'border-yellow-500/30' },
          { label: 'Rejected', value: stats.rejected, icon: UserX, color: 'text-red-400', border: 'border-red-500/30' }
        ].map((stat, idx) => (
          <div key={idx} className={`bg-[#0a0a0a] border ${stat.border} p-4 rounded flex items-center justify-between group hover:bg-white/5 transition-colors`}>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
            </div>
            <stat.icon size={24} className={`${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
          </div>
        ))}
      </div>

      {/* Controls & Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 relative z-10 bg-[#0a0a0a] p-4 rounded border border-white/10">
        
        {/* Search & Event Filter Group */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors text-white placeholder-gray-700"
            />
          </div>

          {/* Event Filter Dropdown */}
          <div className="relative bg-black w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-gray-500" />
            </div>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="w-full bg-black border border-white/10 rounded pl-10 pr-8 py-2 text-sm text-white focus:outline-none focus:border-red-500 appearance-none cursor-pointer transition-colors"
            >
              <option value="All">All Events</option>
              {EVENTS.map(event => (
                <option key={event} value={event}>{event}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex bg-black border border-white/10 rounded p-1 w-full lg:w-auto overflow-x-auto">
          {['All', 'Approved', 'Pending', 'Rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wide rounded transition-all whitespace-nowrap ${
                statusFilter === f 
                  ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="relative z-10 bg-[#0a0a0a] border border-white/10 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black text-gray-500 uppercase text-xs tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4 font-medium">User ID</th>
                <th className="p-4 font-medium">Name / Email</th>
                <th className="p-4 font-medium">Event / Team</th>
                <th className="p-4 font-medium">Reg. Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredParticipants.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 font-mono text-red-400/80">{p.id}</td>
                  <td className="p-4">
                    <div className="font-bold text-white">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.email}</div>
                  </td>
                  <td className="p-4">
                    {/* Event Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-cyan-400 uppercase tracking-wider mb-1">
                       <Calendar size={10} /> {p.event}
                    </div>
                    <div className="text-xs text-gray-400">
                      {p.team} <span className="text-gray-600">•</span> {p.role}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-gray-500">{p.registeredAt}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                      p.status === 'Approved' ? 'bg-green-900/20 text-green-500 border-green-500/30' :
                      p.status === 'Rejected' ? 'bg-red-900/20 text-red-500 border-red-500/30' :
                      'bg-yellow-900/20 text-yellow-500 border-yellow-500/30'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  {/* Avatar Cell with Click Handler */}
                  <td className="p-4">
                    <div 
                      className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5 p-0.5 cursor-pointer hover:border-red-500 hover:scale-110 transition-all"
                      onClick={() => setViewImage(p.image)}
                    >
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 rounded bg-green-900/20 hover:bg-green-600 border border-green-500/30 hover:border-green-500 text-green-500 hover:text-white transition-colors" title="Approve">
                        <UserCheck size={16} />
                      </button>
                      <button className="p-1.5 rounded bg-red-900/20 hover:bg-red-600 border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white transition-colors" title="Reject">
                        <UserX size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredParticipants.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <Filter size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg uppercase tracking-widest">No Records Found</p>
            <p className="text-xs font-mono mt-2">Try adjusting your search filters.</p>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
           <span>Showing {filteredParticipants.length} entries</span>
           <div className="flex gap-2">
             <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded disabled:opacity-50">Previous</button>
             <button className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded">Next</button>
           </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;