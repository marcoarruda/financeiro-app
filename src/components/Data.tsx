import { FC, useContext, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ArrowRight from '@material-ui/icons/ArrowRight'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import { AppContext } from '../contexts/AppContext'
import moment, { unitOfTime } from 'moment'
import MomentUtils from '@date-io/moment'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import 'moment/locale/pt-br'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

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
      zIndex: 0,
      paddingBottom: '0.6rem',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    }
  })
)

const Data: FC = () => {
  const classes = useStyles()
  const context = useContext(AppContext)
  const [tipoData, setTipoData] = useState<string | number>('days')
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const diminuiData = () => {
    context?.setData(
      moment(context?.data)
        .subtract(1, context?.tipoData as unitOfTime.DurationConstructor)
        .toDate()
    )
  }

  const aumentaData = () => {
    context?.setData(
      moment(context?.data)
        .add(1, context?.tipoData as unitOfTime.DurationConstructor)
        .toDate()
    )
  }

  const alterarTipoData = (event: any) => {
    context?.setTipoData(event.target.value)
    setTipoData(event.target.value)
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
          <IconButton onClick={diminuiData}>
            <ArrowLeft />
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
              {/* <InputLabel id="demo-controlled-open-select-label">
                Visualizar
              </InputLabel> */}
              <Select
                style={{ maxWidth: '120px' }}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={tipoData}
                onChange={alterarTipoData}>
                <MenuItem value={'days'}>Ver por dia</MenuItem>
                <MenuItem value={'month'}>Ver por mês</MenuItem>
                <MenuItem value={'year'}>Ver por ano</MenuItem>
              </Select>
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
              style={{ maxWidth: '100px' }}
              fullWidth={false}
              views={
                context?.tipoData === 'days'
                  ? ['date', 'month', 'year']
                  : context?.tipoData === 'month'
                    ? ['month', 'year']
                    : ['year']
              }
              format={
                context?.tipoData === 'days'
                  ? 'DD/MM/YYYY'
                  : context?.tipoData === 'month'
                    ? 'MM/YYYY'
                    : 'YYYY'
              }
              value={moment(context?.data)}
              onChange={(data) => {
                context?.setData(moment(data).toDate())
              }}
            />
          </Grid>
        </Grid>
        <Grid item container xs={1} sm={1} md={1} justify="center">
          <IconButton onClick={aumentaData}>
            <ArrowRight />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        className={classes.container}
        alignItems="center"
        alignContent="center"
        justify="center"></Grid>
    </MuiPickersUtilsProvider>
  )
}

export default Data
