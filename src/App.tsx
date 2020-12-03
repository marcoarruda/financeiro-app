import { FC } from 'react'
import AppProvider from './contexts/AppContext'
import Router from './router/Router'
import { CssBaseline } from '@material-ui/core'
import numeral from 'numeral'
import 'numeral/locales/pt-br'

numeral.locale('pt-br')

const App: FC = () => {
  return (
    <AppProvider>
      <CssBaseline/>
      <Router />
    </AppProvider>
  )
}

export default App
