const Discord = require('discord.js');
const sellChannelID = '757717773010075649';
const mongoose = require('mongoose');
const mongo = require('../mongo');
const Report = require('../models/pilotBuyPrices');

module.exports = async (message) =>  {
    if (message.channel.id === sellChannelID) {
        await mongo().then(async function () {
            function getBPrices(callback) {
                Report.findOne().sort({createdAt: -1}).limit(1).exec((err, getPrice) => {
                    if (err) callback(err, null);
                    else callback(null, getPrice);
                })
            }

            await getBPrices(async function (err, priceResult) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(priceResult);
                    message.reply("`​`​`" + priceResult + "`​`​`");
                }
            })
        })
    }
    else {
        await message.reply("Incorrect ID or Channel");
    }
}