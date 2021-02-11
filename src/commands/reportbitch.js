/* eslint-disable linebreak-style */
const nsfwID = '809473664265355346';

module.exports = (message) => {

	if (message.channel.id === nsfwID) {
		message.reply('Sorry the only bitch around here is <@413323480809865217>');
	}

};