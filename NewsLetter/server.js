

//include dependencies
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

//sends signup.html
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
    console.log("Sent file");
});


//subscribes user and informs them if it was successful
app.post("/", function(req, res) {
    //get user info
    var firstName = req.body.inputFirst;
    var lastName = req.body.inputLast;
    var email = req.body.inputEmail;

    //create data object from user info
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    //turns info into JSON so that it can be sent to mailchimp API
    var jsonData = JSON.stringify(data);

    //sets urls
    var url = "https://us13.api.mailchimp.com/3.0/lists/f3513933a1"

    //gets options for API authentication
    var options = {
        method: "POST",
        auth: "dja:api-key"
    }

    //sends request and informs user if it failed or succeeded
    var request = https.request(url, options, function(response){
        if (response.statusCode == 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }

        //sends dara to console
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    //writes data
    request.write(jsonData);
    request.end();

});

//if failed allows user to try again
app.post("/failure", function(req,res){
    res.redirect("/");
})

//Says which port to listen to
app.listen(process.env.PORT || 3000, function(){
  console.log("Port on 3000");
});