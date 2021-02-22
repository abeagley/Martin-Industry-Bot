/* eslint-disable linebreak-style */
const orePrices = [
	['veldspar',6],
	['scordite',15],
	['pyroxeres',254],
	['plagioclase',20],
	['omber',24],
	['kernite',82],
	['jaspet',822],
	['hemorphite',516],
	['hedbergite',605],
	['spodumain',792],
	['darkochre',233],
	['gneiss',284],
	['crokite',1584],
	['bistot',1773],
	['arkonor',1465],
	['mercoxit',0],
];

let quoteTotal = [];

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}

module.exports = async (message, args) => {
	if (args.length < 2) {return message.reply('No Values Input :pensive: Try \'!quote veldspar 1000 scordite 1000...\'');}
	else {
		for (let i = 0; i < args.length; i++) {
			for (let j = 0; j < orePrices.length; j++) {
				if (args[i] === orePrices[j][0]) {
					quoteTotal.push(args[i+1] * orePrices[j][1]);
                
				}
				console.log(quoteTotal);
			}  
		}
		const quoteOutput = quoteTotal.reduce((a,b) => a+b,0);
		await message.reply(formatMoney(quoteOutput));
    
	}
	quoteTotal = [];
};