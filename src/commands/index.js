// Require Commands
// Channel IDs
// Commands
const buyquote = require('./buyquote.js'), sellquote = require('./sellquote.js'), ore = require('./ore.js'),
	pis = require('./pi.js'), order = require('./order.js'), nsfw = require('./nsfw.js'),
	topore = require('./topore.js'), priceupdate1 = require('./priceupdate1.js'),
	priceupdate2 = require('./priceupdate2.js'), priceupdate3 = require('./priceupdate3.js'),
	priceupdate4 = require('./priceupdate4.js'), priceupdate5 = require('./priceupdate5.js'),
	sellprices = require('./sellprices'), buyprices = require('./buyprices'), oretwo = require('./oretwo'),
	closeconnection = require('./closeconnection'), bal = require('./bal.js'), addbal = require('./addbal'), pricelist = require('./pricelist'),
	warn = require('./warn'), guildID = '612667368744812563', commands = {
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
		warn,
		pricelist,
		oretwo
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