const orePrices = [
    ['veldspar',4],
    ['scordite',10],
    ['pyroxeres',240],
    ['plagioclase',17],
    ['omber',38],
    ['kernite',85],
    ['jaspet',1050],
    ['hemorphite',910],
    ['hedbergite',563],
    ['spodumain',512],
    ['dark-ochre',240],
    ['gniess',272],
    ['crokite',1400],
    ['bistot',1750],
    ['arkonor',1470],
    ['mercoxit',1820],
];

let quoteTotal = [];

function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

module.exports = async (message, args) => {

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