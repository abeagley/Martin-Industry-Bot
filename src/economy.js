const mongo = require('./mongo')
const profileSchema = require('./models/profileSchema')

const coinsCache = {}
module.exports = (client) => {}

module.exports.addCoins = async (guildId, userId, ChimpCoins) => {


    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running findOneAndUpdate()')


            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId,
            }, {
                guildId,
                userId,
                $inc: {
                    ChimpCoins
                }
            }, {
                upsert: true,
                new: true
            })
            console.log('RESULT:', result)
            coinsCache[`${guildId}-${userId}`] = result.ChimpCoins
            return result.ChimpCoins
        }

        finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getCoins = async(guildId,userId) => {
    const cachedValue = coinsCache[`${guildId}-${userId}`]
    if (cachedValue) {
        return cachedValue
    }
    return await mongo().then(async mongoose => {
        try {
            console.log('Running findOne()')

            const result = await profileSchema.findOne({
                guildId,
                userId
            })

            console.log('RESULT:',result)

            let ChimpCoins = 0
            if (result) {
                console.log(result.ChimpCoins)
                ChimpCoins = result.ChimpCoins
            } else {
                console.log('Inserting a document')
                await new profileSchema({
                    guildId,
                    userId,
                    ChimpCoins
                }).save()
                coinsCache[`${guildId}-${userId}`] = ChimpCoins
            }
        } finally {
            mongoose.connection.close()
        }
    })
}