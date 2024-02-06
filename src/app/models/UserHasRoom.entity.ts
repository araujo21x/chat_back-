import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseTable from './BaseTable.entity';
import User from './User.entity';
import Room from './Room.entity';

@Entity({ name: 'user_has_rooms' })
export default class UserHasRoom extends BaseTable {
  @ManyToOne(() => User, (user) => user.userHasRooms)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Room, (room) => room.userHasRooms)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}
