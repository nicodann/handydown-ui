import axios from "axios";
import apiUrl from "../lib/apiURL";

// ADD MESSAGE
export const addMessage = async (
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
    // console.log('returned conversation', response.data);
    const returnedConversation = response.data;
    const filteredConversations= conversations.filter(conversation => conversation.id !== returnedConversation.id);
    setConversations([returnedConversation, ...filteredConversations]);
    // console.log('returnedConversation', returnedConversation)
    return returnedConversation;
  } catch(err) {
    console.log(err);
  };
};