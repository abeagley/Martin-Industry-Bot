/* eslint-disable linebreak-style */
const orePrices = [
	['veldspar',4],
	['scordite',18],
	['pyroxeres',270],
	['plagioclase',22],
	['omber',35],
	['kernite',81],
	['jaspet',825],
	['hemorphite',422],
	['hedbergite',658],
	['spodumain',802],
	['darkochre',228],
	['gneiss',306],
	['crokite',1310],
	['bistot',1811],
	['arkonor',1199],
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