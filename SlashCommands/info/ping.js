const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const wait = require('util').promisify(setTimeout);
const color = require("../../color.json");
const footer = require("../../footer.json");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const user = interaction.user
        interaction.reply({content:'Pong...', ephemeral: true });
        await wait(300);


        
        if(Date.now() - interaction.createdTimestamp <=30){

            const ping1 = new MessageEmbed()
            .setColor(color.orange)
            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Ping : **${Date.now() - interaction.createdTimestamp} ms.** 🟩`)
            .setFooter(client.user.tag)
            .setTimestamp();

            await interaction.editReply({ embeds: [ping1], ephemeral: true }); 




        }else if(Date.now() - interaction.createdTimestamp <=50){

            const ping2 = new MessageEmbed()
            .setColor(color.orange)
            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
            .setTitle(`Ping : **${Date.now() - interaction.createdTimestamp} ms.** 🟨`)
            .setFooter(client.user.tag)
            .setTimestamp();

            await interaction.editReply({ embeds: [ping2], ephemeral: true }); 




        }else if(Date.now() - interaction.createdTimestamp <150){

            const ping3 = new MessageEmbed()
            .setColor(color.orange)
            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
            .setTitle(`Ping : **${Date.now() - interaction.createdTimestamp} ms.** 🟧`)
            .setFooter(client.user.tag)
            .setTimestamp();

            await interaction.editReply({ embeds: [ping3], ephemeral: true }); 




        }else if(Date.now() - interaction.createdTimestamp >150){

            const ping4 = new MessageEmbed()
            .setColor(color.orange)
            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
            .setTitle(`Ping : **${Date.now() - interaction.createdTimestamp} ms.** 🟥`)
            .setFooter(client.user.tag)
            .setTimestamp();

            await interaction.editReply({ embeds: [ping4], ephemeral: true }); 


        }



        

    },
};
