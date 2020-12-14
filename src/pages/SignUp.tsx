import { FC, useContext, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { Link, useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Auth } from 'aws-amplify'
import { useForm } from 'react-hook-form'
import { AppContext } from '../contexts/AppContext'
import { colors } from '@material-ui/core'
import InputMask from 'react-input-mask'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
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
  telefone: string
  password: string
  firstName: string
  lastName: string
  email: string
  remember: boolean
}

const SignUp: FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const context = useContext(AppContext)

  const { register, handleSubmit } = useForm<FormData>()

  const history = useHistory()

  const onSubmit = (data: FormData) => {
    const { telefone, password, firstName, lastName, email } = data
    const phone = '+55' + telefone.replace(/[^\d]/g, '')
    const attributes = {
      email: email,
      name: firstName + ' ' + lastName,
      phone_number: phone
    }
    setLoading(true)

    Auth.signUp({
      username: phone,
      password,
      attributes
    })
      .then((user) => {
        context.setUser({ username: user.user.getUsername(), password })

        history.push('/confirm-signup')
      })
      .catch((err) => {
        setError(err.message)

        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastrar
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.form}
          noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Primeiro Nome"
                autoFocus
                inputRef={register({
                  required: true
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Último Nome"
                name="lastName"
                autoComplete="lname"
                inputRef={register({
                  required: true
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                inputRef={register({
                  required: true
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <InputMask
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            startIcon={loading && <CircularProgress size={14} />}>
            Cadastrar
          </Button>
        </form>
        <Grid container>
          <Grid item container justify="center">
            <Typography
              component={Link}
              to="/login"
              variant="body2"
              style={{ textDecoration: 'none', color: colors.indigo[400] }}>
              Retornar para o login
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default SignUp
