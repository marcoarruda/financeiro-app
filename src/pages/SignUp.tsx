import { FC, useContext, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AppContext } from '../contexts/AppContext'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

type FormData = {
  telefone: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string,
  remember: boolean
}

const SignUp: FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const context = useContext(AppContext)

  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const history = useHistory()

  const onSubmit = (data: FormData) => {
    const { telefone, password, firstName, lastName, email } = data
    const attributes = {
      email: email,
      name: firstName + ' ' + lastName,
      phone_number: telefone
    }
    setLoading(true)

    Auth.signUp({
      username: telefone,
      password,
      attributes
    })
      .then(user => {
        context?.setUser(user.user)

        history.push('/confirm-signup')
      })
      .catch(err => {
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
          Cadastrar
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
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
                label="Last Name"
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
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register({
                  required: true
                })}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="telefone"
              label="Número de Telefone"
              name="telefone"
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
                name="password"
                label="Password"
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
          >
            Cadastrar
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default SignUp
