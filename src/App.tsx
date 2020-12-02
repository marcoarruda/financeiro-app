import { FC } from 'react'
import AppProvider from './contexts/AppContext'
import Router from './router/Router'
import { CssBaseline } from '@material-ui/core'
import numeral from 'numeral'

numeral.register('locale', 'pt-br', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : 'ème'
  },
  currency: {
    symbol: 'R$'
  }
})

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
