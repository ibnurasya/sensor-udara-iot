import styled from "styled-components";
import FilterDateRange from "./FilterDateRange";

const Container = styled.div`
  padding: 1rem 0.75rem;
`

const UtilitiesLine = () => {
  return (
    <Container>
      <FilterDateRange />
    </Container>
  )
}

export default UtilitiesLine;

