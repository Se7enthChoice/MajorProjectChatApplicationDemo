const io = require('socket.io')(3000, { cors: { origin: "*" } } ); //create server on port 3000

const users = {} //empty array of users

//WebSocket events for each client
io.on('connection', socket => { //event based, runs on 'connection' event when client connects to server
  socket.on('new-user', name => {
    users[socket.id] = name //user chosen names added to array
    socket.broadcast.emit('user-connected', name) //print that user name connected to server
  })
  socket.on('send-chat-message', message => { //event when client sends message
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] }) //message data with user name sent to chat
  })
  socket.on('disconnect', () => { //event when client disconnects
    socket.broadcast.emit('user-disconnected', users[socket.id]) //chat announcement
    delete users[socket.id] //remove user entry from array
  })
})