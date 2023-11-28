import styled from "styled-components";

type LatestValueCard = {
  cardTitle: string
  ispuValue: string | number
  sensorValue: string | number
  categoryValue: string
}

const LatestValueCard = ({
  cardTitle,
  ispuValue,
  sensorValue,
  categoryValue,
}: LatestValueCard) => {
  return (
    <CardContainer>
      <CardTitle>
        {cardTitle}
      </CardTitle>

      <ContainerValue>
        <ItemValue>
          <p className="value">{ispuValue}</p>
          <p className="label">ISPU</p>
        </ItemValue>
        <ItemValue>
          <p className="value">{sensorValue}</p>
          <p className="label">Sensor</p>
        </ItemValue>
      </ContainerValue>

      <CategoryValue>
        {categoryValue}
      </CategoryValue>

    </CardContainer>
  )
}


const CardContainer = styled.div`
  background-color: blue;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  flex-grow: 1;
  max-width: 150px;
`
const CardTitle = styled.div`
  background-color: magenta;
  margin: -0.5rem -0.5rem 0;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 0.2rem 1.5rem;
  font-weight: 800;
`

const ContainerValue = styled.div`
  display: flex;
  flex: 1 1;
  justify-content: space-evenly;
  padding: 0.2rem 0.5rem 0;
  border-bottom: 1px solid magenta;
  margin: -0.2rem -0.5rem 0;
`

const ItemValue = styled.div`
  padding: 0.5rem 0;
  width: 100%;

  &:first-child {
    border-right: 1px solid magenta;
  }

  & p {
    margin: 0;
  }

  & > .value {
    font-weight: 500;
  }

  & > .label {
    font-weight: 200;
  }
`

const CategoryValue = styled.div`
  padding: 0.3rem 0 0.2rem;
`

export default LatestValueCard;

