"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ExternalLink, Terminal, X, ChevronRight, Star, Globe, Shield, Database, Cpu } from "lucide-react";

const projects = [
  {
    title: "MediTrack AI",
    desc: "An AI-powered patient record management system built for rural clinics in Tamil Nadu. Features NLP-based symptom analysis.",
    tech: ["Python", "FastAPI", "React", "TensorFlow"],
    github: "#",
    stars: 48,
    icon: Cpu,
    color: "#E60000",
  },
  {
    title: "CampusConnect",
    desc: "A mobile-first web app that connects students for carpooling, study groups, and project collaboration.",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind"],
    github: "#",
    stars: 92,
    icon: Globe,
    color: "#FFD700",
  },
  {
    title: "SmartAttend",
    desc: "RFID and facial recognition-based automated attendance system deployed across 5 departments in Info IE.",
    tech: ["OpenCV", "Python", "Raspberry Pi", "Flask"],
    github: "#",
    stars: 67,
    icon: Shield,
    color: "#E60000",
  },
  {
    title: "InfiniDB",
    desc: "A distributed key-value store implementation as part of the InfiniT Systems Programming course series.",
    tech: ["Go", "gRPC", "Redis", "Docker"],
    github: "#",
    stars: 34,
    icon: Database,
    color: "#FFD700",
  },
  {
    title: "CodeLens",
    desc: "VS Code extension for real-time code review suggestions using GPT-4. Built during HackInfiniT 2.0.",
    tech: ["TypeScript", "Node.js", "OpenAI API"],
    github: "#",
    stars: 115,
    icon: Code2,
    color: "#E60000",
  },
  {
    title: "EcoRoute",
    desc: "Green routing application that calculates the most eco-friendly transport path for daily commutes.",
    tech: ["React Native", "Google Maps API", "Python"],
    github: "#",
    stars: 56,
    icon: Globe,
    color: "#FFD700",
  },
];

