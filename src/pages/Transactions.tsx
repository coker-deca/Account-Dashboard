import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import Charts, { ChartInterface } from '../components/features/Charts';
import Totals from '../components/features/Totals';
import DashBoardLayout, { AggregateI } from '../components/templates/DashboardLayout';
import { getTotalByBranch, getTotalByDays, groupBy } from '../constants/helpers';
import { TRANSACTION_QUERY, TRANSACTION_QUERY_DATE } from '../queries/transactionQuery';

const TransactionsPage = () => {
  const { data: transactionData } = useQuery(TRANSACTION_QUERY);
  const [branchData, setBranchData] = useState<ChartInterface[]>([]);
  const [dailyData, setDailyData] = useState<ChartInterface[]>([]);
  const [transactionTotals, setTransactionTotals] = useState(0);
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [debitTotals, setCreditTotals] = useState(0);
  const [creditTotals, setDebitTotals] = useState(0);
  const [dateValue, setDateValue] = useState<string[]>([]);
  const useValue = (value: string[]) => {
    setDateValue(value);
  };

  const [executeSearch, { data: filteredTransactionData }] = useLazyQuery(
    TRANSACTION_QUERY_DATE,
    {
      variables: {
        filter: { created_at_lte: endDate, created_at_gte: startDate },
        sortField: "created_at",
      },
    }
  );

  const totals: AggregateI[] = [
    {
      name: "Transactions",
      amount: transactionTotals,
      url: "/transactions",
    },
    {
      name: "Credits",
      amount: debitTotals,
      url: "/transactions",
    },
    {
      name: "Debits",
      amount: creditTotals,
      url: "/transactions",
    },
  ];

  useEffect(() => {
    setStartDate(dateValue[0]);
    setEndDate(dateValue[1]);
    const transactions = transactionData?.allTransactions || [];
    const filteredTransactions = filteredTransactionData?.allTransactions || [];
    const allTotals = transactions?.length;
    const { credit, debit } = groupBy(transactions, "type");
    const branchValues = getTotalByBranch(transactions);
    const dailyValues = getTotalByDays(filteredTransactions, dateValue);
    setBranchData(branchValues);
    setDailyData(dailyValues);
    setTransactionTotals(allTotals);
    setCreditTotals(debit?.length);
    setDebitTotals(credit?.length);
    executeSearch();
  }, [transactionData, dateValue, filteredTransactionData?.allTransactions, executeSearch]);
  return (
    <DashBoardLayout useValue={useValue} clickedKeys={["2"]}>
      <Totals totals={totals} />
      <Charts data={branchData} title="Transactions by Branch" />
      {dateValue.length > 1 && dailyData.length && (
        <Charts data={dailyData} title="Transactions by Days" />
      )}
    </DashBoardLayout>
  );
};
export default TransactionsPage;
