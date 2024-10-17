import axios from "axios";
import {apiUrl} from "../lib/apiURL";
import { Item } from "../types/item";
import { Dispatch, SetStateAction } from "react";
import { User } from "../types/user";

// ADD ITEM
export const addItem = async (
  newItemFormData: FormData,
  Items: Item[],
  setItems: Dispatch<SetStateAction<Item[]>>,
  setTabValue: Dispatch<SetStateAction<number>>,
  setTabbedItems: Dispatch<SetStateAction<Item[]>>,
  loggedInUser: User
) => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios({
      method: 'post',
      url: apiUrl + '/api/items',
      data: newItemFormData,
      headers: { 
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
    });
    const newItem = response.data;
    setItems([newItem, ...Items]);
    setTabValue(2);
    setTabbedItems([newItem, ...Items.filter((item) => item.userId === loggedInUser.id)]);
  } catch(error) {
    console.log(error);
  }
};

// DELETE ITEM
export const deleteItem = async (
  itemId: number, 
  offered: boolean,
  tabValue: number,
  setTabbedItems: Dispatch<SetStateAction<Item[]>>,
  tabbedItems: Item[],
  setItems: Dispatch<SetStateAction<Item[]>>,
  Items: Item[]
) => {
  try {
    await axios.delete(`${apiUrl}/api/items/${itemId}`);
    if (tabValue === 2) {
      setTabbedItems(tabbedItems.filter((tabbedItem) => tabbedItem.id !== itemId));
    }
    setItems(Items.filter((item) => item.id !== itemId));
  } catch(err) {
    console.log(err);
  }
};

// EDIT ITEM
export const editItem = async (
  editItemFormData: FormData, 
  id: number,
  setItems: Dispatch<SetStateAction<Item[]>>,
  setTabValue: Dispatch<SetStateAction<number>>,
  setTabbedItems: Dispatch<SetStateAction<Item[]>>,
  handleTransition: (phrase: string) => void,
  Items: Item[],
  loggedInUser: User

) => {
  try {
    const response = await axios({
      method: 'put',
      url: `${apiUrl}/api/items/${id}`,
      data: editItemFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const updatedItem = response.data;
    const filteredItems = Items.filter(item => item.id !== updatedItem.id)
    setItems([ updatedItem, ...filteredItems]);
    handleTransition("Updating Item...");
    setTabValue(2);
    setTabbedItems([updatedItem, ...Items.filter((item) => item.userId === loggedInUser.id && item.id !== updatedItem.id)]);
  } catch(err) {
    console.log(err);
  }
 
}