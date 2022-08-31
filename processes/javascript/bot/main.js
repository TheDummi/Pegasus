const { Client, Discord } = require('xernerx');
const { token, guildId } = require('../../../data/config/config.json');

const client = new Client({
    intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.GuildPresences],
    global: false,
    guildId: guildId,
    logging: ["runType", "name"],
    prefix: ["js"],
    ownerId: ["482513687417061376"]
})

client.modules.commandHandler.loadAllInteractionCommands(__dirname + "/commands/interaction", true);
client.modules.commandHandler.loadAllMessageCommands(__dirname + "/commands/message", true);

client.modules.eventHandler.loadAllEvents(__dirname + "/events", true);

client.login(token);
