const mongoose = require("mongoose");
const Score = require("../../models/Score");
const Messages = require("../../models/Messages");

const Discord = require("discord.js");
var fs = require("fs");

module.exports = {
  name: "leaderboard",
  run: async (client, message, args, container) => {
    const lbchannel = client.channels.cache.get("951432701238468658");
    if (!lbchannel) return console.log("Le channel leaderboard n'existe pas");

    for (let i = 0; i < 3; i++) {
      const scores = await Score.find({ map: `${i + 1}` });
      const LBMessage = await Messages.find({ map: `${i + 1}` });
      const sortedScores = scores.sort((a, b) => b.score - a.score);
      const top10 = sortedScores.slice(0, 10);
      const embed = new Discord.MessageEmbed()
        .setTitle("High Score Leaderboard for level " +`${i+1}`)
        .setColor("#ff0000")
        .setThumbnail("https://img.imperiator.tk/MAZE%20BOX%282%29.png")
        .setTimestamp();
      for (let i = 0; i < top10.length; i++) {
        embed.addField(`${i + 1}. ${top10[i].user}`, `${top10[i].score}`);
      }
      lbchannel.messages
        .fetch(LBMessage[0].message)
        .then((msg) => msg.edit({content: ' ', embeds: [embed] }));
    }

    // lbchannel.bulkDelete(99);
    // lbchannel.messages
    //   .fetch("951521461099720804")
    //   .then((msg) => msg.edit({ embeds: [embed] }));
    // lbchannel.send({embeds: [embed]});
    console.log("Le leaderboard a été envoyé dans le channel leaderboard");
    //delete message afeter 5 seconds
    // .then(msg => {
    //     setTimeout(()=>{
    //         msg.delete()
    //     }, 5000)
    // });
  },
};
