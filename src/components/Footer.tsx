import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import AssignmentIcon from '@material-ui/icons/Assignment'
import PieChartIcon from '@material-ui/icons/PieChart'
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
    // 'background-image': 'radial-gradient( circle farthest-corner at 10% 20%,  rgba(69,86,102,1) 0%, rgba(34,34,34,1) 90% )',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
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
      <BottomNavigationAction component={Link} to="/" label="Resumo" icon={<RestoreIcon />} />
      <BottomNavigationAction component={Link} to="/grafico" label="Gráfico" icon={<PieChartIcon />} />
      <BottomNavigationAction component={Link} to="/lista" label="Lista" icon={<AssignmentIcon />} />
    </BottomNavigation>
  )
}

export default SimpleBottomNavigation
