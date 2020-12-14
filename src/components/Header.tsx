import { FC, useContext } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Drawer from './Drawer'
import { AppContext } from '../contexts/AppContext'
import { Link, useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 100
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
)

const Header: FC = () => {
  const classes = useStyles()
  const context = useContext(AppContext)
  const history = useHistory()

  const onLogout = async () => {
    await Auth.signOut()

    context.setUser(null)
    localStorage.removeItem('teste.login')

    history.push('/login')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Drawer />
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="subtitle1" className={classes.title}>
            Bem vindo(a){' '}
            {context.user ? context.user.attributes.name.split(' ')[0] : null}!
          </Typography>
          {context.user ? (
            <Button
              onClick={() => {
                onLogout()
              }}
              color="inherit">
              Sair
            </Button>
          ) : (
            <Button to="/login" component={Link} color="inherit">
              Entrar
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
