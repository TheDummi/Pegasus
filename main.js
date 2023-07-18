import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

const clients = fs.readdirSync(path.resolve('./clients'));

for (const client of clients) {
	const runtime = spawn(client, [`./clients/${client}/main.${client == 'node' ? 'js' : 'py'}`]);

	runtime.on('spawn', () => console.log(`Spawned ${client}`));

	runtime.stdout.setEncoding('utf-8').on('data', console.info);
	runtime.stderr.setEncoding('utf-8').on('data', console.error);

	runtime.on('close', (code) => console.log(`Exited spawn with code ${code}.`));
}
