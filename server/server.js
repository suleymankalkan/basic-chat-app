const io = require('socket.io')(3000, {cors: {origin: "*",},});

const {addUser, removeUser, getUser} = require('./users');

io.on('connection', socket => {
    // Emit on new user joined
    console.log("New connection!");

    socket.on('new-user', ({name}, callback) => {
      const { error, user } = addUser({ id: socket.id, name});

      if(error) return callback(error);

      console.log("New user! name: " + user.name);
      socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-chat-message', message => {
      socket.broadcast.emit('chat-message', { message: message})
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected' )
      // removeUser(..) to remove the user from array
      console.log("User disconnected");
    })
  })