import {
  Button,
  Container,
  createStyles,
  CssBaseline,
  makeStyles,
  Snackbar,
  TextField,
  Theme
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Auth } from 'aws-amplify'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

type FormData = {
  password: string
  codigo: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    button: {
      marginRight: theme.spacing(1)
    },
    completed: {
      display: 'inline-block'
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    paper: {
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
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  })
)

const RecoverPasswordStepTwo: FC<{ telefone: string }> = ({ telefone }) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onSubmit = (data: FormData) => {
    const { codigo, password } = data

    setLoading(true)

    Auth.forgotPasswordSubmit(telefone, codigo, password)
      .then((user) => {
        history.push('/login')
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)

        console.log(err)

        setLoading(false)
      })
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Nova Senha"
            type="password"
            id="password"
            inputRef={register({
              required: true
            })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="codigo"
            label="Código"
            id="codigo"
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

export default RecoverPasswordStepTwo
