const economy = require('../economy')

module.exports = async (message) => {
        const target = message.mentions.users.first()  ||  message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id

        const ChimpCoins = await economy.getCoins(guildId, userId)
        console.log(`${ChimpCoins}`)
        message.reply(`That user has ${ChimpCoins} 🐵ChimpCoins`)
}