const { MessageCommand, Discord } = require('xernerx');
const games = require('../../../../../data/tools/games.json');
const { presence } = require('../../../../../functions/Presence.js');

class SetCommand extends MessageCommand {
    constructor() {
        super('set', {
            name: 'set',
            description: 'set JavaScript code.',
            owner: true,
            category: "Developer",
            args: [{
                name: "option",
                type: "option",
                content: ["status"]
            }, {
                name: 'game',
                type: "string",
            }, {
                name: 'mode',
                type: "rest",
            }]
        })
    }

    async exec(message, args) {
        if (args.option == "status") {
            let game = this.game(args.game);

            if (!game) return;

            if (!args.mode) game.mode = "Idling";

            presence(game);

            let name = "";

            if (game.franchise !== "") name += `${game.franchise}: `;

            name += game.name;

            return await message.util.reply(`Set your status to ${name}, ${game.mode}`);
        }
    }

    game(query) {
        return games.find(game => game.name.toLowerCase() == query.toLowerCase() || game.abbreviation == query.toLowerCase());
    }
}

module.exports = SetCommand;