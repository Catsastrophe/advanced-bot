const config = require('../../../config');
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('changemymind')
		.setDescription('Create a meme off a user\'s image or text.')
        .addStringOption(option => option.setName('text').setDescription('Text for image command').setRequired(true)),
	async execute(interaction, client) {
		let text = interaction.options.getString('text');
        await interaction.deferReply();
        client.memer.changemymind(text).then(image => {
            const img = new MessageAttachment(image, "changemymind.png");
            let emb = new MessageEmbed()
                .setImage("attachment://changemymind.png")
                .setFooter(`Meme for: ${interaction.member.user.tag}`)
                .setColor("RANDOM");
            wait(5000);
            interaction.editReply({embeds: [emb], files: [img]}).catch(e => console.log(e));
        });
	}
};

/*

> Coded by Lorne#0211
> https://discord.gg/bUMcVASrJM
> https://twitter.com/Lorne_Booker
> https://github.com/lornebookerr

*/