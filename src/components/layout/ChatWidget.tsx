"use client";

// ── Web Speech API global declarations ────────────────────────────────────────
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
  }
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }
  interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
  }
  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }
  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
  }
}

import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Minimize2, Trash2, Mic, MicOff } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import RobotMascotFab from "@/components/ui/RobotMascotFab";

// ── Constants ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = "infinit_chat_history";

const GREETING_MESSAGE: Message = {
  id: "greeting",
  sender: "bot",
  text: "Hi there! I am the InfiniT AI. I know everything about our events, history, and faculty. How can I help?",
};

const QUICK_REPLIES = [
  "What are the upcoming events?",
  "Who are the faculty advisors?",
  "How do I join InfiniT?",
];

// ── Types ─────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

// ── Markdown renderer components ──────────────────────────────────────────────
const markdownComponents: Components = {
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        color: "#FFD700",
        textDecoration: "underline",
        fontWeight: 600,
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "#FFD700")
      }
    >
      {children}
    </a>
  ),
  p: ({ children }) => (
    <p style={{ margin: "0 0 6px 0", lineHeight: 1.55 }}>{children}</p>
  ),
  ul: ({ children }) => (
    <ul style={{ paddingLeft: 16, margin: "4px 0 6px 0", lineHeight: 1.6 }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol style={{ paddingLeft: 16, margin: "4px 0 6px 0", lineHeight: 1.6 }}>
      {children}
    </ol>
  ),
  li: ({ children }) => <li style={{ marginBottom: 2 }}>{children}</li>,
  strong: ({ children }) => (
    <strong style={{ color: "#FFD700", fontWeight: 700 }}>{children}</strong>
  ),
  code: ({ children }) => (
    <code
      style={{
        background: "rgba(255,255,255,0.1)",
        borderRadius: 4,
        padding: "1px 5px",
        fontSize: "0.9em",
        fontFamily: "Fira Code, monospace",
      }}
    >
      {children}
    </code>
  ),
};

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "10px 14px",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#E60000",
            display: "inline-block",
            animation: `chatBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────
function Bubble({ message }: { message: Message }) {
  const isUser = message.sender === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 8,
      }}
    >
      <div
        style={{
          maxWidth: "82%",
          padding: "10px 14px",
          borderRadius: isUser
            ? "18px 18px 4px 18px"
            : "18px 18px 18px 4px",
          background: isUser
            ? "linear-gradient(135deg, #E60000, #CC0000)"
            : "rgba(255,255,255,0.07)",
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.1)",
          color: "#f0f0f0",
          fontSize: 13.5,
          boxShadow: isUser
            ? "0 2px 12px rgba(230,0,0,0.25)"
            : "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {isUser ? (
          <span
            style={{
              lineHeight: 1.55,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {message.text}
          </span>
        ) : (
          <ReactMarkdown components={markdownComponents}>
            {message.text}
          </ReactMarkdown>
        )}
      </div>
    </motion.div>
  );
}

// ── Main widget ───────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const pathname = usePathname();

  // Chat state
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showChips, setShowChips] = useState(true);

  // Voice state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Speech API init ─────────────────────────────────────────────────────────
  useEffect(() => {
    const SpeechAPI =
      typeof window !== "undefined"
        ? window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null
        : null;

    if (!SpeechAPI) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = "";
      for (let i = event.results.length - 1; i >= 0; i--) {
        transcript = event.results[i][0].transcript;
        break;
      }
      setInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, []);

  const toggleListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setInput("");
      recognition.start();
      setIsListening(true);
    }
  }, [isListening]);

  // ── Load from localStorage on mount ────────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed) && parsed.length > 1) {
          setMessages(parsed);
          setShowChips(false);
        }
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  // ── Persist to localStorage on every update ─────────────────────────────────
  useEffect(() => {
    if (messages.length > 1) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch {
        // ignore storage errors
      }
    }
  }, [messages]);

  // ── Auto-scroll ─────────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Focus input when panel opens ────────────────────────────────────────────
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // ── Clear history ───────────────────────────────────────────────────────────
  const handleClear = useCallback(() => {
    setMessages([GREETING_MESSAGE]);
    setShowChips(true);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // ── Send message ────────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      // Stop listening if active
      if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
      }

      setShowChips(false);
      setInput("");

      const userMsg: Message = {
        id: Date.now().toString(),
        sender: "user",
        text: trimmed,
      };

      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({
              sender: m.sender,
              text: m.text,
            })),
            currentPath: pathname,
          }),
        });

        const data = (await res.json()) as { reply?: string };
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text:
              data.reply ?? "Hmm, I did not get a response. Try again!",
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Something went wrong on my end. Please try again in a moment!",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, pathname, isListening]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // ── Icon button helper ──────────────────────────────────────────────────────
  const iconBtnStyle = (accent?: boolean): React.CSSProperties => ({
    background: accent ? "rgba(230,0,0,0.12)" : "rgba(255,255,255,0.08)",
    border: "none",
    borderRadius: 8,
    width: 30,
    height: 30,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: accent ? "#E60000" : "rgba(255,255,255,0.6)",
    transition: "background 0.2s",
    flexShrink: 0,
  });

  return (
    <>
      {/* ── Keyframes ──────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(230,0,0,0.5), 0 4px 20px rgba(230,0,0,0.35); }
          50% { box-shadow: 0 0 0 12px rgba(230,0,0,0), 0 4px 20px rgba(230,0,0,0.35); }
        }
        @keyframes micPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(230,0,0,0.7); }
          60% { box-shadow: 0 0 0 8px rgba(230,0,0,0); }
        }
      `}</style>

      {/* ── FAB – Holographic trigger ───────────────────────────────────────── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            id="chat-fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            onClick={() => setOpen(true)}
            aria-label="Open InfiniT AI Chat"
            style={{
              position: "fixed",
              bottom: 28,
              right: 28,
              zIndex: 9999,
              width: 64,
              height: 64,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 38% 30%, rgba(30,30,60,0.95), rgba(8,8,18,0.98))",
              border: "1.5px solid rgba(230,0,0,0.5)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              overflow: "hidden",
              animation: "fabPulse 2.5s ease-in-out infinite",
            }}
          >
            <RobotMascotFab size={64} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat panel ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="chat-panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            style={{
              position: "fixed",
              bottom: 28,
              right: 28,
              zIndex: 9999,
              width: 370,
              height: 560,
              borderRadius: 20,
              background: "rgba(10,10,10,0.92)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(230,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div
              style={{
                padding: "14px 16px",
                background:
                  "linear-gradient(135deg, rgba(230,0,0,0.18), rgba(180,0,0,0.08))",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexShrink: 0,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #E60000, #CC0000)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 0 12px rgba(230,0,0,0.4)",
                  overflow: "hidden",
                }}
              >
                <RobotMascotFab size={38} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#fff",
                    letterSpacing: "0.02em",
                  }}
                >
                  InfiniT AI
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: "rgba(255,255,255,0.5)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "inline-block",
                    }}
                  />
                  Online • Always here to help
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: "flex", gap: 6 }}>
                {/* Clear history */}
                <button
                  id="chat-clear"
                  aria-label="Clear chat history"
                  onClick={handleClear}
                  title="Clear chat"
                  style={iconBtnStyle()}
                  onMouseEnter={(e) =>
                    ((
                      e.currentTarget as HTMLButtonElement
                    ).style.background = "rgba(255,215,0,0.12)")
                  }
                  onMouseLeave={(e) =>
                    ((
                      e.currentTarget as HTMLButtonElement
                    ).style.background = "rgba(255,255,255,0.08)")
                  }
                >
                  <Trash2 size={14} color="rgba(255,215,0,0.75)" />
                </button>
                {/* Minimize */}
                <button
                  aria-label="Minimize chat"
                  onClick={() => setOpen(false)}
                  style={iconBtnStyle()}
                  onMouseEnter={(e) =>
                    ((
                      e.currentTarget as HTMLButtonElement
                    ).style.background = "rgba(255,255,255,0.14)")
                  }
                  onMouseLeave={(e) =>
                    ((
                      e.currentTarget as HTMLButtonElement
                    ).style.background = "rgba(255,255,255,0.08)")
                  }
                >
                  <Minimize2 size={14} />
                </button>
                {/* Close */}
                <button
                  aria-label="Close chat"
                  onClick={() => setOpen(false)}
                  style={iconBtnStyle(true)}
                  onMouseEnter={(e) =>
                    ((
                      e.currentTarget as HTMLButtonElement
                    ).style.background = "rgba(230,0,0,0.22)")
                  }
                  onMouseLeave={(e) =>
                    ((
                      e.currentTarget as HTMLButtonElement
                    ).style.background = "rgba(230,0,0,0.12)")
                  }
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── Messages ───────────────────────────────────────────────── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "14px 14px 6px",
                scrollbarWidth: "thin",
                scrollbarColor: "#E60000 transparent",
              }}
            >
              {messages.map((m) => (
                <Bubble key={m.id} message={m} />
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "18px 18px 18px 4px",
                    }}
                  >
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              {/* Quick-reply chips */}
              <AnimatePresence>
                {showChips && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginTop: 8,
                    }}
                  >
                    {QUICK_REPLIES.map((chip) => (
                      <button
                        key={chip}
                        onClick={() => sendMessage(chip)}
                        style={{
                          background: "rgba(230,0,0,0.1)",
                          border: "1px solid rgba(230,0,0,0.3)",
                          borderRadius: 20,
                          padding: "5px 12px",
                          fontSize: 12,
                          color: "#FFD700",
                          cursor: "pointer",
                          fontFamily: "Inter, sans-serif",
                          transition: "all 0.2s",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "rgba(255,215,0,0.12)";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = "#FFD700";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "rgba(230,0,0,0.1)";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = "rgba(230,0,0,0.3)";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.color = "#FFD700";
                        }}
                      >
                        {chip}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* ── Listening banner ────────────────────────────────────────── */}
            <AnimatePresence>
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 30 }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    overflow: "hidden",
                    background: "rgba(230,0,0,0.12)",
                    borderTop: "1px solid rgba(230,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    fontSize: 11.5,
                    color: "#E60000",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#E60000",
                      display: "inline-block",
                      animation: "micPulse 1s ease-in-out infinite",
                    }}
                  />
                  Listening…
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input row ──────────────────────────────────────────────── */}
            <div
              style={{
                padding: "10px 12px 14px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                gap: 6,
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <input
                id="chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isListening
                    ? "Listening…"
                    : "Ask me anything about InfiniT…"
                }
                disabled={loading}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${isListening ? "rgba(230,0,0,0.5)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 12,
                  padding: "9px 14px",
                  color: "#f0f0f0",
                  fontSize: 13.5,
                  fontFamily: "Inter, sans-serif",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) =>
                  ((e.currentTarget as HTMLInputElement).style.borderColor =
                    "rgba(230,0,0,0.5)")
                }
                onBlur={(e) => {
                  if (!isListening)
                    (
                      e.currentTarget as HTMLInputElement
                    ).style.borderColor = "rgba(255,255,255,0.1)";
                }}
              />

              {/* Mic button */}
              {speechSupported ? (
                <button
                  id="chat-mic"
                  onClick={toggleListening}
                  aria-label={isListening ? "Stop listening" : "Start voice input"}
                  title={isListening ? "Stop" : "Speak"}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: isListening
                      ? "rgba(230,0,0,0.2)"
                      : "rgba(255,255,255,0.06)",
                    border: isListening
                      ? "1px solid rgba(230,0,0,0.5)"
                      : "1px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s",
                    animation: isListening
                      ? "micPulse 1s ease-in-out infinite"
                      : "none",
                  }}
                >
                  {isListening ? (
                    <MicOff size={16} color="#E60000" />
                  ) : (
                    <Mic size={16} color="rgba(255,255,255,0.5)" />
                  )}
                </button>
              ) : null}

              {/* Send button */}
              <button
                id="chat-send"
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background:
                    input.trim() && !loading
                      ? "linear-gradient(135deg, #E60000, #CC0000)"
                      : "rgba(255,255,255,0.06)",
                  border: "none",
                  cursor:
                    input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                  boxShadow:
                    input.trim() && !loading
                      ? "0 2px 10px rgba(230,0,0,0.35)"
                      : "none",
                }}
              >
                <Send
                  size={16}
                  color={
                    input.trim() && !loading
                      ? "#fff"
                      : "rgba(255,255,255,0.3)"
                  }
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
