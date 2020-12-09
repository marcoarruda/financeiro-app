import { FC, useContext, Fragment, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import EditarDialog from '../components/EditarDialog'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import { AppContext, Registro } from '../contexts/AppContext'
import {
  Button,
  ButtonGroup,
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
      maxHeight: '48vh',
      minHeight: '48vh',
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
  const [registroSelecionado, setRegistroSelecionado] = useState<Registro>(
    {} as Registro
  )
  const [editarDialogOpen, setEditarDialogOpen] = useState(false)

  const context = useContext(AppContext)
  const classes = useStyles()

  const handleClose = () => {
    setRemoveDialogOpen(false)
    setEditarDialogOpen(false)
    setRegistrarDialogOpen(false)
  }

  const handleDelete = (registroId: string | undefined) => {
    setRegistroId(registroId)
    setRemoveDialogOpen(true)
  }

  const handleEdit = (registro: Registro) => {
    setRegistroSelecionado(registro)
    setEditarDialogOpen(true)
  }

  const handleOpenRegistroDialog = () => {
    setRegistrarDialogOpen(true)
  }

  const changeTipo = (tipo: 'entrada' | 'saida') => {
    setTipo(tipo)

    setRegistroSelecionado({} as Registro)
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
          {context.registros.length > 0 ? (
            <>
              {context.registros.map((registro) => {
                if (
                  moment(registro.data).isSame(
                    moment(context.data),
                    context.tipoData
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
                          <strong>
                            R${' '}
                            {registro.tipo === 'entrada'
                              ? numeral(registro.valor).format('0,0.00')
                              : numeral(-registro.valor).format('0,0.00')}
                          </strong>{' '}
                          - {registro.descricao}
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() => {
                              handleEdit(registro)
                            }}
                            edge="end">
                            <CreateIcon />
                          </IconButton>
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
            </>
          ) : (
            <Grid item container justify="center">
              <Typography variant="subtitle1" style={{ marginTop: '10rem' }}>
                Nenhum registro encontrado
              </Typography>
            </Grid>
          )}
        </List>

        <Grid item container>
          <Grid item container justify="center" style={{ marginBottom: '0.3rem' }}>
            <Typography variant="body1">
              {
                <strong>
                  R${' '}
                  {tipo === 'entrada'
                    ? numeral(context.valorEntrada).format('0,0.00')
                    : '-' + numeral(context.valorSaida).format('0,0.00')}
                </strong>
              }
            </Typography>
          </Grid>
          <Grid item container justify="center">
            {tipo === 'entrada' ? (
              <Button variant="outlined" onClick={handleOpenRegistroDialog}>
                Registrar Entrada
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleOpenRegistroDialog}>
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
      <EditarDialog
        open={editarDialogOpen}
        onClose={handleClose}
        registroSelecionado={registroSelecionado}
      />
    </Fragment>
  )
}

export default Relatorio
