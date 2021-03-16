/* eslint-disable linebreak-style */
const orePrices = [
	['tritanium',3],
	['pyerite',21],
	['mexallon',30],
	['isogen',84],
	['nocxium',811],
	['zydrine',1020],
	['megacyte',2125],
	['morphite',0],
	// Pi Below
	['lusteringalloy',327],
	['sheencompound',201],
	['gleamingalloy',322],
	['condensedalloy',128],
	['preciousalloy',426],
	['motleycompound',278],
	['fibercomposite',105],
	['lucentcompound',326],
	['opulentcompound',530],
	['glossycompound',139],
	['crystalcompound',283],
	['darkcompound',209],
	['basemetals',741],
	['heavymetals',291],
	['noblemetals',287],
	['reactivemetals',589],
	['toxicmetals',361],
	['plasmoids',2475],
	
];

let quoteTotal = [];
let quoteList = [];

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
					quoteList.push([args[i],args[i+1],args[i+1] * orePrices[j][1]]);
                
				}
				console.log(quoteTotal);
			}  
		}
		const quoteOutput = quoteTotal.reduce((a,b) => a+b,0);
		await message.reply(
			quoteList +
			'Total:' + formatMoney(quoteOutput)
		);
    
	}
	quoteTotal = [];
};