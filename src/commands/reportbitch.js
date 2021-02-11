/* eslint-disable linebreak-style */
const nsfwID = '809473664265355346';

module.exports = async (message) => {

	if (message.channel.id === nsfwID) {
		message.reply(`"Thank you for reporting " + ${message.mentions.users} + " for being a bitch!"`);
	}

};