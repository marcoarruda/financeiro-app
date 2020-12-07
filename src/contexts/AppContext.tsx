import { API, graphqlOperation } from 'aws-amplify'
import moment, { unitOfTime } from 'moment'
import { useState, createContext, ReactNode, useMemo } from 'react'

import { createRegistro, deleteRegistro } from '../graphql/mutations'
import {
  onCreateRegistro,
  onDeleteRegistro,
  onUpdateRegistro
} from '../graphql/subscriptions'

type AppContextType = {
  user: any
  setUser: (user: any) => void
  registros: Registro[]
  addRegistro: (registro: {
    tipo: 'entrada' | 'saida'
    descricao: string
    valor: number
  }) => Promise<void>
  removeRegistro: (registroId: string | undefined) => void
  isAuthenticated: () => boolean
  setData: (data: Date) => void
  data: Date
  tipoData: unitOfTime.StartOf
  setTipoData: (tipoData: unitOfTime.StartOf) => void
  valorEntrada: number
  valorSaida: number
  setRegistros: (registros: Registro[]) => void
  onPageRendered: () => Promise<void>
  onPageUnmount: () => void
}

export type Registro = {
  id?: string | undefined
  tipo: 'entrada' | 'saida'
  descricao: string
  valor: number
  data: Date
  createdAt?: Date
  updatedAt?: Date
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null)
  const [registros, setRegistros] = useState<Registro[]>([])
  const [data, setData] = useState<Date>(new Date())
  const [tipoData, setTipoData] = useState<unitOfTime.StartOf>('days')

  let onCreateListener: any
  let onDeleteListener: any
  let onUpdateListener: any

  const onPageRendered = async () => {
    const operationCreate: any = await API.graphql(
      graphqlOperation(onCreateRegistro)
    )
    onCreateListener = operationCreate.subscribe({
      next: (dados: any) => {
        setRegistros((prevState) => [
          ...prevState,
          dados.value.data.onCreateRegistro
        ])
      }
    })

    const operationDelete: any = await API.graphql(
      graphqlOperation(onDeleteRegistro)
    )
    onDeleteListener = operationDelete.subscribe({
      next: (dados: any) => {
        setRegistros((prevState) => {
          return prevState.filter(
            (registro) => registro.id !== dados.value.data.onDeleteRegistro.id
          )
        })
      }
    })

    const operationUpdate: any = await API.graphql(
      graphqlOperation(onUpdateRegistro)
    )
    onUpdateListener = operationUpdate.subscribe({
      next: (dados: any) => {
        console.log('xd', dados.value.data.onUpdateRegistro)
        setRegistros((prevState) => {
          return prevState.map((registro) =>
            registro.id === dados.value.data.onUpdateRegistro.id
              ? { ...registro, ...dados.value.data.onUpdateRegistro }
              : registro
          )
        })
      }
    })
  }

  const onPageUnmount = async () => {
    onCreateListener?.unsubscribe()
    onDeleteListener?.unsubscribe()
    onUpdateListener?.unsubscribe()
  }

  const valorEntrada = useMemo(() => {
    return registros.reduce((accumulator, registro) => {
      if (
        moment(registro.data).isSame(moment(data), tipoData) &&
        registro.tipo === 'entrada'
      ) {
        return accumulator + registro.valor
      } else {
        return accumulator
      }
    }, 0)
  }, [registros, data, tipoData])

  const valorSaida = useMemo(() => {
    return registros.reduce((accumulator, registro) => {
      if (
        moment(registro.data).isSame(moment(data), tipoData) &&
        registro.tipo === 'saida'
      ) {
        return accumulator + registro.valor
      } else {
        return accumulator
      }
    }, 0)
  }, [registros, data, tipoData])

  const addRegistro = async (registro: {
    tipo: 'entrada' | 'saida'
    descricao: string
    valor: number
  }) => {
    const novoRegistroData = {
      tipo: registro.tipo,
      descricao: registro.descricao,
      valor: registro.valor,
      data
    }

    await API.graphql(
      graphqlOperation(createRegistro, { input: novoRegistroData })
    )
  }

  const removeRegistro = async (registroId: string | undefined) => {
    await API.graphql(
      graphqlOperation(deleteRegistro, { input: { id: registroId } })
    )
  }

  const isAuthenticated = () => {
    if (user) {
      return true
    } else {
      return false
    }
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        registros,
        setRegistros,
        addRegistro,
        removeRegistro,
        valorEntrada,
        valorSaida,
        data,
        setData,
        tipoData,
        setTipoData,
        onPageRendered,
        onPageUnmount
      }}>
      {children}
    </AppContext.Provider>
  )
}
export default AppProvider
