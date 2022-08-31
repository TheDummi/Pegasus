const { InteractionCommand } = require('xernerx');

class EchoCommand extends InteractionCommand {
    constructor() {
        super('echo', {
            name: 'echo',
            description: 'echo'
        })
    }
}

module.exports = EchoCommand;