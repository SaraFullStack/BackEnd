const radar = require("../modules/radar");

const appRouter = (app, fs) => {
  app.get("/", (req, res) => {
    res.send("DROID R0-GR ON");
  });

  var request;

  app.post("/radar", (req, res) => {
    try {
      var data = JSON.parse(JSON.stringify(req.body));
      //evaluates received json
      request = radar.peticion(data);
    } catch (ex) {
      //composes json with caught error
      request = JSON.parse(`{"Error":"${ex.message}"}`);
    }
    res.send(request);
  });
};

module.exports = appRouter;
