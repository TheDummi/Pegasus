import XernerxClient from 'xernerx';
import XernerxCommands from 'xernerx-commands';

import config from '../../data/config.json' assert { type: 'json' };

new (class Client extends XernerxClient {
	constructor() {
		super(
			{ intents: ['Guilds', 'GuildMessages', 'MessageContent'] },
			{
				local: '784094726432489522',
				log: {
					ready: true,
					info: true,
					error: true,
				},
			}
		);

		this.modules.commandHandler.loadMessageCommands({
			directory: './clients/node/commands/message',
			prefix: 'js!',
			allowMention: true,
		});

		this.modules.extensionHandler.loadExtensions(new XernerxCommands(this));

		this.connect(config.token);
	}
})();
