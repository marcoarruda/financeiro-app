import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import { FC, useContext, useEffect } from 'react'
import Data from '../components/Data'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AppContext } from '../contexts/AppContext'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { listRegistros } from '../graphql/queries'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: '4rem 1rem'
    }
  })
)

const MainLayout: FC = ({ children }) => {
  const classes = useStyles()
  const context = useContext(AppContext)

  useEffect(() => {
    (async () => {
      try {
        const newUser = await Auth.currentAuthenticatedUser()
        const registros: any = await API.graphql(
          graphqlOperation(listRegistros)
        )
        context?.setRegistros(registros.data.listRegistros.items)

        context?.setUser(newUser)

        await context?.onPageRendered()
      } catch (err) {}
    })()

    return () => {
      context?.onPageUnmount()
    }
  }, [])

  return (
    <>
      {/* Header */}
      <Header />

      {/* Container */}
      <Grid container className={ classes.container }>
        <Data />
        { children }
      </Grid>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default MainLayout
