"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaGithub, FaFacebookF } from "react-icons/fa6";

const socialLinks = [
  { icon: FaInstagram, href: "https://www.instagram.com/infinit.connect/", label: "Instagram", color: "#E60000" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn", color: "#FFD700" },
  { icon: FaGithub, href: "https://github.com/Infinit-Association", label: "GitHub", color: "#E60000" },
  { icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61593319225653", label: "Facebook", color: "#FFD700" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "associationofinfinit@gmail.com", href: "mailto:associationofinfinit@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 9659496318", href: "tel:+919659496318" },
  { icon: MapPin, label: "Address", value: "NH-209,Sathyamangalam Road,Kovilpalayam,Sarkar Samakulam,Coimbatore,Tamil Nadu 641107", href: "https://maps.app.goo.gl/Z8dPzJ3JXWA15yWH7" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function FormInput({
  id, label, type = "text", value, onChange, required
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type={type}
        value={value}
        placeholder=" "
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm font-[family-name:var(--font-roboto)] outline-none transition-all duration-300 ${focused ? "border-[#E60000] ring-2 ring-[#E60000]/20" : "border-white/10 hover:border-white/20"
          }`}
      />
      <label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-wider uppercase text-gray-500 font-[family-name:var(--font-roboto)] pl-1"
      >
        {label}
      </label>
    </div>
  );
}

function FormTextarea({
  id, label, value, onChange, required
}: {
  id: string; label: string; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1 flex-grow">
      <textarea
        id={id}
        value={value}
        placeholder=" "
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={10}
        className={`w-full flex-grow bg-white/5 border rounded-xl px-4 py-3 text-white text-sm font-[family-name:var(--font-roboto)] outline-none transition-all duration-300 resize-none ${focused ? "border-[#E60000] ring-2 ring-[#E60000]/20" : "border-white/10 hover:border-white/20"
          }`}
      />
      <label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-wider uppercase text-gray-500 font-[family-name:var(--font-roboto)] pl-1"
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "0319c444-9b46-404c-aae2-cd56ce3547c2",
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          from_name: "InfiniT Website Contact Form",
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("idle");
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("idle");
      alert("Network error. Please check your connection.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full self-stretch"
      style={{ width: "100%", alignSelf: "stretch" }}
    >
      {/* Header */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "1rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#E60000]/5 to-transparent pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <span className="text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[0.3em] text-[#E60000] uppercase">
            Get In Touch
          </span>
          <h1 className="font-[family-name:var(--font-inter)] font-black text-5xl sm:text-7xl mt-4 mb-6 text-white">
            <span className="gradient-text">Contact</span> Us
          </h1>
          <p className="font-[family-name:var(--font-roboto)] text-gray-400 max-w-xl mx-auto">
            Have a question, want to collaborate, or ready to join InfiniT? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "3rem 2rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-[#FFD700]/30 relative overflow-hidden transition-all duration-300 shadow-xl flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E60000] via-[#FFD700] to-[#E60000]" />

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-16 text-center"
              >
                <CheckCircle size={64} className="text-[#FFD700] mb-6" />
                <h3 className="font-[family-name:var(--font-inter)] font-black text-2xl text-white mb-3">Message Sent!</h3>
                <p className="font-[family-name:var(--font-roboto)] text-gray-400">
                  We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="mt-6 btn-primary py-2.5 px-8 rounded-xl text-sm"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
                <h2 className="font-[family-name:var(--font-inter)] font-black text-2xl text-white mb-2 text-center">
                  Send us a message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput id="name" label="Your Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                  <FormInput id="email" label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                </div>
                <FormInput id="subject" label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} required />
                <FormTextarea id="message" label="Your Message" value={form.message} onChange={(v) => setForm({ ...form, message: v })} required />

                <button
                  type="submit"
                  id="contact-submit"
                  disabled={status === "loading"}
                  className="btn-primary py-3.5 rounded-xl flex items-center justify-center gap-2 mt-auto disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Info Cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              {contactInfo.map((info) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  variants={cardVariant}
                  whileHover={{ x: 4 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300 flex items-start gap-4 shadow-xl"
                >
                  <div className="w-11 h-11 bg-[#E60000]/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon size={20} className="text-[#E60000]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-[family-name:var(--font-inter)] font-semibold uppercase tracking-wider mb-1">
                      {info.label}
                    </p>
                    <p className="font-[family-name:var(--font-roboto)] text-white text-sm">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Socials */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10 hover:border-[#FFD700]/30 transition-all duration-300 shadow-xl">
              <p className="text-xs text-gray-500 font-[family-name:var(--font-inter)] font-semibold uppercase tracking-wider mb-4 text-center">
                Follow Us
              </p>
              <div className="flex gap-3 justify-center">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    whileHover={{ y: -4, scale: 1.15 }}
                    style={{ borderColor: `${s.color}30` }}
                    className="w-12 h-12 rounded-xl border flex items-center justify-center text-gray-400 hover:text-[#FFD700] transition-colors duration-300 bg-white/5 hover:border-[#FFD700]/40"
                    aria-label={s.label}
                  >
                    <s.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Dark Map */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 h-52 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.8028280860117!2d77.03642177452143!3d11.128057652610462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f9be09f83881%3A0x20dd70b69c2b1b20!2sINFO%20Institute%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1786080775721!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.5) brightness(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Info Institute of Engineering Map"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}