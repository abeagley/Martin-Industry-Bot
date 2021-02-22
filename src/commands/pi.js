/* eslint-disable linebreak-style */
const Discord = require('discord.js');
const piChannelID = '756565959073857679';


const piPrices = [
	['lusteringalloy',110],
	['sheencompound',389],
	['gleamingalloy',251],
	['condensedalloy',158],
	['preciousalloy',389],
	['motleycompound',599],
	['fibercomposite',93],
	['lucentcompound',359],
	['opulentcompound',123],
	['glossycompound',110],
	['crystalcompound',437],
	['darkcompound',825],
	['basemetals',366],
	['heavymetals',378],
	['noblemetals',158],
	['reactivemetals',444],
	['toxicmetals',336],
	['reactivegas',114],
	['noblegas',207],
	['industrialfibers',631],
	['supertensileplastics',255],
	['polyaramids',149],
	['coolant',305],
	['condensates',116],
	['constructionblocks',163],
	['nanites',302],
	['silicateglass',749],
	['smartfabunits',394],
	['heavywater',3],
	['suspendedplasma',12],
	['liquidozone',47],
	['ionicsolutions',169],
	['oxygenisotopes',825],
	['plasmoids',2175],
];


let piTotal = [];
let piArray = [];
let piNumber = [];

function formatMoney(number) {
	return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
}


module.exports = (message, args) =>  {
		
	if (message.channel.id === piChannelID) {
		if (args.length < 2) {return message.reply('No Values Input :pensive: Try \'!pi lusteringalloy 10000 gleamingalloy 10000...\'');}
		else {

			for (let i = 0; i < args.length; i++) {
				for (let j = 0; j < piPrices.length; j++) {
					if (args[i].toLowerCase() === piPrices[j][0]) {
						piTotal.push(args[i+1] * piPrices[j][1]);
					}
					console.log(piTotal);
				}  
			}
		
			for (let l = 0; l < args.length; l+=2) {
				piArray.push(args[l]);
			}
			console.log(piArray);
	
			for (let m = 1; m < args.length; m+=2) {
				piNumber.push(args[m]);
			}
			console.log(piNumber);
	
			const piOutput = piTotal.reduce((a,b) => a+b,0);
		
			const disagree1 = '❌';
			const agree1 = '☑️';


			let oreInvoice = new Discord.MessageEmbed()
				.setTitle('Status: Sell PI Request')
				.setAuthor(message.member.nickname, message.author.avatarURL())
				.setColor(15105570) 
				.addFields({ name: args, value: '----------', inline: true},
					{ name: 'Total isk', value: formatMoney(piOutput)}
				)
				.setTimestamp()
				.setFooter('Send contract with PI to Ecomartin requesting isk amount below')
	;
	
			message.channel.send(oreInvoice).then( msg => {
				msg.react(agree1);
				msg.react(disagree1);
				message.reply(`Please send contract with PI to Econmartin requesting ${formatMoney(piOutput)} isk`);
				
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
									.setTitle('Status: Rejected(Incorrect PI)')
									.setAuthor(message.member.nickname, message.author.avatarURL())
									.setColor(15158332)
									.addFields({ name: args, value: '----------', inline: true},
										{ name: 'Total isk', value: formatMoney(piOutput)}
									)
									.setTimestamp()
									.setFooter('PI contract didn\'t match discord');
								msg.edit(oreInvoice);
								msg.reactions.removeAll();
								message.reply('Looks like you entered the incorrect type or amount of PI. Please check your contract and submit again.');
								break;

								//ore correct
							case '☑️':
								oreInvoice = new Discord.MessageEmbed()
									.setTitle('Status: Complete')
									.setDescription('PI Accepted ☑️')
									.setAuthor(message.member.nickname, message.author.avatarURL())
									.setColor(3066993)
									.addFields({ name: args, value: '----------', inline: true},
										{ name: 'Total isk', value: formatMoney(piOutput)}
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
		piTotal = [];
	}
};
