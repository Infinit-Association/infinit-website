// ─────────────────────────────────────────────────────────────────────────────
// GET /api/events
//
// Returns the full list of upcoming and past events as JSON.
// Static data — no database required. Optimized for Vercel Edge Network:
// the response is marked as immutable and cached for 1 hour (3600 s).
// ─────────────────────────────────────────────────────────────────────────────

import { upcomingEvents, pastEvents } from "@/data/events";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(
    { upcomingEvents, pastEvents },
    {
      headers: {
        // Cache on CDN for 1 hour; browser can reuse for 5 minutes.
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
      },
    }
  );
}
