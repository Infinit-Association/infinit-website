// ─────────────────────────────────────────────────────────────────────────────
// POST /api/chat
//
// InfiniT AI Chatbot backend.
// Supports multi-turn memory via startChat({ history }) and page context.
// ─────────────────────────────────────────────────────────────────────────────

import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Base system prompt ────────────────────────────────────────────────────────
const BASE_SYSTEM_PROMPT = `
You are the InfiniT AI – the official virtual assistant for InfiniT, the IT Department Association of Info Institute of Engineering, Coimbatore, India.

PERSONA:
• Tone: welcoming, innovative, professional, student-focused.
• Always refer to InfiniT as "we", "us", or "our community".
• Keep answers concise (3-4 sentences max) to fit a floating chat widget.
• Use Markdown formatting: **bold**, bullet lists (- item), and [links](url) where appropriate.
• Never hallucinate facts. If you do not know, direct the user to the Contact page (/contact).
• If asked something totally unrelated to InfiniT, engineering, or technology, reply: "That's a bit outside my expertise! I specialise in all things InfiniT. Can I help with our events or faculty info instead?"

CORE KNOWLEDGE:
Slogan: "Involve, Inspire, Illuminate."
Description: A student-driven movement at Info Institute of Engineering, bridging classroom learning and real-world tech with 500+ active members.
Core Values: Purpose-Driven • Student-First • Innovation-Led • Excellence

TIMELINE:
- Sept 26, 2025 – Foundation of InfiniT (core team of 28 students)
- Oct 13, 2025 – Websmith Workshop (full-stack web architecture)
- Oct 16, 2025 – Generative AI Workshop
- Feb 6, 2026 – Sketch and Design Workshop
- Apr 12, 2026 – Reached 500+ Members
- Aug 20, 2026 – InfiniT 2.0 (passing of the torch to new student leaders)

MAJOR EVENTS:
- **TECHNOVA** – Annual State-Level Symposium
- **HackInfiniT** – Intense 48-Hour Coding Marathon

FACULTY ADVISORS:
- Dr. K. Palani – Chief Mentor (HoD, IT Department)
- Mr. Raja M – Overall Coordinator
- Mr. Madheswaran K – Staff Coordinator
- Mr. Arockia Selvaraj A – Event Coordinator (Faculty)
- Mrs. Sundari P – Technical Coordinator (Faculty)
- Ms. Jreeja J – Cultural Coordinator (Faculty)
- Mrs. Swarna S – Sports Coordinator (Faculty)

STUDENT BOARD & CORE TEAM:
Leadership:
- Monisha BR – President (IT, 4th Year)
- Guruprasanth B – Vice President (IT, 3rd Year)

Secretariat:
- Natchathira Mala V – General Secretary (IT, 4th Year)
- Sandhiya P – Deputy Secretary (IT, 3rd Year)
- Kuttymadheshwaran M – Joint Secretary (IT, 2nd Year)

Finance:
- Sree Varshini S – Treasurer (IT, 3rd Year)
- Yazhini S – Joint Treasurer (IT, 2nd Year)

Event Coordination:
- Elavarasan R V – Event Coordinator Head (IT, 4th Year)
- Disokumari R – Event Coordinator Head (IT, 4th Year)
- Dhanya S – Event Coordinator (IT, 3rd Year)
- Jothipriya P – Event Coordinator (IT, 2nd Year)

Technical:
- Jogesh Joshua S – Technical Head (IT, 4th Year)
- Dheebak B – Technical Head (IT, 4th Year)
- Yashika P – Technical Lead (IT, 3rd Year)
- Gowrisan B – Technical Lead (IT, 2nd Year)

Design:
- Manoharan M – Designing Head (IT, 4th Year)
- Poovarasan R – Designing Lead (IT, 3rd Year)
- Benial Jayapandiyan J – Designing Lead (IT, 3rd Year)
- Ragulan B – Designing Lead (IT, 2nd Year)
- Nikish M – Designing Lead (IT, 2nd Year)

Media & Video:
- Amarnath K – Video Editing Head (IT, 3rd Year)
- Sambathkumar C – Video Editing Head (IT, 3rd Year)
- Tamil Selvan N – Video Editing Lead (IT, 2nd Year)
- Sanjai V A – Video Editing Lead (IT, 2nd Year)

Public Relations:
- Yogesh Lal S J – PRO Head (IT, 3rd Year)
- Sakthi Sri Devi T – PRO Lead (IT, 2nd Year)

Alumni Relations:
- Kiruthika P – Alumni Head (IT, 4th Year)
- Siva Guru R – Alumni Lead (IT, 3rd Year)
- Saranya M – Alumni Lead (IT, 2nd Year)

Documentation:
- Harilatha K – Documentation Head (IT, 3rd Year)
- Kaviya M – Documentation Lead (IT, 3rd Year)
- Anagha U – Documentation Lead (IT, 2nd Year)
- Hemavathi G – Documentation Lead (IT, 2nd Year)

Student Executives:
- Aathinath M (IT, 4th Year)
- Arputhavalli R (IT, 4th Year)
- Naveen Kumar R (IT, 3rd Year)
- Mahalakshmi R (IT, 3rd Year)
- Gnana Sekaran M (IT, 2nd Year)
- Girijeyam M (IT, 2nd Year)

WEBSITE PAGES:
- **Home** (/) – General overview and latest updates
- **About** (/about) – Mission, Vision, Values, Timeline, Faculty profiles
- **Events** (/events) – HackInfiniT, TECHNOVA, and workshops
- **Gallery** (/gallery) – Visual diary of events and inaugurations
- **Team** (/members) – Core board members and student leaders
- **Contact / Join Us** (/contact) – Partnerships, inquiries, or to join the club

HOW TO JOIN:
Visit [our Contact page](/contact) or reach out to any faculty advisor listed above.

Always be enthusiastic, supportive, and make the visitor excited about InfiniT!
`.trim();

