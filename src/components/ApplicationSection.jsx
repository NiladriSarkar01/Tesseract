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
import { useApplicationStore } from "../store/useApplicationStore";
import { useAuthStore } from "../store/useAuthStore";
import ConfirmDialog from "../components/ConfirmDialog";
import { EVENTS_DATA } from "../lib/data";
import downloadExcel from "../lib/download_exel";

const RegistrationDetailsPopup = ({ isOpen, onClose, formData }) => {
  if (!isOpen) return null;

  const renderPaymentProof = (proof) => {
    if (!proof)
      return <span className="text-red-400 italic">No proof uploaded</span>;
    if (typeof proof === "string") {
      return (
        <a
          href={proof}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline hover:text-cyan-300"
        >
          View Receipt
        </a>
      );
    }
    return <span className="text-cyan-400">{proof.name}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container - WIDER (max-w-5xl) to fit content side-by-side */}
      <div className="relative w-full max-w-5xl bg-[#0a0f1c] border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(8,145,178,0.3)] overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-900/40 to-transparent px-6 py-4 border-b border-cyan-500/20 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white tracking-wide">
            Registration Summary
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Main Grid: Split Details into 2 Columns to save vertical space */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Column: Participant Info */}
            <div className="space-y-4">
              <h3 className="text-cyan-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Participant Details
              </h3>
              {/* Compact Grid for details */}
              <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
                <DetailItem label="Full Name" value={formData.name} />
                <DetailItem label="Phone" value={formData.phone} />
                <DetailItem
                  label="Email"
                  value={formData.email}
                  className="col-span-2"
                />
                <DetailItem
                  label="Type"
                  value={formData.registrationType}
                  capitalize
                />
              </div>
            </div>

            {/* Right Column: Event Info */}
            <div className="space-y-4">
              <h3 className="text-blue-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Event Information
              </h3>
              <div className="grid grid-cols-2 gap-4 bg-cyan-900/10 p-4 rounded-lg border border-cyan-500/10">
                <DetailItem label="Event Name" value={formData.event} />
                <DetailItem label="Event ID" value={formData.eventId} mono />
                <DetailItem
                  label="Payment Mode"
                  value={formData.paymentMode}
                  capitalize
                />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                    Payment Proof
                  </p>
                  <div className="text-sm text-gray-200">
                    {renderPaymentProof(formData.paymentProof)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section: Team Roster (Only if Team) */}
          {/* Sits below the 2 columns, spanning full width */}
          {formData.registrationType === "team" && (
            <div className="mb-2">
              <h3 className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                Team Roster
              </h3>

              <div className="flex flex-col md:flex-row gap-4 bg-[#05080f] rounded-lg p-4 border border-gray-800 items-start">
                <div className="min-w-[150px]">
                  <DetailItem label="Team Name" value={formData.teamName} />
                </div>

                {/* Horizontal list of members to save vertical space */}
                <div className="flex-1">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
                    Members
                  </p>
                  {formData.teamMembers && formData.teamMembers.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.teamMembers.map((member, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded bg-white/5 text-gray-300 text-xs border border-white/5"
                        >
                          {member.name || member}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic text-xs">
                      No members added.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sub-component (Slightly smaller text for compactness)
const DetailItem = ({
  label,
  value,
  capitalize = false,
  mono = false,
  className = "",
}) => (
  <div className={className}>
    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
      {label}
    </p>
    <p
      className={`text-sm text-gray-200 font-medium truncate ${
        capitalize ? "capitalize" : ""
      } ${mono ? "font-mono tracking-tight text-cyan-200" : ""}`}
    >
      {value || "-"}
    </p>
  </div>
);

const ApplicationSection = () => {
  const {
    applications,
    getApplications,
    updateApplication,
    selectedApplication,
    meta,
    isApplicationsLoading,
    setSelectedApplication,
  } = useApplicationStore();

  const { logout } = useAuthStore();

  const [statusFilter, setStatusFilter] = useState("All");
  const [viewImage, setViewImage] = useState(null); // State for the image popup
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({});
  const [isViewingDetails, setIsViewingDetails] = useState(false);
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

  const onEventChange = (e) => {
    setParams({ ...params, event: e.target.value });
  };

  const getHelper = async () => {
    const res = await getApplications(params);
    console.log(applications[0]);

    if (!res.success) {
      console.log(res.message);
    }
  };

  useEffect(() => {
    getHelper();
  }, [getApplications, params]);

  const onUpdateApplication = () => {
    if (!updateForm) return;
    updateApplication(updateForm);
    setUpdateForm({});
    setIsDialogOpen(false);
  };

  // Stats Calculation
  const stats = {
    total: meta.total,
    approved: applications.filter((p) => p.status === "Approved").length,
    pending: applications.filter((p) => p.status === "Pending").length,
    rejected: applications.filter((p) => p.status === "Rejected").length,
  };

  return (
    <div className="min-h-screen bg-[#020000] text-gray-300 font-mono p-6 relative overflow-hidden selection:bg-red-500 selection:text-black">
      {/* Image Popup Modal */}
      {viewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setViewImage(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 shadow-2xl transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-600 text-white rounded-full transition-colors z-10"
              onClick={() => setViewImage(null)}
            >
              <X size={20} />
            </button>
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-white/5">
              <img
                src={viewImage}
                alt="Full View"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 relative z-10">
        {[
          {
            label: "Total Users",
            value: stats.total,
            icon: Users,
            color: "text-blue-400",
            border: "border-blue-500/30",
          },
          {
            label: "Approved",
            value: stats.approved,
            icon: UserCheck,
            color: "text-green-400",
            border: "border-green-500/30",
          },
          {
            label: "Pending",
            value: stats.pending,
            icon: AlertTriangle,
            color: "text-yellow-400",
            border: "border-yellow-500/30",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            icon: UserX,
            color: "text-red-400",
            border: "border-red-500/30",
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
          <div className="relative bg-black w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-gray-500" />
            </div>
            <select
              onChange={onEventChange}
              className="w-full bg-black border border-white/10 rounded pl-10 pr-8 py-2 text-sm text-white focus:outline-none focus:border-red-500 appearance-none cursor-pointer transition-colors"
            >
              <option value="All">All Events</option>
              {EVENTS_DATA.map((event) => (
                <option key={event.id} value={event.title.toUpperCase()}>
                  {event.title.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex bg-black border border-white/10 rounded p-1 w-full lg:w-auto overflow-x-auto">
          {["All", "Approved", "Pending", "Rejected"].map((f) => (
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
          <button
            onClick={() =>
              downloadExcel(applications, params.event, statusFilter)
            }
            className={`px-4 py-1.5 mx-5 text-xs font-bold uppercase tracking-wide rounded transition-all whitespace-nowrap ${"bg-orange-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]"}`}
          >
            <Download />
          </button>
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
              {applications.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4 font-mono text-red-400/80">{p.DRP}</td>
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
                  <td className="p-4 font-mono text-gray-500">{p.createdAt}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        p.status === "Approved"
                          ? "bg-green-900/20 text-green-500 border-green-500/30"
                          : p.status === "Rejected"
                            ? "bg-red-900/20 text-red-500 border-red-500/30"
                            : "bg-yellow-900/20 text-yellow-500 border-yellow-500/30"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  {/* Avatar Cell with Click Handler */}
                  <td className="p-4">
                    <div
                      className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5 p-0.5 cursor-pointer hover:border-red-500 hover:scale-110 transition-all"
                      onClick={() => setViewImage(p.paymentProof)}
                    >
                      <img
                        src={p.paymentProof}
                        alt={p.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setSelectedApplication(p);
                          setIsViewingDetails(true);
                        }}
                        className="p-1.5 rounded bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {p.status === "Pending" && (
                        <button
                          onClick={() => {
                            setUpdateForm({
                              applicationId: p._id,
                              status: "Approved",
                            });
                            setIsDialogOpen(true);
                          }}
                          className="p-1.5 rounded bg-green-900/20 hover:bg-green-600 border border-green-500/30 hover:border-green-500 text-green-500 hover:text-white transition-colors"
                          title="Approve"
                        >
                          <UserCheck size={16} />
                        </button>
                      )}
                      {p.status === "Pending" && (
                        <button
                          onClick={() => {
                            setUpdateForm({
                              applicationId: p._id,
                              status: "Rejected",
                            });
                            setIsDialogOpen(true);
                          }}
                          className="p-1.5 rounded bg-red-900/20 hover:bg-red-600 border border-red-500/30 hover:border-red-500 text-red-500 hover:text-white transition-colors"
                          title="Reject"
                        >
                          <UserX size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {applications.length === 0 && (
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
          <span>Showing {applications.length} entries</span>
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
      <RegistrationDetailsPopup
        isOpen={isViewingDetails}
        onClose={() => setIsViewingDetails(false)}
        formData={selectedApplication}
      />
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={onUpdateApplication}
      />
    </div>
  );
};

export default ApplicationSection;
