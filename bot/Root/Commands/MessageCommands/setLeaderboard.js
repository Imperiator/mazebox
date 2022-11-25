const mongoose = require("mongoose");
const Score = require("../../models/Score");
const Messages = require("../../models/Messages");
const { run } = require("./leaderboard");
var fs = require('fs');

module.exports = {
  name: "setlb",
  run: async (client, message, args, container) => {
    const lbchannel = client.channels.cache.get("951432701238468658");
    if (!lbchannel) return console.log("Le channel leaderboard n'existe pas");
    await Messages.deleteMany({});
    //send message and store id ind ids.messages
    const loop = async () => {
      for(let i = 0; i < 3; i++) {
        await lbchannel.send(`map ${i+1}`).then(
          async msg => {
            console.log("message id " + msg.id);
            await Messages.create({
              message: msg.id,
              map: i+1
            });
          }
        );
      };
    };
    loop()
    .then(() => {
    message.reply("Ok boss :thumbsup:");
    run(client, message, args, container);
    });
  },
};
