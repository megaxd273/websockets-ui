import { ILobbyPartisipant } from '../models/index.js';

export interface IRoom {
  roomId: string | number;
  roomUsers: ILobbyPartisipant[];
}

export const roomStorage: IRoom[] = [
  {
    roomId: 1,
    roomUsers: [
      {
        name: 'string',
        index: 1,
      },
    ],
  },
];
