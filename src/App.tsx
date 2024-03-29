import styled from "styled-components";
import "./App.css";
import UtilitiesLine from "./UtilitiesLine";
import ChronologicalTable from "./ChronologicalTable.tsx";
import Chart from "./Chart.tsx";
import { initializeFirebase } from "./firebase/init.ts";
import LatestValue from "./LatestValue.tsx";
import { endOfDay, fromUnixTime, getUnixTime, startOfDay, sub } from "date-fns";
import { useEffect, useState } from "react";
import { TimelineData, getTimelineData } from "./firebase/get-timeline-data.ts";

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

const defaultEndDate: number = getUnixTime(endOfDay(new Date()))
const defaultStartDate: number = getUnixTime(startOfDay(sub(fromUnixTime(defaultEndDate), { days: 6 })))

function App() {
  const [startDate, setStartDate] = useState(defaultStartDate)
  const [endDate, setEndDate] = useState(defaultEndDate)
  const [data, setData] = useState<TimelineData[]>(() => [])

  

  useEffect(() => {
    (async () => {
      const timelineData = await getTimelineData(
        `-${endDate}`,
        `-${startDate}`
      )
      setData(timelineData.filter(Boolean))
    })()
  }, [startDate, endDate])

  return (
    <>
      <Container>
      <div style={{
          marginTop: '1rem',
          fontSize: '24px',
          fontWeight:'bold',
          textAlign: 'center',
          marginLeft: '0.5rem',
          color: 'black',
        }}>
          ISPU AIR MONITOR
        </div>
        <Chart timelineData={data} />

        <LatestValue timelineData={data} />

        <div style={{
          marginTop: '1rem',
          fontSize: '12px',
          textAlign: 'left',
          marginLeft: '0.5rem',
          color: 'black',
        }}>
          <span style={{ color: 'red' }}>*</span>&nbsp;
          Nilai ISPU dihitung berdasarkan pedoman ISPU Kementrian Lingkungan Hidup dan Kehutanan, info lebih lanjut&nbsp;
          <a href="https://ditppu.menlhk.go.id/portal/read/indeks-standar-pencemar-udara-ispu-sebagai-informasi-mutu-udara-ambien-di-indonesia">klik di sini</a>
        </div>

        <UtilitiesLine
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          data={data}
        />

        <ChronologicalTable data={data} />
      </Container>
    </>
  );
}

export default App;
