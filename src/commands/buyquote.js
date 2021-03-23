const orePrices = [
	['tritanium',3],
	['pyerite',20],
	['mexallon',26],
	['isogen',83],
	['nocxium',801],
	['zydrine',1190],
	['megacyte',2295],
	['morphite',0],
	// Pi Below
	['lusteringalloy',127],
	['sheencompound',233],
	['gleamingalloy',303],
	['condensedalloy',190],
	['preciousalloy',411],
	['motleycompound',212],
	['fibercomposite',110],
	['lucentcompound',284],
	['opulentcompound',217],
	['glossycompound',129],
	['crystalcompound',264],
	['darkcompound',282],
	['basemetals',286],
	['heavymetals',298],
	['noblemetals',328],
	['reactivemetals',726],
	['toxicmetals',313],
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