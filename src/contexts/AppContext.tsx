import { Auth } from 'aws-amplify'
import { useState, createContext, ReactNode, useEffect } from 'react'

type AppContextType = {
  user: any
  setUser: (user: any) => void
  registros: Registro[]
  addRegistro: (registro: { tipo: 'entrada' | 'saida', descricao: string, valor: number }) => void
  removeRegistro: (registro: {id: number, tipo: 'entrada' | 'saida', descricao: string, valor: number }) => void
  isAuthenticated: () => boolean
  setData: (data: Date) => void
}

type Registro = {
  id: number
  tipo: 'entrada' | 'saida'
  descricao: string
  valor: number
  data: Date
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null)
  const [registros, setRegistros] = useState<Registro[]>([])
  const [data, setData] = useState<Date>(new Date())

  useEffect(() => {
    (async () => {
      try {
        const newUser = await Auth.currentAuthenticatedUser()

        setUser(newUser)
      } catch (err) {

      }
    })()
  }, [])

  useEffect(() => {
    console.log(registros)
  }, [registros])

  const addRegistro = (registro: { tipo: 'entrada' | 'saida', descricao: string, valor: number }) => {
    const novoRegistro = {
      id: registros.length + 1,
      tipo: registro.tipo,
      descricao: registro.descricao,
      valor: registro.valor,
      data
    }

    setRegistros([...registros, novoRegistro])
  }
  const removeRegistro = (registro: {id: number, tipo: 'entrada' | 'saida', descricao: string, valor: number }) => {
    const reg = registros.filter(e => e.id !== registro.id)

    setRegistros(reg)
  }

  const isAuthenticated = () => {
    if (user) {
      return true
    } else {
      return false
    }
  }

  return <AppContext.Provider value={{ isAuthenticated, user, setUser, registros, addRegistro, removeRegistro, setData }}>
    { children }
  </AppContext.Provider>
}
export default AppProvider
