const config = require("../../../config");
const db = require('quick.db');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("work")
    .setDescription("Work for the day and get money."),
    async execute(interaction, client) {
        if (client.talkedRecently.has(interaction.member.id)) {
                await interaction.reply({ content: '❌ | You are on cooldown for this command, come back later!', ephemeral: true });
        } else {
            let balance = client.db.get(`${interaction.member.id}_balance`);
            let working_hours = client.db.get(`${interaction.member.id}_work_hours`);
            let num = 0;

            if (!working_hours) num = Math.floor(Math.random() * 10501) + 10000;
            else if (working_hours == 1) num = 10500;
            else if (working_hours == 2) num = Math.random() < 0.5 ? 11111 : 12000;
            else if (working_hours == 3) num = Math.random() < 0.5 ? 15000 : 16000;
            else if (working_hours == 4) num = Math.random() < 0.5 ? 17000 : 18000;
            else if (working_hours == 5) num = [21000, 22000, 23000, 24000, 25000, 26000][Math.random() * 6]
            else if (working_hours == 6) num = [27000, 28000, 29000, 30000, 31000, 32000][Math.random() * 6]
            else if (working_hours == 7) num = [35000, 40000, 42000][Math.random() * 3]
            else if (working_hours == 8) num = 45000;
            else num = working_hours * 5000
            
            client.db.set(`${interaction.member.id}_work_hours`, working_hours + 1);
            client.db.set(`${interaction.member.id}_balance`, balance + num);

            let emb = new MessageEmbed()
                .setDescription(`You worked as a **${client.chance.profession()}** and made **\`${num}\`**.\nYou now have **\`${client.db.get(`${interaction.member.id}_balance`)}\`** in your bank.\nYou have worked a total of **\`${client.db.get(`${interaction.member.id}_work_hours`)}\`** hours.`)
                .setColor("GREEN")
            interaction.reply({embeds: [emb]})

            client.talkedRecently.add(interaction.member.id);
            setTimeout(() => {
                client.talkedRecently.delete(interaction.member.id);
            }, 28000000);
        }
    },
};
    