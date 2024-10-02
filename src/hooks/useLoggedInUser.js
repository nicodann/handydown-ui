import { useEffect, useState } from "react";

export default function useLoggedInUser() {

  const [loggedInUser, setLoggedInUser] = useState(null); 
  // CHECK IF USER IS LOGGED IN
   useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setLoggedInUser(foundUser);
    }
    console.log("loggedInUser:",loggedInUser)
  }, [])

  return loggedInUser
}
