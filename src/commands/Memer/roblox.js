const config = require('../../../config');
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roblox')
		.setDescription('Create a meme off a user\'s image or text.')
		.addUserOption(option => option.setName('user').setDescription('Avatar for image command').setRequired(true)),
	async execute(interaction, client) {
		let user = interaction.options.getUser('user');
		await interaction.deferReply();
		client.memer.roblox(user.displayAvatarURL({format: 'png'})).then(image => {
			const img = new MessageAttachment(image, 'roblox.png');
			let emb = new MessageEmbed()
				.setImage('attachment://roblox.png')
				.setFooter(`Meme for: ${interaction.member.user.tag}`)
				.setColor('RANDOM');
			wait(5000);
			interaction.editReply({embeds: [emb], files: [img]}).catch(e => console.log(e));
		});
	}
};

