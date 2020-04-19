var date = require("date-and-time");

var express = require("express");
var router = express.Router();

var request = require("request");

router.get("/getTime", function(req, res, next) {
  res.send(
    JSON.stringify({
      status: "OK",
      time: date.format(new Date(), "hh:mm:ss:SSS")
    })
  );
});

router.get("/getDay", function(req, res, next) {
  request("http://localhost:3030", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(
        JSON.stringify({
          status: JSON.parse(body).status,
          time: JSON.parse(body).time
        })
      );
    } else {
      if (error) {
        res.send(
          JSON.stringify({
            status: "NOK",
            message: error
          })
        );
      } else {
        res.send(
          JSON.stringify({
            status: "NOK",
            message: "Unknown error!"
          })
        );
      }
    }
  });
});

router.get("/getTimeView", function(req, res, next) {
  res.render("index", {
    time: date.format(new Date(), "hh:mm:ss:SSS")
  });
});

router.get("/getDayView", function(req, res, next) {
  request("http://localhost:3030", function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render("index", {
        time: JSON.parse(body).time
      });
    } else {
      if (error) {
        res.render("error", {
          error: error,
          message: error
        });
      } else {
        res.render("error", {
          error: error,
          message: "Unknown error!"
        });
      }
    }
  });
});

module.exports = router;
