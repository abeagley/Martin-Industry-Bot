/* eslint-disable linebreak-style */
const orePrices = [
	['veldspar',6],
	['scordite',14],
	['pyroxeres',241],
	['plagioclase',17],
	['omber',22],
	['kernite',67],
	['jaspet',760],
	['hemorphite',460],
	['hedbergite',533],
	['spodumain',721],
	['darkochre',224],
	['gneiss',237],
	['crokite',1514],
	['bistot',1474],
	['arkonor',1115],
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