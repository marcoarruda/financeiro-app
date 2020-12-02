import { ChangeEvent, FC, useContext, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ArrowRight from '@material-ui/icons/ArrowRight'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import { AppContext } from '../contexts/AppContext'
import { useForm } from 'react-hook-form'
import moment from 'moment'

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
      zIndex: 0,
      paddingBottom: '0.6rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
    }
  })
)

const Data: FC = () => {
  const classes = useStyles()
  const context = useContext(AppContext)
  const { register, getValues } = useForm()

  const diminuiData = () => {
    context?.setData(moment(context?.data).subtract(1, 'days').toDate())
  }

  const aumentaData = () => {
    context?.setData(moment(context?.data).add(1, 'days').toDate())
  }

  return (
    <Grid item container xs={12} sm={12} md={12} className={classes.container} alignItems='center' alignContent='center' justify='center'>
      {/* Arrow Previous */}
      <Grid item container xs={2} sm={2} md={2} justify='center'>
        <IconButton onClick={diminuiData}>
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
          value={moment(context?.data).format('YYYY-MM-DD')}
          inputRef={register}
          onChange={() => {
            context?.setData(moment(getValues().data).toDate())
          }}
          className={classes.textField}
        />
      </form>

      {/* Arrow Next */}
      </Grid>
      <Grid item container xs={2} sm={2} md={2} justify='center'>
        <IconButton onClick={aumentaData}>
          <ArrowRight />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Data
