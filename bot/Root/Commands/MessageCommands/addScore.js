const mongoose = require("mongoose");
const Score = require("../../models/Score");
const {run} = require("./leaderboard");


module.exports = {
  name: "addscore",
  run: async (client, message, args, container) => {
    if (!args[0])
      return message.channel.send({content: "Veuillez indiquer l'id du joueur"});
    const id = args[0];
    var score = args[1];
    if (!score) return message.channel.send({content: "Veuillez indiquer le score"});
    var user = await Score.findOne({ user: id });
    if (user) {
      if (score > user.score) {
        await Score.findOneAndUpdate(
          { user: id },
          { score: `${Number(score)}` }
        )
        ;
 
      }
    } else {
      await Score.create({ user: id, score: score });
    }
    user = await Score.findOne({ user: id });
    message.channel.send({content: `${user.user} a meilleur score de ${user.score} points`});
    run(client, message, args, container);
  },
};
