const express = require("express");
const app = express();
const PORT = 8000;

const reviews = {
  andy: {
    stars: 5,
    text: "Andy is great!",
  },
  callum: {
    stars: 5,
    text: "Callum is great!",
  },
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/:name", (req, res) => {
  const name = req.params.name;
  if (reviews[name]){

      res.json(reviews[name]);
    }
    else{
        res.sendStatus('404')
    }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is running on port ${PORT}.`);
});
