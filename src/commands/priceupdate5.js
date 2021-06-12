const Discord = require('discord.js');

const econID = '722877594709524501'
const mongo = require('../mongo');

module.exports = async (message) => {
    mongo().then(async mongoose => {
        if ( message.author.id === econID) {

            await require('../database/getPilotSellPrices');
            await message.reply("Buy Prices Updated, All prices should be updated now");
        } else {
            await message.reply("Incorrect ID or Channel");
        }
    })
}