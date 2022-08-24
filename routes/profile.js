'use strict';

const router = express.Router();
const fs = require("fs");

const profiles = [
  {
    "id": 1,
    "title": "Hi",
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  }
];

module.exports = function () {

  router.get('/*', function (req, res, next) {

    var dataRead = [
      {
        "title": 'Testomg'
      }]

    fs.readFile("./data/list.js", "utf8", function (err, data) {
      console.log(data)
      var formattedString = "[" + data.toString().substring(0, data.length - 1) + "]";
      dataRead = JSON.parse(formattedString);
      console.log(dataRead)
    });

    res.render('profile_template', {
      profile: profiles[0],
      data: dataRead[0]
    });
  });

  router.post("/savedata", function (req, res, next) {
    console.log(req.body)
    var payload = req.body;
    try {
      fs.appendFile('./data/list.js', JSON.stringify(payload) + ",", err => {
        if (err) {
          console.error(err);
        }
      }
      )
      // file written successfully
    } catch (err) {
      console.error(err);
    }
  });

  return router;
}

