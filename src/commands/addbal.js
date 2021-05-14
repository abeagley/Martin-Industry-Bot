const economy = require('../economy')
const econID = '722877594709524501'

module.exports = async (message, arguments) => {
        if (message.author.id === econID) {
            const mention = message.mentions.users.first()

            if (!mention) {
                message.reply('Please tag a user to add ChimpCoins to.')
                return
            }

            //!addbal @username 50
            const ChimpCoins = arguments[1]
            if (isNaN(ChimpCoins)) {
                message.reply('Please provide a valid number of ChimpCoins.')
                return
            }

            const guildId = message.guild.id
            const userId = mention.id

            const newCoins = await economy.addCoins(guildId, userId, ChimpCoins)

            message.reply(`You have given <@${userId}> ${ChimpCoins} 🐒ChimpCoins. They now have ${newCoins} 🐒ChimpCoins!`)
        }
}