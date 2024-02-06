import Message from '@models/Message.entity';

export default interface IMessageList {
  messages: Message[];
  countMessages: number;
}
