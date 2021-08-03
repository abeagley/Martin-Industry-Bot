
module.exports = () => {
    console.log("doing alert")
    const VCchannelID = ('770358282752884776');
    const VCchannel = message.guild.channels.cache.get(VCchannelID);
    VCchannel.join();
}