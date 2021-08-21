const fs = require('fs');
const config = require('../config');
const Meme = require('memer-api');
const colour = require('colour');
const { Client, Intents, Collection } = require('discord.js');

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

/*

> Coded by Lorne#0211
> https://discord.gg/bUMcVASrJM
> https://twitter.com/Lorne_Booker
> https://github.com/lornebookerr

*/