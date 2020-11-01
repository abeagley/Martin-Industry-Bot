module.exports = async (message, args) => {
    await message.channel.send('pong');
    console.log('PingPong! (sent)');
}