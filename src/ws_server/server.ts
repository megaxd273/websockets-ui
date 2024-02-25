import { WebSocketServer } from 'ws';
import { IResponse, Commands, IRegResponseData } from '../models/index.js';
import { IUser, userStorage } from '../storages/userStorage.js';

const server = new WebSocketServer({ port: 3000 });

server.on('connection', (ws) => {
  console.log('new client conntected');
  ws.on('message', (data) => {
    const response: IResponse = JSON.parse(data.toString());
    if (response.type === Commands.reg) {
      const userinfo: IUser = JSON.parse(response.data);
      userStorage.push(userinfo);
      const index = userStorage.findIndex((value) => value === userinfo);
      const serverResponseData: IRegResponseData = {
        name: userinfo.name,
        index,
        error: false,
        errorText: 'asdasd',
      };
      const serverResponse: IResponse = {
        type: Commands.reg,
        data: JSON.stringify(serverResponseData),
        id: 0,
      };
      ws.send(JSON.stringify(serverResponse));
    }
  });
});
