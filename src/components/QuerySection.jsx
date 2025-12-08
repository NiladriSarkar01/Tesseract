import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Filter,
  UserCheck,
  UserX,
  MoreHorizontal,
  Download,
  Users,
  ShieldCheck,
  AlertTriangle,
  Eye,
  Calendar,
  ChevronDown,
  X,
} from "lucide-react";
import { useContactStore } from "../store/useContactStore";
import { EVENTS } from "../lib/data";
import { useAuthStore } from "../store/useAuthStore";
import ConfirmDialog from "../components/ConfirmDialog";

// Dummy Data for Preview
const MOCK_QUERIES = [
  {
    id: "QRY-8021",
    user: {
      name: "Alex Chen",
      email: "alex.c@example.com",
      avatar: "https://i.pravatar.cc/150?u=a",
    },
    subject: "Payment Gateway Failure",
    message:
      "I tried to register for the Hackathon but the payment failed twice.",
    date: "2025-10-12",
    status: "Open",
    priority: "High",
  },
  {
    id: "QRY-8022",
    user: {
      name: "Sarah Connor",
      email: "sarah@skynet.com",
      avatar: "https://i.pravatar.cc/150?u=s",
    },
    subject: "Team Formation Question",
    message: "Can I change my team members after submission?",
    date: "2025-10-11",
    status: "Resolved",
    priority: "Low",
  },
  {
    id: "QRY-8023",
    user: {
      name: "Mike Ross",
      email: "mike.r@pearson.com",
      avatar: "https://i.pravatar.cc/150?u=m",
    },
    subject: "Login Issues",
    message: "My password reset link is expiring instantly.",
    date: "2025-10-10",
    status: "Pending",
    priority: "Medium",
  },
];

const QuerySection = () => {
  const {
    contacts,
    selectedContact,
    meta,
    isContactsLoading,
    setSelectedContact,
    getContacts,
    createContact,
    updateContact,
  } = useContactStore();

  const [statusFilter, setStatusFilter] = useState("All");
  const [viewImage, setViewImage] = useState(null);
  const [section, setSection] = useState(true); // State for the image popup
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({});

  const [updateForm, setUpdateForm] = useState({});

  const changePage = (value) => {
    setCurrentPage((prev) => {
      console.log(meta);

      let newPage = prev + value;
      if (newPage < 1) newPage = 1;
      if (newPage > meta.totalPages) newPage = meta.totalPages;
      setParams({ ...params, page: newPage });
      return newPage;
    });
  };

  const onSearchChange = (e) => {
    e.preventDefault();
    setParams({ ...params, search: e.target.value });
  };

  const onStatusChange = (status) => {
    setParams({ ...params, status: status });
  };

  const getHelper = async () => {
    const res = await getContacts(params);
    if (!res.success) {
      console.log(res.message);
    }
  };

  useEffect(() => {
    getHelper();
  }, [getContacts, params]);
  console.log(contacts);

  const onUpdateContact = () => {
    if (!updateForm) return;
    updateContact(updateForm);
    setUpdateForm({});
    setIsDialogOpen(false);
  };

  // Stats Calculation
  const stats = {
    total: meta.total,
    resolved: contacts.filter((p) => p.status === "Resolved").length,
    open: contacts.filter((p) => p.status === "Open").length,
  };

  return (
    <div className="w-full mt-12 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 relative z-10">
        {[
          {
            label: "Total Querys",
            value: stats.total,
            icon: Users,
            color: "text-blue-400",
            border: "border-blue-500/30",
          },
          {
            label: "Resolved",
            value: stats.resolved,
            icon: UserCheck,
            color: "text-green-400",
            border: "border-green-500/30",
          },
          {
            label: "Open",
            value: stats.open,
            icon: AlertTriangle,
            color: "text-yellow-400",
            border: "border-yellow-500/30",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`bg-[#0a0a0a] border ${stat.border} p-4 rounded flex items-center justify-between group hover:bg-white/5 transition-colors`}
          >
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <h3 className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </h3>
            </div>
            <stat.icon
              size={24}
              className={`${stat.color} opacity-50 group-hover:opacity-100 transition-opacity`}
            />
          </div>
        ))}
      </div>

      {/* Controls & Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 relative z-10 bg-[#0a0a0a] p-4 rounded border border-white/10">
        {/* Search & Event Filter Group */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64 group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search user..."
              onChange={onSearchChange}
              className="w-full bg-black border border-white/10 rounded pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-red-500 transition-colors text-white placeholder-gray-700"
            />
          </div>

          {/* Event Filter Dropdown */}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex bg-black border border-white/10 rounded p-1 w-full lg:w-auto overflow-x-auto">
          {["All", "Resolved", "Open"].map((f) => (
            <button
              key={f}
              onClick={() => {
                setStatusFilter(f);
                onStatusChange(f);
              }}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wide rounded transition-all whitespace-nowrap ${
                statusFilter === f
                  ? "bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
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
                <th className="p-4 font-medium">Query ID</th>
                <th className="p-4 font-medium">Name / Email</th>
                <th className="p-4 font-medium">Subject / Query</th>
                <th className="p-4 font-medium">Issue. Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {contacts.map((p) => (
                <tr
                  key={p._id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4 font-mono text-red-400/80">{p.QRP}</td>
                  <td className="p-4">
                    <div className="font-bold text-white">{p.full_name}</div>
                    <div className="text-xs text-gray-500">{p.email}</div>
                  </td>
                  <td className="p-4">
                    {/* Event Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-cyan-400 uppercase tracking-wider mb-1">
                      <Calendar size={10} /> {p.subject}
                    </div>
                    <div className="text-xs text-gray-400">
                      {p.team} <span className="text-gray-600">•</span>{" "}
                      {p.message}
                    </div>
                  </td>
                  <td className="p-4 font-mono text-gray-500">{p.createdAt}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        p.status === "Resolved"
                          ? "bg-green-900/20 text-green-500 border-green-500/30"
                          : "bg-yellow-900/20 text-yellow-500 border-yellow-500/30"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 rounded bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setUpdateForm({
                            contactId: p._id,
                            status: "Resolved",
                          });
                          setIsDialogOpen(true);
                        }}
                        className="p-1.5 rounded bg-green-900/20 hover:bg-green-600 border border-green-500/30 hover:border-green-500 text-green-500 hover:text-white transition-colors"
                        title="Resolve"
                      >
                        <UserCheck size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {contacts.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <Filter size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg uppercase tracking-widest">
              No Records Found
            </p>
            <p className="text-xs font-mono mt-2">
              Try adjusting your search filters.
            </p>
          </div>
        )}

        {/* Pagination Footer */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
          <span>Showing {contacts.length} entries</span>
          <div className="flex gap-2">
            <button
              onClick={() => changePage(-1)}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => changePage(+1)}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={onUpdateContact}
      />
    </div>
  );
};

export default QuerySection;
