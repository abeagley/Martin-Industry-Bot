/* eslint-disable linebreak-style */

// Require Commands
const buyquote = require('./buyquote.js');
const sellquote = require('./sellquote.js');
const ore = require('./ore.js');
const pis = require('./pi.js');
const order = require('./order.js');
const nsfw = require('./nsfw.js');
const topore = require('./topore.js');

// Channel IDs
const guildID = '612667368744812563';
const oreChannelID = '756565959073857679';
const piChannelID = '756565959073857679';
const orderChannelID = '757717773010075649';
const nsfwID = '809473664265355346';

// Commands
const commands = {
	buyquote,
	ore,
	pis,
	order,
	nsfw,
	topore,
	sellquote,
};
 
// Command Handler
module.exports = async (message) => {
	console.log(message);
	if (message.guild.id === guildID && message.channel.id === oreChannelID || piChannelID || orderChannelID || nsfwID) {
		const args = message.content.split(' ');
		if (args.length == 0 || args[0].charAt(0) !== '!') return;
		const command = args.shift().substr(1);
		if (Object.keys(commands).includes(command)) {
			commands[command](message, args);
		}
	}
};