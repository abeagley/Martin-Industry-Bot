const Discord = require('discord.js');
const orderChannelID = '757717773010075649';
const econID = '722877594709524501'
const mongo = require('../mongo');

module.exports = async (message) => {
    mongo().then(async mongoose => {
        if (message.channel.id === orderChannelID && message.author.id === econID) {

            await require('../database/getPilotBuyPrices');
            await message.reply("Buy Prices Updated, please run !priceupdate5");
        } else {
            await message.reply("Incorrect ID or Channel");
        }
    })
}