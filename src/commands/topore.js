/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const mongoose = require('mongoose');
const report = require('../report');
const oreChannelID = '757717773010075649';

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}

module.exports = async (message, args) =>  {
	if (message.channel.id === oreChannelID) {
		try{
			let result = await report.aggregate([
				{ $group: { _id: '$nickname', total: { $sum: '$isk' } } },
				{ $sort: { total: -1 } }
			]);
			let resultList = '';
			for (let i = 0; i < result.length; i++) {
				resultList += `\n${result[i]._id} = ${formatMoney(result[i].total)}`;
			}
			message.reply('Currently our miners have contributed:' + resultList);
        
		}
		catch (err) {
			console.log(err);
		}
	}
};