/* eslint-disable linebreak-style,indent */
var express = require("express");
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let temp = "";


app.get("/", function (req, res) {
    res.sendFile( __dirname + "\\" + "login.html");
});

// Login getti
app.post("/ok", function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "c121112m",
        database: "voyage"
    });
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!");
        var sql = 'SELECT * FROM users WHERE username = "' + req.body.username + '";';

        console.log(sql);
        con.query(sql, function (err, result){
            if (err) throw err;

            else if (req.body.password == result[0].password){
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
        username:req.body.username,
        password:req.body.password
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
app.post("/note", function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "c121112m",
        database: "voyage"
    });
    con.connect(function(err){
        if (err) throw err;
        console.log("Connected!");
        var sql = 'INSERT INTO notes(description,location,times,dates,user_id) VALUES("'+req.body.description+'","'+req.body.location+'","'+req.body.time+'","'+req.body.date+'","'+temp+'");';

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

//JSON Formaatissa http://localhost:8081/getnotes
app.get("/getnotes2", function (req, res) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "c121112m",
        database: "voyage"
    });
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = 'SELECT * FROM notes WHERE user_id = "'+temp+'";';

        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            else {
                res.send(result);
            }
        });
    });
});

// rajapinta location filter esim. http://localhost:8081/getnotes?location=Helsinki
app.get("/getnotes", function (req, res) {
    if ((req.query.location == null)||(req.query.location == "")){
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
    }
    else{
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "c121112m",
            database: "voyage"
        });
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = 'SELECT * FROM notes WHERE location = "'+req.query.location+'";';

            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                else {
                    res.send(result);
                }
            });
        });
    }

});

// poistaa muistion
app.get("/remove", function (req, res) {
    if ((req.query.del == null)||(req.query.del == "")){
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "0000",
            database: "voyage"
        });
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = 'SELECT * FROM notes WHERE user_id = "'+temp+'";';

            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;

                else {

                    res.send(result);

                }
            });


        });
    }
    else{
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "c121112m",
            database: "voyage"
        });
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = 'DELETE FROM notes WHERE id = "'+req.query.del+'";';
            var sql2 = 'SELECT * FROM notes WHERE user_id = "'+temp+'";';
            con.query(sql);


            console.log(sql);
            con.query(sql2, function (err, result) {
                if (err) throw err;

                else {
                    res.send(result);

                }
            });

        });
    }

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