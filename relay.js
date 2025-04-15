const WebSocket = require('ws');
const server = new WebSocket.Server({ port: process.env.PORT || 443 });

console.log("Relay WebSocket server started");

server.on('connection', function connection(clientSocket) {
  const targetSocket = new WebSocket('ws://iringtone.biz:8080');

  clientSocket.on('message', msg => targetSocket.send(msg));
  targetSocket.on('message', msg => clientSocket.send(msg));

  clientSocket.on('close', () => targetSocket.close());
  targetSocket.on('close', () => clientSocket.close());

  targetSocket.on('error', err => console.error("Target error:", err));
  clientSocket.on('error', err => console.error("Client error:", err));
});
