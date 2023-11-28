import styled from 'styled-components'
import './App.css'
import LatestValueCard from './LatestValueCard'
import UtilitiesLine from './UtilitiesLine';

const Container = styled.div`
  width: 600px;
  @media (max-width: 400px) {
    width: auto;
  }
  border-radius: 0.5rem;
  padding: 1rem;
  background: white;
`

const LatestValueContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
`

function App() {

  return (
    <>
      <Container>
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

      </Container>
    </>
  )
}


export default App
