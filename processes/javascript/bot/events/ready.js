const { Event, Discord } = require("xernerx");
const { presence } = require("../../../../functions/Presence.js");
const games = require('../../../../data/tools/games.json');

class ReadyEvent extends Event {
    constructor() {
        super("ready", {
            name: "ready",
            type: "client",
            once: false,
        });
    }

    async run() {
        presence(games[0])

        this.presence("Watching", "translations | /help", "", "Online");

        setInterval(() => {
            this.presence("Watching", "translations | /help", "", "Online");
        }, this.client.settings.cacheTime);
    }

    async presence(type, name, url, status) {
        if (this.client.settings.global) {
            this.client.user.setPresence({
                activities: [{
                    name: name,
                    type: Discord.ActivityType[type],
                    url: url
                }],
                status: status
            })
        }

        else {
            let owners = await Promise.all(this.client.settings.ownerId.map(async o => (await this.client.users.fetch(o)).tag))

            this.client.user.setPresence({
                activities: [{
                    name: `${owners[Math.floor(Math.random() * owners.length)]} develop me.`,
                    type: Discord.ActivityType.Streaming,
                    url: "https://www.youtube.com/watch?v=j-a8An12QDs"
                }]
            })
        }
    }
}

module.exports = ReadyEvent;