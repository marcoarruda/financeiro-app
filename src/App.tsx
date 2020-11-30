import React from 'react';

import Header from './components/Header'
import Footer from './components/Footer'
import Data from './components/Data'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Grid from '@material-ui/core/Grid'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppProvider from './contexts/AppContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: '4rem 2rem 4rem 2rem',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  let rows = []
  for(let i = 0; i < 5; i++){
    rows.push(<p key={i}>Excepteur tempor nisi sint ea sunt fugiat fugiat magna sint ad est culpa Lorem. Officia nostrud consectetur do ullamco veniam esse do duis. Duis ad consequat culpa officia id est dolore eiusmod culpa eiusmod ullamco. Tempor culpa adipisicing aliquip officia ut incididunt culpa. Aliquip amet do enim exercitation ad dolor amet veniam. Cupidatat dolor nostrud eu adipisicing.</p>)
  }

  return (
    <React.Fragment>
      <AppProvider>
        <Router>
          {/* Header */}
          <Header />

          {/* Container */}
          <Grid container className={classes.container}>
            <Data />
            <Switch>
              <Route path="/about">
                <h1>About</h1>
              </Route>
              <Route path="/users">
                <h1>Users</h1>
                { rows }
              </Route>
              <Route path="/">
                <h1>Home</h1>
              </Route>
            </Switch>
          </Grid>

          {/* Footer */}
          <Footer />
        </Router>
      </AppProvider>
    </React.Fragment>
  );
}

export default App;
