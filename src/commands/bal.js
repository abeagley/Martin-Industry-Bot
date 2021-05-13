const economy = require('../economy')

module.exports = async (message) => {
        const target = message.mentions.users.first()  ||  message.author
        const targetId = target.id

        const guildId = message.guild.id
        const userId = target.id

        const coins = await economy.getCoins(guildId, userId)
        console.log(${coins})
        message.reply(`That user has ${coins} coins`)
}