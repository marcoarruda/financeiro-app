import { FC, useContext, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import InputMask from 'react-input-mask'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import { Auth } from 'aws-amplify'
import { useHistory, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AppContext } from '../contexts/AppContext'
import { colors } from '@material-ui/core'

function Alert (props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

type FormData = {
  phonenumber: string
  password: string
}

const Login: FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const context = useContext(AppContext)

  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const history = useHistory()

  const onSubmit = (data: FormData) => {
    const { phonenumber, password } = data

    setLoading(true)
    const phone = '+55' + phonenumber.replace(/[^\d]/g, '')

    Auth.signIn(phone, password)
      .then((user) => {
        localStorage.setItem(
          'teste.login',
          user.signInUserSession.accessToken.jwtToken
        )

        context?.setUser(user)

        history.push('/')
      })
      .catch((err) => {
        setError(err.message)

        console.log(err)

        setLoading(false)
      })
  }

  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate>
          <InputMask
            mask="(99) 99999-9999"
            maskPlaceholder={null}
            disabled={false}
          >
            {() => <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phonenumber"
            label="Número de Telefone"
            name="phonenumber"
            autoComplete="phonenumber"
            autoFocus
            inputRef={register({
              required: true
            })}
          />}
          </InputMask>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register({
              required: true
            })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}>
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography
                component={Link}
                to="/recover-password"
                variant="body2"
                style={{ textDecoration: 'none', color: colors.indigo[400] }}>
                Esqueceu sua senha?
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                component={Link}
                to="/signup"
                variant="body2"
                style={{ textDecoration: 'none', color: colors.indigo[400] }}>
                Não possui uma conta?
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Snackbar open={!!error} autoHideDuration={3000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  )
}

export default Login
