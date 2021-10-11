const { Client, Collection } = require("discord.js");
const fs = require('fs')
const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.categories = fs.readdirSync("./SlashCommands/");
["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
}); 
// Initializing the project
require("./handler")(client);

//say hello consol + activity
client.on('ready', () => {
    client.user.setPresence({ activities: [{ name: '/help' }], status: 'dnd' });

})

client.login(client.config.token);
