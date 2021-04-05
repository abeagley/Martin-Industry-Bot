const mongoose = require('mongoose')

const { MONGODB_URI } = require('./config.json')

module.exports = async () => {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to Mongo");
    });

    return mongoose
}