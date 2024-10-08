import axios from "axios";
import { useEffect, useState } from "react";
import apiUrl from "../lib/apiURL";
import { useAppContext } from "../context/state";


export default function useItems() {
  const [ items, setItems ] = useState(null);
  // const [ tabbedItems, setTabbedItems ] = useState([]);
  const { 
    loggedInUser,
    tabbedItems,
    setTabbedItems
  } = useAppContext()

  // FETCH ALL ITEMS
  useEffect(() => {
    axios.get(apiUrl + "/api/items")
    .then((items) => {
      setItems(items.data);
      return items.data;
    })
    .then((data) => {
      setTabbedItems(data.filter((item) => {
        if (loggedInUser) {
          return item.offered === true && item.userId !== loggedInUser.id; 
        } else {
          return item.offered === true
        }
      }))
  })
    .catch((error) => console.log(error));
  }, [ loggedInUser, setTabbedItems ]);

  return {items, tabbedItems}
}
