const Discord = require('discord.js');
const orderChannelID = '757717773010075649';
const econID = '722877594709524501'
const mongoose = require('mongoose');

module.exports = async (message) =>  {
    if (message.channel.id === orderChannelID && message.author.id === econID ) {

        let buyPrices = require('../prices/pilotBuyPrices')
        let stringP = buyPrices.toString()
        console.log(stringP)
        await message.reply(stringP);
    }
    else {
        await message.reply("Incorrect ID or Channel");
    }
}