import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import AssessmentIcon from '@material-ui/icons/Assessment'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { colors } from '@material-ui/core'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  navigation: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    // backgroundColor: colors.indigo[800],
    // color: colors.common.white,
    'background-image': 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(69,86,102,1) 0%, rgba(34,34,34,1) 90% )',
    zIndex: 100
  },
  navigationAction: {
    color: colors.grey[50],
    '&$selected': {
      color: colors.common.white
    }
  },
  navigationActionSelected: {
    color: colors.common.white
  }
})

const SimpleBottomNavigation: FC = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.navigation}
    >
      <BottomNavigationAction component={Link} to="/" className={classes.navigationAction} label="Resumo" icon={<RestoreIcon />} />
      <BottomNavigationAction component={Link} to="/grafico" className={classes.navigationAction} label="Gráfico" icon={<AssessmentIcon />} />
      <BottomNavigationAction component={Link} to="/lista" className={classes.navigationAction} label="Lista" icon={<AssignmentIcon />} />
    </BottomNavigation>
  )
}

export default SimpleBottomNavigation
