import { NextRequest, NextResponse } from "next/server";

// ─── Type for order payload ───────────────────────────────────────────────────
interface OrderPayload {
  username: string;
  discordUsername: string;
  discordId: string;
  botType: string;
  features: string;
  budget: string;
  deadline: string;
  notes: string;
}

// ─── POST /api/order ──────────────────────────────────────────────────────────
// Flow: Website form → this API route → POST to your bot at de3.bot-hosting.net:20485
// The bot receives the order and creates a private ticket channel in Discord.
// No webhook needed — the bot handles everything directly.
export async function POST(req: NextRequest) {
  try {
    const body: OrderPayload = await req.json();

    // ── Validate required fields ──
    const required: (keyof OrderPayload)[] = [
      "username",
      "discordUsername",
      "discordId",
      "botType",
      "features",
      "budget",
    ];
    for (const field of required) {
      if (!body[field]?.trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // ── Send order directly to the bot's HTTP server ──
    //
    // BOT_API_URL is set in Vercel environment variables.
    // Your bot is hosted at: de3.bot-hosting.net:20485
    // So BOT_API_URL should be: http://de3.bot-hosting.net:20485
    //
    // The bot listens for POST /create-ticket and creates the Discord channel.
    const botApiUrl =
      process.env.BOT_API_URL || "http://de3.bot-hosting.net:20485";
    const botSecret = process.env.BOT_API_SECRET || "";

    let botRes: Response;
    try {
      botRes = await fetch(`${botApiUrl}/create-ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Shared secret so the bot rejects requests not coming from your site
          "x-api-secret": botSecret,
        },
        body: JSON.stringify(body),
        // 10 second timeout — bot-hosting.net can be a touch slow to respond
        signal: AbortSignal.timeout(10_000),
      });
    } catch (networkErr) {
      console.error("❌  Could not reach bot server:", networkErr);
      return NextResponse.json(
        {
          error:
            "Could not reach the bot server. Please try again or contact support on Discord.",
        },
        { status: 502 }
      );
    }

    if (!botRes.ok) {
      const errText = await botRes.text().catch(() => "unknown error");
      console.error(`❌  Bot returned ${botRes.status}:`, errText);
      return NextResponse.json(
        { error: `Bot error (${botRes.status}): ${errText}` },
        { status: 502 }
      );
    }

    const botData = await botRes.json().catch(() => ({}));
    console.log("✅  Ticket created:", botData);

    return NextResponse.json(
      {
        success: true,
        message:
          "Order submitted! A private ticket channel has been created in our Discord server. Join at discord.gg/Wej7Cd3XVW",
        ticket: botData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
