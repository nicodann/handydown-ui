import axios from "axios";
import {apiUrl} from "../lib/apiURL";

// ADD ITEM
export const addItem = async (
  newItemFormData,
  Items,
  setItems,
  setTabValue,
  setTabbedItems,
  loggedInUser
) => {
  console.log("localStorage.getItem('token'):",localStorage.getItem('token'))
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
  itemId, 
  offered,
  tabValue,
  setTabbedItems,
  tabbedItems,
  setItems,
  Items
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
  editItemFormData, 
  id,
  setItems,
  handleTransition,
  setTabValue,
  setTabbedItems,
  Items,
  loggedInUser

) => {
  // try {
  //   await axios.put(`/api/items/${editItemFormData.id}`, {editItemFormData: editItemFormData});
  // console.log("editItemFormData.id:", editItemFormData.id)
  try {
    const response = await axios({
      method: 'put',
      url: `${apiUrl}/api/items/${id}`,
      data: editItemFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const updatedItem = response.data;
    const filteredItems = Items.filter(item => item.id !== updatedItem.id)
    // console.log("filteredItems", filteredItems)
    setItems([ updatedItem, ...filteredItems]);
    handleTransition("Updating Item...");
    setTabValue(2);
    setTabbedItems([updatedItem, ...Items.filter((item) => item.userId === loggedInUser.id && item.id !== updatedItem.id)]);
    // console.log("tabbedItems:",tabbedItems);
  } catch(err) {
    console.log(err);
  }
 
}