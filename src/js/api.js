const express = require("express");
const cors = require("cors");
const app = express();
const { recoveryRank, getRank } = require("./fileService.js")



app.use(cors())
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing

app.post("/ranking", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const rank = getRank();
  rank.then((result) => {
    res.send(result);
  }).catch((err) => {
    res.send(err);
  })
  
})

app.listen(3005, () => {
  console.log("listening on 3005");
})