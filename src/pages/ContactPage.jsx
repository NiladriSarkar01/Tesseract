import React, { useState } from "react";
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
} from "lucide-react";

const ContactPage = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [formStatus, setFormStatus] = useState("idle");

  // Demo Student Coordinators Data
  const coordinators = [
    {
      id: 1,
      name: "Arjun Mehta",
      role: "General Secretary",
      phone: "+91 98765 00001",
      email: "gs@techfest.com",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Sneha Roy",
      role: "Technical Head",
      phone: "+91 98765 00002",
      email: "tech.head@techfest.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Vikram Singh",
      role: "Public Relations",
      phone: "+91 98765 00003",
      email: "pr@techfest.com",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  // FAQ Data
  const faqs = [
    {
      question: "Can I participate in multiple events?",
      answer:
        "Yes! You can register for as many events as you like, provided their schedules do not clash.",
    },
    {
      question: "Is on-spot registration available?",
      answer:
        "On-spot registration is available for select events only. We highly recommend registering online to secure your slot.",
    },
    {
      question: "Is accommodation provided for outstation participants?",
      answer:
        "Yes, limited accommodation is available on a first-come, first-served basis. Please email support@techfest.com for details.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "Registration fees are non-refundable unless the event is cancelled by the organizers.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setFormStatus("loading");

    // Simulate network request
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 2000);
  };

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

      {/* General Info Grid */}
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
              support@techfest.com
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
            <p className="text-gray-400 text-sm mb-4">
              Student Council President
            </p>
            <a
              href="tel:+919876543210"
              className="text-blue-400 font-bold hover:underline"
            >
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>

      {/* Social Media Strip */}
      <div className="flex justify-center gap-4 mb-16">
        {[
          { Icon: Instagram, link: "#", label: "Instagram" },
          { Icon: Twitter, link: "#", label: "Twitter" },
          { Icon: Linkedin, link: "#", label: "LinkedIn" },
          { Icon: Facebook, link: "#", label: "Facebook" },
          { Icon: Globe, link: "#", label: "Website" },
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
                placeholder="Your Name"
                className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-all placeholder:text-gray-600"
              />
              <input
                required
                type="email"
                placeholder="Your Email"
                className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-all placeholder:text-gray-600"
              />
            </div>
            <input
              required
              type="text"
              placeholder="Subject"
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-all placeholder:text-gray-600"
            />
            <textarea
              required
              rows="6"
              placeholder="How can we help you?"
              className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/5 transition-all resize-none placeholder:text-gray-600"
            ></textarea>

            <button
              type="submit"
              disabled={formStatus !== "idle"}
              className={`w-full py-4 font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 ${
                formStatus === "success"
                  ? "bg-green-600 text-white hover:bg-green-500"
                  : "bg-cyan-600 text-white hover:bg-cyan-500 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {formStatus === "idle" && (
                <>
                  Send Message <ArrowRight size={18} />
                </>
              )}
              {formStatus === "loading" && (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              )}
              {formStatus === "success" && (
                <>
                  <Check size={18} /> Message Sent!
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT: Student Coordinators (Replaced) */}
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
            {coordinators.map((coordinator) => (
              <div
                key={coordinator.id}
                className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-cyan-500/50 transition-all duration-300 hover:bg-white/5"
              >
                {/* Image */}
                <div className="relative shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-500/50 transition-colors">
                  <img
                    src={coordinator.image}
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

                {/* Action Icon */}
                <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-white/5 items-center justify-center text-gray-500 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  <ExternalLink size={18} />
                </div>
              </div>
            ))}
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
          {faqs.map((faq, index) => (
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
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-150 rounded-3xl overflow-hidden border border-white/10 mb-8 grayscale invert hover:grayscale-0 hover:invert-0 transition-all duration-700">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4366.264079418856!2d88.3763245758745!3d22.695137528466944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89c6df041e831%3A0x6e3fc1531d1cb33!2sGuru%20Nanak%20Institute%20of%20Technology!5e1!3m2!1sen!2sin!4v1764837265156!5m2!1sen!2sin"
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
