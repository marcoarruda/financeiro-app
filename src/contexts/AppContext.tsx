import React, { useState, createContext, ReactNode } from 'react'

type AppContextType = {
  user: string
  setUser: (user: string) => void
  registros: any[]
  setRegistros: (registros: any[]) => void
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string>('Rodrigo')
  const [registros, setRegistros] = useState<any[]>([])

  return <AppContext.Provider value={{ user, setUser, registros, setRegistros }}>
    { children }
  </AppContext.Provider>
}
export default AppProvider
