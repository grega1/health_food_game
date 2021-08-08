const fs = require("fs");

function save(filePath, fileContent) {
  const promise = new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileContent, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
  return promise;
}
function recoveryRank(name, score) {
  return new Promise((resolve, reject) => {
    console.log(name, score)
    fs.readFile("assets/js/ranking.json", (err, data) => {

      const dataRanking = JSON.parse(data);
      let foundedUserRanking = {
        name: name,
        score: score,
      };
      dataRanking.push(foundedUserRanking)
      console.log(dataRanking)
      fs.writeFile("assets/js/ranking.json", JSON.stringify(dataRanking), (err) => {
        if (err) throw err;
        resolve(foundedUserRanking);
      })


    })
  });
}
function getRank() {
  return new Promise((resolve, reject) => {

    fs.readFile("assets/js/ranking.json", (err, data) => {

      const dataRanking = JSON.parse(data);
      resolve(dataRanking);
    })
  });

}
module.exports = {
  save: save,
  getRank: getRank,
  recoveryRank: recoveryRank,
}