/* eslint-disable linebreak-style */
const Discord = require('discord.js');
const piChannelID = '756565959073857679';


const piPrices = [
	['lusteringalloy',194],
	['sheencompound',488],
	['gleamingalloy',233],
	['condensedalloy',148],
	['preciousalloy',419],
	['motleycompound',372],
	['fibercomposite',98],
	['lucentcompound',404],
	['opulentcompound',128],
	['glossycompound',130],
	['crystalcompound',322],
	['darkcompound',361],
	['basemetals',410],
	['heavymetals',497],
	['noblemetals',169],
	['reactivemetals',825],
	['toxicmetals',371],
	['reactivegas',96],
	['noblegas',188],
	['industrialfibers',630],
	['supertensileplastics',258],
	['polyaramids',161],
	['coolant',296],
	['condensates',128],
	['constructionblocks',154],
	['nanites',239],
	['silicateglass',681],
	['smartfabunits',285],
	['heavywater',5],
	['suspendedplasma',13],
	['liquidozone',76],
	['ionicsolutions',254],
	['oxygenisotopes',750],
	['plasmoids',2325],
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
