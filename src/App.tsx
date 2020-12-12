import React from 'react';
import {
  BrowserRouter as Router, Switch,
} from 'react-router-dom';
import styles from './App.module.css';


import { RouterManager } from './RouterManager';

function App() {

  return (
    <div className={styles.App}>
      <Router>
        <Switch>
          <RouterManager />
        </Switch>
      </Router>

    </div>
  )
}

export default App