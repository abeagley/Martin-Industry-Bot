
const nsfwID = '809473664265355346';

module.exports = (message) => {

	if (message.channel.id === nsfwID) {
		message.reply('Dont make me spill my suspended plasma...');
	}

};