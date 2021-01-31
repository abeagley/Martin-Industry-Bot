/* eslint-disable linebreak-style */
const orePrices = [
	['veldspar',4],
	['scordite',14],
	['pyroxeres',254],
	['plagioclase',18],
	['omber',20],
	['kernite',69],
	['jaspet',746],
	['hemorphite',380],
	['hedbergite',536],
	['spodumain',662],
	['darkochre',237],
	['gneiss',250],
	['crokite',1261],
	['bistot',1425],
	['arkonor',989],
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