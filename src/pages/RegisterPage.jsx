import React, { useState, useEffect, useRef } from "react";
import {
  Zap,
  Search,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Upload,
  QrCode,
  Ticket,
  CheckCircle,
  Smartphone,
  User,
  CreditCard,
  ChevronLeft,
  X,
  Users,
  UserPlus,
  Trash2,
  Lock,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import paymentQR from "../assets/payment-qr.jpeg";

import { EVENTS_DATA } from "../lib/data";
import { Link, useLocation } from "react-router-dom";
import { useApplicationStore } from "../store/useApplicationStore";

const RegisterPage = () => {
  const location = useLocation();
  const eventId = location?.state?.eventId ?? "";

  const {
    createApplication,
    isApplicationsLoading,
    selectedApplication,
    setSelectedApplication,
  } = useApplicationStore();

  const REGISTRATION_DEADLINE = new Date("2026-03-28T23:59:59");

  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false);
  const [fileName, setFileName] = useState("");
  const [formError, setFormError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState(null);

  const turnstileRef = useRef(null);

  useEffect(() => {
    const now = new Date();
    if (now > REGISTRATION_DEADLINE) {
      setIsRegistrationClosed(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    eventId: String(eventId),
    paymentMode: "online",
    paymentProof: null,
    registrationType: "solo",
    teamName: "",
    teamMembers: [],
  });

  const [state, setState] = useState("idle");
  const fileInputRef = useRef(null);

  const selectedEvent = EVENTS_DATA.find(
    (e) => String(e.id) === formData.eventId,
  );

  // Treat as closed if global deadline passed OR the specific event is marked closed
  const isEventClosed =
    isRegistrationClosed || selectedEvent?.isClosed === true;

  useEffect(() => {
    if (selectedEvent) {
      const defaultType =
        selectedEvent.participationMode === "team" ? "team" : "solo";
      setFormData((prev) => ({
        ...prev,
        event: selectedEvent.title.toUpperCase(),
        registrationType: defaultType,
        teamMembers: [],
      }));
    }
  }, [selectedEvent?.id]);

  const calculatePrice = () => {
    if (!selectedEvent) return 0;

    if (formData.registrationType === "solo") {
      return selectedEvent.price;
    }

    const count = 1 + formData.teamMembers.length;

    if (selectedEvent.specialTeamPrice) {
      if (count === selectedEvent.specialTeamPrice.members) {
        return selectedEvent.specialTeamPrice.price;
      }
      return selectedEvent.teamPrice;
    }

    if (selectedEvent.isTeamPriceFixed) {
      return selectedEvent.teamPrice;
    }

    return selectedEvent.teamPrice * count;
  };

  const currentPrice = calculatePrice();
  const teamMemberCount = 1 + formData.teamMembers.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setFormData((prev) => ({ ...prev, paymentProof: base64Image }));
      setFormError("");
    };
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < selectedEvent.maxMembers - 1) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, ""],
      }));
    }
  };

  const removeTeamMember = (index) => {
    const newMembers = [...formData.teamMembers];
    newMembers.splice(index, 1);
    setFormData((prev) => ({ ...prev, teamMembers: newMembers }));
  };

  const handleMemberNameChange = (index, value) => {
    const newMembers = [...formData.teamMembers];
    newMembers[index] = value;
    setFormData((prev) => ({ ...prev, teamMembers: newMembers }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!turnstileToken) {
      setFormError(
        "Security check not complete. Please wait a moment and try again.",
      );
      return;
    }

    if (!formData.paymentProof) {
      setFormError("Please upload your payment screenshot before submitting.");
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return;
    }

    if (
      formData.registrationType === "team" &&
      selectedEvent &&
      formData.teamMembers.length + 1 < selectedEvent.minMembers
    ) {
      setFormError(
        `Your team needs at least ${selectedEvent.minMembers} members (you + ${selectedEvent.minMembers - 1} others).`,
      );
      return;
    }

    setFormData((prev) => ({
      ...prev,
      event: selectedEvent.title.toUpperCase(),
    }));

    const tokenToSubmit = turnstileToken;
    setTurnstileToken(null);

    const res = await createApplication({
      ...formData,
      "cf-turnstile-response": tokenToSubmit,
    });
    if (res.success) {
      setState("success");
      setSelectedApplication(res.data);
    } else {
      setState("fail");
      turnstileRef.current?.reset();
    }
  };

  // ── Shared "closed" UI ──────────────────────────────────────────────────────
  const ClosedView = () => (
    <div className="container mx-auto px-4 min-h-[80vh] flex items-center justify-center register-fade-in">
      <div className="bg-black/90 backdrop-blur-xl border border-cyan-500/30 p-8 md:p-12 rounded-3xl max-w-md w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

        <div className="w-24 h-24 bg-cyan-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/20">
          <Lock size={48} className="text-blue-500" />
        </div>

        <h2 className="text-3xl font-black text-white mb-3 uppercase tracking-tight">
          Registration Closed
        </h2>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm text-left">
              The application deadline for{" "}
              {selectedEvent ? (
                <span className="text-white font-bold">
                  {selectedEvent.title}
                </span>
              ) : (
                "this event"
              )}{" "}
              has passed. New entries are no longer being accepted.
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-8">
          If you have already registered, please check your email for
          confirmation details.
        </p>

        <button
          onClick={() => window.history.back()}
          className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    </div>
  );

  // --- VIEW: DEADLINE PASSED or EVENT CLOSED ---
  if (isEventClosed) {
    return <ClosedView />;
  }

  // --- VIEW: SUCCESS ---
  if (state === "success") {
    return (
      <div className="container mx-auto px-4 min-h-[80vh] flex items-center justify-center register-fade-in">
        <div className="bg-black/90 backdrop-blur-xl border border-cyan-500/30 p-8 md:p-12 rounded-3xl max-w-md w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
          <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-400 mb-6">
            You have successfully registered for <br />
            <span className="text-blue-500 font-bold">
              {selectedEvent?.title || "the event"}
            </span>
            .
          </p>

          {selectedEvent?.whatsappLink && (
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl animate-pulse hover:animate-none transition-all">
              <p className="text-green-400 text-sm font-bold mb-3 flex items-center justify-center gap-2">
                <MessageCircle size={16} /> Important: Join the Event Group
              </p>
              <a
                href={selectedEvent.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl transition-all w-full justify-center shadow-lg shadow-green-900/20"
              >
                Join WhatsApp Group <ExternalLink size={16} />
              </a>
              <p className="text-[10px] text-gray-500 mt-2">
                Join for event schedules, rule updates, and live announcements.
              </p>
            </div>
          )}

          <div className="bg-white/5 rounded-xl p-4 mb-8 text-sm text-left border border-white/10">
            <p className="text-gray-400 mb-1">Registration ID</p>
            <p className="text-white font-mono">{selectedApplication?.DRP}</p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW: FAIL ---
  if (state === "fail") {
    return (
      <div className="container mx-auto px-4 min-h-[80vh] flex items-center justify-center register-fade-in">
        <div className="bg-black/90 backdrop-blur-xl border border-red-500/30 p-8 md:p-12 rounded-3xl max-w-md w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={40} className="text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Registration Failed!
          </h2>
          <button
            onClick={() => {
              setState("idle");
              turnstileRef.current?.reset();
            }}
            className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-red-500/30 transition-all"
          >
            Try Again.
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW: FORM ---
  return (
    <div className="relative z-10 mt-16 container mx-auto px-4 py-12 register-slide-in">
      <button
        onClick={() => window.history.back()}
        className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 mb-8 transition-colors"
      >
        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
          <ChevronLeft size={20} />
        </div>
        <span className="font-medium">Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Left Column: Form */}
        <div className="order-2 lg:order-1">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-white mb-2">
              Secure Your Spot
            </h1>
            <p className="text-gray-400">
              Complete the form below to register for the event.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-cyan-900/20 border border-cyan-500/20 rounded-lg text-xs text-blue-300">
              <Clock size={12} />
              Deadline: {REGISTRATION_DEADLINE.toLocaleDateString()} at{" "}
              {REGISTRATION_DEADLINE.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Select Event
              </label>
              <div className="relative">
                <Ticket
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <select
                  required
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white appearance-none focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                >
                  <option value="" disabled>
                    Choose an event...
                  </option>
                  {EVENTS_DATA.map((event) => (
                    <option
                      key={event.id}
                      value={event.id}
                      className="bg-black text-white"
                    >
                      {event.title}
                      {event.isClosed ? " (Closed)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Per-event closed banner — shown inline if user picks a closed event
                before the full-page redirect kicks in (edge case: no eventId on load) */}
            {selectedEvent?.isClosed && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl register-fade-in">
                <Lock size={18} className="text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">
                  Registration for{" "}
                  <span className="font-bold text-white">
                    {selectedEvent.title}
                  </span>{" "}
                  is closed. Please select a different event.
                </p>
              </div>
            )}

            {/* Participation Type Toggle */}
            {selectedEvent && selectedEvent.participationMode === "both" && (
              <div className="p-1 bg-white/5 rounded-xl flex border border-white/10">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      registrationType: "solo",
                    }))
                  }
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    formData.registrationType === "solo"
                      ? "bg-cyan-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Solo Participation
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      registrationType: "team",
                    }))
                  }
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    formData.registrationType === "team"
                      ? "bg-cyan-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Team Participation
                </button>
              </div>
            )}

            {/* Leader / Individual Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  {formData.registrationType === "team"
                    ? "Team Leader Name"
                    : "Full Name"}
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <Smartphone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    required
                    type="tel"
                    name="phone"
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="9876543210"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@example.com"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Team Member Section */}
            {selectedEvent && formData.registrationType === "team" && (
              <div className="register-fade-in space-y-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Users size={18} className="text-blue-500" /> Team Details
                  </h3>
                  <span className="text-xs text-gray-500">
                    Size: {selectedEvent.minMembers} -{" "}
                    {selectedEvent.maxMembers} Members
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Team Name
                  </label>
                  <input
                    required
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    placeholder="e.g. Code Warriors"
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-400">
                    Team Members
                  </label>
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={member}
                        onChange={(e) =>
                          handleMemberNameChange(index, e.target.value)
                        }
                        placeholder={`Member ${index + 2} Name`}
                        className="flex-1 bg-black/50 border border-white/10 rounded-xl py-2 px-4 text-white focus:outline-none focus:border-cyan-500/50 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-blue-500 rounded-xl transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  {formData.teamMembers.length <
                    selectedEvent.maxMembers - 1 && (
                    <button
                      type="button"
                      onClick={addTeamMember}
                      className="w-full py-2 border border-dashed border-white/20 text-gray-400 rounded-xl hover:border-cyan-500/50 hover:text-blue-400 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <UserPlus size={16} /> Add Team Member
                    </button>
                  )}

                  {formData.teamMembers.length + 1 <
                    selectedEvent.minMembers && (
                    <p className="text-xs text-blue-400 mt-1">
                      * Minimum {selectedEvent.minMembers} members required (You
                      + {selectedEvent.minMembers - 1} others).
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Payment Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-8 hover:border-cyan-500/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-blue-500" />
                Payment Method
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, paymentMode: "online" }))
                  }
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    formData.paymentMode === "online"
                      ? "bg-cyan-500/10 border-cyan-500 text-blue-500"
                      : "bg-black/50 border-white/5 text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <QrCode size={24} className="mb-2" />
                  <span className="font-bold text-sm">Scan QR</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, paymentMode: "offline" }))
                  }
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    formData.paymentMode === "offline"
                      ? "bg-cyan-500/10 border-cyan-500 text-blue-500"
                      : "bg-black/50 border-white/5 text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <Ticket size={24} className="mb-2" />
                  <span className="font-bold text-sm">Offline Desk</span>
                </button>
              </div>

              {formData.paymentMode === "online" ? (
                <div className="space-y-6 register-fade-in">
                  <div className="flex flex-col items-center p-6 bg-white/5 rounded-xl border border-dashed border-white/20 hover:border-cyan-500/30 transition-colors">
                    <div className="w-48 h-48 bg-white p-2 rounded-lg mb-4">
                      <img
                        src={paymentQR}
                        alt="Payment QR"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-400 text-center">
                      Scan to pay{" "}
                      <span className="text-white font-bold">
                        ₹{currentPrice}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      UPI ID: 9051583344-2@ybl
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Upload Payment Screenshot
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/30 ${
                        formError && !formData.paymentProof
                          ? "border-red-500/60 hover:border-red-500"
                          : "border-white/20 hover:border-cyan-500/50"
                      }`}
                    >
                      {formData.paymentProof ? (
                        <div className="flex items-center gap-2 text-blue-400">
                          <CheckCircle size={20} />
                          <span className="truncate max-w-[200px]">
                            {fileName}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData((prev) => ({
                                ...prev,
                                paymentProof: null,
                              }));
                              setFileName("");
                            }}
                            className="p-1 hover:bg-white/10 rounded-full text-gray-400"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload size={24} className="text-gray-500 mb-2" />
                          <p className="text-sm text-gray-400">
                            Click to upload screenshot
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            JPG, PNG up to 5MB
                          </p>
                        </>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 register-fade-in">
                  <div className="p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-xl text-sm text-yellow-200">
                    <strong>Instructions:</strong> Please visit the Registration
                    Desk at the Main Auditorium Lobby. Pay in cash and collect
                    your receipt slip.
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Upload Desk Receipt Photo
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-black/30 ${
                        formError && !formData.paymentProof
                          ? "border-red-500/60 hover:border-red-500"
                          : "border-white/20 hover:border-cyan-500/50"
                      }`}
                    >
                      {formData.paymentProof ? (
                        <div className="flex items-center gap-2 text-blue-400">
                          <CheckCircle size={20} />
                          <span className="truncate max-w-[200px]">
                            {fileName}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData((prev) => ({
                                ...prev,
                                paymentProof: null,
                              }));
                              setFileName("");
                            }}
                            className="p-1 hover:bg-white/10 rounded-full text-gray-400"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload size={24} className="text-gray-500 mb-2" />
                          <p className="text-sm text-gray-400">
                            Click to upload receipt photo
                          </p>
                        </>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {formError && (
                <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                  <AlertCircle size={16} className="shrink-0" />
                  {formError}
                </div>
              )}
            </div>

            {/* Turnstile CAPTCHA */}
            <Turnstile
              ref={turnstileRef}
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => {
                setTurnstileToken(null);
                turnstileRef.current?.reset();
              }}
              onError={() => {
                setTurnstileToken(null);
                setTimeout(() => turnstileRef.current?.reset(), 2000);
              }}
              options={{
                theme: "dark",
                retry: "auto",
                retryInterval: 8000,
                refreshExpired: "auto",
              }}
            />

            {!turnstileToken && (
              <p className="text-xs text-yellow-400">
                Completing security check...
              </p>
            )}

            {formData.registrationType === "team" &&
              selectedEvent &&
              formData.teamMembers.length + 1 < selectedEvent.minMembers && (
                <p className="text-xs text-red-400">
                  Add at least {selectedEvent.minMembers - 1} team members
                </p>
              )}

            <button
              type="submit"
              disabled={
                isApplicationsLoading ||
                !formData.eventId ||
                !turnstileToken ||
                selectedEvent?.isClosed ||
                (formData.registrationType === "team" &&
                  selectedEvent &&
                  formData.teamMembers.length + 1 < selectedEvent.minMembers)
              }
              className={`w-full py-4 bg-cyan-600 text-white font-black uppercase tracking-wider rounded-xl hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed ${
                isApplicationsLoading ? "animate-pulse" : ""
              }`}
            >
              {isApplicationsLoading ? "Processing..." : "Confirm Registration"}
            </button>
          </form>
        </div>

        {/* Right Column: Event Summary */}
        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-400 mb-6 uppercase tracking-widest text-sm">
              Order Summary
            </h2>

            {selectedEvent ? (
              <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-cyan-500/30 transition-colors">
                <div className="h-48 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-6 z-20">
                    <span className="px-2 py-1 rounded bg-cyan-600 text-white text-xs font-bold mb-2 inline-block">
                      {selectedEvent.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedEvent.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-gray-300 pb-4 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} /> Date
                    </span>
                    <span className="font-medium text-white">
                      {selectedEvent.date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 pb-4 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <Clock size={16} /> Time
                    </span>
                    <span className="font-medium text-white">
                      {selectedEvent.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 pb-4 border-b border-white/10">
                    <span className="flex items-center gap-2">
                      <MapPin size={16} /> Venue
                    </span>
                    <span className="font-medium text-white">
                      {selectedEvent.venue}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex flex-col">
                      <span className="text-lg text-gray-400">
                        Total Amount
                      </span>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {formData.registrationType === "team"
                          ? selectedEvent.isTeamPriceFixed
                            ? "Fixed Team Fee"
                            : `${teamMemberCount} Members × ₹${selectedEvent.teamPrice}`
                          : "Solo Entry"}
                      </span>
                    </div>
                    <span className="text-3xl font-bold text-blue-500">
                      ₹{currentPrice}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-64 rounded-3xl border border-dashed border-white/20 flex items-center justify-center text-gray-500 bg-white/5">
                <p>Select an event to view details</p>
              </div>
            )}

            <div className="mt-8 p-4 bg-cyan-900/10 border border-cyan-500/20 rounded-xl flex gap-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg h-fit">
                <Zap size={20} className="text-blue-500" />
              </div>
              <div>
                <h4 className="font-bold text-blue-100 text-sm mb-1">
                  Instant Confirmation
                </h4>
                <p className="text-xs text-blue-200/60">
                  Your ticket will be sent to your email and mobile number
                  immediately after verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes registerFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes registerSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .register-fade-in  { animation: registerFadeIn  0.3s ease-out forwards; }
        .register-slide-in { animation: registerSlideIn 0.4s ease-out forwards; }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
