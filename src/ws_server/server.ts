import { WebSocketServer } from 'ws';
import { IResponse, Commands, IRegResponseData } from '../models/index.js';
import { IRoom, roomStorage } from '../storages/roomStorage.js';
import { IUser, userStorage } from '../storages/userStorage.js';

const server = new WebSocketServer({ port: 3000 });

const connections: { [userId: number]: WebSocket } = {};

server.on('connection', (ws) => {
  console.log('new client conntected');
  const currentUser = { name: '', index: -1 };

  ws.on('message', (data) => {
    const response: IResponse = JSON.parse(data.toString());
    if (response.type === Commands.reg) {
      const userinfo: IUser = JSON.parse(response.data);
      userStorage.push(userinfo);
      const index = userStorage.findIndex((value) => value === userinfo);
      currentUser.index = index;
      currentUser.name = userinfo.name;
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
      console.log(currentUser);
      const updatedRooms = roomStorage.filter(
        (room) => room.roomUsers.length === 1
      );
      const serverResponse2: IResponse = {
        type: Commands.update_room,
        data: JSON.stringify(updatedRooms),
        id: 0,
      };
      ws.send(JSON.stringify(serverResponse2));

      ws.send(
        JSON.stringify({
          type: Commands.update_winners,
          data: JSON.stringify([
            {
              name: 'stas',
              wins: 10,
            },
          ]),
        })
      );
      //@ts-ignore
      connections[currentUser.index] = ws;
      // const serverResponse3: IResponse = {
      //   type: Commands.update_room,
      //   data: JSON.stringify(newRoom),
      //   id: 0,
      // };

      // ws.send(JSON.stringify(serverResponse3));
    }
    if (response.type === Commands.create_room) {
      const newRoom: IRoom = {
        roomId: roomStorage.length,
        roomUsers: [
          {
            name: currentUser.name,
            index: currentUser.index,
          },
        ],
      };
      roomStorage.push(newRoom);
      const updatedRooms = roomStorage.filter(
        (room) => room.roomUsers.length === 1
      );
      const serverResponse: IResponse = {
        type: Commands.update_room,
        data: JSON.stringify(updatedRooms),
        id: 0,
      };
      Object.values(connections).forEach((ws) => {
        ws.send(JSON.stringify(serverResponse));
      });
    }
    if (response.type === Commands.update_room) {
      // const newRoom: IRoom = {
      //   roomdId: roomStorage.length,
      //   roomUsers: [
      //     {
      //       name: currentUser.name,
      //       index: currentUser.index,
      //     },
      //   ],
      // };
    }
  });
});
