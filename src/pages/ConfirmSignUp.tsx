import { FC, useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import InputMask from 'react-input-mask'
import { AppContext } from '../contexts/AppContext'
import CircularProgress from '@material-ui/core/CircularProgress'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Alert(props: AlertProps) {
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
  codigo: string
  telefone: string
}

const ConfirmSignUp: FC = () => {
  const context = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { register, handleSubmit } = useForm<FormData>()

  const history = useHistory()

  const onSubmit = async (data: FormData) => {
    const { codigo, telefone } = data

    setLoading(true)
    const phone = '+55' + telefone.replace(/[^\d]/g, '')

    try {
      await Auth.confirmSignUp(phone, codigo)

      if (context.user) {
        const user = await Auth.signIn(
          context.user.username,
          context.user.password
        )
        context.setUser(user)
      }

      return history.push('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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
          Confirmar
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate>
          <Snackbar open={true}>
            <Alert severity="info">
              <Typography variant="body2">
                Enviamos um código para o seu celular{' '}
                {context.user?.username.split('+55')[1]}, confirme o mesmo para
                a finalização do seu cadastro.
              </Typography>
            </Alert>
          </Snackbar>
          <InputMask
            defaultValue={context.user?.username.split('+55')[1]}
            mask="(99) 99999-9999"
            maskPlaceholder={null}
            disabled={false}>
            {() => (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="telefone"
                label="Número de Telefone"
                name="telefone"
                autoComplete="telefone"
                inputProps={{
                  inputMode: 'numeric'
                }}
                inputRef={register({
                  required: true
                })}
              />
            )}
          </InputMask>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="codigo"
            label="Código"
            id="codigo"
            autoFocus
            inputProps={{
              inputMode: 'numeric'
            }}
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
            disabled={loading}
            startIcon={loading && <CircularProgress size={14} />}>
            Confirmar
          </Button>
        </form>
      </div>
      <Snackbar open={!!error} autoHideDuration={3000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  )
}

export default ConfirmSignUp
