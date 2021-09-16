import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DashBoardLayout from './pages/Dashboard';
import AccountsPage from './pages/Accounts';
import TransactionsPage from './pages/Transactions';
import SessionsPage from './pages/Sessions';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/accounts"><AccountsPage /></Route>
          <Route path="/transactions"><TransactionsPage /></Route>
          <Route path="/sessions"><SessionsPage /></Route>
          <Route path="/">
            <DashBoardLayout />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
