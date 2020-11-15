const orePrices = [
    ['veldspar',6],
    ['scordite',14],
    ['pyroxeres',327],
    ['plagioclase',20],
    ['omber',44],
    ['kernite',90],
    ['jaspet',1196],
    ['hemorphite',732],
    ['hedbergite',689],
    ['spodumain',724],
    ['darkochre',352],
    ['gneiss',296],
    ['crokite',2168],
    ['bistot',2451],
    ['arkonor',2275],
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