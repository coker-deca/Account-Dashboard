import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Totals from '../components/features/Totals';

import groupBy from '../constants/groupBy';
import { ACCOUNT_QUERY } from '../queries/accountQuery';
import { AggregateI } from './Dashboard';

const AccountsPage = () => {
  const { data: accountsData } = useQuery(ACCOUNT_QUERY);
  const [accountTotals, setAccountTotals] = useState(0);
  const [savingsTotals, setSavingsTotals] = useState(0);
  const [chequeTotals, setChequeTotals] = useState(0);
  const accounts = accountsData?.allAccounts || [];
  const totals: AggregateI[] = [
    {
      name: "Accounts",
      amount: accountTotals,
      url: "/",
    },
    {
      name: "Savings",
      amount: savingsTotals,
      url: "/",
    },
    {
      name: "Cheques",
      amount: chequeTotals,
      url: "/",
    },
  ];

  useEffect(() => {
    const allTotals = accounts?.length;
    const { cheque, savings } = groupBy(accounts, "type");
    setAccountTotals(allTotals);
    setSavingsTotals(savings.length);
    setChequeTotals(cheque.length);
  }, [accounts]);
  return <Totals totals={totals} />;
};
export default AccountsPage;
