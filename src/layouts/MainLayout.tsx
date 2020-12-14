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
  const {
    setRegistros,
    setUser,
    setNotification,
    onPageRendered,
    onPageUnmount,
    notification,
    setLoadingRegistros,
    registros
  } = useContext(AppContext)

  const onClose = () => {
    setNotification('')
  }

  const queryRegistros = async (filter: any, nextToken?: string) => {
    let registrosQuery: any

    if (nextToken) {
      registrosQuery = await API.graphql(
        graphqlOperation(listRegistros, { nextToken })
      )
    } else {
      registrosQuery = await API.graphql(
        graphqlOperation(listRegistros, { filter, limit: 1000 })
      )
    }

    setRegistros([...registros, ...registrosQuery.data.listRegistros.items])

    if (registrosQuery.data.listRegistros.nextToken) {
      await queryRegistros(filter, registrosQuery.data.listRegistros.nextToken)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const newUser = await Auth.currentAuthenticatedUser()

        const filter = {
          owner: { eq: newUser.username }
        }

        try {
          setLoadingRegistros(true)
          if (registros.length === 0) {
            await queryRegistros(filter)
          }
        } finally {
          setLoadingRegistros(false)
        }

        setUser(newUser)

        await onPageRendered()
      } catch (err) {}
    })()

    return () => {
      onPageUnmount()
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
        open={notification !== ''}
        onClose={onClose}
        autoHideDuration={3000}>
        <Alert severity="info">{notification}</Alert>
      </Snackbar>

      {/* Footer */}
      <Footer />
    </>
  )
}

export default MainLayout
