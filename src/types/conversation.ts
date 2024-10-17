import { Item } from "./item";
import { Message } from "./message";
import { User } from "./user";

export type ConversationType = {
  id: number;
  creator: User;
  receiver: User;
  item: Item;
  readByCreator: boolean;
  readByReceiver: boolean;
  createdAt: string;
  updatedAt: string;
  creatorId: number;
  receiverId: number;
  itemId: number;
  messages: Message[];
}