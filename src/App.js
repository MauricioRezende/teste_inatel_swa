import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import ListarUniversidades from './ListarUniversidades'
import Universidade from './Universidade';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={ListarUniversidades} />
        <Route path='/uni' exact component={Universidade}/>
      </Switch>
    </Router>
  );
}

export default App;
