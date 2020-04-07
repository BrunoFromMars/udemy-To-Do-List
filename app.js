const express = require("express");
const bosyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems= [];
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
    listTitle: day,
    newItemList: items
  });
});


app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newItemList: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});


app.post("/", function(req, res) {

let item = req.body.newItem;

if(req.body.list === "work"){
  workItems.push(item);
  res.redirect("/work")
}else{
  items.push(item);
  res.redirect("/");
}


  // console.log(item);
  // items.push(item);
  // res.redirect("/");
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work")
});

app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000");
});
