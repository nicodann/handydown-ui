import { createContext, useContext, useState } from "react"

const createCtx = () => {

  const ctx = createContext()

  const useCtx = () => {
    const cont = useContext(ctx)
    if (cont === undefined) {
      throw new Error('useCtx must be inside a provider with a value')
    }
    return cont
  }

  return [ useCtx, ctx.Provider ]
}

const [ UseContext, AppContextProvider ] = createCtx();

export const AppContextWrapper = (props) => {

  const [loggedInUser, setLoggedInUser] = useState(null);
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
    <AppContextProvider value={appContext}>
      {props.children}
    </AppContextProvider >
  )

}

export const useAppContext = () => {
  return UseContext()
}