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
const priceupdate4 = require('./priceupdate4.js');
const priceupdate5 = require('./priceupdate5.js');
const sellprices = require('./sellprices');
const buyprices = require('./buyprices');
const closeconnection = require('./closeconnection');
const bal = require('./bal.js');
const addbal = require('./addbal');
const alert = require('./alert');


// Channel IDs
const guildID = '612667368744812563';

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
	priceupdate4,
	priceupdate5,
	sellprices,
	buyprices,
	closeconnection,
	bal,
	addbal,
	alert,
};
 
// Command Handler
module.exports = async (message) => {
	console.log(message);
	if (message.guild.id === guildID) {
		const args = message.content.split(' ');
		if (args.length == 0 || args[0].charAt(0) !== '!') return;
		const command = args.shift().substr(1);
		if (Object.keys(commands).includes(command)) {
			commands[command](message, args);
		}
	}
};