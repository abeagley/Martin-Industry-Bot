const orePrices = [
    ['veldspar',6],
    ['scordite',14],
    ['pyroxeres',340],
    ['plagioclase',20],
    ['omber',43],
    ['kernite',89],
    ['jaspet',1465],
    ['hemorphite',955],
    ['hedbergite',744],
    ['spodumain',723],
    ['darkochre',368],
    ['gniess',291],
    ['crokite',2633],
    ['bistot',2723],
    ['arkonor',2423],
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
}