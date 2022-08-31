const { Event, Discord } = require("xernerx");

class ErrorEvent extends Event {
    constructor() {
        super("error", {
            name: "error",
            type: "client",
            once: false,
        });
    }

    async run(interaction, error) {
        console.log(error)
    }
}

module.exports = ErrorEvent;