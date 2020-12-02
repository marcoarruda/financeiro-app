import { Button, Container, Grid, Typography, withStyles } from '@material-ui/core'
import { common, green, red } from '@material-ui/core/colors'
import { FC, useContext, useState } from 'react'
import RegistrarDialog from '../components/RegistrarDialog'
import { AppContext } from '../contexts/AppContext'
import numeral from 'numeral'

const InButton = withStyles({
  root: {
    color: common.white,
    backgroundColor: green[500],
    padding: '50px 50px',
    minWidth: '100%',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: green[700]
    }
  }
})(Button)

const OutButton = withStyles({
  root: {
    color: common.white,
    backgroundColor: red[500],
    padding: '50px 50px',
    minWidth: '100%',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: red[700]
    }
  }
})(Button)

const Resumo: FC = () => {
  const [registrarDialogOpen, setRegistrarDialogOpen] = useState(false)
  const [tipoRegistro, setTipoRegistro] = useState<'entrada' | 'saida'>('entrada')
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
    <Grid justify="center" alignItems="center" item container direction="column">
      <Grid justify="center" container item md={2}>
  <Typography variant="h6">Entrada: R$ {numeral(context?.valorEntrada).format('0,0.00')}</Typography>
      </Grid>
      <Grid justify="center" container item md={4}>
        <InButton onClick={() => { handleOpenRegistroDialog('entrada') }}>Registrar entrada</InButton>
      </Grid>
      <Grid style={{ paddingTop: '20px' }} justify="center" container item md={2}>
        <Typography variant="h6">Saida: R$ {numeral(context?.valorSaida).format('0,0.00')}</Typography>
      </Grid>
      <Grid justify="center" container item md={4}>
        <OutButton onClick={() => { handleOpenRegistroDialog('saida') }}>Registrar saída</OutButton>
      </Grid>
    </Grid>
    <RegistrarDialog open={registrarDialogOpen} onClose={handleClose} tipoRegistro={tipoRegistro} />
  </Container>
  )
}

export default Resumo
