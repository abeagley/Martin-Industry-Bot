/* eslint-disable linebreak-style */
const orePrices = [
	['veldspar',4],
	['scordite',15],
	['pyroxeres',255],
	['plagioclase',20],
	['omber',33],
	['kernite',78],
	['jaspet',790],
	['hemorphite',400],
	['hedbergite',584],
	['spodumain',706],
	['darkochre',228],
	['gneiss',280],
	['crokite',1269],
	['bistot',1569],
	['arkonor',1097],
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