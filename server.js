var app = require('express')()
var express = require('express')
var port = 3000
var path = require('path')

var url = 'mongodb://localhost:27017/test';

var MongoClient = require('mongodb').MongoClient

app.get('/collection/:name', function(req, res){
    MongoClient.connect(url, function (err, client) {
        if (err) throw err
        var db = client.db('test')
        db.createCollection(req.params.name, function(err, result) {
          if (err) throw err;
          res.send("Collection " + req.params.name + " is created")
          // close the connection to db when you are done with it
          //db.close();
      });
      })
})


app.use(express.static('public/images'))

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
})

app.get('/hello', function(req,res){
    res.send("<img src='mibel.jfif'>")
})

app.get('/test/:id', function(req,res){
    res.send("Hi Nimo " + req.params.id + " my name is Mibel")
})


app.listen(port, function(){
    console.log("Server running :" + port)
})