var date = require("date-and-time");
var http = require("http");

var hostname = "127.0.0.1";
var port = 3030;

var server = http.createServer((req, res, next) => {
  res.status = 200;
  res.end(
    JSON.stringify({
      status: "OK",
      time: date.format(new Date(), "DD-MM-YYYY")
    })
  );
});

server.listen(port, hostname, function() {
  console.log("Server running at http://%s:%s/", hostname, port);
});
