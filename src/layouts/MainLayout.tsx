import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import { FC, useContext, useEffect } from 'react'
import Data from '../components/Data'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { AppContext } from '../contexts/AppContext'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { listRegistros } from '../graphql/queries'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: '4rem 1rem'
    }
  })
)

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const MainLayout: FC = ({ children }) => {
  const classes = useStyles()
  const context = useContext(AppContext)

  const onClose = () => {
    context.setNotification('')
  }

  useEffect(() => {
    ;(async () => {
      try {
        const newUser = await Auth.currentAuthenticatedUser()

        const filter = {
          owner: { eq: newUser.username }
        }
        const registros: any = await API.graphql(
          graphqlOperation(listRegistros, { filter, limit: 500 })
        )

        context.setRegistros(registros.data.listRegistros.items)

        context.setUser(newUser)

        console.log('rodou')

        await context.onPageRendered()
      } catch (err) {}
    })()

    return () => {
      context.onPageUnmount()
    }
  }, [])

  return (
    <>
      {/* Header */}
      <Header />

      {/* Container */}
      <Grid container className={classes.container}>
        <Data />
        {children}
      </Grid>

      <Snackbar
        open={context.notification !== ''}
        onClose={onClose}
        autoHideDuration={3000}>
        <Alert severity="info">{context.notification}</Alert>
      </Snackbar>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default MainLayout
