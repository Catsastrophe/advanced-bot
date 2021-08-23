const fs = require('fs');
const DisTube = require("distube");
const config = require('../config');
const Meme = require('memer-api');
const colour = require('colour');
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');

const client = new Client({
	intents:[Intents.FLAGS.GUILDS],
	presence: {
		status: 'online',
		activity: {
			name: 'with slash commands',
			type: 'PLAYING'
		}
	},
	shards: 'auto',
	disableEveryone: true
});

client.commands = new Collection();
client.memer = new Meme(config.apis.memer);

client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true })

require('dotenv').config();

const functions = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
const eventsFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/commands');

(async () => {
	for (file of functions){
		require(`./functions/${file}`)(client);
	}

	client.handleEvents(eventsFiles, './src/events');
	client.handleCommands(commandFolders, './src/commands');
	client.login(process.env.SECRET);
})();

client.distube
	.on('playSong', (interation,queue,song) => {
		var playingEmbed = new MessageEmbed()
			.setTitle(`${song.title}`)
			.addField(`Duration:`, `**\`${song.formattedDuration}\`**`, true)
			.addField(`Views:`, `**\`${song.views}\`**`, true)
			.addField(`Link:`, `[\`CLICK HERE\`](${song.url})`, true)
			.setAuthor(song.user.tag, song.user.displayAvatarURL())
			.setTimestamp()
			.setThumbnail(song.thumbnail)
		
		interation.channel.send({embeds: [playingEmbed]})
	})
	.on('addSong', (interation,queue,song) => {
		
	})
	.on('playList', (interation,queue,song) => {
		
	})
	.on('addList', (interation,queue,song) => {
		
	})
	.on('searchResult', (interation,queue,song) => {
		
	})
	.on('searchCancel', (interation,queue,song) => {
		
	})
	.on('error', (interation,queue,song) => {
		
	})

/*

> Coded by Lorne#0211
> https://discord.gg/bUMcVASrJM
> https://twitter.com/Lorne_Booker
> https://github.com/lornebookerr

*/