const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const commandHandler = require('./commands');


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', commandHandler);

client.login(process.env.TOKEN);