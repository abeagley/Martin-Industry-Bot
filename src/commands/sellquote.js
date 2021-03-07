/* eslint-disable linebreak-style */
const orePrices = [
	['veldspar',6],
	['scordite',16],
	['pyroxeres',254],
	['plagioclase',20],
	['omber',25],
	['kernite',86],
	['jaspet',782],
	['hemorphite',477],
	['hedbergite',662],
	['spodumain',836],
	['darkochre',229],
	['gneiss',305],
	['crokite',1519],
	['bistot',1706],
	['arkonor',1311],
	['mercoxit',0],
	// Pi Below
	['lusteringalloy',196],
	['sheencompound',281],
	['gleamingalloy',544],
	['condensedalloy',135],
	['preciousalloy',407],
	['motleycompound',324],
	['fibercomposite',104],
	['lucentcompound',302],
	['opulentcompound',215],
	['glossycompound',117],
	['crystalcompound',407],
	['darkcompound',308],
	['basemetals',308],
	['heavymetals',395],
	['noblemetals',206],
	['reactivemetals',825],
	['toxicmetals',374],
	['reactivegas',107],
	['noblegas',436],
	['industrialfibers',750],
	['supertensileplastics',336],
	['polyaramids',211],
	['coolant',515],
	['condensates',346],
	['constructionblocks',220],
	['nanites',498],
	['silicateglass',750],
	['smartfabunits',298],
	['heavywater',8],
	['suspendedplasma',17],
	['liquidozone',81],
	['ionicsolutions',251],
	['oxygenisotopes',1125],
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