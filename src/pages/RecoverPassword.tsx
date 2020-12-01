import { FC, useContext, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
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
import Container from '@material-ui/core/Container'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AppContext } from '../contexts/AppContext'

function Alert (props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
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
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  })
)

type FormData = {
  telefone: string
}

type FormData2 = {
  codigo: string
  password: string
}

const RecoverPassword: FC = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({})
  const steps = [
    'Confirme a conta',
    'Crie a Nova senha'
  ]
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [telefone, setTelefone] = useState('')
  const context = useContext(AppContext)

  const { register, handleSubmit } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const { register: register2, handleSubmit: handleSecondSubmit } = useForm<FormData2>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const history = useHistory()
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

  const onSubmit2 = async (data: FormData2) => {
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

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={classes.form}
                >
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
      case 1:
        return (
          <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <form
                onSubmit={handleSecondSubmit(onSubmit2)}
                className={classes.form}
                >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Nova Senha"
                  type="password"
                  id="password"
                  inputRef={register2({
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
                  inputRef={register2({
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
  }

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  const handleComplete = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    handleNext()
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  return (
    <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperação de Senha
        </Typography>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecoverPassword
