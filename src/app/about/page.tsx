"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Target, Heart, Users, Award, Rocket } from "lucide-react";

const timelineEvents = [
  {
    year: "20 August 2026",
    title: "InfiniT 2.0",
    desc: "The torch is passed, the power shifts, and a new vanguard of leaders rises to carry the infinite legacy forward.",
    color: "#E60000",
  },
  {
    year: "12 April 2026",
    title: "500+ Members Milestone",
    desc: "Cross-scaled our community to over 500 active student developers and creators, uniting a diverse talent pool across technology, design, and innovation.",
    color: "#FFD700",
  },
  {
    year: "6 Feburary 2026",
    title: "Sketch & Design Workshop",
    desc: "Hands-on creative masterclass conducted by our own team members, empowering the next cohort with real-world visual skill sets.",
    color: "#E60000",
  },
  {
    year: "16 October 2025",
    title: "Generative AI",
    desc: "An interactive session exploring cutting-edge AI models, custom prompt design, and practical workflows for integrating generative AI into real-world projects.",
    color: "#FFD700",
  },
  {
    year: "13 October 2025",
    title: "Websmith Workshop",
    desc: "An intensive full-stack workshop, training the team on core web frameworks, component architecture, and modern deployment pipelines.",
    color: "#E60000",
  },
  {
    year: "26 September 2025",
    title: "Foundation of InfiniT",
    desc: "InfiniT was established as the official IT Department Association, beginning with a core team of 28 passionate students.",
    color: "#FFD700",
  },
];

