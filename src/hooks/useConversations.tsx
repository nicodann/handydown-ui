import { useEffect, useState } from "react";
import { ConversationType } from "../types/conversation";
import { getConversations } from "../routes/conversation";
import useLoggedInUser from "./useLoggedInUser";

export default function useConversations() {
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  const loggedInUser = useLoggedInUser();

  // FETCH ALL CONVERSATIONS BELONGING TO LOGGED IN USER
  useEffect(() => {
    if (loggedInUser) {
      console.log("getting converstaions for", loggedInUser.username)
      getConversations(loggedInUser)
        .then((conversations) => {
          setConversations(conversations);
        })
        .catch((error) => console.log(error));

    }
    }, [loggedInUser]);

  return { conversations, setConversations }
}
