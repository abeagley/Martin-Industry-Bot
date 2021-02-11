/* eslint-disable linebreak-style */
const nsfwID = '809473664265355346';

module.exports = (message) => {

	if (message.channel.id === nsfwID) {
		message.reply(`Thank you for reporting ${message.member.nickname} for being a little bitch!`);
	}

};