import styled from 'styled-components'
import './App.css'
import LatestValueCard from './LatestValueCard'
import UtilitiesLine from './UtilitiesLine';
import ChronologicalTable from './ChronologicalTable.tsx';
import Chart from './Chart.tsx';

const Container = styled.div`
  width: 600px;
  @media (max-width: 400px) {
    width: calc(100vw - 2rem);
  }
  border-radius: 0.5rem;
  padding: 1rem;
  background: white;
  box-shadow: -3px 0px 16px 10px rgb(191,191,191);

  color-scheme: only light;
`

const LatestValueContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  margin-top: 2rem;
`

function App() {

  return (
    <>
      <Container>

        <Chart />

        <LatestValueContainer>
          <LatestValueCard 
            cardTitle={"PM 2.5"}
            ispuValue={"98"}
            sensorValue={"100"}
            categoryValue={"Sedang"}
          />
          <LatestValueCard 
            cardTitle={"PM 10"}
            ispuValue={"98"}
            sensorValue={"100"}
            categoryValue={"Sedang"}
          />
          <LatestValueCard 
            cardTitle={"CO"}
            ispuValue={"98"}
            sensorValue={"100"}
            categoryValue={"Tidak Sehat"}
          />
        </LatestValueContainer>

        <UtilitiesLine />

        <ChronologicalTable />

      </Container>
    </>
  )
}


export default App
