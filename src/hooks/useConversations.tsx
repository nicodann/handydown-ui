import { useEffect, useState } from "react";
import { useAppContext } from "../context/state";
import { ConversationType } from "../types/conversation";
import { getConversations } from "../routes/conversation";

export default function useConversations() {
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  const {
    loggedInUser
  } = useAppContext();

  // FETCH ALL CONVERSATIONS BELONGING TO LOGGED IN USER
  useEffect(() => {
    console.log("loggedInUser in UseEffect:",loggedInUser)
    if (loggedInUser) {
      console.log("getting converstaions for", loggedInUser.username)
      getConversations(loggedInUser)
        .then((conversations) => {
          setConversations(conversations.data);
        })
        .catch((error) => console.log(error));

    }
    }, [loggedInUser]);

  return { conversations, setConversations }
}
