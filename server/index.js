var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var io = require('socket.io');
var UUID = require('node-uuid');
var http = require('http');
var DLL = require('./DoubleLinkedList.js');
var Game = require('./Game.js')

var app = express();
var server = http.createServer(app);


app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

var syncGames = function(client){
  for(var room in games){
      client.in(room).broadcast.emit('update', games[room]);
    }
}

/*
  put express ajax route here
*/
var _port = process.env.PORT || 3000
server.listen( _port, function() {
  console.log('listening on port' + _port);
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

var roomList = new DLL();
var roomNumCounter = 0;
var clientID_room_table = {}; // clientID : room node
var games = {};
var updateInterval = 100;

//Socket.io will call this function when a client connects, 
//So we can send that client a unique ID we use so we can 
//maintain the list of players.
sio.sockets.on('connection', (client) => {
  //Generate a new UUID, looks something like 
  //5b2ca132-64bd-4513-99da-90e838ca47d1
  //and store this on their socket/connection
  client.userid = UUID();

  //tell the player they connected, giving them their id
  client.emit('onconnected', { id: client.userid } );

  //Useful to know when someone connects
  console.log('\t socket.io:: player ' + client.userid + ' connected');
  
  
  

  //When this client disconnects
  client.on('disconnect', (test) => {
    //Useful to know when someone disconnects
    console.log('\t socket.io:: client disconnected ' + clientID_room_table[client.userid].val );
    
    // console.log("WTF TEST",test)
      /*

          look for player who has this id 
          client.userid

          set that player alive: false

      */
      let room = clientID_room_table[client.userid].val;

      // console.log("DISCONNECT\n GAMES","\nROOM:",client.adapter.rooms)

      if ( games[room].playerOne.id === client.userid ){
        // disconnect player1
        games[room].playerOne.id = null;
        games[room].playerOne.alive = false;
        console.log("disconnected player 1");

      } else if ( games[room].playerTwo.id === client.userid ){
        // disconnect player 2
        games[room].playerTwo.id = null;
        games[room].playerTwo.alive = false;
        console.log("disconnected player 2");
        
      } else {
        console.log("NOT DISCONECTING PLAYER")
      }

    // console.log(" ANY ROOMS? ",client)
    //here we handle the room arrangement after player left
    if (client.adapter.rooms) {

      //clientID_room_table[client.userid] => roomList node => val => room name
      //if after disconnect, there's no such room
      if (!client.adapter.rooms[clientID_room_table[client.userid].val]) {

        console.log('delete node: ', clientID_room_table[client.userid].val);

        if (roomList.tail === clientID_room_table[client.userid]) {
          // remove last room
          roomList.pop();
        }

        else if (roomList.head === clientID_room_table[client.userid]) {
          // remove the first room
          roomList.shift();
        }

        else {
          // remove the room in middle
          clientID_room_table[client.userid].delete();
        }

      }

      else {
        console.log('move ' + clientID_room_table[client.userid].val + 'to tail');
        roomList.moveToEnd(clientID_room_table[client.userid]);
      }

    }

    


  }); //client.on disconnect
  
  client.on('hard_disconnect', () => {
      client.disconnect();
    });

  client.on('join', () => {
    var room;
    //when the room list is empty
    //create a new room called room1 to the list
    if (roomList.head === null || roomList.tail === null || 
      client.adapter.rooms === undefined || client.adapter.rooms[roomList.tail.val] === undefined) {

      console.log('no room list, or no client.adapter room records');
      roomNumCounter++; // 0 => 1
      room = 'room' + roomNumCounter; //room + 1 = room1
      roomList.push(room);
      games[room] = new Game(); // Adding new game instance with room name as key
    }

    //when there are less than 2, but not 0 clientID in the last room
    //it is a available room to join
    else if (client.adapter.rooms[roomList.tail.val].length < 2) {
      console.log(roomList.tail.val + ' players < 2');
      room = roomList.tail.val;
    }

    //when there are 2 clientID in the last room
    //increment the room#, and use that to create a new room name to the list
    else {
      roomNumCounter++;
      room = 'room' + roomNumCounter;
      console.log(roomList.tail.val + ' full, swith to next: ' + room);
      roomList.push(room);
      games[room] = new Game();
    }

    //store the key-value pair of client and room node
    clientID_room_table[client.userid] = roomList.tail;
    client.join(room);

    //if after join, current room is full, move this room node to the front of list
    //so that other waiting room will become the next tail, instead of creating a new room
    if (client.adapter.rooms[roomList.tail.val].length === 2) {
      roomList.moveToFront(roomList.tail);
    }

    // set player alive
    
    let pNum ;
    console.log(client.adapter.rooms[roomList.tail.val].length+" players in room")
    
    if (client.adapter.rooms[roomList.tail.val].length <= 1){
      
      console.log("LENGTH <= 1 : ",client.adapter.rooms[roomList.tail.val].length)
      if (games[room].playerOne.alive === true ){
        console.log("PlayerOne is alive ");
        pNum = 2;
      } else if (games[room].playerTwo.alive === true){
        console.log("PlayerTwo is alive ");
        pNum = 1;
      } else {
        console.log("Neither alive?", games[room].playerOne.alive, games[room].playerTwo.alive)
        pNum = 1;
      }

    } else {
      console.log("Asigning 1 because length is ",client.adapter.rooms[roomList.tail.val].length )
      pNum = 2;
    }

    console.log("PNUM IS",pNum);

    client.emit('room info', {
      clientID: Object.keys(client.rooms)[0],
      room: room,
      adapter: client.adapter.rooms,
      playerNumber: pNum
    });

    let player = (client.adapter.rooms[roomList.tail.val].length === 1) ? 'playerOne' : 'playerTwo';
    games[room][ player ].alive = true;
    games[room][ player ].id = client.userid;

    console.log(JSON.stringify(games[room]))


  })
  


  client.on('send test', ({test, room}) => {
    console.log('send test');
    client.in(room).broadcast.emit('get test', {
      test: test + 'from ' + room
    });
  })



  client.on('action',({dir, room, player}) => {
    games[room].move(dir, player)
  })

  setInterval(function(){
    syncGames(client);
  }, updateInterval)

}); //sio.sockets.on connection
