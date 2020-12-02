import { FC, useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import RecoverPasswordStepOne from '../components/RecoverPasswordStepOne'
import RecoverPasswordStepTwo from '../components/RecoverPasswordStepTwo'
import Paper from '@material-ui/core/Paper'

import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

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

const RecoverPassword: FC = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({})
  const steps = ['Confirme a conta', 'Crie a Nova senha']
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [telefone, setTelefone] = useState('')

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === steps.length - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === steps.length
  }

  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  const handleComplete = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <RecoverPasswordStepOne handleComplete={handleComplete} setTelefone={setTelefone} />
      case 1:
        return <RecoverPasswordStepTwo telefone={telefone} />
    }
  }

  return (
    <div className={classes.paper}>
      <Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem' }}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperação de Senha
        </Typography>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                completed={completed[index]}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
      </Paper>
    </div>
  )
}

export default RecoverPassword
