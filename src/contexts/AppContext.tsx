import { API, Auth, graphqlOperation } from 'aws-amplify'
import moment, { unitOfTime } from 'moment'
import { useState, createContext, ReactNode, useMemo, useEffect } from 'react'
import {
  createRegistro,
  deleteRegistro,
  updateRegistro
} from '../graphql/mutations'
import { listRegistros } from '../graphql/queries'
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
  editarRegistro: (registro: {
    id: string | undefined
    tipo: 'entrada' | 'saida'
    descricao: string
    valor: number
    data: Date
  }) => void
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
  notification: string
  setNotification: (valor: string) => void
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
  const [user, setUser] = useState<any>(null)
  const [registros, setRegistros] = useState<Registro[]>([])
  const [data, setData] = useState<Date>(new Date())
  const [tipoData, setTipoData] = useState<unitOfTime.StartOf>('days')
  const [notification, setNotification] = useState('')

  let onCreateListener: any
  let onDeleteListener: any
  let onUpdateListener: any

  const onPageRendered = async () => {
    const operationCreate: any = await API.graphql(
      graphqlOperation(onCreateRegistro, { owner: user?.username })
    )
    onCreateListener = operationCreate.subscribe({
      next: (dados: any) => {
        setRegistros((prevState) => [
          ...prevState,
          dados.value.data.onCreateRegistro
        ])
        setNotification('Um registro foi adicionado.')
      }
    })

    const operationDelete: any = await API.graphql(
      graphqlOperation(onDeleteRegistro, { owner: user?.username })
    )
    onDeleteListener = operationDelete.subscribe({
      next: (dados: any) => {
        setRegistros((prevState) => {
          return prevState.filter(
            (registro) => registro.id !== dados.value.data.onDeleteRegistro.id
          )
        })
        setNotification('Um registro foi excluido.')
      }
    })

    const operationUpdate: any = await API.graphql(
      graphqlOperation(onUpdateRegistro, { owner: user?.username })
    )
    onUpdateListener = operationUpdate.subscribe({
      next: (dados: any) => {
        setRegistros((prevState) => {
          return prevState.map((registro) =>
            registro.id === dados.value.data.onUpdateRegistro.id
              ? { ...registro, ...dados.value.data.onUpdateRegistro }
              : registro
          )
        })
        setNotification('Um registro foi alterado.')
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
      data,
      owner: user.username
    }

    await API.graphql(
      graphqlOperation(createRegistro, { input: novoRegistroData })
    )
  }

  const editarRegistro = async (registro: {
    id: string | undefined
    tipo: 'entrada' | 'saida'
    descricao: string
    valor: number
    data: Date
  }) => {
    const registroData = {
      id: registro.id,
      tipo: registro.tipo,
      descricao: registro.descricao,
      valor: registro.valor,
      data: registro.data,
      owner: user.username
    }

    await API.graphql(graphqlOperation(updateRegistro, { input: registroData }))
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

  const registrosOrdenados = useMemo(() => {
    return registros.sort((a, b) =>
      (a.createdAt as Date) > (b.createdAt as Date) ? -1 : 1
    )
  }, [registros])

  useEffect(() => {
    ; (async () => {
      try {
        const newUser = await Auth.currentAuthenticatedUser()
        const filter = {
          eq: { owner: newUser.username }
        }
        const registros: any = await API.graphql(
          graphqlOperation(listRegistros, { filter })
        )
        setRegistros(registros.data.listRegistros.items)

        setUser(newUser)

        await onPageRendered()
      } catch (err) { }
    })()

    return () => {
      onPageUnmount()
    }
  }, [])

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        registros: registrosOrdenados,
        setRegistros,
        addRegistro,
        editarRegistro,
        removeRegistro,
        valorEntrada,
        valorSaida,
        data,
        setData,
        tipoData,
        setTipoData,
        onPageRendered,
        notification,
        setNotification,
        onPageUnmount
      }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
