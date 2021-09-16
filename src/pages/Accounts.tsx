import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import Totals from '../components/features/Totals';
import DashBoardLayout, { AggregateI } from '../components/templates/DashboardLayout';
import {groupBy} from '../constants/helpers';
import { ACCOUNT_QUERY } from '../queries/accountQuery';

const AccountsPage = () => {
  const { data: accountsData } = useQuery(ACCOUNT_QUERY);
  const [accountTotals, setAccountTotals] = useState(0);
  const [savingsTotals, setSavingsTotals] = useState(0);
  const [chequeTotals, setChequeTotals] = useState(0);
  const totals: AggregateI[] = [
    {
      name: "Accounts",
      amount: accountTotals,
      url: "/accounts",
    },
    {
      name: "Savings",
      amount: savingsTotals,
      url: "/accounts",
    },
    {
      name: "Cheques",
      amount: chequeTotals,
      url: "/accounts",
    },
  ];

  useEffect(() => {
    const accounts = accountsData?.allAccounts || [];
    const allTotals = accounts?.length;
    const { cheque, savings } = groupBy(accounts, "type");
    setAccountTotals(allTotals);
    setSavingsTotals(savings.length);
    setChequeTotals(cheque.length);
  }, [accountsData?.allAccounts]);
  return (
    <DashBoardLayout>
      <Totals totals={totals} />
    </DashBoardLayout>
  );
};
export default AccountsPage;
