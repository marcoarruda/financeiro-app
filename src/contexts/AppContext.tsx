import { Auth } from 'aws-amplify'
import { useState, createContext, ReactNode, useEffect } from 'react'

type AppContextType = {
  user: any
  setUser: (user: any) => void
  registros: any[]
  setRegistros: (registros: any[]) => void
  isAuthenticated: () => boolean
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null)
  const [registros, setRegistros] = useState<any[]>([])

  useEffect(() => {
    (async () => {
      try {
        const newUser = await Auth.currentAuthenticatedUser()

        setUser(newUser)
      } catch (err) {

      }
    })()
  }, [])

  const isAuthenticated = () => {
    if (user) {
      return true
    } else {
      return false
    }
  }

  return <AppContext.Provider value={{ isAuthenticated, user, setUser, registros, setRegistros }}>
    { children }
  </AppContext.Provider>
}
export default AppProvider
