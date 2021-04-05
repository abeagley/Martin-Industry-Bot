// Require Commands
const buyquote = require('./buyquote.js');
const sellquote = require('./sellquote.js');
const ore = require('./ore.js');
const pis = require('./pi.js');
const order = require('./order.js');
const nsfw = require('./nsfw.js');
const topore = require('./topore.js');
const priceupdate1 = require('./priceupdate1.js');
const priceupdate2 = require('./priceupdate2.js');
const priceupdate3 = require('./priceupdate3.js');
const sellprices = require('./sellprices');
const buyprices = require('./buyprices');

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
	priceupdate1,
	priceupdate2,
	priceupdate3,
	sellprices,
	buyprices
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