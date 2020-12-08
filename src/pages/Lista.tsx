import { FC, useContext, Fragment, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import { AppContext, Registro } from '../contexts/AppContext'
import { colors, Grid, Typography } from '@material-ui/core'
import RemoveDialog from '../components/RemoveDialog'
import EditarDialog from '../components/EditarDialog'
import moment from 'moment'
import numeral from 'numeral'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: '68vh',
      minHeight: '68vh',
      overflowY: 'scroll',
      overflowX: 'hidden',
      [theme.breakpoints.up(1350)]: {
        maxHeight: '78vh',
        minHeight: '78vh',
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
  const context = useContext(AppContext)
  const classes = useStyles()

  const handleClose = () => {
    setRemoveDialogOpen(false)
    setEditarDialogOpen(false)
  }

  const handleDelete = (registroId: string | undefined) => {
    setRegistroId(registroId)
    setRemoveDialogOpen(true)
  }

  const handleEdit = (registro: Registro) => {
    setRegistroSelecionado(registro)
    console.log(registro)
    setEditarDialogOpen(true)
  }

  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <List className={classes.root}>
          {context.registros.length > 0 ? (
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
                      <ListItem button>
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
    </Grid>
  )
}

export default Lista
