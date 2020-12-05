const Discord = require('discord.js');


const orePricesTwo = [
    ['veldspar',6],
    ['scordite',12],
    ['pyroxeres',272],
    ['plagioclase',17],
    ['omber',37],
    ['kernite',76],
    ['jaspet',898],
    ['hemorphite',538],
    ['hedbergite',558],
    ['spodumain',674],
    ['darkochre',282],
    ['gneiss',250],
    ['crokite',1724],
    ['bistot',1865],
    ['arkonor',1714],
    ['mercoxit',0],
];

let quoteTotalTwo = [];
let oreArray = [];
let oreNumber = [];

function formatMoney(number) {
    return number.toLocaleString('en-US', { style: 'decimal', currency: 'USD' });
};


module.exports = (message, args) =>  {
		

		if (args.length < 2) {return message.reply("No Values Input :pensive: Try '!ore veldspar 1000 scordite 1000...'")}
	else {

		for (let i = 0; i < args.length; i++) {
			for (let j = 0; j < orePricesTwo.length; j++) {
				if (args[i].toLowerCase() === orePricesTwo[j][0]) {
					quoteTotalTwo.push(args[i+1] * orePricesTwo[j][1]);
				}
				console.log(quoteTotalTwo);
			}  
		};
		
		for (let l = 0; l < args.length; l+=2) {
			oreArray.push(args[l])
		}
		console.log(oreArray);
	
		for (let m = 1; m < args.length; m+=2) {
			oreNumber.push(args[m])
		}
		console.log(oreNumber);
	
		const quoteOutputTwo = quoteTotalTwo.reduce((a,b) => a+b,0);
		
		const disagree1 = "❌";
		const agree1 = "☑️";


	let oreInvoice = new Discord.MessageEmbed()
	.setTitle('Status: Sell Ore Request')
	.setAuthor(message.author.username, message.author.avatarURL())
	.setColor(15105570) 
	.addFields({ name: args, value: '----------', inline: true},
		{ name: 'Total isk', value: formatMoney(quoteOutputTwo)}
	)
	.setTimestamp()
	.setFooter('Send contract with ore to Ecomartin requesting isk amount below')
	;
	
	message.channel.send(oreInvoice).then( msg => {
		msg.react(agree1)
		msg.react(disagree1)
		message.reply(`Please send contract with ore to Econmartin requesting ${formatMoney(quoteOutputTwo)} isk`)
				
		const agreeDisagree = (reaction, user) =>  reaction.message.guild.member(user).roles.cache.has('773244425291300896');
		const agreeOrDisagree = msg.createReactionCollector(agreeDisagree);
		
		agreeOrDisagree.on('collect', reaction => {
			
			//disagree1 = Incorrect Ore
			switch (reaction.emoji.name)  {
				// ore incorrect
				case '❌': 
					oreInvoice = new Discord.MessageEmbed()
					.setTitle('Status: Rejected(Incorrect Ore)')
					.setAuthor(message.author.username, message.author.avatarURL())
					.setColor(15158332)
					.addFields({ name: args, value: '----------', inline: true},
						{ name: 'Total isk', value: formatMoney(quoteOutputTwo)}
					)
					.setTimestamp()
					.setFooter("Ore contract didn't match discord")
				msg.edit(oreInvoice)
				msg.reactions.removeAll()
				message.reply('Looks like you entered the incorrect type or amount of ore. Please check your contract and submit again.')
				break;

				//ore correct
				case '☑️':
					oreInvoice = new Discord.MessageEmbed()
					.setTitle('Status: Complete')
					.setDescription('Ore Accepted ☑️')
					.setAuthor(message.author.tag, message.author.avatarURL())
					.setColor(3066993)
					.addFields({ name: args, value: '----------', inline: true},
						{ name: 'Total isk', value: formatMoney(quoteOutputTwo)}
					)
					.setTimestamp()
					.setFooter('Thanks for doing business with HTP')
				msg.edit(oreInvoice)
				msg.reactions.cache.get("❌").remove()
				msg.reactions.cache.get("☑️").remove()
			}
		})
	})
		
	
}
quoteTotalTwo = [];
};
