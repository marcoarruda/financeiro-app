import { FC, useEffect, useState } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

// Paginas
import Resumo from '../pages/Resumo'
import Grafico from '../pages/Grafico'
import Lista from '../pages/Lista'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import ConfirmSignUp from '../pages/ConfirmSignUp'
import RecoverPassword from '../pages/RecoverPassword'

// Layouts
import AuthLayout from '../layouts/AuthLayout'
import MainLayout from '../layouts/MainLayout'
import { Auth } from 'aws-amplify'
import Relatorio from '../pages/Relatorio'

const ProtectedRoute = ({ children, component: Component, ...rest }: { component?: any, [key: string]: any }) => {
  const [isAuthenticated, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      let user = null

      try {
        setLoading(true)
        user = await Auth.currentAuthenticatedUser()
        setLoggedIn(!!user)
      } catch (e) {
        setLoggedIn(false)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <Route
    {...rest}
    render={props => {
      if (loading) {
        return null
      } else
      if (isAuthenticated) {
        return <>{ children }</>
      } else {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    }}
    />
  )
}

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Main Layout */}
        <ProtectedRoute exact path={['/', '/grafico', '/lista', '/relatorio']}>
          <MainLayout>
            <Route exact path="/" component={Resumo} />
            <Route exact path="/grafico" component={Grafico} />
            <Route exact path="/lista" component={Lista} />
            <Route exact path="/relatorio" component={Relatorio} />
          </MainLayout>
        </ProtectedRoute>

        {/* Login */}
        <Route exact path={['/login', '/signup', '/confirm-signup', '/recover-password']}>
          <AuthLayout>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/confirm-signup" component={ConfirmSignUp} />
            <Route exact path="/recover-password" component={RecoverPassword} />
          </AuthLayout>
        </Route>
        <Route path="*" component={() => (<Redirect to="/" />)}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
