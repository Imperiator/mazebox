const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { run } = require("../../bot/Root/Commands/MessageCommands/leaderboard");
const Score = require("../../server/models/Score");
const client = require("../../bot/bot.js").client;

router.get("/addscore/:id/:score/:map", async (req, res, next) => {
  res.json(req.params);
  if (!req.params.id || !req.params.score)
    return res.status(400).send({
      message: "Veuillez indiquer l'id du joueur et le score",
    });
  const id = req.params.id;
  const score = req.params.score;
  if (isNaN(score))
    return res.status(400).send({
      message: "Veuillez indiquer un score valide",
    });
  const map = req.params.map;
  if (!map) map = 1;
  var user = await Score.findOne({ user: id, map: map });
  if (user) {
    if (score > user.score) {
      await Score.findOneAndUpdate(
        { user: id, map: map },
        { score: `${Number(score)}` }
      );
    }
  } else {
    await Score.create({ user: id, score: score, map: map });
  }
  user = await Score.findOne({ user: id, map: map });
  run(client, map);
  next();
});

router.get("/clearall", async (req, res, next) => {
  await Score.deleteMany({});
  run(client);
  res.json({
    message: "Tout les scores ont été suprimés",
  });
  next();
});

router.get("/remove/:id/:map", async (req, res, next) => {
  if (!req.params.id)
    return res.status(400).send({
      message: "Veuillez indiquer l'id du joueur",
    });
  const id = req.params.id;
  const map = req.params.map;
  try {
    var user = await Score.findOneAndRemove({ user: id, map: map });
    res.json({
      message: `${id} à été suprimé avec succès`,
    });
  } catch (error) {
    res.json({
      message: `${id} n'existe pas`,
    });
  }
  run(client);
  next();
});

router.get("/scores/:map", async (req, res, next) => {
  const map = req.params.map;
  if (map === "all") {
    var scores = await Score.find({});
  } else {
    var scores = await Score.find({ map: map });
  }
  const sortedScores = scores.sort((a, b) => b.score - a.score);
  res.json(sortedScores);
  next();
});

// router.get("/setusername/:id/:pseudo/:code", async(req, res, next) => {
//  //get body params
//   const id = req.params.id;
//   const pseudo = req.params.pseudo;
//   const code = req.params.code;

//   if (!id || !code || !pseudo)
//     return res.status(400).send({
//       message: "Please provide an id, code and pseudo",
//     });

//   var user = await Score.findOne({ user: id });
//   if (user) {
//     if (user.code === code) {
//       await Score.findOneAndUpdate({ user: id }, { user: pseudo });
//       res.json({
//         message: `${id} as been updated with ${pseudo}`,
//       });
//       run(client);
//     } else {
//       res.json({
//         message: `${id} not found`,
//       });
//     }
//   }
//   next();
// })

router.get("/setcode/:id/:code", async (req, res, next) => {
  if (!req.params.id)
    return res.status(400).send({
      message: "Veuillez indiquer l'id du joueur",
    });
  const id = req.params.id;
  const code = req.params.code;
  if (!code)
    return res.status(400).send({
      message: "Veuillez indiquer le code de confirmation",
    });
  var user = await Score.findOne({ user: id });
  if (user) {
    await Score.findOneAndUpdate({ user: id }, { code: code });
    res.json({
      message: `${id} à été mis à jour avec succès ( code ajouté )`,
    });
  } else {
    res.json({
      message: `${id} n'existe pas`,
    });
  }
});

router.get("/setpseudo/:id/:pseudo/:code", async (req, res, next) => {
  const id = req.params.id;
  const pseudo = req.params.pseudo;
  const code = req.params.code;
  var user = await Score.findOne({ user: id });
  var userExisting = await Score.findOne({ user: pseudo });
  if(!id || !pseudo || !code)
    return res.status(400).send({
      message: "Veuillez indiquer l'id du joueur, le pseudo et le code",
    });
  if(!user)
    return res.status(400).send({
      message: "Veuillez indiquer un id valide",
    });
  if(userExisting)
    return res.status(400).send({
      message: "Ce pseudo est déjà utilisé",
    });
  if (user.code === code) {
    await Score.findOneAndUpdate({ user: id }, { user: pseudo });
    res.status(200).send({
      message: `${id} as been updated to ${pseudo}`,
    });
    run(client);
  } else {
    res.status(200).send({
      message: `${id} not found`,
    });
  }
    
});
module.exports = router;
