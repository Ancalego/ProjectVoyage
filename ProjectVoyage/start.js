/* eslint-disable linebreak-style,indent */
var express = require("express");
var app = express();
var mysql = require('mysql');


app.get("/", function (req, res) {
    res.sendFile( __dirname + "\\" + "login.html");
});

app.get("/ok", function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "0000",
        database: "voyage"
    });
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!");
        var sql = 'SELECT password FROM users WHERE username = "' + req.query.username + '";';
        console.log(sql);
        con.query(sql, function (err, result){
            if (err) throw err;

            else if (req.query.password == result[0].password){
                res.sendFile( __dirname + "\\" + "main.html");
            }
            else{
                res.sendFile( __dirname + "\\" + "login.html");
            }
            console.log("Result: " + result[0].password);
        });
    });

    response = {
        username:req.query.username,
        password:req.query.password
    }
    console.log(response);
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