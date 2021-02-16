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

  const queryRegistros = async ({
    params,
    items = [],
    callback = undefined
  }: {
    params: any
    items?: any[]
    callback?: any
  }): Promise<any> => {
    const { data }: any = await API.graphql(
      graphqlOperation(listRegistros, params)
    )
    const key = Object.keys(data).find((k) => k.includes('list'))
    const res = data[key as string] // res = { items: [], nextToken: '' }

    items.push(...res.items)

    if (callback) {
      callback(res.items)
    }

    if (!res.nextToken) return items

    params.nextToken = res.nextToken
    return await queryRegistros({ params, items, callback })
  }

  useEffect(() => {
    ;(async () => {
      try {
        const newUser = await Auth.currentAuthenticatedUser()

        const params = {
          filter: {
            owner: { eq: newUser.username }
          },
          limit: 1000
        }
        try {
          setLoadingRegistros(true)
          if (registros.length === 0) {
            const registros = await queryRegistros({ params })
            setRegistros(registros)
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
