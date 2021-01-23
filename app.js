require("./db/connection");

const express = require("express");
const app = express();
const routes = require("./api/routes");
const path = require("path");
const bodyParser = require("body-parser");

app.set("port", 3000);
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", routes);
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

const server = app.listen(app.get("port"), function(){
  const port = server.address().port;
  console.log("Listening to port", port);
})