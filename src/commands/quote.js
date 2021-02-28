/* eslint-disable linebreak-style */
const orePrices = [
	['tritanium',3],
	['pyerite',21],
	['mexallon',21],
	['isogen',71],
	['nocxium',765],
	['zydrine',1020],
	['megacyte',1955],
	['morphite',0],
	// Pi Below
	['lusteringalloy',220],
	['sheencompound',553],
	['gleamingalloy',249],
	['condensedalloy',167],
	['preciousalloy',474],
	['motleycompound',422],
	['fibercomposite',111],
	['lucentcompound',431],
	['opulentcompound',136],
	['glossycompound',147],
	['crystalcompound',365],
	['darkcompound',385],
	['basemetals',437],
	['heavymetals',563],
	['noblemetals',191],
	['reactivemetals',880],
	['toxicmetals',396],
	['plasmoids',2635],
	
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