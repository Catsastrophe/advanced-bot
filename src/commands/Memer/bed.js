const config = require('../../../config');
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bed')
		.setDescription('Create a meme off a user\'s image or text.')
        .addUserOption(option => option.setName('user').setDescription('Avatar for image command').setRequired(true))
        .addUserOption(option => option.setName('user1').setDescription('Second avatar for image command').setRequired(true)),
	async execute(interaction, client) {
		let user = interaction.options.getUser('user');
		let user1 = interaction.options.getUser('user1');
        await interaction.deferReply();
        client.memer.bed(user.displayAvatarURL({format: 'png'}), user1.displayAvatarURL({format: 'png'})).then(image => {
            const img = new MessageAttachment(image, "bed.png");
            let emb = new MessageEmbed()
                .setImage("attachment://bed.png")
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