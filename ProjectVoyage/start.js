var express = require('express');
var app = express();


app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get('/ok', function (req, res) {
    res.sendFile( __dirname + "\\" + "tt");
})

app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname +  "\\" + "index.html" );
})

app.get('/json1', function (req, res) {
    query =
    res.sendFile( __dirname + "\\" + "json_harj1.html");
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})