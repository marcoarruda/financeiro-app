import { FC, useState, useContext } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { AppContext } from '../contexts/AppContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
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
  const handleDelete = (value: any) => {
    context?.removeRegistro(value)
  }

  return (
    <>
    <h1>Lista</h1>
    <List className={classes.root}>
      {context?.registros.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`

        return (
          <ListItem
            key={value.id}
            role={undefined}
            dense
            button
            onClick={handleToggle(value.id)}>
            {/* <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon> */}
            <ListItemText id={labelId} primary={`R$ ${value.valor} - ${value.descricao}`} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => { handleDelete(value) }} edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
    </>
  )
}

export default Lista
