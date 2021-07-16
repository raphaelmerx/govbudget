import logo from './openbudget-logo.png';
import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import ReactTooltip from "react-tooltip";

import Home from './pages/Home';
import Compare from './pages/Compare';
import Map from './pages/Map';
import About from './pages/About';

function App() {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <Router>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <div id="app">
        <div id="logo-container">
          <img id="logo" src={logo} alt="logo"/>
          <nav className="nav-links">
            <div className="nav-item">
              <NavLink to="/" exact>Visualise</NavLink>
            </div>
            <div className="nav-item">
              <NavLink to="/compare" exact>Compare</NavLink>
            </div>
            <div className="nav-item">
              <NavLink to="/map" exact>Map</NavLink>
            </div>
            <div className="nav-item">
              <NavLink to="/about">About</NavLink>
            </div>
          </nav>
        </div>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/compare">
            <Compare />
          </Route>
          <Route path="/map">
            <Map setTooltipContent={setTooltipContent}  />
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