const TERMINAL_COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  about     — About InfiniT",
    "  members   — List core team",
    "  events    — Upcoming events",
    "  projects  — Featured projects",
    "  stack     — Our tech stack",
    "  clear     — Clear terminal",
    "  whoami    — Who are you?",
  ],
  about: [
    "╔══════════════════════════════╗",
    "║   InfiniT – IT Association  ║",
    "║   Info Institute of Engg.   ║",
    "║   Coimbatore, Tamil Nadu    ║",
    "╚══════════════════════════════╝",
    "",
    "Mission: Involve. Inspire. Illuminate.",
    "Founded: 2015",
    "Members: 500+",
    "Status: ACTIVE ✓",
  ],
  members: [
    "Core Committee 2024-25:",
    "  [President]  Aravind Krishnan",
    "  [VP]         Priya Subramaniam",
    "  [Tech Lead]  Rohith Selvam",
    "  [Events]     Nithya Lakshmi",
    "  [Research]   Karthik Rajan",
    "  [Secretary]  Deepa Anand",
  ],
  events: [
    "Upcoming Events:",
    "  → TECHNOVA 2025 | Sep 15, 2025",
    "  → HackInfiniT 3.0 | Oct 05, 2025",
    "  → AI/ML Bootcamp | Aug 20, 2025",
    "",
    "Type 'cd /events' → visit Events page",
  ],
  projects: [
    "Top Projects:",
    "  ★ CodeLens       — 115 stars",
    "  ★ CampusConnect  — 92 stars",
    "  ★ SmartAttend    — 67 stars",
    "  ★ EcoRoute       — 56 stars",
    "  ★ MediTrack AI   — 48 stars",
  ],
  stack: [
    "InfiniT Tech Stack:",
    "  Frontend: React, Next.js, TypeScript",
    "  Backend:  Python, FastAPI, Go",
    "  ML:       TensorFlow, PyTorch",
    "  DevOps:   Docker, AWS, CI/CD",
    "  DB:       PostgreSQL, MongoDB, Redis",
  ],
  whoami: [
    "You are a curious visitor exploring InfiniT.",
    "",
    "Fun fact: You've just unlocked the",
    "Terminal Easter Egg! 🎉",
    "",
    "Share this with your friends:",
    "> infinit.infoioe.ac.in/projects",
  ],
  clear: [],
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; output: string[] }[]>([
    { cmd: "", output: ["Welcome to InfiniT Terminal v2.5.0", 'Type "help" to see available commands.', ""] },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const output = TERMINAL_COMMANDS[cmd] ?? [`Command not found: ${cmd}`, `Type "help" for available commands.`];
    if (cmd === "clear") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { cmd, output }]);
    }
    setInput("");
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        id="terminal-toggle"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#050505] border border-[#FFD700]/40 rounded-full flex items-center justify-center text-[#FFD700] shadow-lg shadow-[#FFD700]/10 hover:border-[#FFD700] hover:shadow-[#FFD700]/30 transition-all duration-300"
        title="Open Terminal"
      >
        <Terminal size={22} />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-[min(480px,calc(100vw-3rem))] h-80 rounded-2xl overflow-hidden border border-[#FFD700]/20 shadow-2xl shadow-black/60"
            style={{ background: "#0a0a0a" }}
          >
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8"
              style={{ background: "#111111" }}>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E60000]" />
                <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="font-[family-name:var(--font-code)] text-xs text-gray-500">infinit-terminal — bash</span>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={14} />
              </button>
            </div>

            {/* Output */}
            <div className="flex-1 overflow-y-auto p-4 h-[calc(100%-80px)] font-[family-name:var(--font-code)] text-sm">
              {history.map((entry, i) => (
                <div key={i} className="mb-1">
                  {entry.cmd && (
                    <div className="flex items-center gap-1 text-[#FFD700]">
                      <ChevronRight size={12} className="text-[#E60000]" />
                      <span className="text-[#E60000]">infinit</span>
                      <span className="text-gray-500">@</span>
                      <span className="text-[#FFD700]">terminal</span>
                      <span className="text-gray-500 mx-1">$</span>
                      <span className="text-white">{entry.cmd}</span>
                    </div>
                  )}
                  {entry.output.map((line, j) => (
                    <div key={j} className={`text-xs leading-relaxed ${line.startsWith("  ") ? "text-gray-400" : "text-green-400"}`}>
                      {line || "\u00A0"}
                    </div>
                  ))}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 px-4 py-2.5 border-t border-white/8">
              <ChevronRight size={12} className="text-[#E60000] flex-shrink-0" />
              <span className="font-[family-name:var(--font-code)] text-xs text-[#FFD700] flex-shrink-0">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent font-[family-name:var(--font-code)] text-sm text-white outline-none placeholder-gray-700"
                placeholder="type a command..."
                spellCheck={false}
                autoComplete="off"
                id="terminal-input"
              />
              <span className="cursor-blink text-[#FFD700] font-[family-name:var(--font-code)]">█</span>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full self-stretch"
      style={{ width: "100%", alignSelf: "stretch" }}
    >
      <TerminalEasterEgg />

      {/* Header */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "5rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#E60000]/5 to-transparent pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <span className="text-xs font-[family-name:var(--font-inter)] font-semibold tracking-[0.3em] text-[#E60000] uppercase">
            Student Innovations
          </span>
          <h1 className="font-[family-name:var(--font-inter)] font-black text-5xl sm:text-7xl mt-4 mb-6 text-white">
            Projects <span className="gradient-text">Hub</span>
          </h1>
          <p className="font-[family-name:var(--font-roboto)] text-gray-400 max-w-xl mx-auto">
            Real-world solutions built by InfiniT members. Open-source, impactful, and constantly evolving.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-sm font-[family-name:var(--font-code)]">
            <Terminal size={14} className="text-[#FFD700]" />
            <span>Psst — click the terminal button in the corner for a secret!</span>
          </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section style={{ width: "100%", maxWidth: "80rem", margin: "0 auto", padding: "3rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative" }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariant}
              whileHover={{ y: -8 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300 group flex flex-col shadow-xl"
              id={`project-${project.title.replace(/\s/g, "-").toLowerCase()}`}
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${project.color}15`, border: `1px solid ${project.color}40` }}
                >
                  <project.icon size={22} style={{ color: project.color }} />
                </div>
                <div className="flex items-center gap-1 text-[#FFD700] text-sm font-[family-name:var(--font-inter)]">
                  <Star size={13} fill="#FFD700" /> {project.stars}
                </div>
              </div>

              <h3 className="font-[family-name:var(--font-inter)] font-black text-xl text-white mb-2 group-hover:text-[#FFD700] transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-[family-name:var(--font-roboto)] text-gray-400 text-sm leading-relaxed flex-1">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-4 mb-5">
                {project.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md font-[family-name:var(--font-code)] text-xs bg-white/5 text-gray-300 border border-white/8">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                className="flex items-center gap-2 text-sm font-[family-name:var(--font-inter)] font-semibold text-gray-400 hover:text-[#FFD700] transition-colors duration-300 group/link"
              >
                <Code2 size={16} />
                View on GitHub
                <ExternalLink size={12} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Submit project CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white/5 backdrop-blur-lg rounded-3xl p-10 text-center border border-[#FFD700]/15 hover:border-[#FFD700]/40 relative overflow-hidden transition-all duration-300 shadow-xl"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
          <Code2 size={36} className="text-[#FFD700] mx-auto mb-4" />
          <h3 className="font-[family-name:var(--font-inter)] font-black text-3xl text-white mb-3">
            Got a project to showcase?
          </h3>
          <p className="font-[family-name:var(--font-roboto)] text-gray-400 max-w-lg mx-auto mb-6">
            InfiniT members can submit their open-source projects to be featured in the Projects Hub.
          </p>
          <a href="/contact" className="btn-primary py-3 px-10 rounded-xl inline-block">
            Submit Your Project →
          </a>
        </motion.div>
      </section>
    </motion.div>
  );
}
