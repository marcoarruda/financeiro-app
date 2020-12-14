import { FC, useContext, Fragment, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { AppContext, Registro } from '../contexts/AppContext'
import { Button, colors, Grid, Typography } from '@material-ui/core'
import RemoveDialog from '../components/RemoveDialog'
import EditarDialog from '../components/EditarDialog'
import moment from 'moment'
import numeral from 'numeral'
import CircularProgress from '@material-ui/core/CircularProgress'
import RegistrarDialog from '../components/RegistrarDialog'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: '62vh',
      minHeight: '62vh',
      overflowY: 'scroll',
      overflowX: 'hidden',
      [theme.breakpoints.up(1350)]: {
        maxHeight: '72vh',
        minHeight: '72vh',
        overflowY: 'auto',
        overflowX: 'auto'
      }
    },
    inText: {
      color: colors.green[500],
      marginRight: '20px'
    },
    outText: {
      color: colors.red.A700,
      marginRight: '20px'
    }
  })
)
const Lista: FC = () => {
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [editarDialogOpen, setEditarDialogOpen] = useState(false)
  const [registroId, setRegistroId] = useState<string | undefined>('')
  const [registroSelecionado, setRegistroSelecionado] = useState<Registro>(
    {} as Registro
  )
  const [tipoRegistro, setTipoRegistro] = useState<'entrada' | 'saida'>(
    'entrada'
  )
  const [registrarDialogOpen, setRegistrarDialogOpen] = useState(false)

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

  const handleOpenRegistroDialog = (tipo: 'entrada' | 'saida') => {
    setTipoRegistro(tipo)
    setRegistrarDialogOpen(true)
  }

  return (
    <Grid container>
      <Grid
        item
        container
        direction="row"
        alignContent="space-between"
        justify="space-around"
        style={{
          margin: 0,
          padding: 0
        }}>
        <Grid item>
          <Button
            style={{ color: colors.green[500] }}
            onClick={() => handleOpenRegistroDialog('entrada')}
            startIcon={<ArrowDownward />}>
            R$ {numeral(context.valorEntrada).format('0,0.00')}
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{ color: colors.red.A700 }}
            onClick={() => handleOpenRegistroDialog('saida')}
            endIcon={<ArrowUpward />}>
            R$ {numeral(context.valorSaida).format('0,0.00')}
          </Button>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12}>
        <List className={classes.root}>
          {context.loadingRegistros ? (
            <Grid item container justify="center">
              <Typography variant="subtitle1" style={{ marginTop: '10rem' }}>
                <CircularProgress />
              </Typography>
            </Grid>
          ) : context.registros.length > 0 ? (
            <>
              {context.registros.map((registro) => {
                if (
                  moment(registro.data).isSame(
                    moment(context.data),
                    context.tipoData
                  )
                ) {
                  return (
                    <Fragment key={registro.id}>
                      <ListItem
                        button
                        onClick={() => {
                          handleEdit(registro)
                        }}>
                        <ListItemText
                          className={
                            registro.tipo === 'entrada'
                              ? classes.inText
                              : classes.outText
                          }
                          id={`checkbox-list-label-${registro.id}`}>
                          <Typography variant="subtitle2">
                            <strong>
                              R${' '}
                              {registro.tipo === 'entrada'
                                ? numeral(registro.valor).format('0,0.00')
                                : numeral(-registro.valor).format('0,0.00')}
                            </strong>{' '}
                            - {registro.descricao}
                          </Typography>
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
      </Grid>
      <RemoveDialog
        open={removeDialogOpen}
        onClose={handleClose}
        registroId={registroId}
      />
      <EditarDialog
        open={editarDialogOpen}
        onClose={handleClose}
        registroSelecionado={registroSelecionado}
      />
      <RegistrarDialog
        open={registrarDialogOpen}
        onClose={handleClose}
        tipoRegistro={tipoRegistro}
      />
    </Grid>
  )
}

export default Lista
