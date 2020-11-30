import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <h1>About</h1>
            {/* <About /> */}
          </Route>
          <Route path="/users">
            <h1>Users</h1>
            {/* <Users /> */}
          </Route>
          <Route path="/">
            <h1>Home</h1>
            {/* <Home /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
