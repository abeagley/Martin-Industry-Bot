// Ores
const oreType = [
    'veldspar',
    'scordite',
    'pyroxeres',
    'plagioclase',
    'omber',
    'kernite',
    'jaspet',
    'hemorphite',
    'hedbergite',
    'spodumain',
    'dark-ochre',
    'gniess',
    'crokite',
    'bistot',
    'arkonor',
    'mercoxit',
];

// Ore Prices - eventually need to be pulled from google sheets
const orePrices = [
    /*'veldspar'*/4 ,
    /*'scordite'*/10,
    /*'pyroxeres'*/240,
    /*'plagioclase'*/17,
    /*'omber'*/38,
    /*'kernite'*/85,
    /*'jaspet'*/1050,
    /*'hemorphite'*/910,
    /*'hedbergite'*/563,
    /*'spodumain'*/512,
    /*'dark-ochre'*/240,
    /*'gniess'*/272,
    /*'crokite'*/1400,
    /*'bistot'*/1750,
    /*'arkonor'*/1470,
    /*'mercoxit'*/1820,
]


function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }


module.exports = async (message, args) => {

    for (let i = 0; i < oreType.length; i++) {
        if (args[i] === oreType[i]) {
            await message.reply(formatMoney(args[i+1] * orePrices[i]));
            console.log('Quote! (sent)');
            console.log(args);
        
        }
        else console.log(args + ' oops');
        
    }
}