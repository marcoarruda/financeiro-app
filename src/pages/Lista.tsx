import { FC, useState, useContext, Fragment } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { AppContext } from '../contexts/AppContext'
import { Grid } from '@material-ui/core'
import moment from 'moment'
import numeral from 'numeral'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    }
  })
)

const Lista: FC = () => {
  const context = useContext(AppContext)
  const classes = useStyles()
  const [checked, setChecked] = useState([0])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleDelete = (registroId: number) => {
    context?.removeRegistro(registroId)
  }

  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <List className={classes.root}>
          {context?.registros.map((registro) => {
            if (moment(registro.data).isSame(moment(context.data), 'day')) {
              return (
                <Fragment key={registro.id}>
                  <ListItem
                    role={undefined}
                    button
                    onClick={handleToggle(registro.id)}>
                    {/* <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(registro.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon> */}
                    <ListItemText id={`checkbox-list-label-${registro.id}`}>
                  <strong>R$ {
                   registro.tipo === 'entrada' ?
                       numeral(registro.valor).format('0,0.00') :
                     numeral(-registro.valor).format('0,0.00')
                  }</strong> - {registro.descricao}
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => { handleDelete(registro.id) }} edge="end">
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
