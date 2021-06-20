const mongo = require('../mongo');
const Report = require('../models/mineralPrice');
const OreReport = require('../models/orePilotSellPrice');



async function getOre() {
    await mongo().then(async mongoose => {

            let tritanium = 0;
            let pyerite = 0;
            let mexallon = 0;
            let isogen = 0;
            let nocxium = 0;
            let zydrine = 0;
            let megacyte = 0;
            let morphite = 0;

            let veldspar = 0;
            let scordite = 0;
            let plagioclase = 0;
            let omber = 0;
            let kernite = 0;
            let pyroxeres = 0;
            let darkochre = 0;
            let gneiss = 0;
            let spodumain = 0;
            let hemorphite = 0;
            let hedbergite = 0;
            let jaspet = 0;
            let crokite = 0;
            let bistot = 0;
            let arkonor = 0;
            let mercoxit = 0;

            let orePricesForUpload = [];

            //let oreResultValues = [];
            function getOreValues(callback) {
                Report.findOne().sort({createdAt: -1}).limit(1).exec((err, getOreResult) => {
                    if (err) callback(err, null);
                    else callback(null, getOreResult);
                })
            }

            await getOreValues(async function (err, getOreResult2) {
                if (err) {
                    console.log(err);
                } else {
                    //oreResultValues = getOreResult2.prices;
                    //console.log(getOreResult2.prices)
                    tritanium = getOreResult2.prices[0][1];
                    pyerite = getOreResult2.prices[1][1];
                    mexallon = getOreResult2.prices[2][1];
                    isogen = getOreResult2.prices[3][1];
                    nocxium = getOreResult2.prices[4][1];
                    zydrine = getOreResult2.prices[5][1];
                    megacyte = getOreResult2.prices[6][1];
                    morphite = getOreResult2.prices[7][1];
                    //console.log(tritanium,megacyte)

                    veldspar = (Math.round((2.49 * tritanium) * 0.85));
                    scordite = (Math.round(((0.972 * tritanium) + (0.69 * pyerite)) * 0.85));
                    plagioclase = (Math.round(((0.306 * tritanium) + (0.39 * pyerite) + (0.582 * mexallon)) * 0.85));
                    omber = (Math.round(((3.6 * tritanium) + (0.456 * pyerite) + (0.33 * mexallon)) * 0.85));
                    kernite = (Math.round(((1.596 * tritanium) + (2.88 * mexallon) + (0.288 * isogen)) * 0.85));
                    pyroxeres = (Math.round(((10.53 * tritanium) + (3.36 * pyerite) + (1.5 * mexallon) + (0.18 * nocxium)) * 0.85));
                    darkochre = (Math.round(((5.76 * tritanium) + (0.336 * isogen) + (0.258 * nocxium)) * 0.85));
                    gneiss = (Math.round(((5.28 * pyerite) + (5.52 * mexallon) + (1.104 * isogen)) * 0.85));
                    spodumain = (Math.round(((118.2 * tritanium) + (22.44 * pyerite) + (2.16 * mexallon) + (0.36 * isogen)) * 0.85));
                    hemorphite = (Math.round(((33 * tritanium) + (0.96 * isogen) + (0.078 * nocxium) + (0.3 * zydrine)) * 0.85));
                    hedbergite = (Math.round(((16.38 * pyerite) + (2.76 * isogen) + (0.054 * nocxium) + (0.084 * zydrine)) * 0.85));
                    jaspet = (Math.round(((14.76 * mexallon) + (0.288 * nocxium) + (0.336 * zydrine)) * 0.85));
                    crokite = (Math.round(((232.8 * tritanium) + (0.564 * nocxium) + (0.576 * zydrine)) * 0.85));
                    bistot = (Math.round(((36.72 * pyerite) + (0.216 * zydrine) + (0.474 * megacyte)) * 0.85));
                    arkonor = (Math.round(((52.8 * tritanium) + (6 * mexallon) + (0.624 * megacyte)) * 0.85));
                    mercoxit = (Math.round((0.351 * morphite) * 0.85));

                    orePricesForUpload.push(
                        ['veldspar', veldspar],
                        ['scordite', scordite],
                        ['plagioclase', plagioclase],
                        ['omber', omber],
                        ['kernite', kernite],
                        ['pyroxeres', pyroxeres],
                        ['darkochre', darkochre],
                        ['gneiss', gneiss],
                        ['spodumain', spodumain],
                        ['hemorphite', hemorphite],
                        ['hedbergite', hedbergite],
                        ['jaspet', jaspet],
                        ['crokite', crokite],
                        ['bistot', bistot],
                        ['arkonor', arkonor],
                        ['mercoxit', mercoxit],
                    )
                    console.log(orePricesForUpload)

                    const oreReportUpload = new OreReport({
                        _id: mongoose.Types.ObjectId(),
                        prices: orePricesForUpload,
                    });

                    await oreReportUpload.save()
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })
                    console.log("ore saved")
                }
            });

    })
}

getOre();


