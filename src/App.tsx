import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Container from './Container'
import Graph from './Graph'
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Container />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
