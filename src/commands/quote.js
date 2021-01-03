/* eslint-disable linebreak-style */
const orePrices = [
	['veldspar',4],
	['scordite',15],
	['pyroxeres',248],
	['plagioclase',18],
	['omber',32],
	['kernite',65],
	['jaspet',799],
	['hemorphite',461],
	['hedbergite',595],
	['spodumain',697],
	['darkochre',227],
	['gneiss',254],
	['crokite',1391],
	['bistot',1690],
	['arkonor',1170],
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