const config = require("../../../config");
const fetch = require("node-fetch");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("animequote")
    .addStringOption((option) =>
      option
        .setName("anime")
        .setDescription("The anime you want to search for.")
    )
    .addStringOption((option) =>
      option
        .setName("character")
        .setDescription("The character you want to search for.")
    )
    .setDescription("Search for anime quotes."),
  async execute(interaction, client) {
    let anime = interaction.options.getString("anime");
    let character = interaction.options.getString("character");
    let quote = "";
    if (anime) {
      anime = anime.split(" ").join("%20");
    } else if (character) {
      character = character.split(" ").join("%20");
    }
    if (anime) {
      // https://animechan.vercel.app/api/quotes/anime?title=
      fetch(`https://animechan.vercel.app/api/quotes/anime?title=${anime}`)
        .then((response) => response.json())
        .then((quotes) => {
        //   console.log(quotes);
          quote = quotes[0];
          let emb = new MessageEmbed()
            // .setTitle(`${res.englishTitle} (${res.japaneseTitle})`)
            // .setThumbnail(res.picture)
            .addField("Anime", `${quote.anime}`, true)
            .addField("Character", `${quote.character}`, true)
            .addField("Quote", `${quote.quote}`, false)
            .setTimestamp()
            .setFooter(config.embeds.embedFooterText)
            .setColor("AQUA");

          interaction.reply({ embeds: [emb] });
        });
    } else if (character) {
        
      // https://animechan.vercel.app/api/quotes/character?name=
      fetch(
        `https://animechan.vercel.app/api/quotes/character?name=${character}`
      )
        .then((response) => response.json())
        .then((quotes) => {
        //   console.log(quotes);
          quote = quotes[0];
          let emb = new MessageEmbed()
            // .setTitle(`${res.englishTitle} (${res.japaneseTitle})`)
            // .setThumbnail(res.picture)
            .addField("Anime", `${quote.anime}`, true)
            .addField("Character", `${quote.character}`, true)
            .addField("Quote", `${quote.quote}`, false)
            .setTimestamp()
            .setFooter(config.embeds.embedFooterText)
            .setColor("AQUA");

          interaction.reply({ embeds: [emb] });
        });
    } else if (anime && character) {
      return interaction.reply({
        content: `❌ | You cannot provide both a **\`anime\`** and a ** \`character\`**.`,
      });
    } else {
      return interaction.reply({
        content: `❌ | You need to provide either an **anime** or **character**.`,
      });
    }
  },
};
