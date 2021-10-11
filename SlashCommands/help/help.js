const { Client, CommandInteraction, MessageAttachment } = require("discord.js");
const fs = require('fs')
const color = require("../../color.json");
const footer = require("../../footer.json");

const gdi = new MessageAttachment('./SlashCommands/meca/guide-du-dessinateur-industriel-chevalier.pdf', 'guide-du-dessinateur-industriel-chevalier.pdf');

module.exports = {
    name: "help",
    description: "Comment recevoir de l'aide sur La Nouvelle Académie",
    type: 'MESSAGEFILE',
    /**
     * @typedef {Object} MessageFile
     * @property {Buffer|string|Stream} attachment The original attachment that generated this file
     * @property {string} name The name of this file
     * @property {Buffer|Stream} file The file to be sent to the API
     */

    run: async (client, interaction, args) => {
        interaction.reply({content:'Chargement...', ephemeral: true });

              
      if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
      const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const cmds = commands.map((command) => {
        let file = require(`../../commands/${dir}/${command}`);

        if (!file.name) return "No command name.";

        let name = file.name.replace(".js", "");

        return `\`${name}\``;
      });

      let data = new Object();

      data = {
        name: dir.toUpperCase(),
        value: cmds.length === 0 ? "In progress." : cmds.join(" "),
      };

      categories.push(data);
      });

      const embed = new MessageEmbed()
      .setTitle("📬 Need help? Here are all of my commands:")
      .addFields(categories)

      .setDescription(
        `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(roleColor);
      return message.channel.send(embed);


      } else {
      const command =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.find(
        (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
      );

      if (!command) {
      const embed = new MessageEmbed()
        .setTitle(`Invalid command! Use \`/help\` for all of my commands!`)
        .setColor(color.red);
      return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
      .setTitle("Command Details:")
      .addField("PREFIX:", `\`/\``)
      .addField(
        "COMMAND:",
        command.name ? `\`${command.name}\`` : "No name for this command."
      )
      .addField(
        "ALIASES:",
        command.aliases
          ? `\`${command.aliases.join("` `")}\``
          : "No aliases for this command."
      )
      .addField(
        "USAGE:",
        command.usage
          ? `\`/${command.name} ${command.usage}\``
          : `\`/${command.name}\``
      )
      .addField(
        "DESCRIPTION:",
        command.description
          ? command.description
          : "No description for this command."
      )
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(roleColor);
      return message.channel.send(embed);
      }

    },  
};
