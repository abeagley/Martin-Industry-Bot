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
	['lusteringalloy',222],
	['sheencompound',318],
	['gleamingalloy',580],
	['condensedalloy',153],
	['preciousalloy',462],
	['motleycompound',367],
	['fibercomposite',117],
	['lucentcompound',322],
	['opulentcompound',229],
	['glossycompound',133],
	['crystalcompound',462],
	['darkcompound',328],
	['basemetals',328],
	['heavymetals',448],
	['noblemetals',234],
	['reactivemetals',880],
	['toxicmetals',399],
	['plasmoids',3060],
	
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