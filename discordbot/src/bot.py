"""
================================================================
 fusion.exe Discord Bot  —  Python Edition
 Stack: discord.py 2.x  +  aiohttp (HTTP trigger server)

 What this does:
   1. Runs a Discord bot (discord.py)
   2. Runs a small async HTTP server (aiohttp) on port 20485
   3. When your Next.js website POSTs to /create-ticket,
      the bot automatically creates a private order channel
      in your Discord server.

 Hosted at: de3.bot-hosting.net:20485
================================================================
"""

import asyncio
import os
import logging
from datetime import datetime, timezone

import discord
from discord.ext import commands
from aiohttp import web
from dotenv import load_dotenv

# ── Load .env ────────────────────────────────────────────────
load_dotenv()

# ── Config — paste your values in .env, NOT here ────────────
BOT_TOKEN          = os.getenv("BOT_TOKEN")           # Bot token
GUILD_ID           = int(os.getenv("GUILD_ID", "0"))  # Your server ID
ORDERS_CATEGORY_ID = int(os.getenv("ORDERS_CATEGORY_ID", "0"))  # Category ID (0 = auto-create)
STAFF_ROLE_ID      = int(os.getenv("STAFF_ROLE_ID", "0"))       # Staff role ID
PORT               = int(os.getenv("PORT", "20485"))  # bot-hosting.net port
HOST               = "0.0.0.0"                        # MUST be 0.0.0.0, not localhost
API_SECRET         = os.getenv("API_SECRET", "")      # Shared secret with website

# ── Logging ──────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("fusion.exe")

# ── Startup validation ───────────────────────────────────────
if not BOT_TOKEN:
    raise RuntimeError("BOT_TOKEN is not set in .env — please add it.")
if GUILD_ID == 0:
    raise RuntimeError("GUILD_ID is not set in .env — please add it.")


# ════════════════════════════════════════════════════════════
#  Discord Bot
# ════════════════════════════════════════════════════════════

intents = discord.Intents.default()
intents.guilds = True
intents.members = True   # needed to fetch members by ID

bot = commands.Bot(command_prefix="!", intents=intents)


@bot.event
async def on_ready():
    log.info(f"✅  Logged in as {bot.user} (ID: {bot.user.id})")
    log.info(f"📡  HTTP trigger server will start on {HOST}:{PORT}")


# ── Button interaction handler ───────────────────────────────
@bot.event
async def on_interaction(interaction: discord.Interaction):
    if interaction.type != discord.InteractionType.component:
        return

    custom_id: str = interaction.data.get("custom_id", "")

    # ── Accept Order ──
    if custom_id.startswith("accept_order_"):
        await interaction.response.defer()

        # Update embed colour to green
        original = interaction.message
        if original.embeds:
            embed = original.embeds[0]
            embed.colour = discord.Colour.green()
            embed.set_footer(
                text=f"✅ Accepted by {interaction.user} — {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}"
            )

            # Rebuild buttons — disable Accept, keep Close
            accept_btn = discord.ui.Button(
                label="✅ Order Accepted",
                style=discord.ButtonStyle.success,
                custom_id="accepted_disabled",
                disabled=True,
            )
            close_btn = discord.ui.Button(
                label="🔒 Close Ticket",
                style=discord.ButtonStyle.danger,
                custom_id=f"close_ticket_{interaction.channel.id}",
            )
            view = discord.ui.View()
            view.add_item(accept_btn)
            view.add_item(close_btn)

            await original.edit(embeds=[embed], view=view)

        await interaction.channel.send(
            f"✅ **Order accepted** by {interaction.user.mention}!\n"
            "> The customer has been noted. Begin communication in this channel."
        )

    # ── Close Ticket ──
    elif custom_id.startswith("close_ticket_"):
        await interaction.response.defer()
        await interaction.channel.send(
            f"🔒 **Ticket closing in 5 seconds...** Closed by {interaction.user.mention}"
        )
        await asyncio.sleep(5)
        try:
            await interaction.channel.delete(reason="Ticket closed by staff")
        except discord.HTTPException as e:
            log.error(f"Failed to delete channel: {e}")


