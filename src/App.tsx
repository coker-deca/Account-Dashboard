import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import { ACCOUNT_QUERY } from './queries/accountQuery';

function App() {
  const { data } = useQuery(ACCOUNT_QUERY);
  useEffect(() => {
    console.log(data);
  });
  return (
    <div className="App">
      <Router>
        {data && data.allAccounts.map((dataItem: any) => dataItem.first_name)}
        <Switch>
          <Route path="/">
          </Route>
          <Route path="/accounts">
          </Route>
          <Route path="/transactions">
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
