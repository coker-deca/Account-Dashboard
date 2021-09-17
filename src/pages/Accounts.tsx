import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Charts, { ChartInterface } from '../components/features/Charts';

import Totals from '../components/features/Totals';
import DashBoardLayout, { AggregateI } from '../components/templates/DashboardLayout';
import {getTotalByDays, groupBy} from '../constants/helpers';
import { ACCOUNT_QUERY, ACCOUNT_QUERY_DATE } from "../queries/accountQuery";

const AccountsPage = () => {
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [dateValue, setDateValue] = useState<string[]>([]);
  const [dailyData, setDailyData] = useState<ChartInterface[]>([]);
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
  const useValue = (value: string[]) => {
    setDateValue(value);
  };
  const [executeSearch, { data: filteredAccountData }] = useLazyQuery(
    ACCOUNT_QUERY_DATE,
    {
      variables: {
        filter: { created_at_lte: endDate, created_at_gte: startDate },
        sortField: "created_at",
      },
    }
  );


  useEffect(() => {
    setStartDate(dateValue[0]);
    setEndDate(dateValue[1]);
    const accounts = accountsData?.allAccounts || [];
    const filteredAccounts = filteredAccountData?.allAccounts || [];
    const allTotals = accounts?.length;
    const { cheque, savings } = groupBy(accounts, "type");
    setAccountTotals(allTotals);
    setSavingsTotals(savings?.length);
    setChequeTotals(cheque?.length);
    const dailyValues = getTotalByDays(filteredAccounts, dateValue);
    setDailyData(dailyValues);
  }, [accountsData?.allAccounts, dateValue]);
  return (
    <DashBoardLayout useValue={useValue} clickedKeys={['1']}>
      <Totals totals={totals} />
      {dateValue.length > 1 && dailyData.length && (
        <Charts data={dailyData} title="Accounts by Days" />
      )}
    </DashBoardLayout>
  );
};
export default AccountsPage;
