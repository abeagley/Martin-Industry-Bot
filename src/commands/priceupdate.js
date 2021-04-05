const Discord = require('discord.js');
const orderChannelID = '757717773010075649';
const econID = '722877594709524501'
const mongo = require('../mongo');

module.exports = async (message) => {
    mongo().then(async mongoose => {
        try {
            if (message.channel.id === orderChannelID && message.author.id === econID) {
                await require('../database/getMineralPrices');
                await require('../database/getOrePrices');
                await require('../database/getPiPrices');
                await message.reply("Prices Updated");
            } else {
                await message.reply("Incorrect ID or Channel");
            }
        } finally {
            mongoose.connection.close();
        }
    })
}