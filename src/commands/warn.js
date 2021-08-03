const Discord = require('discord.js');
module.exports = () => {
    console.log("doing alert")
    const VCchannelID = ('770358282752884776');
    const VCchannel = Discord.guild.channels.cache.get(VCchannelID);
    VCchannel.join();
}