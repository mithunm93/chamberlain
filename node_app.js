var express = require("express");
var private = require("./private");
var constants = require("./constants");
var bodyParser = require("body-parser");
var exec = require("child_process").exec;

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/control", function (req, res) {
  if (req.body.secret === private.secret) {
    function puts(error, stdout, stderr) { console.log(stdout) }
    let action;

    switch (req.body.action) {
      case constants.actions.open:
        action = constants.actions.open;
        break;
      case constants.actions.close:
        action = constants.actions.close;
        break;
      default:
        break;
    }

    if (action){
      exec("casperjs casperjs_app.js " + action, puts);
      res.send(action + " executed");
    } else res.send("Invalid action");
  } else console.log("Error: wrong secret!")
});

app.listen(port, function () {
  console.log("Example app listening on port " + port + "!")
});

