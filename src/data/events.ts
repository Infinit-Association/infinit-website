// ─────────────────────────────────────────────────────────────────────────────
// Centralized static data for InfiniT events.
// This file acts as the local database replacing any server-side persistence.
// Add / remove events here; the API route and UI will reflect changes
// automatically — no deployment of a backend service required.
// ─────────────────────────────────────────────────────────────────────────────

export type EventType = "Symposium" | "Hackathon" | "Workshop";

export interface Event {
  id: number;
  title: string;
  subtitle: string;
  date: string; // ISO-8601 datetime string
  venue: string;
  type: EventType;
  description: string;
  googleFormLink: string;
}

export interface PastEvent {
  title: string;
  year: string;
  type: EventType;
  highlight: string;
  desc: string;
}

// ─── Upcoming Events ─────────────────────────────────────────────────────────
// Set `googleFormLink` to the real Google Form short URL when available.
// Placeholder format: https://forms.gle/<unique-id>

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "TECHNOVA 2025",
    subtitle: "Annual Inter-Collegiate Symposium",
    date: "2025-09-15T09:00:00",
    venue: "Seminar Hall, Info Institute of Engineering",
    type: "Symposium",
    description:
      "The biggest tech fest of the year featuring paper presentations, project expos, technical events, and cultural programs. Open to all engineering students.",
    googleFormLink: "https://forms.gle/TechNova2025Placeholder",
  },
  {
    id: 2,
    title: "HackInfiniT 3.0",
    subtitle: "48-Hour Hackathon",
    date: "2025-10-05T10:00:00",
    venue: "IT Department Labs",
    type: "Hackathon",
    description:
      "A non-stop 48-hour coding marathon to build innovative solutions. Form teams of 2–4, choose a problem statement, and code your way to glory.",
    googleFormLink: "https://forms.gle/HackInfiniT30Placeholder",
  },
  {
    id: 3,
    title: "AI/ML Bootcamp",
    subtitle: "3-Day Intensive Workshop",
    date: "2025-08-20T09:00:00",
    venue: "IT Seminar Hall",
    type: "Workshop",
    description:
      "An industry-led 3-day bootcamp covering Machine Learning fundamentals, Neural Networks, and hands-on model building using Python and TensorFlow.",
    googleFormLink: "https://forms.gle/AIMLBootcamp2025Placeholder",
  },
];

// ─── Past Events ──────────────────────────────────────────────────────────────

export const pastEvents: PastEvent[] = [
  {
    title: "Websmith Workshop",
    year: "2025",
    type: "Workshop",
    highlight: "100+ attendees",
    desc: "A workshop based on Web development in the modern era using HTML and CSS styling.",
  },
  {
    title: "Generative AI",
    year: "2025",
    type: "Workshop",
    highlight: "3rd and 4th Years",
    desc: "An informational seminar about the evolution and uses of AI in various different fields.",
  },
  {
    title: "Sketch & Design Workshop",
    year: "2026",
    type: "Workshop",
    highlight: "Hands-on Experience",
    desc: "A designing hands-on workshop using Figma taught by fellow members of the association.",
  },
];
