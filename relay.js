// relay.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: process.env.PORT || 443 });

server.on('connection', function connection(clientSocket) {
  const targetSocket = new WebSocket('ws://iringtone.biz:8080');

  // Pipe client → target
  clientSocket.on('message', msg => targetSocket.send(msg));
  // Pipe target → client
  targetSocket.on('message', msg => clientSocket.send(msg));

  // Handle closes
  clientSocket.on('close', () => targetSocket.close());
  targetSocket.on('close', () => clientSocket.close());
});
