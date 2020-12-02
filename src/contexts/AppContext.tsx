import { Auth } from 'aws-amplify'
import moment from 'moment'
// import moment from 'moment'
import { useState, createContext, ReactNode, useEffect, useMemo } from 'react'

type AppContextType = {
  user: any
  setUser: (user: any) => void
  registros: Registro[]
  addRegistro: (registro: { tipo: 'entrada' | 'saida', descricao: string, valor: number }) => void
  removeRegistro: (registroId: number) => void
  isAuthenticated: () => boolean
  setData: (data: Date) => void
  data: Date
  valorEntrada: number
  valorSaida: number
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
  const [registros, setRegistros] = useState<Registro[]>([{
    id: 1,
    tipo: 'entrada',
    descricao: 'Registro1',
    valor: 123.12,
    data: new Date()
  },
  {
    id: 2,
    tipo: 'saida',
    descricao: 'Registro2',
    valor: 1235.50,
    data: new Date()
  }])
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

  const valorEntrada = useMemo(() => {
    return registros.reduce((accumulator, registro) => {
      if (moment(registro.data).isSame(moment(data), 'day') && registro.tipo === 'entrada') {
        return accumulator + registro.valor
      } else {
        return accumulator
      }
    }, 0)
  }, [registros, data])

  const valorSaida = useMemo(() => {
    return registros.reduce((accumulator, registro) => {
      if (moment(registro.data).isSame(moment(data), 'day') && registro.tipo === 'saida') {
        return accumulator + registro.valor
      } else {
        return accumulator
      }
    }, 0)
  }, [registros, data])

  const addRegistro = (registro: { tipo: 'entrada' | 'saida', descricao: string, valor: number }) => {
    // const horario = moment().format('HH:mm:ss')

    const novoRegistro = {
      id: registros.length + 1,
      tipo: registro.tipo,
      descricao: registro.descricao,
      valor: registro.valor,
      data// : moment(moment(data).format('YYYY-MM-DD') + ' ' + horario).toDate()
    }

    setRegistros([...registros, novoRegistro])
  }

  const removeRegistro = (registroId: number) => {
    setRegistros((registros) => (registros.filter(registro => registro.id !== registroId)))
  }

  const isAuthenticated = () => {
    if (user) {
      return true
    } else {
      return false
    }
  }

  return <AppContext.Provider value={{ isAuthenticated, user, setUser, registros, addRegistro, removeRegistro, setData, data, valorEntrada, valorSaida }}>
    { children }
  </AppContext.Provider>
}
export default AppProvider
