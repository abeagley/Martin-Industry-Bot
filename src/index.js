// Welcome to EE Industry Bot

// index.js runs through heroku
// commands/ holds all commands used by the bot
// command handler is in /commands/index.js
// database/ holds database requests / transformations
// models holds mongoDB schemas
// prices holds current corp buy ands sell prices

// discord for message handling
const Discord = require('discord.js');
// mongoose for database handling
const mongoose = require('mongoose');
const ffmpeg = require('ffmpeg');

// token and mongoDB_URI passwords are hosted on heroku
// see Procfile for heroku worker startup
const { prefix, token, MONGODB_URI } = require('./config.json');

// require mongo
const mongo = require('./mongo')

// connect to discord
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
// connect to command handler
const commandHandler = require('./commands');

client.once('ready', async () => {
	console.log('Ready!');
	await mongo().then(mongoose => {
		try {
			console.log("Connected to Mongo DB")
		}
		catch(e) {
			console.log(e)
		}
		finally {
			mongoose.connection.close()
			console.log("Connection to Mongo DB Closed")
		}
	})
});

client.on('message', commandHandler);
/*
const guildID = '612667368744812563';
const guild = client.guilds.cache.get(guildID);
let commands

if (guild) {
	commands = guild.commands
} else {
	commands = client.application?.commands
}

commands?.create({
	name: 'ping',
	description: 'Replies with pong.',
	})
*/

// login to discord bot
client.login(process.env.token);
// connect to database
/*
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('we\'re connected!');
});
 */

