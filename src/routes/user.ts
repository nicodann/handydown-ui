import axios from "axios";
import {apiUrl} from "../lib/apiURL";
import { Item } from "../types/item";
import { Dispatch, SetStateAction } from "react";
import { User } from "../types/user";
import { ConversationType } from "../types/conversation";

export const loginUser = async (
    loginFormData: {username: string, password: string},
    setLoggedInUser: Dispatch<SetStateAction<User>>,
    setTabbedItems: Dispatch<SetStateAction<Item[]>>,
    setTabValue: Dispatch<SetStateAction<number>>,
    loggedInUser: User | null,
    Items: Item[]
  ) => {

  try {
    const response = await axios({
      method: 'post',
      url: apiUrl + '/api/users/login',
      data: loginFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token)
    setLoggedInUser(response.data.user);
    setTabValue(0);
    setTabbedItems(Items.filter((item: Item) => item.offered && loggedInUser && item.userId !== loggedInUser.id));
  } catch(error) {
    const message = error.response.data;
    return message;
  }
};

// LOGOUT
export const logoutUser = async (
  setLoggedInUser: Dispatch<SetStateAction<User | null>>,
  setConversations: Dispatch<SetStateAction<ConversationType[]>>,
  handleTransition: (phrase: string) => void,
  setTabValue: Dispatch<SetStateAction<number>>,
  setTabbedItems: Dispatch<SetStateAction<Item[]>>,
  Items: Item[]
) => {

  console.log("logging out")
  try {
    await axios({
      method: 'post',
      url: `${apiUrl}/api/users/logout`
    })
  } catch(error) {
    console.log(`There was an error logging out: ${error}`);
  }

  setLoggedInUser(null);
  localStorage.clear();
  setConversations([]);
  handleTransition("Logging Out...");
  setTabValue(0);
  setTabbedItems(Items.filter((item: Item) => item.offered))
};

// REGISTER
export const registerUser = async (
  registrationFormData: {
    username: string,
    email: string,
    password: string,
    location: string
  },
  setLoggedInUser: Dispatch<SetStateAction<User>>,
) => {
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl + '/api/users',
      data: registrationFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    setLoggedInUser(response.data.user);
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(response.data));
  } catch(error) {
    console.log(error)
  }
}