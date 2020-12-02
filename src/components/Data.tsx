import { ChangeEvent, FC, useContext } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ArrowRight from '@material-ui/icons/ArrowRight'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import { AppContext } from '../contexts/AppContext'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'inline'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      minWidth: 180
    },
    container: {
      marginTop: '0.6rem',
      zIndex: 0
    }
  })
)

const Data: FC = () => {
  const classes = useStyles()
  const context = useContext(AppContext)
  const { register, getValues } = useForm()

  const today = (new Date()).toISOString().split('T')[0]

  return (
    <Grid item container xs={12} sm={12} md={12} className={classes.container} alignItems='center' alignContent='center' justify='center'>
      {/* Arrow Previous */}
      <Grid item container xs={2} sm={2} md={2} justify='center'>
        <IconButton>
          <ArrowLeft/>
        </IconButton>
      </Grid>

      {/* Form */}
      <Grid item container xs={8} sm={8} md={8} justify='center'>
        <form className={classes.form} noValidate>
        <TextField
          id="date"
          label="Data"
          type="date"
          name="data"
          defaultValue={ today }
          inputRef={register}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            console.log(getValues().data)
            const data = getValues().data
            const dataArray = data.split('-')
            const newDate = new Date(dataArray[0], dataArray[1] - 1, dataArray[2])
            newDate.setTime(newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000)

            context?.setData(newDate)
          }}
          className={classes.textField}
        />
      </form>

      {/* Arrow Next */}
      </Grid>
      <Grid item container xs={2} sm={2} md={2} justify='center'>
        <IconButton>
          <ArrowRight />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Data
