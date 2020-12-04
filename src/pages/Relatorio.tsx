import { FC, useContext, Fragment, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { AppContext, Registro } from '../contexts/AppContext'
import {
  Button,
  ButtonGroup,
  Paper,
  colors,
  Grid,
  Typography,
  Divider
} from '@material-ui/core'
import RegistrarDialog from '../components/RegistrarDialog'
import RemoveDialog from '../components/RemoveDialog'
import moment from 'moment'
import numeral from 'numeral'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'inherit',
      maxHeight: '50vh',
      minHeight: '50vh',
      overflowY: 'scroll',
      overflowX: 'hidden',
      [theme.breakpoints.up(1350)]: {
        maxHeight: '65vh',
        minHeight: '65vh',
        overflowY: 'auto',
        overflowX: 'auto'
      }
    },
    inText: {
      color: colors.green[500]
    },
    outText: {
      color: colors.red.A700
    }
  })
)

const Relatorio: FC = () => {
  const [registrarDialogOpen, setRegistrarDialogOpen] = useState(false)
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [registroId, setRegistroId] = useState<string | undefined>('')
  const [tipo, setTipo] = useState<'entrada' | 'saida'>('entrada')
  const [registroSelecionado, setRegistroSelecionado] = useState<Registro>()

  const context = useContext(AppContext)
  const classes = useStyles()

  const handleClose = () => {
    setRemoveDialogOpen(false)
    setRegistrarDialogOpen(false)
  }

  const handleDelete = (registroId: string | undefined) => {
    setRegistroId(registroId)
    setRemoveDialogOpen(true)
  }

  const handleOpenRegistroDialog = () => {
    setRegistrarDialogOpen(true)
  }

  const changeTipo = (tipo: 'entrada' | 'saida') => {
    setTipo(tipo)

    setRegistroSelecionado(undefined)
  }

  return (
    <Fragment>
      <Grid item container direction="column">
        <Grid item container justify="center">
          <ButtonGroup>
            <Button
              style={{ backgroundColor: colors.green[600], color: 'white' }}
              onClick={() => {
                changeTipo('entrada')
              }}>
              Entrada
            </Button>
            <Button
              style={{ backgroundColor: colors.red.A700, color: 'white' }}
              onClick={() => {
                changeTipo('saida')
              }}>
              Saida
            </Button>
          </ButtonGroup>
        </Grid>
        <List className={classes.root}>
          {context?.registros.map((registro) => {
            if (
              moment(registro.data).isSame(
                moment(context.data),
                context?.tipoData
              ) &&
              registro.tipo === tipo
            ) {
              return (
                <Fragment key={registro.id}>
                  <ListItem
                    onClick={() => {
                      setRegistroSelecionado(registro)
                    }}
                    selected={registroSelecionado?.id === registro.id}
                    role={undefined}
                    button>
                    <ListItemText
                      className={
                        registro.tipo === 'entrada'
                          ? classes.inText
                          : classes.outText
                      }
                      id={`checkbox-list-label-${registro.id}`}>
                      {registro.descricao}
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => {
                          handleDelete(registro.id)
                        }}
                        edge="end">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </Fragment>
              )
            } else {
              return null
            }
          })}
        </List>

        <Grid item container>
          <Grid item container justify="center">
            <Typography variant="body1">
              {registroSelecionado ? (
                <strong>
                  R${' '}
                  {registroSelecionado?.tipo === 'entrada'
                    ? numeral(registroSelecionado?.valor).format('0,0.00')
                    : -numeral(registroSelecionado?.valor).format('0,0.00')}
                </strong>
              ) : (
                <>{'Selecione um registro'}</>
              )}
            </Typography>
          </Grid>
          <Grid item container justify="center">
            {tipo === 'entrada' ? (
              <Button variant="contained" onClick={handleOpenRegistroDialog}>
                Registrar Entrada
              </Button>
            ) : (
              <Button variant="contained" onClick={handleOpenRegistroDialog}>
                Registrar Saida
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <RemoveDialog
        open={removeDialogOpen}
        onClose={handleClose}
        registroId={registroId}
      />
      <RegistrarDialog
        open={registrarDialogOpen}
        onClose={handleClose}
        tipoRegistro={tipo}
      />
    </Fragment>
  )
}

export default Relatorio