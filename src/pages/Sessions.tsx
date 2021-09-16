import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import Totals from "../components/features/Totals";
import DashBoardLayout, {
  AggregateI,
} from "../components/templates/DashboardLayout";
import { SESSION_QUERY } from "../queries/sessionQueries";

const SessionsPage = () => {
  const { data: sessionData } = useQuery(SESSION_QUERY);
  const [sessionTotals, setSessionTotals] = useState(0);
  const totals: AggregateI[] = [
    {
      name: "Sessions",
      amount: sessionTotals,
      url: "/",
    },
  ];

  useEffect(() => {
    const sessions = sessionData?.allSessions || [];
    const allTotals = sessions?.length;
    setSessionTotals(allTotals);
  }, [sessionData?.allSessions]);
  return (
    <DashBoardLayout>
      <Totals totals={totals} />
    </DashBoardLayout>
  );
};
export default SessionsPage;
