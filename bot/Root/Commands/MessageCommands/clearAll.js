const mongoose = require("mongoose");
const Score = require("../../models/Score");
const {run} = require("./leaderboard");


module.exports = {
  name: "clearAll",
  run: async (client, message, args, container) => {
    //remove all users from database 
    await Score.deleteMany({});
    run(client, message, args, container);
    
  },
};
