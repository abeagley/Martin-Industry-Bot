const economy = require('../economy')
const econID = '722877594709524501'

module.exports = {

    callback: async (message, arguments) => {
        if (message.author.id === econID) {
            const mention = message.mentions.users.first()

            if (!mention) {
                message.reply('Please tag a user to add coins to.')
                return
            }

            //!addbal @username 50
            const coins = arguments[1]
            if (isNaN(coins)) {
                message.reply('Please provide a valid number of coins.')
                return
            }

            const guildId = message.guild.id
            const userId = mention.id

            const newCoins = await economy.addCoins(guildId, userId, coins)

            message.reply(`You have given <@${userId}> ${coins} coins}. They now have ${newCoins} coins!`)
        }
    }
}