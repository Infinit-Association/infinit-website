"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, Trophy, Code, Cpu } from "lucide-react";
import { upcomingEvents, pastEvents, type Event, type PastEvent } from "@/data/events";

// ─── Icon mapping: derive icon + accent colour from event type ────────────────
function getEventMeta(type: Event["type"]) {
  switch (type) {
    case "Hackathon":
      return { icon: Code, color: "#E60000" };
    case "Workshop":
      return { icon: Cpu, color: "#FFD700" };
    case "Symposium":
    default:
      return { icon: Trophy, color: "#FFD700" };
  }
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-2">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 font-[family-name:var(--font-inter)] font-black text-xl text-white min-w-[3rem] text-center tabular-nums">
            {String(u.value).padStart(2, "0")}
          </div>
          <span className="text-[10px] text-gray-500 mt-1 font-[family-name:var(--font-roboto)] uppercase tracking-wider">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function FlipCard({ event }: { event: PastEvent }) {
  return (
    <div className="flip-card h-52" id={`past-event-${event.title.replace(/\s/g, "-").toLowerCase()}`}>
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#FFD700]/50 flex flex-col items-center justify-center p-6 text-center shadow-xl">
          <span className="text-xs font-[family-name:var(--font-inter)] font-semibold tracking-widest text-[#FFD700] uppercase mb-2">
            {event.type}
          </span>
          <h4 className="font-[family-name:var(--font-inter)] font-black text-xl text-white mb-1">{event.title}</h4>
          <span className="text-gray-500 text-sm font-[family-name:var(--font-roboto)]">{event.year}</span>
          <div className="mt-3 px-3 py-1 rounded-full bg-[#E60000]/15 border border-[#E60000]/30">
            <span className="text-[#E60000] text-xs font-semibold">{event.highlight}</span>
          </div>
          <div className="absolute bottom-3 text-xs text-gray-600">Hover to flip →</div>
        </div>
        {/* Back */}
        <div className="flip-card-back p-6 flex flex-col justify-center shadow-xl"
          style={{ background: "linear-gradient(135deg, rgba(230,0,0,0.15), rgba(5,5,5,0.95))", border: "1px solid rgba(230,0,0,0.3)" }}>
          <Trophy size={20} className="text-[#FFD700] mb-3" />
          <h4 className="font-[family-name:var(--font-inter)] font-bold text-white text-lg mb-2">{event.title}</h4>
          <p className="font-[family-name:var(--font-roboto)] text-gray-300 text-sm leading-relaxed">{event.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full self-stretch"
      style={{ width: "100%", alignSelf: "stretch" }}
    >
      {/* Header */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "1rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/4 to-transparent pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <span className="text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[0.3em] text-[#FFD700] uppercase">
            What's Happening
          </span>
          <h1 className="font-[family-name:var(--font-inter)] font-black text-5xl sm:text-7xl mt-4 mb-6 text-white">
            <span className="gradient-text">Events</span>
          </h1>
          <p className="font-[family-name:var(--font-roboto)] text-gray-400 max-w-xl mx-auto">
            From hackathons to symposiums, InfiniT's calendar is always packed with opportunities to learn, compete, and grow.
          </p>
        </motion.div>
      </section>

      {/* Upcoming Events */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "3rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>

        {/* THIS STAYS VISIBLE: The Heading */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-inter)] font-black text-3xl text-white mb-8 flex items-center gap-3"
        >
          <span className="w-1 h-8 bg-[#E60000] rounded-full" />
          Upcoming Events
          <span className="w-2 h-2 bg-[#E60000] rounded-full animate-pulse" />
        </motion.h2>

        {/* Change 'false' back to 'upcomingEvents.length > 0' when you want to show cards again */}
        {false ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {upcomingEvents.map((event) => {
              const meta = getEventMeta(event.type);
              return (
                <motion.div
                  key={event.id}
                  variants={cardVariant}
                  className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300 relative overflow-hidden group shadow-xl"
                  style={{ borderLeft: `5px solid ${meta.color}` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E60000]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6" style={{ paddingLeft: "1rem" }}>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-[family-name:var(--font-inter)] font-semibold tracking-wider uppercase"
                          style={{ background: `${meta.color}20`, color: meta.color, border: `1px solid ${meta.color}40` }}>
                          {event.type}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1 font-[family-name:var(--font-roboto)]">
                          <Calendar size={12} /> {new Date(event.date).toLocaleDateString("en-IN", { dateStyle: "long" })}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-inter)] font-black text-2xl sm:text-3xl text-white mb-1">{event.title}</h3>
                      <p className="text-[#FFD700] text-sm font-medium mb-3 font-[family-name:var(--font-inter)]">{event.subtitle}</p>
                      <p className="font-[family-name:var(--font-roboto)] text-gray-400 text-sm leading-relaxed max-w-lg">{event.description}</p>
                      <div className="flex items-center gap-2 mt-3 text-gray-500 text-xs">
                        <MapPin size={12} className="text-[#E60000]" /> {event.venue}
                      </div>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-5 flex-shrink-0">
                      <div>
                        <p className="text-xs text-gray-500 mb-2 font-[family-name:var(--font-roboto)] uppercase tracking-wider">Starts In</p>
                        <CountdownTimer targetDate={event.date} />
                      </div>
                      <a
                        href={event.googleFormLink}
                        id={`register-${event.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary py-3 px-8 rounded-xl text-sm inline-flex items-center gap-2 glow-red"
                      >
                        Register Now <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* This shows up when 'false' is active so the section doesn't look broken */
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 font-[family-name:var(--font-roboto)] py-12 px-6 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm text-center"
          >
            Stay tuned! We are brewing some exciting new events.
          </motion.div>
        )}
      </section>

      {/* Past Events */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "4rem 2rem", display: "flex", flexDirection: "column", justifyItems: "center", position: "relative" }}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-[family-name:var(--font-inter)] font-black text-3xl text-white mb-8 flex items-center gap-3"
        >
          <span className="w-1 h-8 bg-[#FFD700] rounded-full" />
          Past Events Archive
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {pastEvents.map((event) => (
            <motion.div
              key={event.title}
              variants={cardVariant}
            >
              <FlipCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}