import axios from "axios";
import apiUrl from "../lib/apiURL";

export const loginUser = async (
    loginFormData,
    setLoggedInUser,
    setTabbedItems,
    setTabValue,
    loggedInUser,
    Items
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
    setLoggedInUser(response.data);
    setTabValue(0);
    setTabbedItems(Items.filter((item) => item.offered && loggedInUser && item.userID !== loggedInUser.id));
  } catch(error) {
    const message = error.response.data;
    return message;
  }
};

// LOGOUT
export const logoutUser = async (
  setLoggedInUser,
  setConversations,
  handleTransition,
  setTabValue,
  setTabbedItems,
  Items
) => {
  console.log("logging out")
  // try {
  //   await axios({
  //     method: 'post',
  //     url: '/api/users/logout'
  //   })
  // } catch(error) {
  //   console.log(error);
  // }

  setLoggedInUser(null);
  localStorage.clear();
  setConversations([]);
  handleTransition("Logging Out...");
  setTabValue(0);
  setTabbedItems(Items.filter((item) => item.offered))
};

// REGISTER
export const registerUser = async (
  registrationFormData,
  setLoggedInUser,
) => {
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl + '/api/users',
      data: registrationFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    setLoggedInUser(response.data);
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(response.data));
  } catch(error) {
    console.log(error)
  }
}