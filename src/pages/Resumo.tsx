import {
  Button,
  Container,
  Grid,
  Typography,
  withStyles,
  colors
} from '@material-ui/core'
import { FC, useContext, useState } from 'react'
import RegistrarDialog from '../components/RegistrarDialog'
import { AppContext } from '../contexts/AppContext'
import numeral from 'numeral'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'

const InButton = withStyles({
  root: {
    backgroundColor: colors.green[700],
    margin: '10px',
    padding: '45px 45px',
    transition: '0.5s',
    minWidth: '100%',
    color: 'white',
    'box-shadow': '0 0 10px #ccc',
    'border-radius': '10px',
    '&:hover': {
      backgroundColor: colors.green.A700,
      color: '#fff',
      'text-decoration': 'none'
    }
  }
})(Button)

const OutButton = withStyles({
  root: {
    backgroundColor: colors.red.A700,
    margin: '10px',
    padding: '45px 45px',
    transition: '0.5s',
    color: 'white',
    'box-shadow': '0 0 10px #ccc',
    'border-radius': '10px',
    minWidth: '100%',
    '&:hover': {
      backgroundColor: colors.red[900],
      color: '#fff',
      'text-decoration': 'none'
    }
  }
})(Button)

const Resumo: FC = () => {
  const [registrarDialogOpen, setRegistrarDialogOpen] = useState(false)
  const [tipoRegistro, setTipoRegistro] = useState<'entrada' | 'saida'>(
    'entrada'
  )
  const context = useContext(AppContext)

  const handleClose = () => {
    setRegistrarDialogOpen(false)
  }

  const handleOpenRegistroDialog = (tipo: 'entrada' | 'saida') => {
    setTipoRegistro(tipo)
    setRegistrarDialogOpen(true)
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Grid
        justify="center"
        alignItems="center"
        item
        container
        direction="column">
        <Grid justify="center" container item md={12}>
          <Typography style={{ color: colors.green[500] }} variant="h6">
            R$ {numeral(context?.valorEntrada).format('0,0.00')}
          </Typography>
        </Grid>
        <Grid justify="center" container item md={12}>
          <InButton
            onClick={() => {
              handleOpenRegistroDialog('entrada')
            }}
            startIcon={<ArrowDownwardIcon />}
            >Registrar entrada
          </InButton>
        </Grid>
        <Grid
          style={{ paddingTop: '2.5rem' }}
          justify="center"
          container
          item
          md={12}>
          <Typography style={{ color: colors.red[500] }} variant="h6">
            R$ {numeral(context?.valorSaida).format('0,0.00')}
          </Typography>
        </Grid>
        <Grid justify="center" container item md={12}>
          <OutButton
            onClick={() => {
              handleOpenRegistroDialog('saida')
            }}
            endIcon={<ArrowUpwardIcon />}>
            Registrar saída
          </OutButton>
        </Grid>
      </Grid>
      <RegistrarDialog
        open={registrarDialogOpen}
        onClose={handleClose}
        tipoRegistro={tipoRegistro}
      />
    </Container>
  )
}

export default Resumo
