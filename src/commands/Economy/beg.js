const config = require("../../../config");
const db = require("quick.db");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beg")
    .setDescription("Beg for money."),
  async execute(interaction, client) {
    let balance = client.db.get(`${interaction.member.id}_balance`);

    if (balance < 2500) {
      let pay = Math.floor(Math.random() * 2250) + 500;
      client.db.set(`${interaction.member.id}_balance`, balance + pay);
      let emb = new MessageEmbed()
        .setDescription(
          `You begged on the streets and got **\`${pay}\`**.\nYou now have **\`${client.db.get(
            `${interaction.member.id}_balance`
          )}\`** in your bank.`
        )
        .setColor("GREEN");
      interaction.reply({ embeds: [emb] });
    } else {
      await interaction.reply({
        content: "❌ | You have too much money for begging!",
        ephemeral: true,
      });
    }
  },
};
