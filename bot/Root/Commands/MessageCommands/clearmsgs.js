module.exports = {
  name: "clearmsg",
  run: async (client, message, args, container) => {
    const lbchannel = client.channels.cache.get("951432701238468658");
    if (!lbchannel) return console.log("Le channel leaderboard n'existe pas");
    //send message and store id ind ids.messages
    lbchannel.bulkDelete(3);
    message.reply("Ok boss :thumbsup:");
  },
};
