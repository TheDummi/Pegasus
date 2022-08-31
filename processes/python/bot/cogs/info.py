import discord
from discord.ext import commands

class Info(commands.Cog):
    """optional description to show on the help command. Remove this line for no description."""

    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def ping(self, ctx):
        await ctx.reply('PONG!')

async def setup(bot):
    await bot.add_cog(Info(bot))