import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Phone,
  MapPin,
  Mail,
  ScrollText,
  ArrowRight,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Globe,
  Plus,
  Minus,
  Loader2,
  Check,
  User,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Turnstile } from "@marsidev/react-turnstile";
import { useContactStore } from "../store/useContactStore";
import { random } from "../utils/Constants";
import { SOCIALS } from "../lib/data";

const ContactPage = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // State for Dynamic Data
  const [coordinators, setCoordinators] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [state, setState] = useState("idle");

  const {
    createContact,
    isContactsLoading,
    selectedContact,
    setSelectedContact,
  } = useContactStore();

  // State for Form Handling
  const [formStatus, setFormStatus] = useState("idle"); // idle, loading, success, error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Turnstile state + ref
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLE FORM SUBMISSION
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!turnstileToken) {
      setErrorMessage(
        "Security check not complete. Please wait a moment and try again.",
      );
      return;
    }

    setErrorMessage("");

    // Consume token immediately to prevent reuse
    const tokenToSubmit = turnstileToken;
    setTurnstileToken(null);

    const res = await createContact({
      ...formData,
      "cf-turnstile-response": tokenToSubmit,
    });

    if (res.success) {
      setState("success");
      setSelectedContact(res.data);
    } else {
      setState("fail");
      // Reset widget so a fresh token is ready if user tries again
      turnstileRef.current?.reset();
    }
  };

  if (state === "success") {
    return (
      <div className="container mx-auto px-4 min-h-[80vh] flex items-center justify-center animate-in zoom-in duration-500">
        <div className="bg-black/90 backdrop-blur-xl border border-cyan-500/30 p-8 md:p-12 rounded-3xl max-w-md w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
          <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Query Submitted!
          </h2>
          <p className="text-gray-400 mb-8">
            Your query have been submitted successfully.
          </p>
          <div className="bg-white/5 rounded-xl p-4 mb-8 text-sm text-left border border-white/10">
            <p className="text-gray-400 mb-1">Query ID</p>
            <p className="text-white font-mono">{selectedContact.QRP}</p>
          </div>
          <Link to={"/"}>
            <button className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  } else if (state === "fail") {
    return (
      <div className="container mx-auto px-4 min-h-[80vh] flex items-center justify-center animate-in zoom-in duration-500">
        <div className="bg-black/90 backdrop-blur-xl border border-red-500/30 p-8 md:p-12 rounded-3xl max-w-md w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={40} className="text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Query Submition Failed!
          </h2>
          <button
            onClick={() => {
              setState("idle");
              // Reset widget when user clicks Try Again so token is fresh
              turnstileRef.current?.reset();
            }}
            className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-red-500/30 transition-all"
          >
            Please Try Again.
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 container mx-auto px-6 py-24 animate-in slide-in-from-right duration-500">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="group flex items-center gap-2 text-gray-400 hover:text-blue-400 mb-8 transition-colors"
      >
        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
          <ChevronLeft size={20} />
        </div>
        <span className="font-medium">Back to Home</span>
      </button>

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/50 border border-cyan-500/20 backdrop-blur-md mb-6 text-pink-200 text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_10px_rgba(239,68,68,0.2)]">
          <Phone size={14} className="fill-cyan-500 text-blue-500" />
          Get In Touch
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
          CONTACT{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">
            US
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Have questions? Need help with registration? Reach out to our central
          team or find the specific student coordinator below.
        </p>
      </div>

      {/* General Info Grid - (Keep Static) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1: Location */}
        <div className="relative p-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-cyan-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-cyan-500/20">
              <MapPin size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Venue Location
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Guru Nanak Institute of Technology,
              <br />
              157/F, Nilgunj Rd, Panihati,
              <br />
              Kolkata, West Bengal - 700114
            </p>
          </div>
        </div>

        {/* Card 2: General Help */}
        <div className="relative p-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-cyan-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-cyan-500/20">
              <Mail size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              General Queries
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              For registration & payment issues
            </p>
            <a
              href="mailto:support@techfest.com"
              className="text-blue-400 font-bold hover:underline"
            >
              {SOCIALS.email}
            </a>
          </div>
        </div>

        {/* Card 3: Emergency */}
        <div className="relative p-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-cyan-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-cyan-500/20">
              <Phone size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Emergency Contact
            </h3>
            <a
              href="tel:+918337068883"
              className="text-blue-400 font-bold hover:underline"
            >
              +91 8337068883
            </a>
            <br />
            <a
              href="tel:+917439368801"
              className="text-blue-400 font-bold hover:underline"
            >
              +91 7439368801
            </a>
          </div>
        </div>
      </div>

      {/* Social Media Strip */}
      <div className="flex justify-center gap-4 mb-16">
        {[
          { Icon: Instagram, link: SOCIALS.instagram, label: "Instagram" },
          { Icon: Facebook, link: SOCIALS.facebook, label: "Facebook" },
          {
            Icon: Globe,
            link: "https://www.tesseract-gnit.online",
            label: "Website",
          },
        ].map((social, index) => (
          <a
            key={index}
            href={social.link}
            className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-cyan-600 hover:border-cyan-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-600/30"
            aria-label={social.label}
          >
            <social.Icon size={20} />
          </a>
        ))}
      </div>

      <div className="border-t border-white/10 my-12"></div>

      {/* Main Content Split: Form vs Student Coordinators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* LEFT: Quick Message Form */}
        <div>
          <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
            <ScrollText className="text-blue-500" /> Send a Message
          </h2>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-all placeholder:text-gray-600"
              />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-all placeholder:text-gray-600"
              />
            </div>
            <input
              required
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Subject"
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-all placeholder:text-gray-600"
            />
            <textarea
              required
              rows="6"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="How can we help you?"
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-all resize-none placeholder:text-gray-600"
            ></textarea>

            {/* Turnstile CAPTCHA — same pattern as RegisterPage */}
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

            {errorMessage && (
              <p className="text-red-400 text-sm text-center mt-2 flex items-center justify-center gap-2">
                <AlertCircle size={14} /> {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={
                isContactsLoading || !turnstileToken || formStatus === "success"
              }
              className={`w-full py-4 font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                formStatus === "success"
                  ? "bg-green-600 text-white hover:bg-green-500"
                  : formStatus === "error"
                    ? "bg-red-600 text-white hover:bg-red-500"
                    : "bg-cyan-600 text-white hover:bg-cyan-500 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isContactsLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : formStatus === "success" ? (
                <>
                  <Check size={18} /> Message Sent!
                </>
              ) : formStatus === "error" ? (
                <>
                  <AlertCircle size={18} /> Failed. Try Again.
                </>
              ) : (
                <>
                  {!turnstileToken ? "Verifying Security..." : "Send Message"}
                  {turnstileToken && <ArrowRight size={18} />}
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT: Student Coordinators */}
        <div className="flex flex-col gap-6">
          <div className="mb-2">
            <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
              <User className="text-blue-500" /> Student Coordinators
            </h2>
            <p className="text-gray-400">
              Reach out to our core team for any specific queries.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {isContactsLoading ? (
              <div className="text-gray-500 text-center py-10">
                Loading Coordinators...
              </div>
            ) : coordinators.length > 0 ? (
              coordinators.map((coordinator) => (
                <div
                  key={coordinator.id || coordinator._id}
                  className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-cyan-500/50 transition-all duration-300 hover:bg-white/5"
                >
                  {/* Image */}
                  <div className="relative shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-500/50 transition-colors">
                    <img
                      src={
                        coordinator.image || "https://via.placeholder.com/150"
                      }
                      alt={coordinator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">
                      {coordinator.name}
                    </h3>
                    <span className="inline-block px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-blue-400 text-xs font-bold uppercase tracking-wide mb-2">
                      {coordinator.role}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-400">
                      <a
                        href={`tel:${coordinator.phone}`}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <Phone size={14} className="text-gray-500" />{" "}
                        {coordinator.phone}
                      </a>
                      <a
                        href={`mailto:${coordinator.email}`}
                        className="flex items-center gap-1 hover:text-white transition-colors truncate"
                      >
                        <Mail size={14} className="text-gray-500" />{" "}
                        {coordinator.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">
                No coordinators info available.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Common questions about the event and registration process.
          </p>
        </div>

        <div className="space-y-4">
          {isContactsLoading ? (
            <div className="text-gray-500 text-center py-10">
              Loading FAQs...
            </div>
          ) : faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="font-bold text-lg text-white">
                    {faq.question}
                  </span>
                  {openFaqIndex === index ? (
                    <Minus size={20} className="text-blue-500 shrink-0" />
                  ) : (
                    <Plus size={20} className="text-gray-500 shrink-0" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center">
              No FAQs available at the moment.
            </div>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-150 rounded-3xl overflow-hidden border border-white/10 mb-8 grayscale invert hover:grayscale-0 hover:invert-0 transition-all duration-700">
        <iframe
          src="https://maps.google.com/maps?q=Guru+Nanak+Institute+of+Technology+Panihati&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Event Location"
        />
      </div>
    </div>
  );
};

export default ContactPage;
