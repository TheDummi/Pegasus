import discord
import json
from discord.ext import commands
import asyncio
import os
import traceback
import sys

config = json.load(open("data/config/config.json"))

intents = discord.Intents.default()
intents.message_content = True
intents.guilds = True

client = commands.Bot(intents=intents, command_prefix=commands.when_mentioned_or("py"), case_insensitive=True)

@client.event
async def on_ready():
    sys.stdout.write(f'I am online! {client.user.name}')

async def load_extensions():
    for filename in os.listdir(os.path.dirname(os.path.abspath(__file__))+"/cogs"):
        try:
            if filename.endswith(".py"):
                await client.load_extension(f"cogs.{filename[:-3]}")
        except:
            traceback.print_exc()

    await client.load_extension('jishaku')

async def main():
    async with client:
        await load_extensions()
        await client.start(config['token'])

asyncio.run(main())