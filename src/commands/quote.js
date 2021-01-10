/* eslint-disable linebreak-style */
const orePrices = [
	['veldspar',4],
	['scordite',14],
	['pyroxeres',246],
	['plagioclase',18],
	['omber',30],
	['kernite',64],
	['jaspet',752],
	['hemorphite',413],
	['hedbergite',553],
	['spodumain',676],
	['darkochre',225],
	['gneiss',243],
	['crokite',1310],
	['bistot',1555],
	['arkonor',1071],
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