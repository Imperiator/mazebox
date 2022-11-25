const mongoose = require("mongoose");
const Score = require("../../models/Score");
const {run} = require("./leaderboard");


module.exports = {
  name: "test",
  run: async (client, message, args, container) => {
    const lbchannel = message.guild.channels.cache.find(
        channel => channel.name === "leaderboard"
    );
    lbchannel.messages.fetch('951432701238468658').then(msg => msg.edit('prout'))
  },
};
