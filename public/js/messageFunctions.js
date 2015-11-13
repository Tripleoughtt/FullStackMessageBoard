$(document).ready(init);


function init(){
  $('#writeMessage').on('click',  createMessage);
  $('.messages').on('click', '.editMessage', editMessage);
  $('.messages').on('click', '.delete', deleteMessage);
  $('.submit').on('click', sendMessage);
  $('#submit').on('click', sendEdit);
}

var currAuthor;
function createMessage(){
  currAuthor = $('#author').val();
  if(currAuthor === ''){
    console.log('You Fucked Up');
    $('#messageModal').modal('toggle');
    return
  }
  currAuthor = $('#author').val();
  console.log(currAuthor)
  $('#authorName').text("New Message From: " + currAuthor);
  console.log(name)
}

function sendMessage(){
  // Makes post request to server
  var message = {};
  message.name = currAuthor
  message.messageText = $('#newMessage').val();
  var timeCreated = new Date();
  message.timeCreated = moment(timeCreated).format("dddd, MMMM Do YYYY, h:mm:ss a");
  console.log(message)
  console.log(message.name)
  $.post('/', message)
  .done(function(data){

    var newPost = $('#template').clone();
    newPost.removeAttr('id');
    newPost.children('.name').text(message.name).append($('<a href="#" data-target="#editModal" data-toggle="modal" class="editMessage"><i class="fa fa-pencil-square-o fa-lg"></i></a>'))
    newPost.children('.name').append($('<i class="fa fa-trash fa-lg delete"></i>'))
    newPost.children('.text').text(message.messageText)
    newPost.children('.time').text(message.timeCreated)
    newPost.prependTo($('.messages'))
  })
}
var editDate;
var editName;
var messageToEdit;
function editMessage(){
  messageToEdit = $(this).closest('.message')
  editName = messageToEdit.children('.name').text();
  editDate = messageToEdit.children('.time').text();
  console.log(editDate)
  var oldMessageText = messageToEdit.children('.text').text()
  console.log(oldMessageText)
  $('#editMessage').val(oldMessageText)
}

function sendEdit(){
  var edit = {}
  edit.date = editDate
  edit.data = {}
  edit.data.name = editName
  edit.data.messageText = $('#editMessage').val();
  edit.data.timeCreated = editDate
  console.log(edit);
  $.ajax({
    url: '/',
    type: 'PUT',
    data: edit
  })
  .done(function(data){
    messageToEdit.children('.text').text(edit.data.messageText)
  })

}

function deleteMessage(){
  var toDelete = $(this).closest('.message')
  var deleteDate = toDelete.children('.time').text();
  $.ajax({
    url: '/',
    type: 'DELETE',
    data: {time: deleteDate}
    })
  .done(function(data){
    toDelete.remove()
  })
}


