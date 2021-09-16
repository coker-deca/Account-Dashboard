import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DashBoardLayout from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <DashBoardLayout />
          </Route>
          <Route path="/accounts"></Route>
          <Route path="/transactions"></Route>
          <Route path="/sessions"></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
