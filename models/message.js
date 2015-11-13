'use strict';

var mongoose = require('mongoose');

// What a message is going to look like

var messageSchema = mongoose.Schema({
  name: String,
  messageText: String,
  timeCreated: String
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;