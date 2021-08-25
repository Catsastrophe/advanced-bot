const config = require("../../../config");
const db = require("quick.db");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("Check your balance.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user's balance you want to see.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    var balance;
    if (!user) {
      balance = client.db.get(`${interaction.member.id}_balance`);
      let emb = new MessageEmbed()
        .setDescription(`You currently have **\`${balance}\`** in your bank`)
        .setColor("AQUA");
      return interaction.reply({ embeds: [emb] });
    } else {
      balance = client.db.get(`${user.id}_balance`);
      if (balance === null) {
        client.db.set(`${user.id}_balance`, 0);
      }
      let emb = new MessageEmbed()
        .setDescription(
          `${user.tag} currently has **\`${client.db.get(`${user.id}_balance`)}\`** in their bank`
        )
        .setColor("AQUA");
      return interaction.reply({ embeds: [emb] });
     
    }
  },
};
