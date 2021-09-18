import { useLazyQuery, useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import Charts, { ChartInterface } from '../components/features/Charts';

import Totals from '../components/features/Totals';
import DashBoardLayout, { AggregateI } from '../components/templates/DashboardLayout';
import {getTotalByDays, groupBy} from '../constants/helpers';
import { ACCOUNT_QUERY, ACCOUNT_QUERY_DATE } from "../queries/accountQuery";

const AccountsPage = () => {
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
  const [executeSearch, { loading, data: filteredAccountData }] = useLazyQuery(
    ACCOUNT_QUERY_DATE,
  );

  const getFilteredData = useCallback(
    (start: string, end: string) => {
      executeSearch({
        variables: {
          created_at_lte: end,
          created_at_gte: start,
          sortField: "created_at",
        },
      });
    },
    [executeSearch]
  );

  useEffect(() => {
    const accounts = accountsData?.allAccounts || [];
    const allTotals = accounts?.length;
    const { cheque, savings } = groupBy(accounts, "type");
    setAccountTotals(allTotals);
    setSavingsTotals(savings?.length);
    setChequeTotals(cheque?.length);
  }, [accountsData?.allAccounts]);

  useEffect(() => {
    const filteredAccounts = filteredAccountData?.allAccounts || [];
    if (filteredAccounts.length && dateValue[0] && dateValue[1]) {
      const dailyValues = getTotalByDays(filteredAccounts, dateValue);
      setDailyData(dailyValues);
    }
  }, [dateValue, filteredAccountData]);

  return (
    <DashBoardLayout
      useValue={useValue}
      executeDateRequest={getFilteredData}
      clickedKeys={["1"]}
    >
      <Totals totals={totals} />
      {!loading && dateValue.length > 1 && dailyData.length && (
        <Charts data={dailyData} title="Accounts by Days" />
      )}
    </DashBoardLayout>
  );
};
export default AccountsPage;
