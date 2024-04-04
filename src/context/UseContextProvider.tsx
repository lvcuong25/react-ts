
import React, { createContext } from 'react'
import { useLocalStorage } from '../hooks/useStorage'
import useHookQuery from '../hooks/useHookQuery'




// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UserContext = createContext({} as any)
// export const ProductContext=createContext({}as any)
const UseContextProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [currentID, setCurrentID, removeCurrentID] = useLocalStorage('currentID', "")
  const { data: user, isLoading } = useHookQuery({ path: 'users', id: currentID, mustHaveID: true, active: true})
  if (isLoading) return <div>Loading...</div>
  return (
      <div>
          <UserContext.Provider value={{ user, setCurrentID, removeCurrentID }}>
              {children}
          </UserContext.Provider>
      </div>
  )
}



export default UseContextProvider
