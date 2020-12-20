const orePrices = [
    ['veldspar',6],
    ['scordite',17],
    ['pyroxeres',247],
    ['plagioclase',21],
    ['omber',36],
    ['kernite',79],
	['jaspet',829],
    ['hemorphite',480],
    ['hedbergite',604],
    ['spodumain',823],
    ['darkochre',204],
    ['gneiss',282],
    ['crokite',1522],
    ['bistot',1832],
    ['arkonor',1386],
    ['mercoxit',0],
];

let quoteTotal = [];

function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
};

module.exports = async (message, args) => {
    if (args.length < 2) {return message.reply("No Values Input :pensive: Try '!quote veldspar 1000 scordite 1000...'")}
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
}