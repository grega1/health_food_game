const express = require("express");
const app = express();
const { recoveryRank, getRank } = require("./fileService.js")

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing

app.post("/ranking", (req, res) => {
  const name = req.body.name;
  const score = req.body.score;
  const rank = recoveryRank(name, score);
  rank.then((result) => {
    res.send(result);
  }).catch((err) => {
    res.send(err);
  })

})
app.get("/ranking", (req, res) => {
  const rank = getRank();
  rank.then((result) => {
    res.send(result);
  }).catch((err) => {
    res.send(err);
  })

})

app.listen(3005, () => {
  console.log("listening on 3005 otário");
})