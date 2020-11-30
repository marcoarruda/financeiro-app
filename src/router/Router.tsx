import { FC } from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

// Paginas
import Resumo from '../pages/Resumo'
import Grafico from '../pages/Grafico'
import Lista from '../pages/Lista'
import Login from "../pages/Login";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Main Layout */}
        <Route exact path={['/', '/about', '/users']}>
          <MainLayout>
            <Route exact path="/resumo" component={Resumo} />
            <Route exact path="/grafico" component={Grafico} />
            <Route exact path="/lista" component={Lista} />
          </MainLayout>
        </Route>

        {/* Login */}
        <Route exact path={['/login', '/registro']}>
          <AuthLayout>
            <Route exact path="/login" component={Login} />
          </AuthLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router