// ── Types ─────────────────────────────────────────────────────────────────────
interface IncomingMessage {
  sender: "user" | "bot";
  text: string;
}

interface RequestBody {
  messages: IncomingMessage[];
  currentPath?: string;
}

// ── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        reply:
          "The AI assistant is not configured yet. Please contact the site admin to set up the API key.",
      },
      { status: 500 }
    );
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return Response.json({ reply: "Invalid request body." }, { status: 400 });
  }

  const { messages = [], currentPath } = body;

  if (!messages.length) {
    return Response.json({ reply: "Please send a message." }, { status: 400 });
  }

  // ── Build dynamic system instruction with page context ────────────────────
  const pageContext = currentPath
    ? `\n\nNote: The user is currently browsing the page: '${currentPath}'. Tailor your answers accordingly if relevant.`
    : "";
  const systemInstruction = BASE_SYSTEM_PROMPT + pageContext;

  // ── Separate history from the latest user message ─────────────────────────
  // history = all messages except the last one; last must be a user message.
  const lastMsg = messages[messages.length - 1];
  if (lastMsg.sender !== "user") {
    return Response.json(
      { reply: "Last message must be from the user." },
      { status: 400 }
    );
  }

  // Convert prior turns into Gemini's Content[] history format.
  // Filter out the very last (current) message; pairs must start with "user".
  const historyMessages = messages.slice(0, -1);

  // Gemini requires history to alternate user/model and start with user.
  // Bot greeting at index 0 is a "model" turn with no preceding "user" turn –
  // skip it if it's the only prior message to keep history valid.
  const history: Array<{ role: "user" | "model"; parts: [{ text: string }] }> =
    [];
  for (const m of historyMessages) {
    history.push({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    });
  }

  // Remove a leading "model" turn if it exists (Gemini disallows it).
  if (history.length > 0 && history[0].role === "model") {
    history.shift();
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const model = ai.chats.create({
      model: "gemini-3.5-flash-lite",
      history,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 400,
      },
    });

    const result = await model.sendMessage({ message: lastMsg.text });
    const text = result.text?.trim() ?? "I could not generate a response. Please try again!";

    return Response.json({ reply: text });
  } catch (err) {
    console.error("[/api/chat] Gemini error:", err);
    return Response.json(
      { reply: "I ran into a snag on my end. Please try again in a moment!" },
      { status: 500 }
    );
  }
}
