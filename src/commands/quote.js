const orePrices = [
    ['veldspar',4],
    ['scordite',12],
    ['pyroxeres',246],
    ['plagioclase',16],
    ['omber',31],
    ['kernite',69],
	['jaspet',879],
    ['hemorphite',513],
    ['hedbergite',541],
    ['spodumain',588],
    ['darkochre',247],
    ['gneiss',237],
    ['crokite',1512],
    ['bistot',1799],
    ['arkonor',1518],
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