const values = [
  { icon: Target, label: "Purpose-Driven", desc: "Everything we do has a clear mission behind it." },
  { icon: Heart, label: "Student-First", desc: "Built by students, for students, always." },
  { icon: Rocket, label: "Innovation-Led", desc: "We embrace new ideas and bold experiments." },
  { icon: Award, label: "Excellence", desc: "We strive to be the best in everything we do." },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function TimelineItem({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 w-full items-start">

      {/* Left Column (1fr) */}
      <div className="flex justify-end w-full">
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300 w-full text-right shadow-xl"
          >
            <div className="font-[family-name:var(--font-inter)] font-black text-2xl" style={{ color: event.color }}>
              {event.year}
            </div>
            <h3 className="font-[family-name:var(--font-inter)] font-bold text-white text-lg mt-1">{event.title}</h3>
            <p className="font-[family-name:var(--font-roboto)] text-gray-400 text-sm mt-2 leading-relaxed">{event.desc}</p>
          </motion.div>
        )}
      </div>

      {/* Center Column (auto) */}
      <div className="flex flex-col items-center w-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 bg-[#050505]"
          style={{
            borderColor: event.color,
            boxShadow: `0 0 20px ${event.color}50`,
          }}
        >
          <div className="w-3 h-3 rounded-full" style={{ background: event.color }} />
        </motion.div>

        {index < timelineEvents.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-px min-h-[100px] h-full origin-top"
            style={{ background: `linear-gradient(to bottom, ${event.color}80, transparent)` }}
          />
        )}
      </div>

      {/* Right Column (1fr) */}
      <div className="flex justify-start w-full">
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300 w-full text-left shadow-xl"
          >
            <div className="font-[family-name:var(--font-inter)] font-black text-2xl" style={{ color: event.color }}>
              {event.year}
            </div>
            <h3 className="font-[family-name:var(--font-inter)] font-bold text-white text-lg mt-1">{event.title}</h3>
            <p className="font-[family-name:var(--font-roboto)] text-gray-400 text-sm mt-2 leading-relaxed">{event.desc}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full self-stretch overflow-hidden"
      style={{ width: "100%", alignSelf: "stretch" }}
    >
      {/* Hero */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "5rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E60000]/8 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[0.3em] text-[#E60000] uppercase">
            Our Story
          </span>
          <h1 className="font-[family-name:var(--font-inter)] font-black text-5xl sm:text-7xl mt-4 mb-6 text-white leading-tight">
            About <span className="gradient-text">InfiniT</span>
          </h1>
          <div className="flex justify-center gap-3 items-center mb-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#E60000]" />
            <BookOpen size={18} className="text-[#FFD700]" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#E60000]" />
          </div>
          <p className="font-[family-name:var(--font-roboto)] text-gray-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            InfiniT is more than an association — it's a movement. Born from the desire to bridge the gap
            between classroom learning and real-world technology, we've grown into a 500+ member community
            that shapes the future of IT at Info Institute of Engineering, Coimbatore.
          </p>
        </motion.div>
      </section>

      {/* Mission, Vision, Values */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
        <div className="w-full h-20 lg:h-12"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-[#E60000]/20 hover:border-[#FFD700]/50 relative overflow-hidden transition-all duration-300 shadow-xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E60000] to-transparent" />
            <div className="w-12 h-12 bg-[#E60000]/15 rounded-xl flex items-center justify-center mb-5">
              <Target size={24} className="text-[#E60000]" />
            </div>
            <h2 className="font-[family-name:var(--font-inter)] font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#E60000] to-[#FFD700] mb-3">Our Mission</h2>
            <p className="font-[family-name:var(--font-roboto)] text-gray-300 leading-relaxed">
              To Involve curious minds in boundless exploration,
              Inspire paradigm-shifting ideas,and Illuminate emerging possibilities
              through the convergence of technology, creativity, knowledge, and innovation.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-[#FFD700]/20 hover:border-[#FFD700]/50 relative overflow-hidden transition-all duration-300 shadow-xl"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700] to-transparent" />
            <div className="w-12 h-12 bg-[#FFD700]/15 rounded-xl flex items-center justify-center mb-5">
              <Rocket size={24} className="text-[#FFD700]" />
            </div>
            <h2 className="font-[family-name:var(--font-inter)] font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#E60000] mb-3">Our Vision</h2>
            <p className="font-[family-name:var(--font-roboto)] text-gray-300 leading-relaxed">
              To shape a future where technology, innovation, and leadership empower every student
              to reach their full potential and contribute to society.
            </p>
          </motion.div>
        </div>

        {/* --- ADDED PHYSICAL SPACER HERE --- */}
        <div className="w-full h-16 md:h-12 shrink-0"></div>

        {/* Values */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {values.map((v) => (
            <motion.div
              key={v.label}
              variants={cardVariant}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300 shadow-xl"
            >
              <v.icon size={28} className="text-[#FFD700] mx-auto mb-3" />
              <h4 className="font-[family-name:var(--font-inter)] font-bold text-white mb-2">{v.label}</h4>
              <p className="font-[family-name:var(--font-roboto)] text-gray-500 text-xs leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="relative w-full py-12 flex flex-col items-center">
        <div className="w-full h-20 lg:h-12"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: "3rem" }}
        >
          <span className="text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[0.3em] text-[#FFD700] uppercase">
            A Decade of Excellence
          </span>
          <h2 className="font-[family-name:var(--font-inter)] font-black text-4xl sm:text-5xl mt-3 text-white">
            Our <span className="gradient-text">Journey</span> 2025-26
          </h2>
        </motion.div>

        <div className="w-full max-w-4xl mx-auto px-4" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingTop: "2rem" }}>
          {timelineEvents.map((event, i) => (
            <TimelineItem key={event.year} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* Spacer between Timeline and Faculty Advisors */}
      <div style={{ height: "3rem" }} />

      {/* Faculty Advisors */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", paddingBottom: "5rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 border border-[#FFD700]/15 hover:border-[#FFD700]/40 text-center relative overflow-hidden transition-all duration-300 shadow-xl flex flex-col items-center"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
          <Users size={36} className="text-[#FFD700] mx-auto mb-4" />
          <h3 className="font-[family-name:var(--font-inter)] font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-3">
            Faculty Advisors
          </h3>
          <p className="font-[family-name:var(--font-roboto)] text-gray-400 max-w-lg mx-auto">
            Guided by the dedicated faculty of the IT Department, our advisors bring decades of
            academic and industry experience to mentor InfiniT.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {["Dr.K.Palani (HOD, IT)", "Mr.Arockia Selvaraj A", "Mr.Madheswaran K", "Mrs.Sundari P", "Mr.Raja M", "Ms.Jreeja J", "Mrs.Swarna S"].map((name) => (
              <div key={name} className="bg-white/5 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/10 hover:border-[#FFD700]/40 transition-colors duration-300">
                <p className="font-[family-name:var(--font-inter)] font-semibold text-white text-sm">{name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}