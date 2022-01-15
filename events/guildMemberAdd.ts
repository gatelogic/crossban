import { Client, TextChannel, MessageEmbed } from 'discord.js'
import WOKCommands from 'wokcommands'
import banSchema from '../models/ban-schema';

export default async (client: Client, instance: WOKCommands) => {
    client.on('guildMemberAdd', async (member) => {
        const all = await banSchema.find();
        var arrayLength = all.length;
        for (var i = 0; i < arrayLength; i++) {
            const user = all[i]
            const userid = user._id
            const memberid = member.id
            
            if (userid !== memberid) {
                return
            }

            const banEmbed = new MessageEmbed()
            .setTitle('You have been banned.')
            .setDescription(`You have been banned globally. This means you have been banned in all servers that use CrossBan. \n\n**Reason**: ${user.reason}\nIf you want to appeal this please fill out the form below. The bot will DM you within 7 days with a result.\nAppeals Form: `)
            .setColor(0xFF0000)
            .setFooter('CrossBan | Made by GateLogicLive#0001')

            member.send({ embeds: [banEmbed] })

            if (user._id === member.id) {
                member.ban({reason: 'On global ban list.'})
            }
        }
    });
}