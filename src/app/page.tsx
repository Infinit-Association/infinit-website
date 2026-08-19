"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Zap, Users, Lightbulb, ChevronDown, Star, Trophy, Code2, Cpu, Globe, Shield } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

const HeroCanvas = dynamic(() => import("@/components/home/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-20 h-20 border-2 border-[#E60000]/50 border-t-[#FFD700] rounded-full animate-spin" />
    </div>
  ),
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.21, 1.11, 0.81, 0.99] as [number, number, number, number] },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cards = [
  {
    icon: Zap,
    title: "Innovate",
    desc: "We push boundaries with cutting-edge tech projects, hackathons, and research initiatives that shape the future of IT.",
    color: "#E60000",
    gradient: "from-[#E60000]/10 to-transparent",
  },
  {
    icon: Users,
    title: "Collaborate",
    desc: "Bringing together the brightest minds in IT, fostering teamwork, peer learning, and cross-disciplinary partnerships.",
    color: "#FFD700",
    gradient: "from-[#FFD700]/10 to-transparent",
  },
  {
    icon: Lightbulb,
    title: "Elevate",
    desc: "Empowering students to grow beyond the curriculum through workshops, speaker sessions, and industry mentorship.",
    color: "#CC6600",
    gradient: "from-[#CC6600]/10 to-transparent",
  },
];

const achievements = [
  "🏆 Best IT Association – 2025",
  "💻 Websmith Champions",
  "🌐 500+ Active Members",
  "🎓 15+ Industry Workshops",
  "🚀 10+ Live Projects",
  "⭐ National Symposium Hosts",
  "🔬 AI Research Cell",
  "📱 Web Development Club",
  "🌟 Generative-AI Champions ",
];

const stats = [
  { label: "Active Members", value: "500+", icon: Users },
  { label: "Events Hosted", value: "15+", icon: Star },
  { label: "Projects Built", value: "10+", icon: Code2 },
  { label: "Awards Won", value: "25+", icon: Trophy },
];

