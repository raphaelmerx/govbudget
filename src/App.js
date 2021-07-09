import logo from './openbudget-logo.png';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div id="app">
        <div id="logo-container">
          <img id="logo" src={logo} alt="logo"/>
          <nav className="nav-links">
            <div className="nav-item">
              <NavLink to="/" exact>Visualise</NavLink>
            </div>
            <div className="nav-item">
              <NavLink to="/about">About</NavLink>
            </div>
          </nav>
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
