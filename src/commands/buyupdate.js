const Discord = require('discord.js');

const mongoose = require('mongoose');

const mineralReport = require('../models/mineralPrice');
const piBuyReport = require('../models/piPilotBuyPrice');


async function updatePrices() {
    await require('../database/getMineralPrices');
    await require('../database/getOrePrices');
    await require('../database/getPiPrices');

    module.exports = async (message) =>  {
                let result = await report.aggregate([
                    { $group: { _id: '$nickname', total: { $sum: '$isk' } } },
                    { $sort: { total: -1 } }
                ]);
                let resultList = '';
                for (let i = 0; i < result.length; i++) {
                    resultList += `\n${result[i]._id} = ${formatMoney(result[i].total)}`;
                }
                message.reply('Currently our miners have contributed:' + resultList);
}

function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}

module.exports = async (message) =>  {
            let result = await report.aggregate([
                { $group: { _id: '$nickname', total: { $sum: '$isk' } } },
                { $sort: { total: -1 } }
            ]);
            let resultList = '';
            for (let i = 0; i < result.length; i++) {
                resultList += `\n${result[i]._id} = ${formatMoney(result[i].total)}`;
            }
            message.reply('Currently our miners have contributed:' + resultList);
        }
};