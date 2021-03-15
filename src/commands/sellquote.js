/* eslint-disable linebreak-style */
const orePrices = [
	['veldspar',6],
	['scordite',15],
	['pyroxeres',264],
	['plagioclase',24],
	['omber',27],
	['kernite',104],
	['jaspet',917],
	['hemorphite',494],
	['hedbergite',635],
	['spodumain',829],
	['darkochre',230],
	['gneiss',332],
	['crokite',1569],
	['bistot',1799],
	['arkonor',1498],
	['mercoxit',0],
	// Pi Below
	['lusteringalloy',289],
	['sheencompound',177],
	['gleamingalloy',302],
	['condensedalloy',113],
	['preciousalloy',376],
	['motleycompound',245],
	['fibercomposite',92],
	['lucentcompound',305],
	['opulentcompound',497],
	['glossycompound',123],
	['crystalcompound',250],
	['darkcompound',196],
	['basemetals',695],
	['heavymetals',257],
	['noblemetals',254],
	['reactivemetals',552],
	['toxicmetals',338],
	['reactivegas',194],
	['noblegas',275],
	['industrialfibers',975],
	['supertensileplastics',344],
	['polyaramids',281],
	['coolant',431],
	['condensates',342],
	['constructionblocks',293],
	['nanites',565],
	['silicateglass',664],
	['smartfabunits',470],
	['heavywater',8],
	['suspendedplasma',20],
	['liquidozone',189],
	['ionicsolutions',290],
	['oxygenisotopes',825],
	['plasmoids',2475],
	
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