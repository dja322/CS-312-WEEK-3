

//include dependencies
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

//initialize global array
let items = [];

app.get("/", function(req, res){
    //initialize date variables
    let today = new Date();
    let day = "";

    //create options object
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    //gets day in en-US format
    day = today.toLocaleDateString("en-US", options);

    //renders lists of items todo
    res.render('lists', {kindOfDay: day, newListItems: items});
});

//adds new item to list
app.post("/", function(req, res) {
    let item = req.body.newItem;

    items.push(item);
    
    res.redirect("/");
});


//Says which port to listen to
app.listen(3000, function(){
  console.log("Port on 3000");
});