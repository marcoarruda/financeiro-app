import { FC, useContext, Fragment } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { AppContext } from '../contexts/AppContext'
import { colors, Grid } from '@material-ui/core'
import moment from 'moment'
import numeral from 'numeral'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    inText: {
      color: colors.green[500]
    },
    outText: {
      color: colors.red.A700
    }
  })
)

const Lista: FC = () => {
  const context = useContext(AppContext)
  const classes = useStyles()

  const handleDelete = (registroId: string | undefined) => {
    context?.removeRegistro(registroId)
  }

  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <List className={classes.root}>
          {context?.registros.map((registro) => {
            if (moment(registro.data).isSame(moment(context.data), context?.tipoData)) {
              return (
                <Fragment key={registro.id}>
                  <ListItem role={undefined} button>
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
        </List>
      </Grid>
    </Grid>
  )
}

export default Lista
