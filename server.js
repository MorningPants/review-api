const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cors());

let users = JSON.parse(fs.readFileSync("users.json"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/:name", (req, res) => {
  const name = req.params.name;
  var user = users.filter(obj => {
    return obj.user.login.toLowerCase() === name
  })
  console.log(user)
  if (user) {
    res.json(user);
  } else {
    res.sendStatus("404");
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on ${process.env.PORT || PORT}.`);
});

app.post("/addUser", (request, response) => {

  let newUser = request.body;
  newUser.reviews = [];
  console.log(newUser.user.login);

  if (!users.some((e) => e.user.login === newUser.user.login)) {
    users.push(newUser);
    var jsonUsers = JSON.stringify(users);

    fs.writeFile("users.json", jsonUsers, "utf8", function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("User has been added to the server filesystem.");
    });
  } else {
    console.log("User already in system.");
  }
});