const features = [
  { icon: Cpu, title: "Tech Symposiums", desc: "Annual state-level technical fest drawing talent from across Tamil Nadu" },
  { icon: Code2, title: "Hackathons", desc: "48-hour coding marathons to build real-world solutions" },
  { icon: Globe, title: "Industry Connect", desc: "Direct pipelines to top IT companies for internships and placements" },
  { icon: Shield, title: "Research Cell", desc: "AI & ML research group publishing cutting-edge projects" },
];

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);

  // Check if they've already seen the intro this session so it doesn't replay annoyingly
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  // Function to end the intro and reveal the site
  const finishIntro = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
  };

  return (
    <>
      {/* ─── Full Screen Intro Video Overlay ─── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
          >
            <video
              autoPlay
              muted
              playsInline
              onEnded={finishIntro}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Optional Skip Button for returning users */}
            <button
              onClick={finishIntro}
              className="absolute bottom-10 right-10 z-[101] text-white/50 hover:text-white font-[family-name:var(--font-inter)] tracking-[0.2em] text-xs uppercase transition-colors"
            >
              Skip Intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Main Website Content (Revealed after video) ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative overflow-hidden w-full"
      >
        {/* ─── Hero Section ─── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center">
          {/* Background gradient blobs */}
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#E60000]/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#FFD700]/6 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 w-[92%] mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
            {/* Left: Text */}
            <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-[family-name:var(--font-inter)] font-medium tracking-widest text-[#FFD700] uppercase self-center lg:self-start border border-[#FFD700]/20"
              >
                <span className="w-2 h-2 bg-[#E60000] rounded-full animate-pulse" />
                IT Department Association
              </motion.div>

              <motion.h1
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-[family-name:var(--font-inter)] font-black text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
              >
                Where{" "}
                <span className="gradient-text">Tech</span>
                <br />
                Meets{" "}
                <span className="relative inline-block">
                  <span className="text-[#FFD700]">Passion</span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6">
                    <path d="M0,3 Q50,0 100,3 Q150,6 200,3" stroke="#E60000" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </motion.h1>

              <motion.p
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-[family-name:var(--font-roboto)] text-gray-400 text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
              >
                InfiniT is the official IT Department Association of Info Institute of Engineering,
                Coimbatore. We build, innovate, and inspire the next generation of technologists.
              </motion.p>

              <motion.div
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Link href="/events" className="btn-primary text-sm py-3 px-8 rounded-lg">
                  Explore Events →
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4"
              >
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col items-center lg:items-start">
                    <span className="font-[family-name:var(--font-inter)] font-black text-2xl gradient-text">{s.value}</span>
                    <span className="text-xs text-gray-500 font-[family-name:var(--font-roboto)]">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <div className="w-full h-[80vh] min-h-[600px] relative pointer-events-auto flex justify-center items-center">
                <Suspense fallback={
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="w-16 h-16 border-2 border-[#E60000]/50 border-t-[#FFD700] rounded-full animate-spin" />
                  </div>
                }>
                  <HeroCanvas />
                </Suspense>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-xs font-[family-name:var(--font-roboto)] tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={20} className="text-[#E60000]" />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Achievements Marquee ─── */}
        <section className="py-8 overflow-hidden border-y border-white/5 bg-[#E60000]/5">
          <div className="relative">
            <div className="marquee-track flex gap-8 items-center whitespace-nowrap">
              {[...achievements, ...achievements].map((item, i) => (
                <span
                  key={i}
                  className="font-[family-name:var(--font-inter)] text-sm font-semibold text-white/80 tracking-wide flex items-center gap-3"
                >
                  {item}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] flex-shrink-0" />
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Physical Spacer Block to guarantee the gap */}
        <div className="w-full h-24 lg:h-14"></div>

        {/* ─── Mission Cards ─── */}
        <section className="relative w-auto mx-auto pb-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-[100px]"
          >
            <span className="text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[0.3em] text-[#E60000] uppercase">
              Our Mission
            </span>
            <h2 className="font-[family-name:var(--font-inter)] font-black text-4xl sm:text-5xl mt-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              What We Stand For
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#E60000] to-[#FFD700] mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="w-full h-20 lg:h-12"></div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between w-full gap-6"
          >
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
                whileHover={{ y: -8 }}
                className={`w-full md:w-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-[#FFD700]/50 relative overflow-hidden group transition-all duration-300 cursor-default shadow-xl`}
              >
                {/* Gradient BG */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                {/* Glow dot */}
                <div
                  className="absolute top-4 right-4 w-3 h-3 rounded-full opacity-60"
                  style={{ background: card.color, boxShadow: `0 0 12px ${card.color}` }}
                />

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: `${card.color}20`, border: `1px solid ${card.color}40` }}
                  >
                    <card.icon size={26} style={{ color: card.color }} />
                  </div>
                  <h3
                    className="font-[family-name:var(--font-inter)] font-bold text-2xl mb-3"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </h3>
                  <p className="font-[family-name:var(--font-roboto)] text-gray-400 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom border accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── Features Grid ─── */}
        <div className="w-full h-24 lg:h-14"></div>

        <section className="relative w-auto mx-auto py-20 flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#E60000]/3 to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[0.3em] text-[#FFD700] uppercase">
              What We Do
            </span>
            <h2 className="font-[family-name:var(--font-inter)] font-black text-4xl sm:text-5xl mt-3 text-white">
              Our Flagship <span className="gradient-text">Initiatives</span>
            </h2>
          </motion.div>

          <div className="w-full h-20 lg:h-12"></div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row justify-between w-full gap-5"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="w-full lg:w-[23.5%] bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300 group shadow-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center mb-4 group-hover:bg-[#FFD700]/15 transition-colors">
                  <f.icon size={22} className="text-[#FFD700]" />
                </div>
                <h4 className="font-[family-name:var(--font-inter)] font-bold text-white text-lg mb-2">
                  {f.title}
                </h4>
                <p className="font-[family-name:var(--font-roboto)] text-gray-500 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ─── CTA Banner ─── */}
        <div className="w-full h-24 lg:h-14"></div>

        <section className="relative w-auto mx-auto pb-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-12 text-center overflow-hidden border border-[#FFD700]/15 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#E60000]/10 via-transparent to-[#FFD700]/10 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />

            <div className="relative z-10">
              <span className="text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[0.3em] text-[#FFD700] uppercase">
                Be Part of Something Bigger
              </span>
              <h2 className="font-[family-name:var(--font-inter)] font-black text-3xl sm:text-5xl mt-4 text-white leading-tight">
                Ready to <span className="gradient-text">Involve.</span>
                <br />
                <span className="text-[#FFD700]">Inspire.</span>{" "}
                <span className="text-white/60">Illuminate.</span>
              </h2>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </>
  );
}