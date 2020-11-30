import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { colors } from '@material-ui/core';

const useStyles = makeStyles({
  navigation: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: colors.indigo[800],
    color: colors.common.white,
  },
  navigationAction: {
    color: colors.grey[50],
  },
  navigationActionSelected: {
    color: colors.common.white,
  }
});

const SimpleBottomNavigation: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.navigation}
    >
      <BottomNavigationAction className={classes.navigationAction} label="Resumo" icon={<RestoreIcon />} />
      <BottomNavigationAction className={classes.navigationAction} label="Gráfico" icon={<AssessmentIcon />} />
      <BottomNavigationAction className={classes.navigationAction} label="Lista" icon={<AssignmentIcon />} />
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation