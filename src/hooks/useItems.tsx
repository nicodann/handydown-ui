import axios from "axios";
import { useEffect, useState } from "react";
import {apiUrl} from "../lib/apiURL";
import { useAppContext } from "../context/state";
import { Item } from "../types/item";
import useLoggedInUser from "./useLoggedInUser";


export default function useItems() {
  const [ items, setItems ] = useState<Item[]>([]);
  const [ loadingItems, setLoadingItems ] = useState(true);
  // const [ tabbedItems, setTabbedItems ] = useState([]);
  const loggedInUser = useLoggedInUser();
  const { 
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
      setTabbedItems(data.filter((item: Item) => {
        if (loggedInUser) {
          return item.offered === true && item.userId !== loggedInUser.id; 
        } else {
          return item.offered === true
        }
      }))
  })
  .finally(() => setLoadingItems(false))
    .catch((error) => console.log(error));
  }, [ loggedInUser, setTabbedItems, setLoadingItems ]);

  return {items, tabbedItems, loadingItems};
}
