const orePrices = [
	['veldspar',6],
	['scordite',15],
	['pyroxeres',254],
	['plagioclase',22],
	['omber',26],
	['kernite',94],
	['jaspet',913],
	['hemorphite',538],
	['hedbergite',630],
	['spodumain',800],
	['darkochre',227],
	['gneiss',307],
	['crokite',1652],
	['bistot',1871],
	['arkonor',1571],
	['mercoxit',0],
	// Pi Below
	['lusteringalloy',112],
	['sheencompound',206],
	['gleamingalloy',284],
	['condensedalloy',167],
	['preciousalloy',362],
	['motleycompound',187],
	['fibercomposite',97],
	['lucentcompound',266],
	['opulentcompound',203],
	['glossycompound',114],
	['crystalcompound',233],
	['darkcompound',265],
	['basemetals',268],
	['heavymetals',263],
	['noblemetals',290],
	['reactivemetals',681],
	['toxicmetals',293],
	['reactivegas',334],
	['noblegas',470],
	['industrialfibers',676],
	['supertensileplastics',900],
	['polyaramids',393],
	['coolant',516],
	['condensates',590],
	['constructionblocks',900],
	['nanites',627],
	['silicateglass',710],
	['smartfabunits',489],
	['heavywater',8],
	['suspendedplasma',21],
	['liquidozone',87],
	['ionicsolutions',236],
	['oxygenisotopes',1575],
	['plasmoids',2700],
	
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