const mongoose = require("mongoose");
const Score = require("../../models/Score");
const {run} = require("./leaderboard");


module.exports = {
  name: "remove",
  run: async (client, message, args, container) => {
    if (!args[0])
      return message.channel.send({content: "Veuillez indiquer l'id du joueur"});
    const id = args[0];
    try {
        var user = await Score.findOneAndRemove({ user: id });
        message.channel.send({content: `${user.user} à été suprimé avec succès`});
    } catch (error) {
        message.channel.send({content: `${user.user} n'existe pas`});
    }
    run(client, message, args, container);

  },
};
