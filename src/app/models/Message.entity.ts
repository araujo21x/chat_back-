import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseTable from './BaseTable.entity';
import Room from './Room.entity';
import User from './User.entity';

@Entity({ name: 'messages' })
export default class Message extends BaseTable {
  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true, length: 1500 })
  image: string;

  @Column({ name: 'image_key', nullable: true, length: 1500 })
  imageKey: string;

  @ManyToOne(() => User, (room) => room.senders)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinColumn({ name: 'room_id' })
  room: Room;
}
