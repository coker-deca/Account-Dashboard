import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Maps, { MapInterface } from "../components/features/Map";

import Totals from "../components/features/Totals";
import DashBoardLayout, {
  AggregateI,
} from "../components/templates/DashboardLayout";
import { getCoordValues } from "../constants/helpers";
import { SESSION_QUERY } from "../queries/sessionQueries";

const SessionsPage = () => {
  const { data: sessionData } = useQuery(SESSION_QUERY);
  const [sessionTotals, setSessionTotals] = useState(0);
  const [coordinates, setCoordinates] = useState<MapInterface[]>([]);
  const [dateValue, setDateValue] = useState("");
  const totals: AggregateI[] = [
    {
      name: "Sessions",
      amount: sessionTotals,
      url: "/sessions",
    },
  ];
  const useValue = (value: string) => setDateValue(value);
  
  useEffect(() => {
    const sessions = sessionData?.allSessions || [];
    const values: MapInterface[] = getCoordValues(sessions);
    const allTotals = sessions?.length;
    Object.values(values);
    setCoordinates(values);
    setSessionTotals(allTotals);
  }, [sessionData?.allSessions]);
  return (
    <DashBoardLayout clickedKeys={['3']} useValue={useValue}>
      <Totals totals={totals} />
      <Maps coordinates={coordinates} />
    </DashBoardLayout>
  );
};
export default SessionsPage;
