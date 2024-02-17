import styled from "styled-components";
import FilterDateRange, { FilterDateRangeProps } from "./FilterDateRange";

const Container = styled.div`
  padding: 1rem 0.75rem;
`

type UtilitiesLineProps = {} & FilterDateRangeProps

const UtilitiesLine = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: UtilitiesLineProps) => {
  return (
    <Container>
      <FilterDateRange
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </Container>
  )
}

export default UtilitiesLine;

