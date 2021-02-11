/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const Discord = require('discord.js');
const mongoose = require('mongoose');
const { prefix, token, MONGODB_URI } = require('./config.json');
const client = new Discord.Client();
const commandHandler = require('./commands');



client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', commandHandler);

client.login(process.env.token);
mongoose.connect(process.env.MONGODB_URI);

