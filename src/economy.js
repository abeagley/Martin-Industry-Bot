const mongo = require('./mongo')
const profileSchema = require('./models/profileSchema')

const coinsCache = {}
module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, coins) => {
    const cachedValue = coinsCache[`${guildId}-${userId}`]
    if (cachedValue) {
        return cachedValue
    }
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running findOneAndUpdate()')

            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
                $inc: {
                    coins
                }
            }, {
                upsert: true,
                new: true
            })
            console.log('RESULT:', result)
            coinsCache[`${guildId}-${userId}`] = result.coins
            return result.coins
        }

        finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getCoins = async(guildId,userId) => {
    return await mongo().then(async mongoose => {
        try {
            console.log('Running findOne()')

            const result = await profileSchema.findOne({
                guildId,
                userId
            })

            console.log('RESULT:',result)

            let coins = 0
            if (result) {
                console.log(result.coins)
                coins = result.coins
            } else {
                console.log('Inserting a document')
                await new profileSchema({
                    guildId,
                    userId,
                    coins
                }).save()

                coinsCache[`${guildId}-${userId}`] = coins
            }
        } finally {
            mongoose.connection.close()
        }
    })
}