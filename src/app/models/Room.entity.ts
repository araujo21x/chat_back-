import { Column, Entity, OneToMany } from 'typeorm';
import TypeRoom from '@myTypes/enums/TypeRoom';
import BaseTable from './BaseTable.entity';
import UserHasRoom from './UserHasRoom.entity';
import Message from './Message.entity';
import User from './User.entity';

@Entity({ name: 'rooms' })
export default class Room extends BaseTable {
  @Column({
    type: 'enum',
    enum: TypeRoom,
    default: TypeRoom.PRIVATE,
    nullable: false,
  })
  type: TypeRoom;

  @Column({ nullable: true, length: 250 })
  name: string;

  @Column({ nullable: true, length: 500 })
  description: string;

  @Column({ nullable: true, length: 1500 })
  image: string;

  @Column({ name: 'image_key', nullable: true, length: 1500 })
  imageKey: string;

  @Column({
    type: 'timestamp',
    name: 'last_manipulation',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastManipulation: Date;

  @OneToMany(() => UserHasRoom, (uHRoom) => uHRoom.room)
  userHasRooms: UserHasRoom[];

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

  myUser: User | undefined;

  addresseeUser: User | undefined;
}
