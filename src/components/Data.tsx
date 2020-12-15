import { FC, useContext } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ArrowForward from '@material-ui/icons/ArrowForward'
import RefreshIcon from '@material-ui/icons/Cached'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { AppContext } from '../contexts/AppContext'
import moment, { unitOfTime } from 'moment'
import MomentUtils from '@date-io/moment'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import 'moment/locale/pt-br'
import FormControl from '@material-ui/core/FormControl'
import { Button } from '@material-ui/core'

moment.locale('pt-br')
moment.defineLocale('xd', {})

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
      marginBottom: '0.6rem',
      zIndex: 0,
      paddingBottom: '0.6rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    root: {
      marginLeft: '12px',
      border: 0,
      color: 'white',
      height: 36,
      width: 100,
      padding: '0',
      boxShadow: '0 0 6px rgba(0, 0, 0, .3)'
    },
    label: {
      textTransform: 'capitalize'
    }
  })
)

const Data: FC = () => {
  const classes = useStyles()
  const context = useContext(AppContext)

  const diminuiData = () => {
    context.setData(
      moment(context.data)
        .subtract(1, context.tipoData as unitOfTime.DurationConstructor)
        .toDate()
    )
  }

  const aumentaData = () => {
    context.setData(
      moment(context.data)
        .add(1, context.tipoData as unitOfTime.DurationConstructor)
        .toDate()
    )
  }

  const alterarTipoData = () => {
    context.tipoData === 'days'
      ? context.setTipoData('month')
      : context.tipoData === 'month'
      ? context.setTipoData('year')
      : context.setTipoData('days')
  }

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        className={classes.container}
        alignItems="center"
        alignContent="center"
        justify="center">
        <Grid item container xs={1} sm={1} md={1} justify="center">
          <IconButton onClick={diminuiData} disabled={context.loadingRegistros}>
            <ArrowBack />
          </IconButton>
        </Grid>
        <Grid item container xs={10} sm={10} md={10} justify="center">
          <Grid
            item
            container
            xs={5}
            sm={5}
            md={5}
            justify="center"
            alignContent="center">
            <FormControl className={classes.formControl}>
              <Button
                disabled={context.loadingRegistros}
                classes={{ root: classes.root, label: classes.label }}
                variant="contained"
                color="primary"
                onClick={alterarTipoData}
                startIcon={<RefreshIcon />}>
                {context.tipoData === 'days'
                  ? 'Dia'
                  : context.tipoData === 'month'
                  ? 'Mês'
                  : 'Ano'}
              </Button>
            </FormControl>
          </Grid>
          <Grid
            item
            container
            xs={5}
            sm={5}
            md={5}
            justify="center"
            alignContent="center">
            <DatePicker
              disabled={context.loadingRegistros}
              style={{ maxWidth: '100px', marginLeft: '1rem' }}
              fullWidth={false}
              views={
                context.tipoData === 'days'
                  ? ['date', 'month', 'year']
                  : context.tipoData === 'month'
                  ? ['month', 'year']
                  : ['year']
              }
              format={
                context.tipoData === 'days'
                  ? 'DD/MM/YYYY'
                  : context.tipoData === 'month'
                  ? 'MM/YYYY'
                  : 'YYYY'
              }
              value={moment(context.data)}
              onChange={(data) => {
                context.setData(moment(data).toDate())
              }}
            />
          </Grid>
        </Grid>
        <Grid item container xs={1} sm={1} md={1} justify="center">
          <IconButton onClick={aumentaData} disabled={context.loadingRegistros}>
            <ArrowForward />
          </IconButton>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  )
}

export default Data
