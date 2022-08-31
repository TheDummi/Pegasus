const express = require('express');
const { spawn } = require('child_process');
const server = express();
const fs = require('fs');
const { functions: { logStyle } } = require('xernerx');

server.get('/', (req, res) => {
    res.status(200).send('Success');
})

const processes = fs.readdirSync('./processes');

for (const process of processes) {
    const config = require(`./processes/${process}/config.json`);
    const runner = fs.readdirSync(`./processes/${process}/bot`).find(file => file.startsWith("main"));

    const run = spawn(config.process, [`./processes/${process}/bot/${runner}`]);

    run.name = runner;

    run
        .on('spawn', (spawn) => {
            console.info(`[spawn] ${run.name}`);
        })
        .on('error', (error) => {
            console.error(`[error] [${run.name}]`, error.message);
        })
        .on('close', (code) => {
            console.info(`[exit] [${run.name}]`, code);
        })

    run.stdout
        .setEncoding('utf-8')
        .on('data', (data) => {
            console.info(`${logStyle(`[success] [${run.name}]`, "text", "green")}\n${data.toString()}`);
        })

    run.stderr
        .setEncoding('utf-8')
        .on('data', (data) => {
            console.info(`${logStyle(`[error] [${run.name}]`, "text", "red")}`, data.toString());
        })

}

server.listen(5000);