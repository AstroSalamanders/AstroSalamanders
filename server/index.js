var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var io = require('socket.io');
var UUID = require('node-uuid');
var http = require('http');

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

/*
  put express ajax route here
*/

server.listen(3000, function() {
  console.log('listening on port 3000!');
});





/* Socket.IO server set up. */

//Express and socket.io can work together to serve the socket.io client files for you.
//This way, when the client requests '/socket.io/' files, socket.io determines what the client needs.
        
//Create a socket.io instance using our express server
var sio = io(server);

sio.use(function(socket, next) {
  var handshake = socket.request;
  next();
})

//Socket.io will call this function when a client connects, 
//So we can send that client a unique ID we use so we can 
//maintain the list of players.
sio.sockets.on('connection', function (client) {
  //Generate a new UUID, looks something like 
  //5b2ca132-64bd-4513-99da-90e838ca47d1
  //and store this on their socket/connection
  client.userid = UUID();

  //tell the player they connected, giving them their id
  client.emit('onconnected', { id: client.userid } );

  //Useful to know when someone connects
  console.log('\t socket.io:: player ' + client.userid + ' connected');
  
  //When this client disconnects
  client.on('disconnect', function () {
    //Useful to know when someone disconnects
    console.log('\t socket.io:: client disconnected ' + client.userid );
  }); //client.on disconnect
  
}); //sio.sockets.on connection



