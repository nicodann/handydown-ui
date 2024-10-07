import { createContext, useContext } from "react"

const createCtx = () => {

  const ctx = createContext()

  const useCtx = () => {
    const cont = useContext(ctx)
    if (cont === undefined) {
      throw new Error('useCtx must be inside a provider with a value')
    }
    return cont
  }

  return [useCtx, ctx.Provider]
}

const [UseContext, AppContextProvider] = createCtx();

export const AppContextWrapper = (props) => {
  const appContext = {

    

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