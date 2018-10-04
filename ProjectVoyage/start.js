/* eslint-disable linebreak-style,indent */
var express = require("express");
var app = express();


app.get("/", function (req, res) {
    res.sendFile( __dirname + "\\" + "login.html");
});

app.get("/ok", function (req, res) {
    response = {
        username:req.query.username,
        password:req.query.password
    }
    console.log(response);
    res.sendFile( __dirname + "\\" + "main.html");
    //res.end(JSON.stringify(response));
});

app.get("/index.htm", function (req, res) {
	res.sendFile( __dirname +  "\\" + "index.html" );
});

app.get("/json1", function (req, res) {
    res.sendFile( __dirname + "\\" + "json_harj1.html");
});


var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Example app listening at http://%s:%s", host, port);
});