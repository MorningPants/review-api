const express = require("express");
const fs = require('fs');
const app = express();

const cors = require('cors')
const PORT = 8000;

app.use(cors())
app.use(express.static('public'))


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



var jsonContent = JSON.stringify(reviews);
console.log(jsonContent);
 
fs.writeFile("reviews.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});

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
