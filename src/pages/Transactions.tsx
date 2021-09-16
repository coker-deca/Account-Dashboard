import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import Totals from "../components/features/Totals";
import DashBoardLayout, {
  AggregateI,
} from "../components/templates/DashboardLayout";
import groupBy from "../constants/groupBy";
import { TRANSACTION_QUERY } from "../queries/transactionQuery";

const TransactionsPage = () => {
  const { data: transactionData } = useQuery(TRANSACTION_QUERY);
  const [transactionTotals, setTransactionTotals] = useState(0);
  const [debitTotals, setCreditTotals] = useState(0);
  const [creditTotals, setDebitTotals] = useState(0);
  const totals: AggregateI[] = [
    {
      name: "Transactions",
      amount: transactionTotals,
      url: "/",
    },
    {
      name: "Credits",
      amount: debitTotals,
      url: "/",
    },
    {
      name: "Debits",
      amount: creditTotals,
      url: "/",
    },
  ];

  useEffect(() => {
    const transactions = transactionData?.allTransactions || [];
    const allTotals = transactions?.length;
    const { credit, debit } = groupBy(transactions, "type");
    setTransactionTotals(allTotals);
    setCreditTotals(debit.length);
    setDebitTotals(credit.length);
  }, [transactionData?.allTransactions]);
  return (
    <DashBoardLayout>
      <Totals totals={totals} />
    </DashBoardLayout>
  );
};
export default TransactionsPage;
