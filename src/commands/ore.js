/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable linebreak-style */
const Discord = require('discord.js');
const oreChannelID = '756565959073857679';
const mongoose = require('mongoose');
const Report = require('report.js');


const orePricesTwo = [
	['veldspar',6],
	['scordite',14],
	['pyroxeres',241],
	['plagioclase',17],
	['omber',22],
	['kernite',67],
	['jaspet',760],
	['hemorphite',460],
	['hedbergite',533],
	['spodumain',721],
	['darkochre',224],
	['gneiss',237],
	['crokite',1514],
	['bistot',1474],
	['arkonor',1115],
	['mercoxit',0],
];

let quoteTotalTwo = [];
let oreArray = [];
let oreNumber = [];

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}


module.exports = (message, args) =>  {
		
	if (message.channel.id === oreChannelID) {
		if (args.length < 2) {return message.reply('No Values Input :pensive: Try \'!ore veldspar 1000 scordite 1000...\'');}
		else {

			for (let i = 0; i < args.length; i++) {
				for (let j = 0; j < orePricesTwo.length; j++) {
					if (args[i].toLowerCase() === orePricesTwo[j][0]) {
						quoteTotalTwo.push(args[i+1] * orePricesTwo[j][1]);
					}
					console.log(quoteTotalTwo);
				}  
			}
		
			for (let l = 0; l < args.length; l+=2) {
				oreArray.push(args[l]);
			}
			console.log(oreArray);
	
			for (let m = 1; m < args.length; m+=2) {
				oreNumber.push(args[m]);
			}
			console.log(oreNumber);
	
			const quoteOutputTwo = quoteTotalTwo.reduce((a,b) => a+b,0);
		
			const disagree1 = '❌';
			const agree1 = '☑️';


			let oreInvoice = new Discord.MessageEmbed()
				.setTitle('Status: Sell Ore Request')
				.setAuthor(message.member.nickname, message.author.avatarURL())
				.setColor(15105570) 
				.addFields({ name: args, value: '----------', inline: true},
					{ name: 'Total isk', value: formatMoney(quoteOutputTwo)}
				)
				.setTimestamp()
				.setFooter('Send contract with ore to Ecomartin requesting isk amount below')
	;
	
			message.channel.send(oreInvoice).then( msg => {
				msg.react(agree1);
				msg.react(disagree1);
				message.reply(`Please send contract with ore to Econmartin requesting ${formatMoney(quoteOutputTwo)} isk`);
				
				let rUser = message.member;
        		let rAuthor = message.author;
    
        		const report = new Report({
            	_id: mongoose.Types.ObjectId(),
				time: message.createdTimestamp,
            	nickname: rUser.nickname,
            	username: rAuthor.username,
            	userID: rUser.id,
            	isk: quoteOutputTwo,
        		});

        		report.save();


				const agreeDisagree = (reaction, user) =>  reaction.message.guild.member(user).roles.cache.has('773244425291300896');
				const agreeOrDisagree = msg.createReactionCollector(agreeDisagree);

				msg.awaitReactions(agreeDisagree)
					.then(
		
						agreeOrDisagree.on('collect', reaction => {
			
							//disagree1 = Incorrect Ore
							switch (reaction.emoji.name)  {
							// ore incorrect
							case '❌': 
								oreInvoice = new Discord.MessageEmbed()
									.setTitle('Status: Rejected(Incorrect Ore)')
									.setAuthor(message.member.nickname, message.author.avatarURL())
									.setColor(15158332)
									.addFields({ name: args, value: '----------', inline: true},
										{ name: 'Total isk', value: formatMoney(quoteOutputTwo)}
									)
									.setTimestamp()
									.setFooter('Ore contract didn\'t match discord');
								msg.edit(oreInvoice);
								msg.reactions.removeAll();
								message.reply('Looks like you entered the incorrect type or amount of ore. Please check your contract and submit again.');
								break;

								//ore correct
							case '☑️':
								oreInvoice = new Discord.MessageEmbed()
									.setTitle('Status: Complete')
									.setDescription('Ore Accepted ☑️')
									.setAuthor(message.member.nickname, message.author.avatarURL())
									.setColor(3066993)
									.addFields({ name: args, value: '----------', inline: true},
										{ name: 'Total isk', value: formatMoney(quoteOutputTwo)}
									)
									.setTimestamp()
									.setFooter('Thanks for doing business with HTP');
								msg.edit(oreInvoice);
								msg.reactions.cache.get('❌').remove();
								msg.reactions.cache.get('☑️').remove();
							}
						})
	
					);});
		
	
		}
		quoteTotalTwo = [];
	}
};
