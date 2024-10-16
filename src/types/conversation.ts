export type Conversation = {
  id: number;
  readByCreator: boolean;
  readByReceiver: boolean;
  createdAt: string;
  updatedAt: string;
  creatorId: number;
  receiverId: number;
  itemId: number; 
}