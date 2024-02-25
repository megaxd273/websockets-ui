export enum Commands {
  reg = 'reg',
  update_winners = 'update_winners',
  create_room = 'create_room',
  add_user_to_room = 'add_user_to_room',
  create_game = 'create_game',
  update_room = 'update_room',
  add_ships = 'add_ships',
  start_game = 'start_game',
  attack = 'attack',
  randomAttack = 'randomAttack',
  turn = 'turn',
  finish = 'finish',
}
export interface IRegResponseData {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
}

export interface IResponse {
  type: Commands;
  data: string;
  id: 0;
}
export interface ILobbyPartisipant {
  name: string;
  index: number | string;
}
