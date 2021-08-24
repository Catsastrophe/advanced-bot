const config = require("../../../config");
const db = require('quick.db');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim your daily reward."),
    async execute(interaction, client) {
        if (client.dailyCooldown.has(interaction.member.id)) {
                await interaction.reply({ content: '**❌ | You are on cooldown for this command, come back later!**', ephemeral: true });
        } else {
            let balance = client.db.get(`${interaction.member.id}_balance`);
            let num = 100000;
            
            client.db.set(`${interaction.member.id}_balance`, balance + num);

            let emb = new MessageEmbed()
                .setDescription(`You claimed your daily reward **\`${num}\`**.\nYou now have **\`${client.db.get(`${interaction.member.id}_balance`)}\`** in your bank.`)
                .setColor("GREEN")
            interaction.reply({embeds: [emb]})

            client.dailyCooldown.add(interaction.member.id);
            setTimeout(() => {
                client.dailyCooldown.delete(interaction.member.id);
            }, 84400000);
        }
    },
};
    