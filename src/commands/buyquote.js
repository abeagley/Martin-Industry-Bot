let buyPrices = require('../prices/pilotBuyPrices');

let quoteTotal = [];

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}

module.exports = async (message, args) => {
	if (args.length < 2) {return message.reply('No Values Input :pensive: Try \'!quote veldspar 1000 scordite 1000...\'');}
	else {
		for (let i = 0; i < args.length; i++) {
			for (let j = 0; j < buyPrices.length; j++) {
				if (args[i] === buyPrices[j][0]) {
					quoteTotal.push(args[i+1] * buyPrices[j][1]);
				}
				console.log(quoteTotal);
			}  
		}
		const quoteOutput = quoteTotal.reduce((a,b) => a+b,0);
	

	
		await message.reply(formatMoney(quoteOutput));
    
	}
	quoteTotal = [];
};