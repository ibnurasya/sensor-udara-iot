import styled from "styled-components";
import "./App.css";
import UtilitiesLine from "./UtilitiesLine";
import ChronologicalTable from "./ChronologicalTable.tsx";
import Chart from "./Chart.tsx";
import { initializeFirebase } from "./firebase/init.ts";
import LatestValue from "./LatestValue.tsx";
import { add, endOfDay, fromUnixTime, getUnixTime, startOfDay, sub } from "date-fns";
import { useState } from "react";

const Container = styled.div`
  width: 600px;
  @media (max-width: 400px) {
    width: calc(100vw - 2rem);
  }
  border-radius: 0.5rem;
  padding: 1rem;
  background: white;
  box-shadow: -3px 0px 16px 10px rgb(191, 191, 191);

  color-scheme: only light;
`;

initializeFirebase();

const defaultStartDate: number = getUnixTime(startOfDay(new Date()))
const defaultEndDate: number = getUnixTime(add(fromUnixTime(defaultStartDate), { days: 1 }))

function App() {
  const [startDate, setStartDate] = useState(defaultStartDate)
  const [endDate, setEndDate] = useState(defaultEndDate)

  return (
    <>
      <Container>
        <Chart />

        <LatestValue />

        <UtilitiesLine

          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}

        />

        <ChronologicalTable startDate={startDate} endDate={endDate} />
      </Container>
    </>
  );
}

export default App;
