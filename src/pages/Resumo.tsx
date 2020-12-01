import { Button, Container, createStyles, Grid, makeStyles, Typography, Theme, withStyles } from '@material-ui/core'
import { common, green, red } from '@material-ui/core/colors'
import { FC } from 'react'

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
  return (
  <Container style={{ marginTop: '20px' }}>
    <Grid justify="center" alignItems="center" item container direction="column">
      <Grid justify="center" container item md={2}>
        <Typography variant="h6">Entrada: R$ 500,00</Typography>
      </Grid>
      <Grid justify="center" container item md={4}>
        <InButton>Registrar entrada</InButton>
      </Grid>
      <Grid style={{ paddingTop: '20px' }} justify="center" container item md={2}>
        <Typography variant="h6">Saida: R$ 250,00</Typography>
      </Grid>
      <Grid justify="center" container item md={4}>
        <OutButton>Registrar saída</OutButton>
      </Grid>
    </Grid>
  </Container>
  )
}

export default Resumo
