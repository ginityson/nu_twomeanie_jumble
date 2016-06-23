var express = require('express');
var app=express();
var path = require('path');
var bodyParser = require('body-parser');

app.use( bodyParser.json() );
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

var ourSchema = new  mongoose.Schema({
name: String,
location: String
});//end ourSchema
var ourModel = mongoose.model( 'ourModel', ourSchema );

//base url
app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'views/index.html' ) );
});//end base url

//get call
app.get( '/getRecords', function( req, res ){
  ourModel.find()
  .then( function( data ){
    res.send( data );
  });
});//end get call

//spin up server
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
});

//post call
app.post( '/testPost', function( req, res ){
  console.log( 'req.body: ' + req.body.name );
  //here we have gotten the req.body
  //place req.body int object to be saved in database
  var recordToAdd={
    name: req.body.name,
    location: req.body.location
};//end object recordToAdd

//this is apparently where the magic happens
  var newRecord=ourModel( recordToAdd );
  newRecord.save();
});//end post call

//the standard static folder
app.use( express.static( 'public' ) );
