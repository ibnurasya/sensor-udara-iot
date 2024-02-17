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
  data,
}: UtilitiesLineProps) => {
  return (
    <Container>
      <FilterDateRange
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        data={data}
      />
    </Container>
  )
}

export default UtilitiesLine;

