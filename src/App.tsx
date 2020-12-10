import React from 'react';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import './App.css';


import { RouterManager } from './RouterManager';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <RouterManager/>
        </Switch>
      </Router>
      
    </div>
  )
}

export default App