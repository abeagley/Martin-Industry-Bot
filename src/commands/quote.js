const orePrices = [
    ['veldspar',6],
    ['scordite',12],
    ['pyroxeres',272],
    ['plagioclase',17],
    ['omber',37],
    ['kernite',76],
    ['jaspet',898],
    ['hemorphite',538],
    ['hedbergite',558],
    ['spodumain',674],
    ['darkochre',282],
    ['gneiss',250],
    ['crokite',1724],
    ['bistot',1865],
    ['arkonor',1714],
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