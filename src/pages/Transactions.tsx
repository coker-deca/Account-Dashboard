import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import Charts, { ChartInterface } from '../components/features/Charts';
import Totals from '../components/features/Totals';
import DashBoardLayout, { AggregateI } from '../components/templates/DashboardLayout';
import { getTotalByBranch, getTotalByDays, groupBy } from '../constants/helpers';
import { TRANSACTION_QUERY } from '../queries/transactionQuery';

const TransactionsPage = () => {
  const { data: transactionData } = useQuery(TRANSACTION_QUERY);
  const [branchData, setBranchData] = useState<ChartInterface[]>([]);
  const [dailyData, setDailyData] = useState<ChartInterface[]>([]);
  const [transactionTotals, setTransactionTotals] = useState(0);
  const [debitTotals, setCreditTotals] = useState(0);
  const [creditTotals, setDebitTotals] = useState(0);
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
    const transactions = transactionData?.allTransactions || [];
    const allTotals = transactions?.length;
    const { credit, debit } = groupBy(transactions, "type");
    const branchValues = getTotalByBranch(transactions);
    const dailyValues = getTotalByDays(transactions);
    setBranchData(branchValues);
    setDailyData(dailyValues);
    setTransactionTotals(allTotals);
    setCreditTotals(debit.length);
    setDebitTotals(credit.length);
  }, [transactionData?.allTransactions]);
  return (
    <DashBoardLayout>
      <Totals totals={totals} />
      <Charts data={branchData} title="Transactions by Branch" />
      <Charts data={dailyData} title="Transactions by Days" />
    </DashBoardLayout>
  );
};
export default TransactionsPage;
