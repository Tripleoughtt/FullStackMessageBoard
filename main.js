'use strict';
require('dotenv').load();
var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
var mongoose = require("mongoose")
mongoose.connect("mongodb://"+ process.env.DB_USER + ":" + process.env.DB_PASS + "@ds051980.mongolab.com:51980/messageboard")


app.set('view engine', 'jade');

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

// These are my routes
app.use('/', require('./routes/messages'))

// app.use(function(req, res){
//   res.status(404).render('404')
// })

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});