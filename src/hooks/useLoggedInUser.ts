import { useEffect } from "react";
import { useAppContext } from "../context/state";
import { User } from "../types/user";

export default function useLoggedInUser() {

  const { loggedInUser, setLoggedInUser } = useAppContext(); 
  
  // CHECK IF USER IS LOGGED IN
   useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser: User = JSON.parse(loggedInUser);
      setLoggedInUser(foundUser);
    }
  }, [setLoggedInUser])

  return loggedInUser
}
