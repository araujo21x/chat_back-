import Status from '@myTypes/enums/Status';
import { Column, Entity, OneToMany } from 'typeorm';
import BaseTable from './BaseTable.entity';
import UserHasRoom from './UserHasRoom.entity';
import Message from './Message.entity';

@Entity({ name: 'users' })
export default class User extends BaseTable {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ name: 'password_reset_token', nullable: true, select: false })
  passwordResetToken: string;

  @Column({
    name: 'password_reset_expires',
    nullable: true,
    select: false,
    type: 'timestamp',
  })
  passwordResetExpires: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
    nullable: false,
  })
  status: Status;

  @Column({ nullable: true, length: 1500 })
  image: string;

  @Column({ name: 'image_key', nullable: true, length: 1500 })
  imageKey: string;

  @OneToMany(() => UserHasRoom, (uHRoom) => uHRoom.user)
  userHasRooms: UserHasRoom[];

  @OneToMany(() => Message, (sMessage) => sMessage.sender)
  senders: Message[];

  online: boolean | undefined;
}
