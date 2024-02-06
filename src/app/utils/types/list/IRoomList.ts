import Room from '@models/Room.entity';

export default interface IRoomList {
  rooms: Room[];
  countRooms: number;
}
