import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 3000 });

server.on('connection', (ws) => {
  console.log('new client conntected');
  ws.on('message', (data) => {
    console.log(JSON.parse(data.toString()));
  });
});
