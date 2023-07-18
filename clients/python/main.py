import json
config = json.load(open("data/config.json"))

import discord
from discord.ext import commands
import os
import asyncio

# Prefix for your bot commands
bot_prefix = "py!"

intents = discord.Intents.default()
# intents.message_content = True
intents.messages = True

# Initialize the bot with the specified command prefix
bot = commands.Bot(intents=intents, command_prefix=commands.when_mentioned_or(bot_prefix), case_insensitive=True)

# Load all cogs
async def load_cogs():
    for filename in os.listdir("./clients/py/cogs"):
        if filename.endswith(".py"):
            cog_name = filename[:-3]
            try:
                await bot.load_extension(f"cogs.{cog_name}")
                print(f"Cog '{cog_name}' loaded successfully.")
            except Exception as e:
                print(f"Failed to load cog '{cog_name}': {e}")

    await bot.load_extension("jishaku")

# Event to execute when the bot is ready and connected to Discord
@bot.event
async def on_ready():
    print(f"Logged in as {bot.user.name} ({bot.user.id})")
    print("------")

    try:
        await load_cogs()
    except Exception as e: 
        print(f"Error loading cogs: {e}")

    # Load cogs after the bot is ready

# Run the bot with your Discord bot token
async def main():
    try:
        await bot.start(config['token'])
    except KeyboardInterrupt:
        await bot.close()

if __name__ == "__main__":
    # Run the bot asynchronously
    asyncio.run(main())
