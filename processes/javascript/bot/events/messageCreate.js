const { Event, Discord } = require("xernerx");
const { uptime } = require("../../../../functions/Utils");

class MessageCreateEvent extends Event {
    constructor() {
        super("messageCreate", {
            name: "messageCreate",
            type: "client",
            once: false,
        });
    }

    async run(message) {
        if (message.author.bot) return;

        let owner = await this.client.users.fetch(this.client.settings.ownerId[0])

        if (message.mentions.has(owner)) {
            let member = await message.guild.members.fetch(owner.id);
            let act = member.presence.activities.find(a => a.name == "Dummi")

            if (!act || act.details.includes("Dummi")) return;

            let embed = new Discord.EmbedBuilder()
                .setTitle(act.details)
                .setDescription(`${member} has been playing ${act.details} for \`${uptime(Date.now() - act.timestamps.start)}\`.`)
                .setTimestamp(act.timestamps.start)
                .setThumbnail(act.assets.largeImageURL())
                .setColor(this.client.color.FLAGS.cyan)

            let m = await message.util.reply({ embeds: [embed] });

            setTimeout(async () => {
                await m.delete();
            }, 5000);
        }
    }
}

module.exports = MessageCreateEvent;