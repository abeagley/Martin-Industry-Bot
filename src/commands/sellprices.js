const Discord = require('discord.js');
const orderChannelID = '756565959073857679';
const econID = '722877594709524501'
const mongoose = require('mongoose');

module.exports = async (message) =>  {
    if (message.channel.id === orderChannelID && message.author.id === econID ) {

        let sellPrices = require('../prices/pilotSellPrices')
        let stringP = sellPrices.toString()
        console.log(stringP)
        let sellPriceMessage = new Discord.MessageEmbed()
            .setTitle('Current Sell to Corp Prices')
            .setColor(15105570)
            .addFields({ name: 'Prices', value: stringP, inline: true}
            )
            .setTimestamp()
            .setFooter('Thanks for doing business with HTP')
        ;
        await message.channel.send(sellPriceMessage);






    }
    else {
        await message.reply("Incorrect ID or Channel");
    }
}