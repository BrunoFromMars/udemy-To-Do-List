const express = require("express");
const bosyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];

app.use(bosyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-IN", options);

  res.render("list", {
    kindOfDay: day,
    newItemList: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  console.log(item);
  items.push(item);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000");
});
