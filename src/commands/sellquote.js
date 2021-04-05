
const mongo = require('../mongo');


//Set Prices
let quoteTotal = [];

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}

module.exports = async (message, args) => {
	await mongo().then( mongoose => {
		try {

			let sellPrices = require('../prices/pilotSellPrices');
			console.log(sellPrices);
			if (args.length < 2) {
				return message.reply('No Values Input :pensive: Try \'!quote veldspar 1000 scordite 1000...\'');
			} else {
				console.log("Starting Calc")
				for (let i = 0; i < args.length; i++) {
					for (let j = 0; j < sellPrices.length; j++) {
						if (args[i].toLowerCase() === sellPrices[j][0]) {
							quoteTotal.push(args[i + 1] * sellPrices[j][1]);

						}
						console.log(quoteTotal);
					}
				}
				const quoteOutput = quoteTotal.reduce((a, b) => a + b, 0);
				message.reply(formatMoney(quoteOutput));

			}

			quoteTotal = [];
		} finally {
			mongoose.connection.close();
		}
	})
};