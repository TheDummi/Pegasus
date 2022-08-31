const { clientId } = require('../data/config/config.json');
const { functions: { logStyle } } = require('xernerx');

const DiscordRPC = require('discord-rpc');

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

function setPresence(rpc, game) {
    if (!rpc) return;

    let name = "";

    if (game.franchise !== "") name += `${game.franchise}: `;

    name += game.name;

    rpc.setActivity({
        details: name,
        state: game.mode || "Idle",
        startTimestamp: game.start,
        largeImageKey: game.largeImage,
        largeImageText: game.largeText,
        smallImageKey: game.smallImage,
        smallImageText: game.smallText,
        instance: game.instance || false,
        buttons: [{ label: "Join my server", url: "https://discord.gg/tWFDYBj9ZC" }, { label: name, url: `https://google.com/search?q=${name}`.replace(/ /g, "%20") }]
    });
}

DiscordRPC.register(clientId);

function presence(game) {
    rpc.on('ready', () => {
        const now = Date.now()

        game.start = game.name == "Dummi" ? 1057446000000 : now;

        setPresence(rpc, game);

        return console.info(logStyle("Presence is active", "text", "cyan"));
    })

    rpc.login({ clientId });
}

module.exports = { presence }
