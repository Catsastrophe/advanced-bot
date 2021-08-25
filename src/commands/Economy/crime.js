const config = require("../../../config");
const db = require("quick.db");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("crime")
    .setDescription("Commit a crime in hopes of making money."),
  async execute(interaction, client) {
    if (client.crimeCooldown.has(interaction.member.id)) {
      await interaction.reply({
        content:
          "**❌ | You are on cooldown for this command, come back later!**",
        ephemeral: true,
      });
    } else {
      const successCrimes = [
        "robbed a Rolex store",
        "robbed a Bank",
        "hacked the Government",
        "stole a car",
        "committed tax fraud",
        "raided Area 51",
        "robbed a house",
        "assassinated the Prime Minister",
        "assassinated a random person",
      ];
      const failCrimes = [
        "rob a Rolex store",
        "rob a Bank",
        "hack the Government",
        "steal a car",
        "commit tax fraud",
        "raid Area 51",
        "rob a house",
        "assassinate the Prime Minister",
        "assassinate a random person",
      ];
      const payouts = [
        126000, 450000, 350000, 225000, 49000, 435600, 145000, 1190000, 695000,
      ];

      let crimes = client.db.get(`${interaction.member.id}_crimes`);
      let balance = client.db.get(`${interaction.member.id}_balance`);
      let crimecount;
      let chance;

      if (crimes === null) crimecount = 0;
      else crimecount = crimes;

      if (balance < 24999) {
        return await interaction.reply({
          content:
            "**❌ | You do not have enough money to commit a crime, you need at least **`25000`**!**",
          ephemeral: true,
        });
      }

      if (crimecount < 2) chance = 20;
      else if (crimecount < 5) chance = 30;
      else if (crimecount < 7) chance = 35;
      else if (crimecount < 10) chance = 45;
      else chance = 50;

      let rand = Math.floor(Math.random() * 100) + 1;
      if (rand <= chance) {
        // win
        let crime = Math.floor(Math.random() * successCrimes.length) + 0;
        client.db.set(`${interaction.member.id}_crimes`, crimecount + 1);
        client.db.set(
          `${interaction.member.id}_balance`,
          balance + payouts[crime]
        );
        await interaction.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `You successfully **${successCrimes[crime]}** and got **${
                  payouts[crime]
                }**, well done!\nYou have now committed a total of **${client.db.get(
                  `${interaction.member.id}_crimes`
                )} crimes.**`
              )
              .setColor("GOLD"),
          ],
        });
      } else {
        // loose
        let crime = Math.floor(Math.random() * successCrimes.length) + 0;
        client.db.set(`${interaction.member.id}_crimes`, crimecount + 1);
        client.db.set(`${interaction.member.id}_balance`, balance - 25000);
        await interaction.reply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `You failed!\nYou tried to **${
                  failCrimes[crime]
                }** and lost out on **${
                  payouts[crime]
                }**!\nYou have now committed a total of **${client.db.get(
                  `${interaction.member.id}_crimes`
                )} crimes.**\n**\`25000\`** has been taken from your balance.\n**Better luck next time!**`
              )
              .setColor("RED"),
          ],
        });
      }

      client.crimeCooldown.add(interaction.member.id);
      setTimeout(() => {
        client.crimeCooldown.delete(interaction.member.id);
      }, 30000);
    }
  },
};
