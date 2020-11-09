const Discord = require('discord.js');


const orePricesTwo = [
    ['veldspar',6],
    ['scordite',14],
    ['pyroxeres',340],
    ['plagioclase',20],
    ['omber',43],
    ['kernite',89],
    ['jaspet',1465],
    ['hemorphite',955],
    ['hedbergite',744],
    ['spodumain',723],
    ['darkochre',368],
    ['gniess',291],
    ['crokite',2633],
    ['bistot',2723],
    ['arkonor',2423],
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
				if (args[i] === orePricesTwo[j][0]) {
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
		const agree2 = "✅";
		const agree3 = "👍";

	const oreInvoice = new Discord.MessageEmbed()
	.setTitle('Status: Sell Ore Request')
	.setAuthor(message.author.username, message.author.avatarURL())
	.setColor(9807270) 
	.addFields({ name: args, value: '----------', inline: true},
		{ name: 'Total isk', value: formatMoney(quoteOutputTwo)}
		
	)

	.setTimestamp()
	.setFooter('Does the ore contract match the above?')
	;
	
	
	message.channel.send(oreInvoice).then( async msg => {
		await msg.react(agree1)
		await msg.react(disagree1)
				
		const disagreeFilter = (reaction, user) => reaction.emoji.name === '❌' && reaction.message.guild.member(user).roles.cache.has('773244425291300896');
		const agreeFilter1 = (reaction, user) => reaction.emoji.name === '☑️'  && reaction.message.guild.member(user).roles.cache.has('773244425291300896');;
				
		const disagreeR1 = msg.createReactionCollector(disagreeFilter);
		const agreeR1 = msg.createReactionCollector(agreeFilter1);
		
		
		//disagree1 = Incorrect Ore
		disagreeR1.on('collect', r => {
			let oreInvoice = new Discord.MessageEmbed()
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
		});

		//agree1 = Ore Correct
		agreeR1.on('collect', r => {
			let oreInvoice = new Discord.MessageEmbed()
				.setTitle('Status: Ore Accepted')
				.setDescription('Ore Accepted ☑️')
				.setAuthor(message.author.username, message.author.avatarURL())
				.setColor(11027200)
				.addFields({ name: args, value: '----------', inline: true},
					{ name: 'Total isk', value: formatMoney(quoteOutputTWo)}
				)
				.setTimestamp()
				.setFooter('Has contract requesting isk been sent?')
			msg.edit(oreInvoice)
			msg.reactions.cache.get("❌").remove()
			msg.reactions.cache.get("☑️").remove()
			msg.react(agree2).then( async r => {
			message.channel.send(`Please send contract to Econmartin requesting ${formatMoney(quoteOutputTwo)} isk then press ✅`)
			
			
			const agreeFilter2 = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
			const agreeR2 = msg.createReactionCollector(agreeFilter2);

			await agreeR2;

			agreeR2.on('collect', r => {
				let oreInvoice = new Discord.MessageEmbed()
					.setTitle('Status: Payment Contract Sent')
					.setDescription('Ore Accepted ☑️' + ' Payment Contract Sent ✅ ')
					.setAuthor(message.author.username, message.author.avatarURL())
					.setColor(15105570)
					.addFields({ name: args, value: '----------', inline: true},
						{ name: 'Total isk', value: formatMoney(quoteOutputTwo)}
					)
					.setTimestamp()
					.setFooter('Has contract been paid?')
				msg.edit(oreInvoice)
				msg.reactions.cache.get("✅").remove()
				msg.react(agree3).then( async r => {

				const agreeFilter3 = (reaction, user) => reaction.emoji.name === '👍'  && reaction.message.guild.member(user).roles.cache.has('773244425291300896');;
				const agreeR3 = msg.createReactionCollector(agreeFilter3);

				await agreeR3;
						
				agreeR3.on('collect', r => {
					let oreInvoice = new Discord.MessageEmbed()
						.setTitle('Status: Complete')
						.setDescription('Ore Accepted ✅' + ' Payment Contract Sent ☑️ ' + 'Contract Paid 👍')
						.setAuthor(message.author.username, message.author.avatarURL())
						.setColor(3066993)
						.addFields({ name: args, value: '----------', inline: true},
							{ name: 'Total isk', value: formatMoney(quoteOutputTwo)}
						)
						.setTimestamp()
						.setFooter('Thankyou for doing business with Hell To Pay Industries')
					msg.edit(oreInvoice)
					msg.reactions.cache.get("👍").remove()
					msg.edit(oreInvoice)
					
				})
				})
		})
		})
	})
	})
		
	
}
quoteTotalTwo = [];
};
