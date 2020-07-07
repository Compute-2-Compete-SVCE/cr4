const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/frontpage.html");
});

app.get("/signup", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.get("/form", function(req,res){
    res.sendFile(__dirname + "/form.html");
});

app.post("/signup", function(req, res) {
    const firstName = req.body.firstname;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/fbf0e5c618"

    const options = {
        method: "POST",
        auth: "viki5156:454d42314ad42ecdd8e40d1a98afa914-us8"
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/form", function(req, res) {

    const newEventName = req.body.eventname;
    const startTime = req.body.startdate;
    const endTime = req.body.enddate;
    const currency = req.body.currency;

    var data = {
        event: {
            name: {
                html: "pubG battle royal"
            },
            start: {
                timezone: "America/Los_Angeles",
                utc: "2020-07-11T02:00:00Z"
            },
            end: {
                timezone: "America/Los_Angeles",
                utc: "2020-07-21T02:00:00Z"
            },
            currency: "USD"
        }
    }

    var jsonData = JSON.stringify(data);

    const url = "https://www.eventbriteapi.com/v3/organizations/456317456066/events/";

    const options = {
        method: "POST",
        headers: {
            Authorization: "Bearer SGADKQST2E2ALBESKP7D",
            Accept: "application/json"
        }
    }

    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });
    console.log(jsonData);
    request.write(jsonData);
    request.end();

});









app.listen(3000, function() {
    console.log("Server running on port 3000");
});