# ── Core: create private ticket channel ─────────────────────
async def create_ticket_channel(order: dict) -> discord.TextChannel:
    """
    Creates a private text channel for a new order.
    Channel is placed under the 'Orders' category and is only
    visible to staff + the customer (by Discord ID).
    """
    guild = bot.get_guild(GUILD_ID)
    if guild is None:
        guild = await bot.fetch_guild(GUILD_ID)
    if guild is None:
        raise ValueError(f"Guild {GUILD_ID} not found. Is the bot in your server?")

    # ── Find or create the Orders category ──
    category: discord.CategoryChannel | None = None

    if ORDERS_CATEGORY_ID != 0:
        category = guild.get_channel(ORDERS_CATEGORY_ID)
        if category is None:
            log.warning("ORDERS_CATEGORY_ID not found — creating a new 'Orders' category.")

    if category is None:
        # Auto-create a hidden-by-default category
        category = await guild.create_category(
            name="Orders",
            overwrites={
                guild.default_role: discord.PermissionOverwrite(view_channel=False)
            },
        )
        log.info(f"📁  Created 'Orders' category: {category.id}")

    # ── Channel name: order-username ──
    raw_name = order.get("username", "unknown")
    safe_name = (
        raw_name.lower()
        .replace(" ", "-")
        .replace("_", "-")
    )
    # Keep only alphanumeric and hyphens, max 20 chars
    safe_name = "".join(c for c in safe_name if c.isalnum() or c == "-")[:20]
    channel_name = f"order-{safe_name}"

    # ── Permission overwrites ──
    overwrites: dict = {
        guild.default_role: discord.PermissionOverwrite(view_channel=False),
    }

    # Staff role
    if STAFF_ROLE_ID != 0:
        staff_role = guild.get_role(STAFF_ROLE_ID)
        if staff_role:
            overwrites[staff_role] = discord.PermissionOverwrite(
                view_channel=True,
                send_messages=True,
                read_message_history=True,
                manage_messages=True,
            )
        else:
            log.warning(f"Staff role {STAFF_ROLE_ID} not found in guild.")

    # Customer (by Discord ID)
    discord_id_str = order.get("discordId", "").strip()
    member: discord.Member | None = None
    if discord_id_str.isdigit():
        try:
            member = await guild.fetch_member(int(discord_id_str))
            overwrites[member] = discord.PermissionOverwrite(
                view_channel=True,
                send_messages=True,
                read_message_history=True,
            )
        except discord.NotFound:
            log.warning(
                f"Member {discord_id_str} not found in guild — "
                "they may not have joined the server yet."
            )

    # ── Create the channel ──
    channel = await guild.create_text_channel(
        name=channel_name,
        category=category,
        topic=f"Order ticket for {order.get('username')} | {order.get('botType')}",
        overwrites=overwrites,
    )
    log.info(f"✅  Created ticket channel: #{channel_name} ({channel.id})")

    # ── Build the order embed ──
    embed = discord.Embed(
        title="📦 New Bot Order Received",
        description=(
            "A new order has been submitted via the website.\n"
            "Please review and click **Accept Order** to begin."
        ),
        colour=0x22D3EE,
        timestamp=datetime.now(timezone.utc),
    )
    embed.add_field(name="👤 Username",         value=order.get("username") or "N/A",         inline=True)
    embed.add_field(name="🏷️ Discord Username", value=order.get("discordUsername") or "N/A", inline=True)
    embed.add_field(
        name="🆔 Discord ID",
        value=f"<@{discord_id_str}> (`{discord_id_str}`)" if discord_id_str else "N/A",
        inline=False,
    )
    embed.add_field(name="🤖 Bot Type",         value=order.get("botType") or "N/A",  inline=True)
    embed.add_field(name="💰 Budget",           value=order.get("budget") or "N/A",   inline=True)
    embed.add_field(name="⏰ Deadline",          value=order.get("deadline") or "Not specified", inline=True)

    features = order.get("features") or "N/A"
    embed.add_field(name="⚙️ Features Requested", value=features[:1024], inline=False)

    notes = order.get("notes") or "None"
    embed.add_field(name="📝 Additional Notes", value=notes[:1024], inline=False)

    embed.set_footer(text="fusion.exe Order System")

    # ── Buttons ──
    accept_btn = discord.ui.Button(
        label="✅ Accept Order",
        style=discord.ButtonStyle.success,
        custom_id=f"accept_order_{channel.id}",
    )
    close_btn = discord.ui.Button(
        label="🔒 Close Ticket",
        style=discord.ButtonStyle.danger,
        custom_id=f"close_ticket_{channel.id}",
    )
    view = discord.ui.View(timeout=None)  # persistent — survives bot restarts
    view.add_item(accept_btn)
    view.add_item(close_btn)

    mention = f"<@{discord_id_str}>" if discord_id_str.isdigit() else ""
    await channel.send(
        content=f"🔔 **New Order Received!** {mention}",
        embed=embed,
        view=view,
    )

    return channel


