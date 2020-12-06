const orePrices = [
    ['veldspar',4],
    ['scordite',11],
    ['pyroxeres',253],
    ['plagioclase',16],
    ['omber',32],
    ['kernite',71],
    ['jaspet',852],
    ['hemorphite',482],
    ['hedbergite',521],
    ['spodumain',553],
    ['darkochre',267],
    ['gneiss',235],
    ['crokite',1471],
    ['bistot',1670],
    ['arkonor',1470],
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