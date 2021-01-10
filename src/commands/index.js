/* eslint-disable linebreak-style */
const quote = require('./quote.js');
const ore = require('./ore.js');
const pis = require('./pi.js');
const order = require('./order.js');


const guildID = '612667368744812563';
const oreChannelID = '756565959073857679';
const piChannelID = '758978691509780481';
const orderChannelID = '757717773010075649';

const commands = {
	quote,
	ore,
	pis,
	order,
};
 
module.exports = async (message) => {
	console.log(message);
	if (message.guild.id === guildID && message.channel.id === oreChannelID || piChannelID || orderChannelID) {
		const args = message.content.split(' ');
		if (args.length == 0 || args[0].charAt(0) !== '!') return;
		const command = args.shift().substr(1);
		if (Object.keys(commands).includes(command)) {
			commands[command](message, args);
		}
	}
};