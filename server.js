const http = require('http');
const app = require('./app');
const socketIo = require('socket.io');

const port = process.env.PORT || 4000;

const server = http.createServer(app);

const io = socketIo(server); // Initialize Socket.IO with the server

io.on('connection', (socket) => {
  console.log('A user connected'); // Log when a user connects

  // Log when a message is received
  socket.on('message', (msg) => {
      console.log(`Message received: ${msg}`);
      // Echo the message back to the client
      socket.send(`Server: ${msg}`);
  });

  // Log when a user disconnects
  socket.on('disconnect', () => {
      console.log('User  disconnected');
  });
});

// Log when the server is waiting for connections
io.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

io.on('connect_timeout', (timeout) => {
  console.warn('Connection timeout:', timeout);
});

server.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})