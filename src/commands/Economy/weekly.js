const config = require("../../../config");
const db = require('quick.db');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("weekly")
    .setDescription("Claim your weekly reward."),
    async execute(interaction, client) {
        if (client.weeklyCooldown.has(interaction.member.id)) {
                await interaction.reply({ content: '**❌ | You are on cooldown for this command, come back later!**', ephemeral: true });
        } else {
            let balance = client.db.get(`${interaction.member.id}_balance`);
            let num = 1000000;
            
            client.db.set(`${interaction.member.id}_balance`, balance + num);

            let emb = new MessageEmbed()
                .setDescription(`You claimed your weekly reward **\`${num}\`**.\nYou now have **\`${client.db.get(`${interaction.member.id}_balance`)}\`** in your bank.`)
                .setColor("GREEN")
            interaction.reply({embeds: [emb]})

            client.weeklyCooldown.add(interaction.member.id);
            setTimeout(() => {
                client.weeklyCooldown.delete(interaction.member.id);
            }, 604800000);
        }
    },
};
    