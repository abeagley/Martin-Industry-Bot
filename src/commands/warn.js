const Discord = require('discord.js');
module.exports = (message, args) => {
    console.log("doing alert again")
    const VCchannelID = ('770358282752884776');
    const VCchannel = message.guild.channels.cache.get(VCchannelID);
    VCchannel.join();
    message.channel.send(`<@&770332037763825664> ${args}`, {
        tts: true
    });
}