# ════════════════════════════════════════════════════════════
#  aiohttp HTTP Server  (receives calls from Next.js website)
# ════════════════════════════════════════════════════════════

async def handle_health(request: web.Request) -> web.Response:
    """GET /health — lets you verify the bot + server are running."""
    return web.json_response({
        "status": "ok",
        "bot": "connected" if bot.is_ready() else "connecting",
        "guild": GUILD_ID,
    })


async def handle_create_ticket(request: web.Request) -> web.Response:
    """
    POST /create-ticket
    Called by the Next.js website when a new order is submitted.
    Body: JSON with username, discordUsername, discordId, botType,
          features, budget, deadline, notes
    """

    # ── Secret check ──
    if API_SECRET:
        provided = request.headers.get("x-api-secret", "")
        if provided != API_SECRET:
            log.warning("Rejected request: wrong API secret.")
            return web.json_response({"error": "Unauthorized"}, status=401)

    # ── Parse body ──
    try:
        order = await request.json()
    except Exception:
        return web.json_response({"error": "Invalid JSON body"}, status=400)

    # ── Validate required fields ──
    required = ["username", "botType"]
    for field in required:
        if not order.get(field, "").strip():
            return web.json_response(
                {"error": f"Missing required field: {field}"}, status=400
            )

    # ── Bot must be ready ──
    if not bot.is_ready():
        return web.json_response(
            {"error": "Bot is not ready yet. Try again in a moment."}, status=503
        )

    # ── Create the ticket ──
    try:
        channel = await create_ticket_channel(order)
        return web.json_response({
            "success": True,
            "channelId": str(channel.id),
            "channelName": channel.name,
            "message": f"Ticket channel created: #{channel.name}",
        })
    except Exception as e:
        log.exception("Failed to create ticket channel")
        return web.json_response({"error": str(e)}, status=500)


def build_app() -> web.Application:
    app = web.Application()
    app.router.add_get("/health", handle_health)
    app.router.add_post("/create-ticket", handle_create_ticket)
    return app


# ════════════════════════════════════════════════════════════
#  Entry point — run bot + HTTP server concurrently
# ════════════════════════════════════════════════════════════

async def main():
    # Start aiohttp server
    app = build_app()
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, HOST, PORT)
    await site.start()
    log.info(f"🌐  HTTP server listening on http://{HOST}:{PORT}")
    log.info(f"🔗  Reachable at http://de3.bot-hosting.net:{PORT}")

    # Start Discord bot
    async with bot:
        await bot.start(BOT_TOKEN)


if __name__ == "__main__":
    asyncio.run(main())
