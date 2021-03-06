import { FC, useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import InputMask from 'react-input-mask'
import CircularProgress from '@material-ui/core/CircularProgress'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import { Auth } from 'aws-amplify'
import { useForm } from 'react-hook-form'

function Alert(props: AlertProps) {
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
  const { register, handleSubmit } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async (data: FormData) => {
    const { telefone } = data
    setLoading(true)
    const phone = '+55' + telefone.replace(/[^\d]/g, '')
    setTelefone(phone)

    Auth.forgotPassword(phone)
      .then((user) => {
        handleComplete()
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)

        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
                autoFocus
                inputProps={{
                  inputMode: 'numeric'
                }}
                inputRef={register({
                  required: true
                })}
              />
            )}
          </InputMask>
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

export default RecoverPasswordStepOne
