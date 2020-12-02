import { FC, useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import { Auth } from 'aws-amplify'
import { useForm } from 'react-hook-form'

function Alert (props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
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
}))

type FormData = {
  telefone: string
}

const RecoverPasswordStepOne: FC<{
  handleComplete: () => void
  setTelefone: (telefone: string) => void
}> = ({ handleComplete, setTelefone }) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async (data: FormData) => {
    const { telefone } = data
    setLoading(true)

    setTelefone(telefone)

    Auth.forgotPassword(telefone)
      .then((user) => {
        handleComplete()
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
            fullWidth
            name="telefone"
            label="Telefone"
            id="telefone"
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

export default RecoverPasswordStepOne
