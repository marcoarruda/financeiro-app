import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// eslint-disable-next-line no-use-before-define
import React, { Fragment, useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import RestoreIcon from '@material-ui/icons/Restore'
import PieChartIcon from '@material-ui/icons/PieChart'
import AssessmentIcon from '@material-ui/icons/Assessment'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
})

type Anchor = 'top' | 'left' | 'bottom' | 'right'
function TemporaryDrawer() {
  const classes = useStyles()
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  })

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom'
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {['Resumo', 'Gráfico', 'Lista', 'Relatório'].map((text, index) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={
              index === 0
                ? '/'
                : index === 1
                  ? '/grafico'
                  : index === 2
                    ? '/lista'
                    : '/relatorio'
            }>
            <ListItemIcon>
              {index === 2 ? (
                <AssignmentIcon />
              ) : index === 0 ? (
                <RestoreIcon />
              ) : index === 1 ? (
                <PieChartIcon />
              ) : (
                      <AssessmentIcon />
                    )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      {(['left'] as Anchor[]).map((anchor) => (
        <Fragment key={anchor}>
          <IconButton
            edge="start"
            onClick={toggleDrawer(anchor, true)}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  )
}

export default TemporaryDrawer
