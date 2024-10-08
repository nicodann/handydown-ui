import { useEffect, useState } from "react";
import { useAppContext } from "../context/state";
import axios from "axios";
import { apiUrl } from "../lib/apiURL";

export default function useConversations() {
  const [conversations, setConversations] = useState([]);

  const {
    loggedInUser
  } = useAppContext();

  // FETCH ALL CONVERSATIONS BELONGING TO LOGGED IN USER
  useEffect(() => {
    if (loggedInUser) {
      axios.get(`${apiUrl}/api/conversations/by/user/${loggedInUser.id}`)
        .then((conversations) => {
          setConversations(conversations.data);
        })
        .catch((error) => console.log(error));

    }
    }, [loggedInUser]);

  return [conversations, setConversations]
}
