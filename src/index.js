//Discord
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

//Command Handler
const commandHandler = require('./commands');

//Runs on start
client.once('ready', () => {
	console.log('Ready!');
});

//Login
client.login(token);
