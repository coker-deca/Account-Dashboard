import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import Totals from '../components/features/Totals';
import DashBoardLayout, { AggregateI } from '../components/templates/DashboardLayout';
import { currentDate, firstday, lastday } from '../constants/dates';
import { ACCOUNT_QUERY } from '../queries/accountQuery';
import { SESSION_QUERY } from '../queries/sessionQueries';
import { TRANSACTION_QUERY } from '../queries/transactionQuery';

const DashBoard = () => {
  const [accountTotals, setAccountTotals] = useState(0);
  const [transactionTotals, setTransactionTotals] = useState(0);
  const [sessionTotals, setSessionTotals] = useState(0);

  const { data: accountsData } = useQuery(ACCOUNT_QUERY);
  const { data: transactionsData } = useQuery(TRANSACTION_QUERY);
  const { data: sessionsData } = useQuery(SESSION_QUERY);

  const accounts = accountsData?.allAccounts;
  const transactions = transactionsData?.allTransactions;
  const sessions = sessionsData?.allSessions;

  useEffect(() => {
    console.log(
      "firstday: ",
      firstday,
      "lastday: ",
      lastday,
      "currentDate: ",
      currentDate
    );
    setAccountTotals(accounts?.length);
    setTransactionTotals(transactions?.length);
    setSessionTotals(sessions?.length);
  }, [accounts, transactions, sessions]);

  const totals: AggregateI[] = [
    {
      name: "Accounts",
      amount: accountTotals,
      url: "/accounts",
    },
    {
      name: "Transactions",
      amount: transactionTotals,
      url: "/transactions",
    },
    {
      name: "Sessions",
      amount: sessionTotals,
      url: "/sessions",
    },
  ];

  return (
    <DashBoardLayout>
      <Totals totals={totals} />
    </DashBoardLayout>
  );
};

export default DashBoard;
