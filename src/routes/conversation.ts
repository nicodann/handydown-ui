import axios from "axios"
import { apiUrl } from "../lib/apiURL"
import { User } from "../types/user"

export const getConversations = async (loggedInUser: User) => {
  const token = localStorage.getItem('token')
  try {
    console.log("token", token)
    console.log("loggedInUser.id:",loggedInUser.id)
    const response = await axios({
      method: 'get',
      url: `${apiUrl} + /api/conversations/by/user/${loggedInUser.id}`,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    const conversations = response.data;
    return conversations
  } catch(error) {
    console.log(error)
  }
}

export type MarkAsReadType = (
  conversationId: number,
  readByWhom: string
) => Promise<void>;

//MARK CONVO AS READ
export const markAsRead: MarkAsReadType =  async (conversationId, readByWhom) => {
  try {
     await axios.put(`${apiUrl}/api/conversations/${conversationId}`, {readByWhom: readByWhom});
  } catch(err) {
    console.log(err);
  }
  
}