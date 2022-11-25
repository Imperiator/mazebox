const mongoose = require("mongoose");
const Score = require("../../models/Score");


module.exports = {
  name: "score",
  run: async (client, message, args, container) => {
    const user = args[0];
    const level = args[1] || 1;
    if (!user) { return message.reply("Please provide a user. Example: !score id [level]")};
    var scorer = await Score.findOne({user: user, map: level});
    if (!scorer) {
        message.reply("This user has no score for this level yet.");
    } else {
        message.reply(`${user} has ${scorer.score} points in level ${level}`);
    }
  },
};
