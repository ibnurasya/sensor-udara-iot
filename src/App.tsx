import styled from "styled-components";
import "./App.css";
import UtilitiesLine from "./UtilitiesLine";
import ChronologicalTable from "./ChronologicalTable.tsx";
import Chart from "./Chart.tsx";
import { initializeFirebase } from "./firebase/init.ts";
import LatestValue from "./LatestValue.tsx";

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

function App() {
  return (
    <>
      <Container>
        <Chart />

        <LatestValue />

        <UtilitiesLine />

        <ChronologicalTable />
      </Container>
    </>
  );
}

export default App;
