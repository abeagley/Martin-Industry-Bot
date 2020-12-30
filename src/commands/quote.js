/* eslint-disable linebreak-style */
const orePrices = [
	['veldspar',6],
	['scordite',17],
	['pyroxeres',283],
	['plagioclase',22],
	['omber',39],
	['kernite',83],
	['jaspet',916],
	['hemorphite',524],
	['hedbergite',656],
	['spodumain',846],
	['darkochre',253],
	['gneiss',300],
	['crokite',1664],
	['bistot',1952],
	['arkonor',1488],
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