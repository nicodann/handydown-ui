import { useEffect, useState } from "react";
import { useAppContext } from "../context/state";
import { Conversation } from "../types/conversation";
import { getConversations } from "../routes/conversation";

export default function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const {
    loggedInUser
  } = useAppContext();

  // FETCH ALL CONVERSATIONS BELONGING TO LOGGED IN USER
  useEffect(() => {
    if (loggedInUser) {
      getConversations(loggedInUser)
        .then((conversations) => {
          setConversations(conversations.data);
        })
        .catch((error) => console.log(error));

    }
    }, [loggedInUser]);

  return { conversations, setConversations }
}
