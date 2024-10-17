import axios from "axios";
import {apiUrl} from "../lib/apiURL";
import { ConversationType } from "../types/conversation";
import { Dispatch, SetStateAction } from "react";

export type addMessageType = (
  newMessageFormData: FormData,
  conversations: ConversationType[],
  setConversations: Dispatch<SetStateAction<ConversationType[]>>
) => Promise<boolean>;

// ADD MESSAGE
export const addMessage: addMessageType = async (
  newMessageFormData,
  conversations,
  setConversations
) => {
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl + '/api/messages',
      data: newMessageFormData,
    });
    const returnedConversation = response.data;
    const filteredConversations= conversations.filter(conversation => conversation.id !== returnedConversation.id);
    setConversations([returnedConversation, ...filteredConversations]);
    return returnedConversation;
  } catch(err) {
    console.log(err);
  };
};