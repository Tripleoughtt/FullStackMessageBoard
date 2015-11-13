'use strict';

var express = require('express');
var router = express.Router();
var Message = require('../models/message.js');

router.get('/', function(req, res){
  Message.find({}).sort({'_id': -1}).exec(function(err, messages){
    res.render('index', {messages: messages})
  });
});

router.put('/', function(req, res){
  console.log(req.body)
  console.log(req.body.date)
  console.log(req.body.data)
  Message.update({timeCreated: `${req.body.date}`},
   req.body.data,
   function (err, message){
    console.log(message)
    res.send("contact updated")
   })
})

router.delete('/', function(req,res){
  console.log(req.body.time)
  Message.remove({timeCreated: req.body.time}, function(err, deletedBitch){
    res.send("dat shits deleted as hell")
  })
});

router.post('/', function(req, res){
  var message = new Message(req.body);
  console.log(message);
  message.save(function(err, savedMessage){
    console.log('Saved message:', savedMessage)
    res.status(err ? 400 : 200).send(err || savedMessage)
  })
});

module.exports = router;