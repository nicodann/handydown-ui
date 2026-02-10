import axios from "axios";
import {apiUrl} from "../lib/apiURL";
import { Item } from "../types/item";
import { Dispatch, SetStateAction } from "react";
import { User } from "../types/user";
import { ConversationType } from "../types/conversation";
import validateField from "../lib/validateField";

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
    const { password: _p, ...safeUser } = response.data.user;
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(safeUser));
    localStorage.setItem('token', response.data.token)
    setLoggedInUser(safeUser);
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
  setLoggedInUser: Dispatch<SetStateAction<User | null>>,
) => {

  // Validation
  const errors = {
    username: validateField('username', registrationFormData.username),
    email: validateField('email', registrationFormData.email),
    password: validateField('password', registrationFormData.password),
    location: validateField('location', registrationFormData.location)
  };

  if (Object.values(errors).some(error => error !== '')) {
    console.log("Validation errors:", errors);
    return { success: false, errors };
  }

  try {
    const response = await axios({
      method: 'post',
      url: apiUrl + '/api/users',
      data: registrationFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const { password: _p, ...safeUser } = response.data.user;
    setLoggedInUser(safeUser);
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(safeUser));
    localStorage.setItem('token', response.data.token);
    return { success: true };
  } catch(error) {
    console.log(error)
    return { success: false, errors: [error.response.data] };
  }
}