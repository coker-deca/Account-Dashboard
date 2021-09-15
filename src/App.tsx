import React, { useEffect } from 'react';
import './App.css';
import { ACCOUNT_QUERY } from './queries/accountQuery';
import { useQuery } from '@apollo/client';

function App() {
  const { data } = useQuery(ACCOUNT_QUERY);
  useEffect(() => {
    console.log(data)
  });
  return (
    <div className="App">
      {data && data.allAccounts.map((dataItem: any)=> dataItem.first_name)}
    </div>
  );
}

export default App;
