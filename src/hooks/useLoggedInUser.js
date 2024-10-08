import { useEffect } from "react";
import { useAppContext } from "../context/state";

export default function useLoggedInUser() {

  const { loggedInUser, setLoggedInUser } = useAppContext(); 
  
  // CHECK IF USER IS LOGGED IN
   useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setLoggedInUser(foundUser);
    }
  }, [setLoggedInUser])

  return {loggedInUser}
}
