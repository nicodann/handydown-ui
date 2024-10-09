import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { User } from "../types/user"
import { Item } from "../types/item"

type ContextType = {
  loggedInUser: User | null,
  setLoggedInUser: Dispatch<SetStateAction<User | null>>,
  tabbedItems: Item[],
  setTabbedItems: Dispatch<SetStateAction<Item[]>>,
  tabValue: number,
  setTabValue: Dispatch<SetStateAction<number>>
}

// const AppContext = createContext({
//     loggedInUser,
//     setLoggedInUser,
//     tabbedItems,
//     setTabbedItems,
//     tabValue,
//     setTabValue
//   })


// const createCtx = () => {
  
//   const Ctx = createContext<ContextType | null>(null)

//   console.log("createContext", Ctx.Provider)
//   // const ctx = createContext(null)

//   const useCtx = () => {

//     const cont = useContext(Ctx)

//     if (!cont) {
//       throw new Error('useCtx must be inside a provider with a value')
//     }

//     return cont
//   }

//   return [ useCtx, Ctx ]
// }

// console.log("createCtx():",createCtx())

// const [ UseContext, AppContext ] = createCtx();
export const AppContext = createContext<ContextType | null>(null)

export const AppContextWrapper = ({children}:{children: ReactNode}) => {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [ tabbedItems, setTabbedItems ] = useState([]);
  const [tabValue, setTabValue ] = useState(0);

  const appContext = {
    loggedInUser,
    setLoggedInUser,
    tabbedItems,
    setTabbedItems,
    tabValue,
    setTabValue
  }


  return (
    <AppContext.Provider value={appContext}>
      {children}
    </AppContext.Provider >
  )

}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be inside a Provider with a value')
  }
  return context
}