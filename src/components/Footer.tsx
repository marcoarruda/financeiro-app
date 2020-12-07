import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import AssignmentIcon from '@material-ui/icons/Assignment'
import PieChartIcon from '@material-ui/icons/PieChart'
import { colors } from '@material-ui/core'
import { FC, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const useStyles = makeStyles({
  navigation: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
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
  const [value, setValue] = useState('/')
  const location = useLocation()

  useEffect(() => {
    setValue(location.pathname)
  }, [location.pathname])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.navigation}
    >
      <BottomNavigationAction value='/' component={Link} to="/" label="Resumo" icon={<RestoreIcon />} />
      <BottomNavigationAction value='/grafico' component={Link} to="/grafico" label="Gráfico" icon={<PieChartIcon />} />
      <BottomNavigationAction value='/lista' component={Link} to="/lista" label="Lista" icon={<AssignmentIcon />} />
    </BottomNavigation>
  )
}

export default SimpleBottomNavigation
