const express = require("express");
const app = express();
const TIMEOUT = 10000;


// Setup logger
const rootLevelLogger = function (req, res, next) {
  let message = req.method + " " + req.path + " - " + req.ip;
  console.log("in logger", message);
  next();
};

app.use("/public", express.static(process.cwd() + "/public"));

app.use(rootLevelLogger);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Catch all final errors
app.use(function (err, req, res, next) {
  if (err) {
    res
      .status(err.status || 500)
      .type("txt")
      .send(err.message || "SERVER ERROR");
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});