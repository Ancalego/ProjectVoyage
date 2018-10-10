/* eslint-disable linebreak-style,indent */
var express = require("express");
var app = express();
var mysql = require('mysql');

let temp = "";


app.get("/", function (req, res) {
    res.sendFile( __dirname + "\\" + "login.html");
});

// Login getti
app.get("/ok", function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "c121112m",
        database: "voyage"
    });
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!");
        var sql = 'SELECT * FROM users WHERE username = "' + req.query.username + '";';

        console.log(sql);
        con.query(sql, function (err, result){
            if (err) throw err;

            else if (req.query.password == result[0].password){
                temp = result[0].id;
                console.log(temp);
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

app.get("/", function (req, res) {
    res.sendFile( __dirname + "\\" + "login.html");
});

// Register getti
app.get("/reg", function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "c121112m",
        database: "voyage"
    });
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!");
        var sql = 'INSERT INTO users(username,password) VALUES("'+req.query.uname+'","'+req.query.psw+'");';

        console.log(sql);
        con.query(sql, function (err, result){
            if (err) throw err;
        });
        res.sendFile( __dirname + "\\" + "login.html");

    });

    response = {
        username:req.query.username,
        password:req.query.password
    }
    console.log(response);
    //res.end(JSON.stringify(response));
});

// Add note getti
app.get("/note", function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "c121112m",
        database: "voyage"
    });
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!");
        var sql = 'INSERT INTO notes(description,location,times,dates,user_id) VALUES("'+req.query.description+'","'+req.query.location+'","'+req.query.time+'","'+req.query.date+'","'+temp+'");';

        console.log(sql);
        con.query(sql, function (err, result){
            if (err) throw err;
            else{
                res.sendFile( __dirname + "\\" + "main.html");
            }
        });

    });

    response = {
        username:req.query.username,
        password:req.query.password
    }
    console.log(response);
    //res.end(JSON.stringify(response));
});


    app.get("/getnotes", function (req, res) {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "c121112m",
            database: "voyage"
        });
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = 'SELECT * FROM notes;';

            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;

                else {

                    res.send(result);

                }
            });


        });

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